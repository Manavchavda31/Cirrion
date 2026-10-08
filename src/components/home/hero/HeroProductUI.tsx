/**
 * Product UI for the hero stage, drawn in HTML/CSS so it stays crisp, light and tiny. Sizes are in em: the stage
 * sets the em from its own width (see .hc-canvas), so every surface scales together. Purely illustrative (the
 * stage is aria-hidden); labels are generic and name no real or invented company.
 */
const INDIGO = "#6366F1";

const Icon = ({ d, className = "h-[0.9em] w-[0.9em]" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const icons = {
  spark: "M12 3c.4 3.9 2.6 6.1 6.5 6.5-3.9.4-6.1 2.6-6.5 6.5-.4-3.9-2.6-6.1-6.5-6.5C9.4 9.1 11.6 6.9 12 3Z",
  api: "m8 8-4 4 4 4m8-8 4 4-4 4",
  cloud: "M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.4 4.3 4.3 0 0 0 7 18Z",
  chart: "M4 19h16M7 15v-3m5 3V8m5 7v-5",
  phone: "M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3Zm3 15h2",
  shield: "M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  flow: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 15V9a3 3 0 0 1 3-3h7M18 9v6a3 3 0 0 1-3 3H8",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3 2-1-2-4-2 .5-1.5-1L15 4h-4l-.5 2.5L9 7.5 7 7l-2 4 2 1-.1 1.5L5 15l2 4 2-.5 1.5 1L11 22h4l.5-2.5 1.5-1 2 .5 2-4-2-1.5Z",
};

/* ───────── the central product: a web application with analytics and an AI assistant ───────── */
export function DashboardApp() {
  return (
    <div className="hx-card overflow-hidden !rounded-[1.25em]">
      {/* chrome */}
      <div className="flex h-[2.4em] items-center gap-[0.4em] border-b border-line bg-[#fbfbfd] px-[1em]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[0.58em] w-[0.58em] rounded-full bg-[#e3e5ea]" />
        ))}
        <span className="mx-auto flex h-[1.45em] w-[38%] items-center gap-[0.5em] rounded-[0.5em] bg-[#f1f2f6] px-[0.7em] text-fg-3">
          <svg viewBox="0 0 12 12" className="h-[0.62em] w-[0.62em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
            <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
          </svg>
          <span className="hx-sk w-[55%] !h-[0.36em] !bg-[#dfe2e9]" />
        </span>
        <span className="flex items-center gap-[0.35em] text-[0.55em] font-semibold text-[#067a54]">
          <span className="relative grid h-[0.9em] w-[0.9em] place-items-center">
            <span className="hx-ring absolute inset-0 rounded-full bg-[#12b886]/40" />
            <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#12b886]" />
          </span>
          Live
        </span>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hc-hide-sm w-[8.5em] shrink-0 border-r border-line bg-[#fbfbfd] p-[0.9em]">
          <span className="grid h-[1.6em] w-[1.6em] place-items-center rounded-[0.5em] bg-[linear-gradient(140deg,#6366F1,#8b8ff8)]">
            <span className="h-[0.5em] w-[0.5em] rounded-full bg-white" />
          </span>
          <ul className="mt-[1.3em] space-y-[0.25em]">
            {[
              ["Overview", icons.grid],
              ["Automations", icons.flow],
              ["Insights", icons.chart],
              ["Settings", icons.gear],
            ].map(([t, d], i) => (
              <li key={t} className={`flex items-center gap-[0.5em] rounded-[0.5em] px-[0.5em] py-[0.42em] text-[0.6em] ${i === 0 ? "bg-lavender font-semibold text-indigo-deep" : "text-fg-3"}`}>
                <Icon d={d!} className="h-[1.15em] w-[1.15em]" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* main */}
        <div className="min-w-0 flex-1 p-[1.2em]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.52em] font-medium tracking-[0.12em] text-fg-3 uppercase">Dashboard</p>
              <p className="font-display text-[1.1em] leading-tight font-bold tracking-[-0.02em]">Overview</p>
            </div>
            <div className="flex items-center gap-[0.5em]">
              <span className="rounded-[0.5em] border border-line px-[0.7em] py-[0.32em] text-[0.56em] text-fg-2">Last 30 days</span>
              <span className="flex -space-x-[0.4em]">
                {["#c7d2fe", "#bae6fd", "#ddd6fe"].map((c) => (
                  <span key={c} className="h-[1.45em] w-[1.45em] rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </span>
            </div>
          </div>

          <div className="mt-[0.9em] grid grid-cols-2 gap-[0.6em] md:grid-cols-4">
            <Kpi k="Active users" a="12,480" b="12,516" d="+18%" />
            <Kpi k="Revenue" a="$84.2k" b="$84.6k" d="+12%" />
            <Kpi k="Automations" a="1,208" b="1,214" d="today" className="hc-hide-sm" />
            <Kpi k="Uptime" a="99.9%" d="30d" className="hc-hide-sm" />
          </div>

          <div className="mt-[0.7em] grid gap-[0.7em] md:grid-cols-[1fr_15em]">
            <div className="rounded-[0.8em] border border-line p-[0.9em]">
              <div className="flex items-center justify-between">
                <p className="text-[0.6em] font-semibold">Weekly active users</p>
                <span className="flex items-center gap-[0.35em] text-[0.5em] text-fg-3">
                  <span className="h-[0.6em] w-[0.6em] rounded-full bg-indigo" /> This quarter
                </span>
              </div>
              <AreaChart />
              <ul className="hc-hide-sm mt-[0.7em] space-y-[0.4em] border-t border-line pt-[0.7em]">
                {[
                  { s: "Deployed", c: "bg-[#e7f8f1] text-[#067a54]", w: "38%" },
                  { s: "Synced", c: "bg-lavender text-indigo-deep", w: "30%" },
                ].map((r) => (
                  <li key={r.s} className="flex items-center gap-[0.6em]">
                    <span className="h-[1.2em] w-[1.2em] rounded-[0.4em] bg-bg-3" />
                    <span className="hx-sk" style={{ width: r.w }} />
                    <span className={`ml-auto rounded-full px-[0.6em] py-[0.1em] text-[0.48em] font-semibold ${r.c}`}>{r.s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <AssistantPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

/** KPI tile; when `b` is given the value cross-fades between two readings on a slow loop. */
function Kpi({ k, a, b, d, className = "" }: { k: string; a: string; b?: string; d: string; className?: string }) {
  return (
    <div className={`rounded-[0.8em] border border-line p-[0.75em] ${className}`}>
      <p className="text-[0.55em] text-fg-3">{k}</p>
      <div className="mt-[0.25em] flex items-baseline justify-between gap-[0.3em]">
        <span className="relative font-display text-[1.05em] font-bold tracking-[-0.02em]">
          <span className={b ? "hx-val-a" : undefined}>{a}</span>
          {b && <span className="hx-val-b absolute inset-0">{b}</span>}
        </span>
        <span className="rounded-full bg-[#e7f8f1] px-[0.5em] py-[0.1em] text-[0.48em] font-semibold text-[#067a54]">{d}</span>
      </div>
    </div>
  );
}

function AreaChart() {
  const line = "M0 52 C 18 50, 26 40, 44 41 S 72 30, 90 33 S 122 18, 140 20 S 170 10, 200 6";
  return (
    <svg viewBox="0 0 200 64" className="mt-[0.6em] h-[6.6em] w-full overflow-visible" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INDIGO} stopOpacity="0.26" />
          <stop offset="1" stopColor={INDIGO} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[16, 32, 48].map((y) => (
        <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#eef0f4" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L200 64 L0 64 Z`} fill="url(#hc-area)" className="hx-area" />
      <path d="M0 58 C 30 56, 50 50, 80 51 S 140 44, 200 40" stroke="#c7d0e0" strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
      <path d={line} stroke={INDIGO} strokeWidth="1.3" strokeLinecap="round" pathLength={1} className="hx-draw" />
    </svg>
  );
}

/** Assistant embedded in the dashboard: question, typing, grounded answer, on a 12 s loop. */
function AssistantPanel() {
  return (
    <div className="rounded-[0.8em] border border-line bg-[linear-gradient(180deg,#fbfaff,#ffffff)] p-[0.85em]">
      <div className="flex items-center gap-[0.5em]">
        <span className="grid h-[1.7em] w-[1.7em] place-items-center rounded-[0.55em] bg-[linear-gradient(140deg,#6366F1,#a5a8ff)] text-white">
          <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="currentColor">
            <path d={icons.spark} />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[0.7em] leading-tight font-bold">Assistant</p>
          <p className="text-[0.48em] text-fg-3">Grounded in your data</p>
        </div>
      </div>
      <div className="relative mt-[0.8em] h-[9.6em]">
        <div className="hx-q ml-auto w-[86%] rounded-[0.8em] rounded-br-[0.2em] bg-indigo-deep px-[0.7em] py-[0.5em] text-[0.56em] leading-snug text-white">
          Which regions grew fastest this month?
        </div>
        <div className="hx-typing absolute top-[3.1em] left-0 flex gap-[0.25em] rounded-[0.8em] bg-bg-3 px-[0.7em] py-[0.6em]">
          {[0, 1, 2].map((d) => (
            <span key={d} className="hx-dot h-[0.38em] w-[0.38em] rounded-full bg-fg-3" style={{ animationDelay: `${d * 0.15}s` }} />
          ))}
        </div>
        <div className="hx-a absolute top-[3.1em] left-0 w-full rounded-[0.8em] rounded-bl-[0.2em] border border-line bg-white px-[0.7em] py-[0.6em]">
          <p className="text-[0.56em] leading-snug text-fg">
            APAC grew <b className="text-indigo-deep">24%</b>, EU 15%.
          </p>
          <div className="mt-[0.5em] flex h-[2em] items-end gap-[0.3em]">
            {[0.95, 0.62, 0.45, 0.3].map((h, i) => (
              <span key={i} className="hx-bar flex-1 rounded-t-[0.25em]" style={{ height: `${h * 100}%`, background: i === 0 ? INDIGO : "#c9ccfb", animationDelay: `${i * 0.12}s` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="hc-hide-sm flex items-center gap-[0.5em] rounded-[0.7em] border border-line bg-white px-[0.7em] py-[0.4em]">
        <span className="flex-1 text-[0.52em] text-fg-3">Ask anything…</span>
        <span className="grid h-[1.4em] w-[1.4em] place-items-center rounded-full bg-indigo-deep text-[0.62em] text-white">↑</span>
      </div>
    </div>
  );
}

/* ───────── floating product cards ───────── */
function CardHead({ icon, title, tone = "indigo" }: { icon: string; title: string; tone?: "indigo" | "mint" }) {
  return (
    <div className="flex items-center gap-[0.55em]">
      <span className={`grid h-[1.75em] w-[1.75em] shrink-0 place-items-center rounded-[0.55em] ${tone === "mint" ? "bg-[#e7f8f1] text-[#067a54]" : "bg-lavender text-indigo-deep"}`}>
        <Icon d={icon} className="h-[1em] w-[1em]" />
      </span>
      <p className="text-[0.66em] font-semibold whitespace-nowrap text-fg">{title}</p>
    </div>
  );
}

const shell = "hx-card hc-lift px-[0.85em] py-[0.75em]";

export function AutomationCard() {
  return (
    <div className={shell}>
      <CardHead icon={icons.spark} title="AI Automation" />
      <div className="mt-[0.6em] flex items-center justify-between text-[0.52em] text-fg-3">
        <span>3 workflows running</span>
        <span className="font-semibold text-indigo-deep">72%</span>
      </div>
      <div className="mt-[0.3em] h-[0.32em] overflow-hidden rounded-full bg-indigo-soft">
        <div className="hc-progress h-full w-[72%] origin-left rounded-full bg-[linear-gradient(90deg,#4f54e5,#8b8ff8)]" />
      </div>
    </div>
  );
}

export function ApiCard() {
  return (
    <div className={shell}>
      <CardHead icon={icons.api} title="API Connected" tone="mint" />
      <div className="mt-[0.55em] flex items-center gap-[0.45em] rounded-[0.5em] bg-bg-3 px-[0.5em] py-[0.3em] text-[0.5em]">
        <span className="rounded-[0.3em] bg-indigo-soft px-[0.45em] font-semibold text-indigo-deep">POST</span>
        <span className="hx-sk flex-1 !h-[0.6em]" />
        <span className="font-semibold text-[#067a54]">200</span>
      </div>
    </div>
  );
}

export function UptimeCard() {
  const ticks = Array.from({ length: 18 }, (_, i) => (i === 11 ? 0.55 : 1));
  return (
    <div className={shell}>
      <div className="flex items-baseline justify-between gap-[0.6em]">
        <p className="font-display text-[1.1em] leading-none font-extrabold tracking-[-0.03em]">99.9%</p>
        <span className="flex items-center gap-[0.3em] text-[0.5em] font-medium text-[#067a54]">
          <span className="hx-blink h-[0.55em] w-[0.55em] rounded-full bg-[#12b886]" />
          Uptime
        </span>
      </div>
      <div className="mt-[0.55em] flex h-[1.1em] items-end gap-[0.14em]">
        {ticks.map((o, i) => (
          <span key={i} className="flex-1 rounded-[0.12em]" style={{ height: "100%", background: o < 1 ? "#c9ccfb" : "#12b886", opacity: o < 1 ? 1 : 0.75 }} />
        ))}
      </div>
    </div>
  );
}

export function AnalyticsCard() {
  return (
    <div className={shell}>
      <CardHead icon={icons.chart} title="Analytics" />
      <div className="mt-[0.5em] flex items-end justify-between gap-[0.6em]">
        <p className="font-display text-[1em] leading-none font-extrabold tracking-[-0.03em]">+24%</p>
        <svg viewBox="0 0 60 20" className="h-[1.4em] w-[4.6em]" fill="none">
          <path d="M1 18 C 10 16, 14 11, 22 12 S 36 6, 44 7 S 54 3, 59 2" stroke={INDIGO} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function MobileCard() {
  return (
    <div className={`${shell} flex items-center gap-[0.75em]`}>
      <div className="relative h-[4.2em] w-[2.3em] shrink-0 rounded-[0.55em] bg-[linear-gradient(150deg,#f6f7fa,#dfe2e9)] p-[0.16em] shadow-[inset_0_0_0_0.05em_rgb(17_19_24/0.1)]">
        <div className="h-full w-full overflow-hidden rounded-[0.42em] bg-white">
          <div className="mx-auto mt-[0.25em] h-[0.18em] w-[0.7em] rounded-full bg-[#1a1d24]" />
          <div className="mx-[0.2em] mt-[0.3em] h-[1.1em] rounded-[0.25em] bg-[linear-gradient(140deg,#5b5fef,#8b8ff8)]" />
          <div className="mx-[0.2em] mt-[0.2em] h-[0.3em] rounded-full bg-[#eceef3]" />
          <div className="mx-[0.2em] mt-[0.15em] h-[0.3em] w-[60%] rounded-full bg-[#eceef3]" />
        </div>
      </div>
      <div>
        <CardHead icon={icons.phone} title="Mobile" />
        <p className="mt-[0.4em] text-[0.5em] text-fg-3">iOS · Android · v2.4 live</p>
      </div>
    </div>
  );
}

export function CloudCard() {
  return (
    <div className={shell}>
      <CardHead icon={icons.cloud} title="Cloud" />
      <div className="mt-[0.55em] flex items-center gap-[0.35em]">
        {["eu", "us", "ap"].map((r, i) => (
          <span key={r} className="flex items-center gap-[0.3em] rounded-full border border-line bg-white px-[0.45em] py-[0.12em] text-[0.48em] font-semibold text-fg-2 uppercase">
            <span className="h-[0.5em] w-[0.5em] rounded-full" style={{ background: i === 1 ? "#F47B20" : INDIGO }} />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
