import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { leadInputSchema, type Lead } from "@/lib/leads";

export const runtime = "nodejs";

/** Best-effort in-memory rate limit (per instance). Use a shared store (Redis/Upstash) in production. */
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

/**
 * Lead sinks. Add CRM adapters here (HubSpot, Pipedrive, Notion…) without touching the form.
 */
async function sendEmail(payload: { from: string; to: string[]; subject: string; text: string; reply_to?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

/** Verifies a Cloudflare Turnstile token. Returns true when Turnstile is not configured. */
async function humanVerified(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

/** Returns how many durable sinks accepted the lead (webhook, email, file). Zero means nothing was stored. */
async function persist(lead: Lead) {
  let stored = 0;
  // 1) Always log a structured line: visible in Vercel/host logs.
  console.log("[lead]", JSON.stringify(lead));

  // 1b) Email notification (Resend). LEAD_TO_EMAIL may hold several comma-separated addresses.
  if (process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL) {
    const from = process.env.LEAD_FROM_EMAIL ?? "Cirrion <onboarding@resend.dev>";
    const to = process.env.LEAD_TO_EMAIL.split(",").map((x) => x.trim()).filter(Boolean);
    await sendEmail({
      from,
      to,
      reply_to: lead.email,
      subject: `New project brief: ${lead.name} (${lead.service})`,
      text: [
        `Name: ${lead.name}`,
        `Company: ${lead.company || "-"}`,
        `Email: ${lead.email}`,
        `Phone: ${lead.phone || "-"}`,
        `Country: ${lead.country}`,
        `Service: ${lead.service}`,
        `Budget: ${lead.budget}`,
        `Timeline: ${lead.timeline}`,
        `Source: ${lead.source || "-"} (${lead.landing_page || "-"})`,
        "",
        lead.message,
        "",
        `Lead ID: ${lead.id}`,
      ].join("\n"),
    });
    stored++;
    // Optional acknowledgement to the sender. Failure here must never lose the lead.
    if (process.env.LEAD_AUTOREPLY === "1") {
      try {
        await sendEmail({
          from,
          to: [lead.email],
          reply_to: to[0],
          subject: "We received your project brief",
          text: `Hi ${lead.name.split(" ")[0]},\n\nThanks for sending your brief. A member of the team will read it and reply within one working day.\n\nIf you need to add anything in the meantime, just reply to this email.\n\nCirrion`,
        });
      } catch (err) {
        console.error("[lead:autoreply]", err);
      }
    }
  }

  // 2) Optional webhook (Zapier, Make, Slack, CRM)
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    stored++;
  }

  // 3) Optional local file store for VPS/self-hosting
  if (process.env.LEAD_STORE === "file") {
    const { appendFile, mkdir } = await import("node:fs/promises");
    await mkdir(".data", { recursive: true });
    await appendFile(".data/leads.jsonl", JSON.stringify(lead) + "\n");
    stored++;
  }
  return stored;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { website, turnstile, ...input } = parsed.data;
  // Honeypot tripped: pretend success, store nothing.
  if (website) return NextResponse.json({ ok: true, id: "ok" });
  if (!(await humanVerified(turnstile, ip))) {
    return NextResponse.json({ ok: false, error: "We couldn't verify the form. Please refresh the page and try again." }, { status: 400 });
  }

  const lead: Lead = {
    id: randomUUID(),
    ...input,
    created_at: new Date().toISOString(),
    status: "New",
  };

  try {
    const stored = await persist(lead);
    // Never tell a visitor "sent" when nothing durable received it. Fail loudly in production so the gap is noticed at launch.
    if (stored === 0 && process.env.NODE_ENV === "production") {
      console.error("[lead:not-delivered] No delivery channel configured. Set RESEND_API_KEY + LEAD_TO_EMAIL, LEAD_WEBHOOK_URL or LEAD_STORE=file.");
      return NextResponse.json({ ok: false, error: "We couldn't send your brief. Please email us directly." }, { status: 503 });
    }
  } catch (err) {
    console.error("[lead:error]", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your brief. Please email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id: lead.id });
}
