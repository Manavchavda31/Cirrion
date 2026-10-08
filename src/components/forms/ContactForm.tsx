"use client";

import { useEffect, useRef, useState } from "react";
import { budgets, leadInputSchema, services, timelines } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const inputCls = "field";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.9375rem] font-medium text-fg">
        <span>{label}</span>
        {optional && <span className="text-[0.8125rem] font-normal text-fg-3">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-[0.875rem] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function Pills({ name, legend, options, value, onChange, error }: { name: string; legend: string; options: readonly string[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[0.9375rem] font-medium text-fg">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-describedby={error ? `${name}-err` : undefined}>
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="peer sr-only" />
            <span
              className={cn(
                "flex h-10 items-center rounded-full border border-line-2 bg-white px-4 text-[0.9375rem] text-fg-2 transition-colors",
                "peer-checked:border-indigo-deep peer-checked:bg-indigo-deep peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-indigo/50 hover:bg-lavender",
              )}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-err`} role="alert" className="mt-2 text-[0.875rem] text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");

  // Cloudflare Turnstile (optional): loads the widget only when a site key is configured.
  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    const id = "cf-turnstile-script";
    if (document.getElementById(id)) return;
    const el = document.createElement("script");
    el.id = id;
    el.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    el.async = true;
    el.defer = true;
    document.head.appendChild(el);
  }, []);

  // After a successful send the form is replaced by a shorter card: bring it into view and announce it.
  useEffect(() => {
    if (status !== "sent") return;
    const el = doneRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }, [status]);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    track("contact_start");
  };

  const focusFirst = (errs: Errors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      service,
      budget,
      timeline,
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      turnstile: String(fd.get("cf-turnstile-response") ?? ""),
      source: (typeof document !== "undefined" && (new URLSearchParams(location.search).get("utm_source") || document.referrer)) || "direct",
      landing_page: typeof location !== "undefined" ? location.pathname : "",
    };

    const parsed = leadInputSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      focusFirst(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(parsed.data) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string[]> };
      if (res.ok && json.ok) {
        track("contact_submit", { service: parsed.data.service, budget: parsed.data.budget, country: parsed.data.country });
        setStatus("sent");
        return;
      }
      if (json.fields) {
        const errs: Errors = {};
        for (const [k, v] of Object.entries(json.fields)) if (v?.[0]) errs[k] = v[0];
        setErrors(errs);
        focusFirst(errs);
      }
      setServerError(json.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="outline-none">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="h2 mt-6">Your project brief is on its way.</h2>
        <p className="lead mt-4">A senior member of the team will read it and reply within one working day.</p>
        <ol className="rule-list mt-8">
          {[
            ["We read it", "Every brief is read by a person, not a bot."],
            ["We reply", "You get questions or a proposed call time."],
            ["We scope it", "A short discovery call turns the idea into a plan."],
          ].map(([t, b], i) => (
            <li key={t} className="flex gap-4 py-4">
              <span className="text-[0.9375rem] font-semibold text-accent">0{i + 1}</span>
              <span>
                <span className="block font-medium">{t}</span>
                <span className="block text-[0.9375rem] text-fg-2">{b}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const err = (k: string) => errors[k];
  const aria = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `${k}-err` : undefined }) as const;

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={onStart} noValidate className="space-y-7" aria-label="Project brief">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={err("name")}>
          <input id="name" name="name" autoComplete="name" className={inputCls} placeholder="Your full name" {...aria("name")} />
        </Field>
        <Field id="company" label="Company" optional error={err("company")}>
          <input id="company" name="company" autoComplete="organization" className={inputCls} placeholder="Company or project name" {...aria("company")} />
        </Field>
        <Field id="email" label="Email" error={err("email")}>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={inputCls} placeholder="you@company.com" {...aria("email")} />
        </Field>
        <Field id="phone" label="Phone" optional error={err("phone")}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputCls} placeholder="+1 555 000 0000" {...aria("phone")} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="country" label="Country" error={err("country")}>
            <input id="country" name="country" autoComplete="country-name" className={inputCls} placeholder="Where are you based?" {...aria("country")} />
          </Field>
        </div>
      </div>

      <Pills name="service" legend="What are you building?" options={services} value={service} onChange={setService} error={err("service")} />
      <Pills name="budget" legend="Budget" options={budgets} value={budget} onChange={setBudget} error={err("budget")} />
      <Pills name="timeline" legend="Timeline" options={timelines} value={timeline} onChange={setTimeline} error={err("timeline")} />

      <Field id="message" label="Tell us about the project" error={err("message")}>
        <textarea id="message" name="message" rows={6} className={cn(inputCls, "resize-y leading-relaxed")} placeholder="What problem are you solving, who is it for, and what does success look like?" {...aria("message")} />
      </Field>

      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {serverError && (
        <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-[0.9375rem] text-danger">
          {serverError}
        </p>
      )}

      {TURNSTILE_KEY && <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme="light" data-appearance="interaction-only" />}

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary min-w-[220px] disabled:opacity-60">
          <span>{status === "sending" ? "Sending…" : "Send project brief"}</span>
          <span className="arrow" aria-hidden>
            →
          </span>
        </button>
        <p className="max-w-[34ch] text-[0.875rem] text-fg-3">We use your details only to reply to this enquiry. See our privacy policy.</p>
      </div>
    </form>
  );
}
