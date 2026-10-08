/** Line icons for the eight industries. Stroke follows currentColor, so a card can recolour it on hover. */
/** Stroke width is read from --icon-stroke so small renderings (menus) can thicken the line. */
const s = { stroke: "currentColor", style: { strokeWidth: "var(--icon-stroke, 1.6)" }, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons: Record<string, React.ReactNode> = {
  healthcare: (
    <>
      <path d="M32 54S10 40 10 24a12 12 0 0 1 22-6 12 12 0 0 1 22 6c0 16-22 30-22 30z" {...s} />
      <path d="M32 26v14M25 33h14" {...s} />
    </>
  ),
  fintech: (
    <>
      <rect x="8" y="16" width="48" height="32" rx="6" {...s} />
      <path d="M8 26h48" {...s} />
      <path d="M16 38h10" {...s} />
      <circle cx="46" cy="38" r="4" {...s} />
    </>
  ),
  "real-estate": (
    <>
      <path d="M10 30L32 10l22 20" {...s} />
      <path d="M16 26v28h32V26" {...s} />
      <path d="M27 54V38h10v16" {...s} />
    </>
  ),
  education: (
    <>
      <path d="M32 12L6 24l26 12 26-12z" {...s} />
      <path d="M16 30v14c0 4 8 8 16 8s16-4 16-8V30" {...s} />
      <path d="M58 24v16" {...s} />
    </>
  ),
  retail: (
    <>
      <path d="M12 22h40l-3 32H15z" {...s} />
      <path d="M24 30v-8a8 8 0 0 1 16 0v8" {...s} />
    </>
  ),
  hospitality: (
    <>
      <path d="M8 44h48" {...s} />
      <path d="M12 44a20 20 0 0 1 40 0" {...s} />
      <path d="M32 16v8M28 16h8" {...s} />
      <path d="M6 52h52" {...s} />
    </>
  ),
  logistics: (
    <>
      <path d="M6 18h32v28H6z" {...s} />
      <path d="M38 28h12l8 10v8H38z" {...s} />
      <circle cx="16" cy="48" r="5" {...s} />
      <circle cx="48" cy="48" r="5" {...s} />
    </>
  ),
  "professional-services": (
    <>
      <rect x="8" y="20" width="48" height="32" rx="6" {...s} />
      <path d="M24 20v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" {...s} />
      <path d="M8 34h48" {...s} />
      <path d="M28 34v5h8v-5" {...s} />
    </>
  ),
};

export function IndustryIcon({ slug, className = "h-12 w-12", stroke }: { slug: string; className?: string; stroke?: number }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden style={{ "--icon-stroke": stroke ?? 3.6 } as React.CSSProperties}>
      {icons[slug] ?? icons["professional-services"]}
    </svg>
  );
}
