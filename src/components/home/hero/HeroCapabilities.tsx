const d = (ms: number) => ({ "--hx-d": `calc(var(--intro) + ${ms}ms)` }) as React.CSSProperties;
const items = ["Mobile", "Web", "AI", "SaaS", "Cloud", "Software"];

/** Quiet capability strip that balances the bottom of the hero. No logos: nothing to invent. */
export function HeroCapabilities() {
  return (
    <div className="hx-in relative z-10 mx-auto flex max-w-[56rem] flex-col items-center gap-4 text-center" style={d(1000)}>
      <div className="flex w-full items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-[linear-gradient(90deg,transparent,#e6e8ed)]" />
        <p className="text-[0.8125rem] font-medium text-fg-3">Built for ambitious digital products</p>
        <span aria-hidden className="h-px flex-1 bg-[linear-gradient(90deg,#e6e8ed,transparent)]" />
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 text-[0.75rem] font-semibold tracking-[0.16em] text-fg-2 uppercase sm:text-[0.8125rem]" aria-label="Capabilities">
        {items.map((c, n) => (
          <li key={c} className="flex items-center gap-3.5">
            {n > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-indigo/60" />}
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
