const d = { "--hx-d": "var(--intro)" } as React.CSSProperties;

/**
 * Light for the whole hero canvas: a lavender haze from the top, a faint grid, and a hand-off to white at the
 * bottom. The focal glow lives with the product (HeroVisual) so it can breathe and parallax with it.
 */
export function HeroAmbientBackground() {
  return (
    <div aria-hidden className="hc-atmo hx-in-fade pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={d}>
      <div className="absolute -top-[22%] left-1/2 h-[60%] w-[110%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.5)_55%,transparent)]" />
      <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(rgb(17_19_24/0.028)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.028)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,transparent,#ffffff)]" />
    </div>
  );
}
