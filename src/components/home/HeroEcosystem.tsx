/**
 * Hero artwork: one integrated product ecosystem, built in code so it stays crisp and light.
 * A web dashboard, a mobile app, an AI assistant, an API gateway and a growth card, joined by quiet flowing
 * connections. Everything sits on an 80em × 40em canvas whose em scales with the container (see .eco in
 * globals.css); mobile uses its own 46em-wide arrangement via the --m* variables.
 *
 * Motion is a single 12 s loop: pieces rise in once, then the chart draws, the assistant answers, packets travel
 * the connections and cards float slowly. All of it settles to a static frame under prefers-reduced-motion.
 * Purely decorative: the whole stage is aria-hidden and the UI copy is illustrative.
 */

type Pos = { x: number; y: number; w: number; mx?: number; my?: number; mw?: number };
const pos = (p: Pos, i: number) =>
  ({ "--x": p.x, "--y": p.y, "--w": p.w, "--mx": p.mx, "--my": p.my, "--mw": p.mw, "--i": i }) as React.CSSProperties;

const INDIGO = "#6366F1";

export function HeroEcosystem() {
  return (
    <div className="eco relative select-none" aria-hidden>
      <div className="eco-canvas [mask-image:linear-gradient(to_bottom,black_70%,transparent_99%)]">
        {/* atmosphere */}
        <div className="eco-glow absolute top-[8%] left-[18%] h-[70%] w-[64%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(99_102_241/0.16),rgb(124_138_255/0.07)_55%,transparent)] blur-2xl" />
        <div className="eco-glow absolute top-[30%] left-[52%] h-[60%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(110_170_255/0.16),transparent)] blur-2xl [animation-delay:-6s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(17_19_24/0.07)_1px,transparent_1.2px)] [background-size:1.6em_1.6em] [mask-image:radial-gradient(60%_70%_at_50%_45%,black,transparent)]" />

        <Connections />

        {/* growth card (top left) */}
        <div className="eco-el eco-in eco-sm-hide" style={pos({ x: 0.5, y: 1.5, w: 14 }, 3)}>
          <div className="eco-float [animation-delay:-3s]">
            <GrowthCard />
          </div>
        </div>

        {/* main web product */}
        <div className="eco-el eco-in" style={pos({ x: 16, y: 2, w: 46, mx: 0, my: 1, mw: 46 }, 0)}>
          <BrowserApp />
        </div>

        {/* mobile app */}
        <div className="eco-el eco-in" style={pos({ x: 5.5, y: 9.5, w: 14.5, mx: 29.5, my: 13, mw: 16 }, 1)}>
          <div className="eco-float [animation-delay:-1.5s]">
            <PhoneApp />
          </div>
        </div>

        {/* AI assistant */}
        <div className="eco-el eco-in" style={pos({ x: 57.5, y: 4.5, w: 21, mx: 0, my: 29, mw: 28 }, 2)}>
          <div className="eco-float-sm [animation-delay:-7s]">
            <AssistantPanel />
          </div>
        </div>

        {/* API gateway */}
        <div className="eco-el eco-in eco-sm-hide" style={pos({ x: 61, y: 25.5, w: 17.5 }, 4)}>
          <div className="eco-float [animation-delay:-9s]">
            <ApiCard />
          </div>
        </div>

        {/* system nodes */}
        <Node style={pos({ x: 66.5, y: 0, w: 3 }, 5)} label="Auth" icon={<path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />} />
        <Node style={pos({ x: 22.5, y: 33.8, w: 3 }, 6)} label="DB" icon={<path d="M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />} />
        <Node style={pos({ x: 50.5, y: 34, w: 3 }, 7)} label="Cloud" orange icon={<path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.4 4.3 4.3 0 0 0 7 18Z" />} />
      </div>
    </div>
  );
}

/* ───────── connections: thin flowing lines with travelling packets (desktop arrangement) ───────── */
const paths = [
  "M14.5 9.5 C 16 9.5, 16 12, 18 12.5", // growth → browser
  "M13 20 C 15 20, 15 21, 16.4 21", // phone → browser
  "M62 13 C 60 13, 59.5 12, 57.8 12", // browser → assistant
  "M68 22 C 68 24, 69 24.5, 69 25.8", // assistant → api
  "M61.2 31 C 57 31, 55 33, 53.4 35.2", // api → cloud
  "M69.5 1.5 C 72 1.5, 72 3, 72 4.6", // auth → assistant
  "M25.6 35.2 C 27 35.2, 27.6 34.6, 28.4 33.2", // db → browser
  "M50.5 35.5 C 46 35.5, 40 34, 34 33.5", // cloud → browser base
];

function Connections() {
  return (
    <svg className="absolute inset-0 h-full w-full eco-sm-hide" viewBox="0 0 80 40" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id="eco-line" x1="0" x2="1">
          <stop offset="0" stopColor={INDIGO} stopOpacity="0.15" />
          <stop offset="0.5" stopColor={INDIGO} stopOpacity="0.55" />
          <stop offset="1" stopColor={INDIGO} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="url(#eco-line)" strokeWidth={0.07} className="eco-path" style={{ animationDelay: `${-i * 1.3}s` }} />
          <circle r={0.16} fill={i === 4 ? "#F47B20" : INDIGO} className="eco-motion" visibility="hidden">
            <set attributeName="visibility" to="visible" begin={`${i * 0.7}s`} />
            <animateMotion dur={`${5 + (i % 3)}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.2 1" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function Node({ style, label, icon, orange }: { style: React.CSSProperties; label: string; icon: React.ReactNode; orange?: boolean }) {
  return (
    <div className="eco-el eco-in eco-sm-hide" style={style}>
      <div className="relative grid aspect-square w-full place-items-center rounded-full border border-line bg-white shadow-[0_0.6em_1.4em_-0.6em_rgb(30_34_80/0.3)]">
        <span className={`eco-pulse absolute inset-0 rounded-full ${orange ? "bg-orange/25" : "bg-indigo/20"}`} />
        <svg viewBox="0 0 24 24" className="relative h-[1.3em] w-[1.3em]" fill="none" stroke={orange ? "#D9650F" : INDIGO} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <p className="mt-[0.35em] text-center text-[0.55em] font-semibold tracking-[0.12em] text-fg-3 uppercase">{label}</p>
    </div>
  );
}

/* ───────── browser: the main web product ───────── */
function BrowserApp() {
  return (
    <div className="eco-card overflow-hidden !rounded-[1.2em]" style={{ height: "31em" }}>
      {/* chrome */}
      <div className="flex h-[2.5em] items-center gap-[0.4em] border-b border-line bg-[#fbfbfd] px-[1em]">
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#e3e5ea]" />
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#e3e5ea]" />
        <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#e3e5ea]" />
        <span className="mx-auto flex h-[1.5em] w-[16em] items-center justify-center gap-[0.4em] rounded-[0.5em] bg-[#f1f2f6] text-[0.62em] text-fg-3">
          <svg viewBox="0 0 12 12" className="h-[1em] w-[1em]" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
          </svg>
          app.northwind.io
        </span>
        <span className="w-[2em]" />
      </div>
      <div className="flex h-[calc(100%-2.5em)]">
        {/* sidebar */}
        <div className="w-[9.5em] shrink-0 border-r border-line bg-[#fbfbfd] p-[0.9em]">
          <div className="flex items-center gap-[0.5em]">
            <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-[0.45em] bg-[linear-gradient(140deg,#6366F1,#8b8ff8)]">
              <span className="h-[0.5em] w-[0.5em] rounded-full bg-white" />
            </span>
            <span className="font-display text-[0.75em] font-bold tracking-tight">Northwind</span>
          </div>
          <ul className="mt-[1.2em] space-y-[0.25em]">
            {["Overview", "Customers", "Orders", "Insights", "Settings"].map((t, i) => (
              <li key={t} className={`flex items-center gap-[0.55em] rounded-[0.5em] px-[0.55em] py-[0.42em] text-[0.62em] ${i === 0 ? "bg-lavender font-semibold text-indigo-deep" : "text-fg-3"}`}>
                <span className={`h-[0.95em] w-[0.95em] rounded-[0.3em] ${i === 0 ? "bg-indigo" : "bg-[#e3e5ea]"}`} />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-[1.6em] rounded-[0.7em] bg-[linear-gradient(150deg,#f3f1ff,#eaf2ff)] p-[0.7em]">
            <p className="text-[0.55em] font-semibold text-indigo-deep">AI insights</p>
            <span className="eco-line mt-[0.5em] w-[85%] !bg-white" />
            <span className="eco-line mt-[0.35em] w-[60%] !bg-white" />
          </div>
        </div>

        {/* main */}
        <div className="min-w-0 flex-1 p-[1.3em]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.55em] font-medium tracking-[0.12em] text-fg-3 uppercase">Dashboard</p>
              <p className="font-display text-[1.15em] leading-tight font-bold tracking-[-0.02em]">Overview</p>
            </div>
            <div className="flex items-center gap-[0.5em]">
              <span className="rounded-[0.5em] border border-line px-[0.7em] py-[0.35em] text-[0.58em] text-fg-2">Last 30 days</span>
              <span className="flex -space-x-[0.4em]">
                {["#c7d2fe", "#bae6fd", "#fde4cf"].map((c) => (
                  <span key={c} className="h-[1.5em] w-[1.5em] rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </span>
            </div>
          </div>

          <div className="mt-[1em] grid grid-cols-3 gap-[0.7em]">
            {[
              { k: "Active users", v: "12,480", d: "+18%" },
              { k: "Revenue", v: "$84.2k", d: "+12%" },
              { k: "Uptime", v: "99.98%", d: "30d" },
            ].map((m) => (
              <div key={m.k} className="rounded-[0.8em] border border-line p-[0.8em]">
                <p className="text-[0.58em] text-fg-3">{m.k}</p>
                <div className="mt-[0.3em] flex items-baseline justify-between">
                  <span className="font-display text-[1.15em] font-bold tracking-[-0.02em]">{m.v}</span>
                  <span className="rounded-full bg-[#e7f8f1] px-[0.5em] py-[0.1em] text-[0.52em] font-semibold text-[#0e9f6e]">{m.d}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[0.8em] grid grid-cols-[1fr_11em] gap-[0.7em]">
            <div className="rounded-[0.8em] border border-line p-[0.9em]">
              <div className="flex items-center justify-between">
                <p className="text-[0.62em] font-semibold">Weekly active users</p>
                <span className="flex items-center gap-[0.35em] text-[0.52em] text-fg-3">
                  <span className="h-[0.6em] w-[0.6em] rounded-full bg-indigo" /> This quarter
                </span>
              </div>
              <AreaChart />
            </div>
            <div className="rounded-[0.8em] border border-line p-[0.9em]">
              <p className="text-[0.62em] font-semibold">Conversion</p>
              <Donut />
              <div className="mt-[0.5em] space-y-[0.3em]">
                <span className="eco-line w-full" />
                <span className="eco-line w-[70%]" />
              </div>
            </div>
          </div>

          <div className="mt-[0.8em] space-y-[0.45em] rounded-[0.8em] border border-line p-[0.8em]">
            {[0, 1].map((r) => (
              <div key={r} className="flex items-center gap-[0.7em]">
                <span className="h-[1.3em] w-[1.3em] rounded-full" style={{ background: r ? "#bae6fd" : "#c7d2fe" }} />
                <span className="eco-line w-[22%]" />
                <span className="eco-line ml-auto w-[12%]" />
                <span className="rounded-full bg-lavender px-[0.55em] py-[0.1em] text-[0.5em] font-semibold text-indigo-deep">{r ? "Paid" : "New"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AreaChart() {
  const line = "M0 52 C 18 50, 26 40, 44 41 S 72 30, 90 33 S 122 18, 140 20 S 170 10, 200 6";
  return (
    <svg viewBox="0 0 200 64" className="mt-[0.6em] h-[7.4em] w-full overflow-visible" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="eco-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INDIGO} stopOpacity="0.28" />
          <stop offset="1" stopColor={INDIGO} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#eef0f4" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L200 64 L0 64 Z`} fill="url(#eco-area)" className="eco-area" />
      <path d="M0 58 C 30 56, 50 50, 80 51 S 140 44, 200 40" stroke="#c7d0e0" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <path d={line} stroke={INDIGO} strokeWidth="1.3" strokeLinecap="round" pathLength={1} className="eco-draw" />
    </svg>
  );
}

function Donut() {
  const c = 2 * Math.PI * 15;
  return (
    <svg viewBox="0 0 40 40" className="mx-auto mt-[0.5em] h-[5.2em] w-[5.2em] -rotate-90">
      <circle cx="20" cy="20" r="15" fill="none" stroke="#eef0f6" strokeWidth="5" />
      <circle cx="20" cy="20" r="15" fill="none" stroke={INDIGO} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${c * 0.68} ${c}`} />
      <circle cx="20" cy="20" r="15" fill="none" stroke="#F47B20" strokeWidth="5" strokeLinecap="round" strokeDasharray={`0.1 ${c}`} strokeDashoffset={-c * 0.7} />
      <text x="20" y="22.5" textAnchor="middle" className="rotate-90 font-display" style={{ transformOrigin: "20px 20px", fontSize: 8, fontWeight: 800, fill: "#111318" }}>
        68%
      </text>
    </svg>
  );
}

/* ───────── phone: the mobile app ───────── */
function PhoneApp() {
  return (
    <div className="rounded-[2.4em] bg-[#14161c] p-[0.45em] shadow-[0_2.4em_4em_-1.6em_rgb(30_34_80/0.45),inset_0_0_0_0.08em_rgb(255_255_255/0.08)]">
      <div className="relative overflow-hidden rounded-[2em] bg-[#fbfbfd]" style={{ height: "29.5em" }}>
        <div className="flex items-center justify-between px-[1.3em] pt-[0.8em] text-[0.55em] font-semibold">
          <span>9:41</span>
          <span className="h-[1.3em] w-[5.5em] rounded-full bg-[#14161c]" />
          <span className="flex gap-[0.25em]">
            <span className="h-[0.7em] w-[0.9em] rounded-[0.15em] bg-fg" />
          </span>
        </div>
        <div className="px-[1em] pt-[1em]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.55em] text-fg-3">Good morning, Ana</p>
              <p className="font-display text-[1.05em] font-bold tracking-[-0.02em]">Your week</p>
            </div>
            <span className="relative grid h-[1.9em] w-[1.9em] place-items-center rounded-full bg-white shadow-[0_0_0_1px_#e6e8ed]">
              <svg viewBox="0 0 24 24" className="h-[0.95em] w-[0.95em]" fill="none" stroke="#111318" strokeWidth="1.8">
                <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Zm4 4h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute top-[0.3em] right-[0.35em] h-[0.45em] w-[0.45em] rounded-full bg-orange ring-2 ring-white" />
            </span>
          </div>

          <div className="mt-[0.9em] rounded-[1.1em] bg-[linear-gradient(140deg,#5b5fef,#8b8ff8)] p-[0.9em] text-white shadow-[0_1em_2em_-1em_rgb(99_102_241/0.7)]">
            <p className="text-[0.5em] font-medium tracking-[0.12em] uppercase opacity-80">Next up</p>
            <p className="mt-[0.2em] font-display text-[0.85em] font-bold">Design review</p>
            <p className="text-[0.55em] opacity-85">Today · 10:30 – 11:15</p>
            <div className="mt-[0.7em] h-[0.35em] rounded-full bg-white/25">
              <div className="h-full w-[64%] rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-[0.7em] grid grid-cols-2 gap-[0.55em]">
            <div className="rounded-[0.9em] bg-white p-[0.7em] shadow-[0_0_0_1px_#eceef3]">
              <p className="text-[0.5em] text-fg-3">Tasks</p>
              <p className="font-display text-[0.9em] font-bold">12/16</p>
              <div className="mt-[0.35em] flex gap-[0.15em]">
                {[1, 1, 1, 0.4].map((o, i) => (
                  <span key={i} className="h-[0.3em] flex-1 rounded-full bg-indigo" style={{ opacity: o }} />
                ))}
              </div>
            </div>
            <div className="rounded-[0.9em] bg-white p-[0.7em] shadow-[0_0_0_1px_#eceef3]">
              <p className="text-[0.5em] text-fg-3">Focus</p>
              <p className="font-display text-[0.9em] font-bold">4h 20m</p>
              <svg viewBox="0 0 60 14" className="mt-[0.2em] h-[0.9em] w-full" fill="none">
                <path d="M1 12 C 10 11, 14 6, 22 7 S 36 3, 44 4 S 54 2, 59 1" stroke="#18A9C4" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p className="mt-[0.9em] text-[0.55em] font-semibold">Recent</p>
          <ul className="mt-[0.4em] space-y-[0.45em]">
            {["#E8E9FF", "#EAF2FF", "#F3F1FF"].map((c, i) => (
              <li key={c} className="flex items-center gap-[0.6em] rounded-[0.8em] bg-white p-[0.55em] shadow-[0_0_0_1px_#eceef3]">
                <span className="h-[1.6em] w-[1.6em] rounded-[0.5em]" style={{ background: c }} />
                <span className="flex-1 space-y-[0.25em]">
                  <span className="eco-line w-[70%]" />
                  <span className="eco-line w-[45%] !h-[0.32em]" />
                </span>
                <span className="text-[0.5em] text-fg-3">{["09:00", "Mon", "Tue"][i]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-white/90 px-[1em] pt-[0.6em] pb-[0.9em]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-[1em] w-[1em] rounded-[0.35em] ${i === 0 ? "bg-indigo" : "bg-[#e3e5ea]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── AI assistant ───────── */
function AssistantPanel() {
  return (
    <div className="eco-card eco-glass overflow-hidden p-[1em]">
      <div className="flex items-center gap-[0.6em]">
        <span className="grid h-[1.9em] w-[1.9em] place-items-center rounded-[0.6em] bg-[linear-gradient(140deg,#6366F1,#a5a8ff)] text-white">
          <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em]" fill="currentColor">
            <path d="M12 2.5c.4 3.9 2.6 6.1 6.5 6.5-3.9.4-6.1 2.6-6.5 6.5-.4-3.9-2.6-6.1-6.5-6.5 3.9-.4 6.1-2.6 6.5-6.5Zm6 11c.2 1.9 1.1 2.8 3 3-1.9.2-2.8 1.1-3 3-.2-1.9-1.1-2.8-3-3 1.9-.2 2.8-1.1 3-3Z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[0.78em] leading-tight font-bold">Product assistant</p>
          <p className="text-[0.52em] text-fg-3">Answers from your data</p>
        </div>
        <span className="rounded-full bg-[#e7f8f1] px-[0.6em] py-[0.15em] text-[0.5em] font-semibold text-[#0e9f6e]">Grounded</span>
      </div>

      <div className="relative mt-[0.9em] h-[12.6em]">
        <div className="eco-q ml-auto w-[80%] rounded-[0.9em] rounded-br-[0.25em] bg-indigo px-[0.8em] py-[0.6em] text-[0.62em] leading-snug text-white">
          Which regions grew fastest this month?
        </div>
        <div className="eco-typing absolute top-[3.6em] left-0 flex gap-[0.25em] rounded-[0.9em] bg-bg-3 px-[0.8em] py-[0.7em]">
          {[0, 1, 2].map((d) => (
            <span key={d} className="eco-dot h-[0.4em] w-[0.4em] rounded-full bg-fg-3" style={{ animationDelay: `${d * 0.15}s` }} />
          ))}
        </div>
        <div className="eco-a absolute top-[3.6em] left-0 w-[92%] rounded-[0.9em] rounded-bl-[0.25em] border border-line bg-white px-[0.8em] py-[0.7em]">
          <p className="text-[0.62em] leading-snug text-fg">
            APAC grew <b className="text-indigo-deep">24%</b>, led by new SaaS accounts. EU followed at 15%.
          </p>
          <div className="mt-[0.55em] flex h-[2.4em] items-end gap-[0.35em]">
            {[0.95, 0.62, 0.45, 0.3].map((h, i) => (
              <span key={i} className="eco-bar flex-1 rounded-t-[0.25em]" style={{ height: `${h * 100}%`, background: i === 0 ? INDIGO : "#c9ccfb", animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
          <div className="mt-[0.55em] flex flex-wrap gap-[0.3em]">
            {["orders.sql", "Q3 report"].map((s) => (
              <span key={s} className="rounded-full bg-bg-3 px-[0.6em] py-[0.15em] text-[0.48em] text-fg-2">
                ↳ {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[0.4em] flex items-center gap-[0.5em] rounded-[0.8em] border border-line bg-white px-[0.8em] py-[0.45em]">
        <span className="flex-1 text-[0.58em] text-fg-3">Ask anything…</span>
        <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full bg-indigo text-[0.7em] text-white">↑</span>
      </div>
    </div>
  );
}

/* ───────── API gateway ───────── */
function ApiCard() {
  const rows = [
    { m: "POST", p: "/v1/orders", t: "42ms" },
    { m: "GET", p: "/v1/accounts", t: "18ms" },
    { m: "POST", p: "/v1/ai/answer", t: "310ms" },
  ];
  return (
    <div className="eco-card p-[0.9em]">
      <div className="flex items-center justify-between">
        <p className="font-display text-[0.75em] font-bold">API gateway</p>
        <span className="flex items-center gap-[0.35em] text-[0.52em] font-medium text-[#0e9f6e]">
          <span className="eco-blink h-[0.55em] w-[0.55em] rounded-full bg-[#12b886]" />
          Operational
        </span>
      </div>
      <ul className="mt-[0.6em] space-y-[0.35em]">
        {rows.map((r) => (
          <li key={r.p} className="flex items-center gap-[0.5em] rounded-[0.55em] bg-bg-3 px-[0.55em] py-[0.35em] text-[0.55em]">
            <span className={`w-[3.4em] rounded-[0.35em] py-[0.05em] text-center font-semibold ${r.m === "GET" ? "bg-sky text-[#2563eb]" : "bg-indigo-soft text-indigo-deep"}`}>{r.m}</span>
            <span className="flex-1 truncate text-fg-2">{r.p}</span>
            <span className="text-fg-3">200 · {r.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── growth card ───────── */
function GrowthCard() {
  const bars = [0.32, 0.4, 0.38, 0.52, 0.6, 0.74, 0.92];
  return (
    <div className="eco-card p-[1em]">
      <p className="text-[0.58em] text-fg-3">Activation rate</p>
      <div className="mt-[0.2em] flex items-center gap-[0.5em]">
        <span className="font-display text-[1.6em] leading-none font-extrabold tracking-[-0.03em]">+38%</span>
        <span className="rounded-full bg-[#e7f8f1] px-[0.5em] py-[0.1em] text-[0.5em] font-semibold text-[#0e9f6e]">↑ Q3</span>
      </div>
      <div className="mt-[0.8em] flex h-[3.6em] items-end gap-[0.3em]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="eco-bar flex-1 rounded-t-[0.3em]"
            style={{ height: `${h * 100}%`, background: i === bars.length - 1 ? "linear-gradient(#6366F1,#8b8ff8)" : "#e3e5fb", animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    </div>
  );
}
