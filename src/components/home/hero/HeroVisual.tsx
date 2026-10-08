import { AnalyticsCard, ApiCard, AutomationCard, CloudCard, DashboardApp, MobileCard, UptimeCard } from "./HeroProductUI";

/**
 * The hero's product ecosystem, centred under the headline.
 *
 *   atmosphere  white centre with lavender, blue and an indigo focal glow, each breathing on its own period
 *   system      a few nodes and thin connections reaching out from the product          (parallax 6px)
 *   product     the web application with analytics and an embedded assistant          (parallax 9px)
 *   cards       six small product surfaces around it                                   (parallax 13px)
 *
 * Positions are em on a canvas that is 80em wide on desktop, 64em on tablets and 30em on phones; each piece
 * carries a position per arrangement and pieces that do not fit a size are hidden there. Decorative: the
 * stage is aria-hidden.
 */

type At = { x: number; y: number; w: number; tx?: number; ty?: number; tw?: number; mx?: number; my?: number; mw?: number };

const vars = (o: Record<string, string | number | undefined>) => o as React.CSSProperties;
const at = (p: At) => vars({ "--x": p.x, "--y": p.y, "--w": p.w, "--tx": p.tx, "--ty": p.ty, "--tw": p.tw, "--mx": p.mx, "--my": p.my, "--mw": p.mw });
const delay = (ms: number) => vars({ "--hx-d": `calc(var(--intro) + ${ms}ms)` });

const cards: { C: () => React.ReactElement; at: At; ms: number; dur: number; r: [number, number]; hide?: string }[] = [
  { C: AutomationCard, at: { x: 2, y: 6.5, w: 12.5, tx: 0, ty: 3, tw: 13.5, mx: 0, my: 34.5, mw: 15 }, ms: 700, dur: 5.5, r: [-1, 0.5] },
  { C: AnalyticsCard, at: { x: 1, y: 18.5, w: 12, tx: 0, ty: 28, tw: 12.5 }, ms: 780, dur: 6.2, r: [0.5, -1], hide: "hc-hide-sm" },
  { C: MobileCard, at: { x: 5, y: 28, w: 12.5 }, ms: 860, dur: 4.8, r: [1, -0.5], hide: "hc-hide-sm hc-hide-md" },
  { C: ApiCard, at: { x: 64, y: 4, w: 12.5 }, ms: 740, dur: 7, r: [1, -0.5], hide: "hc-hide-sm hc-hide-md" },
  { C: UptimeCard, at: { x: 67, y: 16.5, w: 11.5, tx: 52, ty: 2, tw: 12, mx: 17, my: 0, mw: 12.5 }, ms: 820, dur: 5.9, r: [-0.5, 1] },
  { C: CloudCard, at: { x: 63.5, y: 27.5, w: 12.5, tx: 51, ty: 31, tw: 12.5 }, ms: 900, dur: 6.6, r: [0.5, -1.2], hide: "hc-hide-sm" },
];

export function HeroVisual() {
  return (
    <div className="hc-stage relative select-none" aria-hidden>
      {/* atmosphere: wider than the stage, clipped by the hero */}
      <div className="hc-atmo pointer-events-none absolute -inset-x-[18%] -top-[24%] -bottom-[10%]">
        <div className="hx-par absolute inset-0" style={vars({ "--hx-depth": "3px" })}>
          <div className="hx-in-fade absolute inset-0" style={delay(250)}>
            <div className="hc-glow h-[95%] w-[85%] bg-[radial-gradient(closest-side,rgb(214_206_255/0.95),rgb(214_206_255/0)_100%)] blur-2xl" style={vars({ "--gx": "48%", "--gy": "52%", "--gd": "11s" })} />
            <div className="hc-glow h-[70%] w-[55%] bg-[radial-gradient(closest-side,rgb(140_182_255/1),rgb(140_182_255/0)_100%)] blur-2xl" style={vars({ "--gx": "64%", "--gy": "58%", "--gd": "9s", "--gdl": "-3s" })} />
            <div className="hc-glow h-[55%] w-[46%] bg-[radial-gradient(closest-side,rgb(99_102_241/0.95),rgb(99_102_241/0)_100%)] blur-3xl" style={vars({ "--gx": "46%", "--gy": "44%", "--gd": "12s", "--gdl": "-6s" })} />
            {/* white centre keeps the field light */}
            <div className="absolute top-[44%] left-1/2 h-[46%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),transparent)] blur-xl" />
          </div>
        </div>
      </div>

      <div className="hc-canvas">
        {/* system: nodes and thin connections behind the product */}
        <div className="hx-par absolute inset-0 hc-hide-sm hc-hide-md" style={vars({ "--hx-depth": "6px" })}>
          <System />
        </div>

        {/* the product */}
        <div className="hx-par absolute inset-0" style={vars({ "--hx-depth": "9px" })}>
          <div className="hc-el" style={at({ x: 14, y: 2, w: 52, tx: 4, ty: 7, tw: 56, mx: -1, my: 5, mw: 32 })}>
            {/* the product settles into the page: its base fades, the cards stay crisp */}
            <div className="hx-in-assemble [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)]" style={delay(480)}>
              <div className="hx-float" style={vars({ "--hx-dur": "6s", "--hx-amp": "-8px" })}>
                <DashboardApp />
              </div>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="hx-par absolute inset-0" style={vars({ "--hx-depth": "13px" })}>
          {cards.map(({ C, at: p, ms, dur, r, hide }, i) => (
            <div key={i} className={`hc-el ${hide ?? ""}`} style={at(p)}>
              <div className="hx-in-pop" style={delay(ms)}>
                <div className="hc-bob" style={vars({ "--hx-dur": `${dur}s`, "--hx-fd": `${-i * 1.3}s`, "--r0": `${r[0]}deg`, "--r1": `${r[1]}deg` })}>
                  <C />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Four quiet connections from the product edges to small system nodes, each with a slow light pulse. */
function System() {
  const links = [
    { d: "M15 16 C 9 16, 6 15.5, 0.8 15.5", n: [0.8, 15.5] },
    { d: "M14.5 25 C 10 25, 9 26.5, 4.5 26.5", n: [4.5, 26.5] },
    { d: "M65.5 10 C 71 10, 74 9.5, 79 9.5", n: [79, 9.5] },
    { d: "M65.5 24 C 71 24, 74 26.5, 78.5 26.5", n: [78.5, 26.5] },
  ] as const;
  const d = vars({ "--hx-d": "calc(var(--intro) + 1000ms)" });
  return (
    <svg className="hx-in-fade absolute inset-0 h-full w-full" style={d} viewBox="0 0 80 40" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="hc-wire" x1="0" x2="1">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {links.map((l, i) => (
        <g key={l.d}>
          <path d={l.d} stroke="url(#hc-wire)" strokeWidth="0.07" className="hx-wire" style={{ animationDelay: `${-i * 1.7}s` }} />
          <circle cx={l.n[0]} cy={l.n[1]} r="0.5" fill="#fff" stroke="#6366F1" strokeOpacity="0.35" strokeWidth="0.06" />
          <circle cx={l.n[0]} cy={l.n[1]} r="0.17" fill={i === 2 ? "#F47B20" : "#6366F1"} fillOpacity="0.75" />
          <circle r="0.14" fill="#6366F1" className="eco-motion" visibility="hidden">
            <set attributeName="visibility" to="visible" begin={`${2 + i * 1.1}s`} />
            <animateMotion dur="6s" begin={`${2 + i * 1.1}s`} repeatCount="indefinite" path={l.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.2 1" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
