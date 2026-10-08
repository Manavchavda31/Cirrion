import Image from "next/image";

/**
 * Hero artwork built in code (crisp at any size): a dotted world map with route arcs, the Cirrion mark on layered
 * glass tiles, and four floating cards. Coordinates share the map's viewBox (964 x 412, from public/hero/world.svg).
 * The map and arcs are decorative: they make no claim about where clients are.
 */
const VB = "-6 20 964 412";
const hubs = {
  newyork: [298.5, 134],
  saopaulo: [359, 332.7],
  london: [479.8, 101.3],
  nairobi: [578.1, 264],
  dubai: [623.1, 182.1],
  mumbai: [671.1, 201],
  singapore: [756.8, 255.8],
  tokyo: [829.7, 149.5],
  sydney: [861, 365],
} as const;
type Hub = keyof typeof hubs;

const arcs: { a: Hub; b: Hub; tone: "orange" | "blue"; lift: number }[] = [
  { a: "newyork", b: "london", tone: "blue", lift: 0.32 },
  { a: "london", b: "mumbai", tone: "orange", lift: 0.3 },
  { a: "mumbai", b: "sydney", tone: "blue", lift: 0.3 },
  { a: "dubai", b: "tokyo", tone: "orange", lift: 0.28 },
  { a: "saopaulo", b: "nairobi", tone: "orange", lift: 0.3 },
  { a: "singapore", b: "tokyo", tone: "blue", lift: 0.25 },
];

function arcPath(a: Hub, b: Hub, lift: number) {
  const [x1, y1] = hubs[a];
  const [x2, y2] = hubs[b];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * lift;
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
}

const cards = [
  {
    title: "Strategize",
    text: "Turn ideas into opportunities.",
    pos: "left-[2%] top-[0%] -rotate-2",
    icon: <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />,
  },
  {
    title: "Design",
    text: "User-centred experiences.",
    pos: "right-[0%] top-[4%] rotate-2",
    icon: <path d="m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Zm9-13 3 3" />,
  },
  {
    title: "Develop",
    text: "Scalable, robust solutions.",
    pos: "left-[0%] bottom-[2%] rotate-2",
    icon: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2.5-11-3 14" />,
  },
  {
    title: "Grow",
    text: "Real business impact.",
    pos: "right-[6%] bottom-[0%] -rotate-2",
    icon: <path d="M5 20V12m5 8V8m5 12v-6m5 6V4M3 20h18" />,
  },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[2/1] w-full max-w-[720px] md:aspect-[4/3] lg:max-w-none">
      {/* map */}
      <div className="absolute right-[-10%] left-[-2%] top-[0%] md:top-[10%] [mask-image:radial-gradient(70%_80%_at_52%_50%,black_62%,transparent_100%)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/world.svg" alt="" width={964} height={412} className="block h-auto w-full opacity-[0.8]" />
        <svg viewBox={VB} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
          {arcs.map((r, n) => (
            <path
              key={n}
              d={arcPath(r.a, r.b, r.lift)}
              pathLength={1}
              className="hero-arc"
              style={{ animationDelay: `${0.5 + n * 0.18}s` }}
              stroke={r.tone === "orange" ? "#F97316" : "#3E78B8"}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeOpacity={0.85}
            />
          ))}
          {Object.entries(hubs).map(([k, [x, y]], n) => (
            <circle key={`${k}-halo`} cx={x} cy={y} r={13} fill={n % 2 ? "#3E78B8" : "#F97316"} fillOpacity={0.16} className="hero-node" style={{ animationDelay: `${0.9 + n * 0.08}s` }} />
          ))}
          {Object.entries(hubs).map(([k, [x, y]], n) => (
            <circle key={k} cx={x} cy={y} r={5} fill={n % 2 ? "#3E78B8" : "#F97316"} stroke="#fff" strokeWidth={2} className="hero-node" style={{ animationDelay: `${0.9 + n * 0.08}s` }} />
          ))}
        </svg>
      </div>

      {/* orbit rings around the mark */}
      <div aria-hidden className="absolute top-[40%] left-[51.5%] hidden aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue/20 md:block" />
      <div aria-hidden className="absolute top-[40%] left-[51.5%] hidden aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue/20 md:block" />

      {/* layered glass tiles with the mark */}
      <div aria-hidden className="absolute top-[12%] left-[38%] aspect-square w-[24%] md:top-[22%] rotate-[10deg] rounded-[26px] border border-white/70 bg-blue/10 shadow-[0_24px_50px_-28px_rgb(62_120_184/0.6)] backdrop-blur-sm" />
      <div aria-hidden className="absolute top-[15%] left-[41%] aspect-square w-[24%] md:top-[25%] rotate-[3deg] rounded-[26px] border border-white/70 bg-white/45 backdrop-blur-sm" />
      <div className="absolute top-[13.5%] left-[39.5%] grid aspect-square w-[24%] md:top-[24%] -rotate-[8deg] place-items-center rounded-[26px] border border-white bg-white shadow-[0_30px_60px_-26px_rgb(11_22_34/0.4)]">
        <span aria-hidden className="absolute inset-[14%] rounded-full bg-orange/20 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(135deg,rgb(255_255_255/0.9),transparent_45%)]" />
        <Image src="/brand/mark.png" alt="" width={258} height={262} className="relative h-auto w-[62%]" priority />
      </div>

      {/* floating cards */}
      {cards.map((c) => (
        <div
          key={c.title}
          className={`group absolute hidden w-[31%] min-w-[176px] items-start gap-3 rounded-2xl border border-white/80 bg-white/75 p-3.5 shadow-[inset_0_1px_0_rgb(255_255_255),0_22px_50px_-26px_rgb(11_22_34/0.4)] ring-1 ring-navy/[0.03] backdrop-blur-md transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_28px_56px_-24px_rgb(11_22_34/0.45)] md:flex ${c.pos}`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange/12 text-orange-deep transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {c.icon}
            </svg>
          </span>
          <span>
            <span className="block text-[0.9375rem] leading-tight font-semibold text-navy">{c.title}</span>
            <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-2">{c.text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
