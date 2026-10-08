import { HeroActions } from "./HeroActions";

const d = (ms: number) => ({ "--hx-d": `${ms}ms` }) as React.CSSProperties;
const capabilities = ["Mobile", "Web", "AI", "SaaS", "Software"];

/** Eyebrow, two-line headline, description, actions and the capability line, entering in sequence. */
export function HeroContent() {
  return (
    <div className="relative z-10 max-w-[44rem] xl:max-w-none">
      <p className="hx-in flex items-start gap-3 text-[0.75rem] sm:text-[0.8125rem] font-semibold tracking-[0.16em] text-indigo-deep uppercase" style={d(300)}>
        <span aria-hidden className="mt-[0.7em] h-px w-7 shrink-0 bg-indigo" />
        Digital product &amp; software engineering
      </p>

      <h1 id="hero-title" className="hx-display mt-7 text-fg uppercase md:whitespace-nowrap">
        <span className="hx-in-line" style={d(500)}>
          Create
        </span>
        <span className="hx-in-line" style={d(640)}>
          <span className="bg-[linear-gradient(100deg,#4f54e5_0%,#6366f1_70%)] bg-clip-text text-transparent">What&rsquo;s next</span>
          <span className="text-orange">.</span>
        </span>
      </h1>

      <p className="hx-in mt-8 max-w-[31rem] text-[1.125rem] leading-[1.6] text-fg-3 md:text-[1.1875rem]" style={d(820)}>
        Cirrion designs and engineers digital products that turn ambitious ideas into powerful, scalable business solutions.
      </p>

      <div className="hx-in mt-9" style={d(1000)}>
        <HeroActions />
      </div>

      <ul className="hx-in mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.75rem] font-medium tracking-[0.14em] text-fg-3 uppercase sm:text-[0.8125rem]" style={d(1150)} aria-label="Capabilities">
        {capabilities.map((c, n) => (
          <li key={c} className="flex items-center gap-3">
            {n > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-indigo/60" />}
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
