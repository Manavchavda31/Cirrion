const d = (ms: number) => ({ "--hx-d": `${ms}ms` }) as React.CSSProperties;

/**
 * Ambient light for the whole hero canvas: lavender haze at the top, a faint indigo and blue glow toward the
 * visual, and a barely-there grid. The page still reads as #FAFAF8; nothing here is a visible blob.
 */
export function HeroAmbientBackground() {
  return (
    <div aria-hidden className="hx-in-fade pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={d(0)}>
      <div className="hx-par absolute inset-0" style={{ "--hx-depth": "2px" } as React.CSSProperties}>
        <div className="absolute -top-[30%] left-[10%] h-[80%] w-[90%] rounded-full bg-[radial-gradient(closest-side,rgb(243_241_255/0.9),rgb(234_242_255/0.45)_60%,transparent)]" />
        <div className="hx-drift absolute top-[10%] right-[-12%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.08),transparent)]" style={{ "--hx-dur": "18s" } as React.CSSProperties} />
        <div className="hx-drift absolute bottom-[-10%] left-[30%] h-[50%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgb(170_200_255/0.16),transparent)]" style={{ "--hx-dur": "15s", animationDelay: "-7s" } as React.CSSProperties} />
      </div>
      <div className="absolute inset-x-0 top-0 h-[70%] bg-[linear-gradient(rgb(17_19_24/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.03)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(70%_80%_at_40%_0%,black,transparent)]" />
      {/* hand-off into the next (white) section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent,#ffffff)]" />
    </div>
  );
}
