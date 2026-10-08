import { AssistantPanel, BrowserApp, DataCard, PhoneApp, SystemCard } from "./HeroProductUI";

/**
 * The hero's product ecosystem: one integrated system rather than five cards.
 *
 *   back   ambient light, orbit curves and quiet nodes          (parallax 2px)
 *   middle the web application                                  (parallax 5px)
 *   front  phone, assistant, platform and data read-outs        (parallax 8px)
 *
 * Positions are in em on a 64 × 50 canvas (desktop/tablet) or 40 × 45 (phones, via the --m* values), so the
 * composition scales as a whole. Each piece assembles in sequence, then floats on its own period. Decorative:
 * the stage is aria-hidden.
 */

type Place = { x: number; y: number; w: number; mx?: number; my?: number; mw?: number };
type Motion = { dur: number; offset: number; amp?: number };

const place = (p: Place) => ({ "--x": p.x, "--y": p.y, "--w": p.w, "--mx": p.mx, "--my": p.my, "--mw": p.mw }) as React.CSSProperties;
const enter = (ms: number) => ({ "--hx-d": `${ms}ms` }) as React.CSSProperties;
const float = (m: Motion) => ({ "--hx-dur": `${m.dur}s`, "--hx-fd": `${-m.offset}s`, "--hx-amp": `${m.amp ?? -8}px` }) as React.CSSProperties;
const depth = (px: number) => ({ "--hx-depth": `${px}px` }) as React.CSSProperties;

/** One floating, entering piece of the stage. */
function Piece({ at, enterMs, motion, kind = "pop", className = "", children }: { at: Place; enterMs: number; motion: Motion; kind?: "pop" | "assemble"; className?: string; children: React.ReactNode }) {
  return (
    <div className={`hx-el ${className}`} style={place(at)}>
      <div className={kind === "assemble" ? "hx-in-assemble" : "hx-in-pop"} style={enter(enterMs)}>
        <div className="hx-float" style={float(motion)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="hx-stage relative select-none" aria-hidden>
      <div className="hx-canvas">
        {/* back layer */}
        <div className="hx-par absolute inset-0" style={depth(2)}>
          <div className="hx-in-fade absolute inset-0" style={enter(0)}>
            <div className="hx-drift absolute top-[6%] left-[16%] h-[72%] w-[72%] rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.16),rgb(99_102_241/0.05)_55%,transparent)] blur-2xl" />
            <div className="hx-drift absolute top-[36%] left-[46%] h-[56%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgb(120_170_255/0.18),transparent)] blur-2xl" style={{ "--hx-dur": "13s", animationDelay: "-5s" } as React.CSSProperties} />
            <div className="hx-drift absolute top-[-4%] left-[-6%] h-[50%] w-[44%] rounded-full bg-[radial-gradient(closest-side,rgb(214_206_255/0.45),transparent)] blur-2xl" style={{ "--hx-dur": "17s", animationDelay: "-9s" } as React.CSSProperties} />
          </div>
          <Orbits />
        </div>

        {/* middle layer: the web application */}
        <div className="hx-par absolute inset-0" style={depth(5)}>
          <Piece at={{ x: 8, y: 4, w: 50, mx: 0, my: 1, mw: 40 }} enterMs={700} motion={{ dur: 6.5, offset: 0, amp: -6 }} kind="assemble">
            <BrowserApp />
          </Piece>
        </div>

        {/* front layer */}
        <div className="hx-par absolute inset-0" style={depth(8)}>
          <Connectors />
          <Piece at={{ x: 1.5, y: 15, w: 13.5, mx: 26, my: 11.5, mw: 14 }} enterMs={1150} motion={{ dur: 5.4, offset: 1.6 }}>
            <PhoneApp />
          </Piece>
          <Piece at={{ x: 37.5, y: 23, w: 18.5, mx: 0, my: 25.5, mw: 25 }} enterMs={1350} motion={{ dur: 7.2, offset: 3.1, amp: -7 }}>
            <AssistantPanel />
          </Piece>
          <Piece at={{ x: 38.5, y: -0.5, w: 16.5 }} enterMs={1600} motion={{ dur: 6.1, offset: 4.4, amp: -5 }} className="hx-sm-hide">
            <SystemCard />
          </Piece>
          <Piece at={{ x: 16, y: 34, w: 14.5 }} enterMs={1800} motion={{ dur: 5.8, offset: 2.2, amp: -6 }} className="hx-sm-hide">
            <DataCard />
          </Piece>
        </div>
      </div>
    </div>
  );
}

/** Two thin elliptical orbits behind the product, with a few slow pulses riding them. */
function Orbits() {
  const outer = "M4 30 C 6 14, 26 4, 44 6 S 66 22, 60 36 S 30 50, 14 44 S 3 36, 4 30 Z";
  const inner = "M14 28 C 15 18, 28 12, 40 13 S 55 22, 51 31 S 32 40, 22 37 S 13 33, 14 28 Z";
  return (
    <svg className="hx-in-fade absolute inset-0 h-full w-full hx-sm-hide" style={enter(500)} viewBox="0 0 64 50" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="hx-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#6366F1" stopOpacity="0.4" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={outer} stroke="url(#hx-orbit)" strokeWidth="0.06" />
      <path d={inner} stroke="url(#hx-orbit)" strokeWidth="0.05" strokeDasharray="0.25 0.55" />
      {[
        { d: outer, dur: 26, begin: 0 },
        { d: outer, dur: 26, begin: 13 },
        { d: inner, dur: 19, begin: 4 },
      ].map((p, i) => (
        <circle key={i} r={0.22} fill={i === 2 ? "#F47B20" : "#6366F1"} className="eco-motion" visibility="hidden">
          <set attributeName="visibility" to="visible" begin={`${p.begin + 2}s`} />
          <animateMotion dur={`${p.dur}s`} begin={`${p.begin + 2}s`} repeatCount="indefinite" path={p.d} />
        </circle>
      ))}
      {[
        [5.2, 22],
        [61.6, 30],
        [30, 47.6],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={0.55} fill="#fff" stroke="#6366F1" strokeOpacity="0.35" strokeWidth="0.06" />
          <circle cx={cx} cy={cy} r={0.18} fill="#6366F1" fillOpacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

/** Short connections in the gaps between pieces; they breathe, and a light pulse travels each one. */
function Connectors() {
  const wires = [
    "M30.5 38.5 C 34 38.5, 34.5 39.4, 37.6 39.4", // data → assistant
    "M14 36.5 C 15 36.5, 15.2 37.4, 16.1 37.4", // phone → data
    "M46.8 6.2 C 46.8 7.4, 46.4 8.2, 46.4 9.4", // platform → app
  ];
  return (
    <svg className="hx-in-fade absolute inset-0 h-full w-full hx-sm-hide" style={enter(2000)} viewBox="0 0 64 50" preserveAspectRatio="none" fill="none">
      {wires.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="#6366F1" strokeWidth="0.08" strokeLinecap="round" className="hx-wire" style={{ animationDelay: `${-i * 2.3}s` }} />
          <circle r={0.16} fill="#6366F1" className="eco-motion" visibility="hidden">
            <set attributeName="visibility" to="visible" begin={`${2.4 + i * 0.9}s`} />
            <animateMotion dur="4.5s" begin={`${2.4 + i * 0.9}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.2 1" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
