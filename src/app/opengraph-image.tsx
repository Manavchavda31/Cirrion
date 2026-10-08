import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { OG, ogDisplayFont, ogFont, ogLogo } from "@/lib/og-assets";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Manrope", fontWeight: 800, fontSize: 104, lineHeight: 0.95, letterSpacing: -4, textTransform: "uppercase" }}>
            <span>Create</span>
            <span style={{ color: OG.indigo }}>What&apos;s next.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: OG.muted }}>Mobile · Web · SaaS · AI · Custom software</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: ogFont(400), weight: 400, style: "normal" },
        { name: "Inter", data: ogFont(600), weight: 600, style: "normal" },
        { name: "Inter", data: ogFont(700), weight: 700, style: "normal" },
        { name: "Manrope", data: ogDisplayFont(800), weight: 800, style: "normal" },
      ],
    },
  );
}
