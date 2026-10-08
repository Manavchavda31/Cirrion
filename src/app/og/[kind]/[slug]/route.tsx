import { ImageResponse } from "next/og";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { articles } from "@/content/articles";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/content/site";
import { OG, ogDisplayFont, ogFont, ogLogo } from "@/lib/og-assets";

export const dynamicParams = false;

const KINDS = ["services", "industries", "work", "insights"] as const;
type Kind = (typeof KINDS)[number];

function lookup(kind: Kind, slug: string): { tag: string; title: string; line: string } | null {
  if (kind === "services") {
    const s = services.find((x) => x.slug === slug);
    return s ? { tag: "Service", title: s.title, line: s.summary } : null;
  }
  if (kind === "industries") {
    const i = industries.find((x) => x.slug === slug);
    return i ? { tag: "Industry", title: i.title, line: i.summary } : null;
  }
  if (kind === "work") {
    const p = getAllProjects().find((x) => x.slug === slug);
    return p ? { tag: "Case study", title: p.name, line: p.outcome } : null;
  }
  const a = articles.find((x) => x.slug === slug);
  return a ? { tag: a.kind, title: a.title, line: a.excerpt } : null;
}

export function generateStaticParams() {
  return [
    ...services.map((s) => ({ kind: "services", slug: s.slug })),
    ...industries.map((s) => ({ kind: "industries", slug: s.slug })),
    ...getAllProjects().map((s) => ({ kind: "work", slug: s.slug })),
    ...articles.map((s) => ({ kind: "insights", slug: s.slug })),
  ];
}

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; slug: string }> }) {
  const { kind, slug } = await params;
  const data = KINDS.includes(kind as Kind) ? lookup(kind as Kind, slug) : null;
  if (!data) return new Response("Not found", { status: 404 });
  const short = data.line.length > 130 ? data.line.slice(0, 127).trimEnd() + "…" : data.line;
  const titleSize = data.title.length > 40 ? 60 : data.title.length > 26 ? 70 : 82;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: OG.ink, backgroundImage: OG.glow, color: "#ffffff", fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogLogo("mark-light.png")} width={58} height={59} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ogLogo("word-light.png")} width={165} height={29} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: OG.indigo }}>{data.tag}</div>
          <div style={{ marginTop: 22, fontFamily: "Manrope", fontWeight: 800, fontSize: titleSize, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{data.title}</div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: OG.muted, maxWidth: 900 }}>{short}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: ogFont(400), weight: 400, style: "normal" },
        { name: "Inter", data: ogFont(600), weight: 600, style: "normal" },
        { name: "Inter", data: ogFont(700), weight: 700, style: "normal" },
        { name: "Manrope", data: ogDisplayFont(800), weight: 800, style: "normal" },
      ],
    },
  );
}
