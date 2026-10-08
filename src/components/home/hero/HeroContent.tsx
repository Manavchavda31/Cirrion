import { HeroActions } from "./HeroActions";

const d = (ms: number) => ({ "--hx-d": `calc(var(--intro) + ${ms}ms)` }) as React.CSSProperties;

/** Centred eyebrow, two-line headline, short supporting copy and the actions, entering in sequence. */
export function HeroContent() {
  return (
    <div className="hc-content relative z-10 mx-auto flex max-w-[60rem] flex-col items-center text-center">
      <p className="hx-in inline-flex items-center gap-2.5 rounded-full border border-indigo/15 bg-white/70 py-1.5 pr-4 pl-2 text-[0.64rem] font-semibold tracking-[0.1em] min-[400px]:text-[0.7rem] min-[400px]:tracking-[0.14em] text-indigo-deep uppercase shadow-[0_1px_2px_rgb(17_19_24/0.04)] backdrop-blur sm:text-[0.78rem]" style={d(80)}>
        <span aria-hidden className="relative grid h-5 w-5 place-items-center rounded-full bg-lavender">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
        </span>
        Digital product &amp; software engineering
      </p>

      <h1 id="hero-title" className="hx-display mt-7 text-fg uppercase">
        <span className="hx-in-line" style={d(180)}>
          Create what&rsquo;s
        </span>
        <span className="hx-in-line" style={d(300)}>
          <span className="bg-[linear-gradient(100deg,#4f54e5_10%,#6366f1_60%,#7f83f7_100%)] bg-clip-text text-transparent">Next</span>
          <span className="text-orange">.</span>
        </span>
      </h1>

      <p className="hx-in mt-7 max-w-[40rem] text-[1.0625rem] leading-[1.6] text-fg-3 sm:text-[1.125rem] lg:text-[1.1875rem]" style={d(420)}>
        Cirrion designs and engineers digital products, software and AI solutions that turn ambitious ideas into scalable business outcomes.
      </p>

      <div className="hx-in mt-9 w-full sm:w-auto" style={d(540)}>
        <HeroActions />
      </div>
    </div>
  );
}
