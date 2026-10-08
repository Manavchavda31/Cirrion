/**
 * Primitives for the code-built product scenes (service cards, industry visuals, article covers).
 * Everything is plain SVG in an 800 × 500 (16:10) space so scenes stay crisp at any size and cost nothing to load.
 * Shared filters and gradients live once in <SvgDefs /> (rendered by the root layout).
 */
export const C = {
  ink: "#111318",
  fg2: "#4A5263",
  fg3: "#667085",
  indigo: "#6366F1",
  indigoDeep: "#4F54E5",
  soft: "#E8E9FF",
  sky: "#EAF2FF",
  lav: "#F3F1FF",
  line: "#E6E8ED",
  sk: "#ECEEF3",
  bg3: "#F4F6FA",
  orange: "#F47B20",
  cyan: "#18A9C4",
  mint: "#12B886",
  white: "#FFFFFF",
} as const;

/** Rendered once in the layout: filters and gradients referenced by every scene. */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden focusable="false" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <filter id="ui-sh" x="-30%" y="-30%" width="160%" height="180%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#111318" floodOpacity="0.05" />
          <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#1E2250" floodOpacity="0.13" />
        </filter>
        <filter id="ui-sh-sm" x="-30%" y="-30%" width="160%" height="180%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#111318" floodOpacity="0.05" />
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1E2250" floodOpacity="0.1" />
        </filter>
        <filter id="ui-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <linearGradient id="g-indigo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B5FEF" />
          <stop offset="1" stopColor="#8B8FF8" />
        </linearGradient>
        <linearGradient id="g-indigo-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0.28" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-cyan-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#18A9C4" stopOpacity="0.25" />
          <stop offset="1" stopColor="#18A9C4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="g-sky-glass" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#DCE8FF" />
          <stop offset="0.55" stopColor="#EEF3FF" />
          <stop offset="1" stopColor="#C9D8F7" />
        </linearGradient>
        <linearGradient id="g-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CC8F2" />
          <stop offset="1" stopColor="#3D9BDB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Box = { x: number; y: number; w: number; h: number };

export function Frame({ children, label, className }: { children: React.ReactNode; label?: string; className?: string }) {
  return (
    <svg viewBox="0 0 800 500" className={className ?? "ui-svg h-full w-full"} preserveAspectRatio="xMidYMid slice" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {children}
    </svg>
  );
}

/** Gradient backdrop with two soft glows and a faint dot field. */
export function Backdrop({ from, to, glow = C.indigo, glow2 = "#7CB4FF", dots = true }: { from: string; to: string; glow?: string; glow2?: string; dots?: boolean }) {
  const id = `bd-${from.slice(1)}-${to.slice(1)}`;
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <pattern id="dotgrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#111318" fillOpacity="0.06" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={`url(#${id})`} />
      <circle cx="610" cy="120" r="170" fill={glow} opacity="0.1" filter="url(#ui-blur)" />
      <circle cx="170" cy="420" r="150" fill={glow2} opacity="0.12" filter="url(#ui-blur)" />
      {dots && <rect width="800" height="500" fill="url(#dotgrid)" />}
    </>
  );
}

export function Card({ x, y, w, h, r = 16, fill = C.white, shadow = "md", stroke = true }: Box & { r?: number; fill?: string; shadow?: "md" | "sm" | "none"; stroke?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke={stroke ? C.line : "none"}
      strokeOpacity={0.9}
      filter={shadow === "none" ? undefined : shadow === "sm" ? "url(#ui-sh-sm)" : "url(#ui-sh)"}
    />
  );
}

/** Skeleton text line. */
export function L({ x, y, w, h = 8, fill = C.sk }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

export function T({
  x,
  y,
  s = 16,
  w = 600,
  fill = C.ink,
  anchor,
  display,
  ls,
  children,
}: {
  x: number;
  y: number;
  s?: number;
  w?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  display?: boolean;
  ls?: number;
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} fontSize={s} fontWeight={w} fill={fill} textAnchor={anchor} className={display ? "t-display" : undefined} letterSpacing={ls}>
      {children}
    </text>
  );
}

export function Pill({ x, y, w, h = 22, fill = C.soft, text, color = C.indigoDeep, s = 11 }: { x: number; y: number; w: number; h?: number; fill?: string; text?: string; color?: string; s?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
      {text && (
        <text x={x + w / 2} y={y + h / 2 + s * 0.36} fontSize={s} fontWeight={600} fill={color} textAnchor="middle">
          {text}
        </text>
      )}
    </g>
  );
}

/** 24-unit line icon placed at x,y and scaled to size. */
export function Ico({ d, x, y, size = 20, color = C.indigo, sw = 1.8, fill = "none" }: { d: string; x: number; y: number; size?: number; color?: string; sw?: number; fill?: string }) {
  const k = size / 24;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={d} fill={fill} stroke={fill === "none" ? color : "none"} strokeWidth={sw / k} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function IconTile({ x, y, size = 36, d, color = C.indigo, fill = C.lav, r = 10 }: { x: number; y: number; size?: number; d: string; color?: string; fill?: string; r?: number }) {
  const inner = size * 0.55;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={r} fill={fill} />
      <Ico d={d} x={x + (size - inner) / 2} y={y + (size - inner) / 2} size={inner} color={color} />
    </g>
  );
}

export function Avatar({ cx, cy, r = 14, fill = "#C7D2FE", ring = true }: { cx: number; cy: number; r?: number; fill?: string; ring?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={ring ? "#fff" : "none"} strokeWidth={ring ? 3 : 0} />
      <circle cx={cx} cy={cy - r * 0.18} r={r * 0.34} fill="#fff" fillOpacity="0.75" />
      <path d={`M${cx - r * 0.55} ${cy + r * 0.62} a${r * 0.55} ${r * 0.5} 0 0 1 ${r * 1.1} 0`} fill="#fff" fillOpacity="0.75" />
    </g>
  );
}

/** Smooth sparkline through evenly spaced values (0..1, 1 = top). */
export function sparkPath(vals: number[], { x, y, w, h }: Box) {
  const pts = vals.map((v, i) => [x + (w * i) / (vals.length - 1), y + h - v * h] as const);
  let d = `M${pts[0]![0]} ${pts[0]![1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!;
    const [x1, y1] = pts[i]!;
    const cx = (x0 + x1) / 2;
    d += ` C${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

export function Area({ vals, box, color = C.indigo, fillId = "g-indigo-v", sw = 3 }: { vals: number[]; box: Box; color?: string; fillId?: string; sw?: number }) {
  const d = sparkPath(vals, box);
  return (
    <g>
      <path d={`${d} L${box.x + box.w} ${box.y + box.h} L${box.x} ${box.y + box.h} Z`} fill={`url(#${fillId})`} />
      <path d={d} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </g>
  );
}

export function Bars({ vals, box, color = C.indigo, muted = "#DDE0FB", highlight = -1, gap = 0.35, r = 4 }: { vals: number[]; box: Box; color?: string; muted?: string; highlight?: number; gap?: number; r?: number }) {
  const bw = box.w / vals.length;
  return (
    <g>
      {vals.map((v, i) => {
        const h = v * box.h;
        const on = highlight === -1 ? i === vals.length - 1 : i === highlight;
        return <rect key={i} x={box.x + i * bw + (bw * gap) / 2} y={box.y + box.h - h} width={bw * (1 - gap)} height={h} rx={r} fill={on ? color : muted} />;
      })}
    </g>
  );
}

export function Ring({ cx, cy, r, v, sw = 10, color = C.indigo, track = "#EEF0F6", label }: { cx: number; cy: number; r: number; v: number; sw?: number; color?: string; track?: string; label?: string }) {
  const c = 2 * Math.PI * r;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={track} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${c * v} ${c}`} transform={`rotate(-90 ${cx} ${cy})`} />
      {label && (
        <text x={cx} y={cy + r * 0.2} fontSize={r * 0.55} fontWeight={800} fill={C.ink} textAnchor="middle" className="t-display">
          {label}
        </text>
      )}
    </g>
  );
}

/** Browser window with chrome; returns the content box origin via children coordinates (content starts at y + 34). */
export function Browser({ x, y, w, h, url, children, r = 16 }: Box & { url?: string; children?: React.ReactNode; r?: number }) {
  const id = `clip-b-${x}-${y}-${w}-${h}`;
  return (
    <g>
      <Card x={x} y={y} w={w} h={h} r={r} />
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} rx={r} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y} width={w} height={34} fill="#FBFBFD" />
        <line x1={x} x2={x + w} y1={y + 34} y2={y + 34} stroke={C.line} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={x + 18 + i * 14} cy={y + 17} r={4.5} fill="#E3E5EA" />
        ))}
        {url && (
          <g>
            <rect x={x + w / 2 - 90} y={y + 8} width={180} height={18} rx={6} fill="#F1F2F6" />
            <text x={x + w / 2} y={y + 21} fontSize={10} fill={C.fg3} textAnchor="middle">
              {url}
            </text>
          </g>
        )}
        {children}
      </g>
    </g>
  );
}

/** Phone with dark bezel; content area is (x+7, y+7, w-14, h-14) and is clipped. */
export function Phone({ x, y, w, h, children, screen = "#FBFBFD" }: Box & { children?: React.ReactNode; screen?: string }) {
  const id = `clip-p-${x}-${y}-${w}-${h}`;
  const r = w * 0.17;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#16181E" filter="url(#ui-sh)" />
      <clipPath id={id}>
        <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx={r - 6} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} fill={screen} />
        {children}
      </g>
      <rect x={x + w / 2 - w * 0.17} y={y + 15} width={w * 0.34} height={13} rx={6.5} fill="#16181E" />
    </g>
  );
}

export const icons = {
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4m8-4v4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  check: "m5 12 4 4 10-10",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  arrowUp: "M12 19V5m-6 6 6-6 6 6",
  home: "M4 11 12 4l8 7v9H4zM10 20v-6h4v6",
  pin: "M12 21s-6-5.4-6-11a6 6 0 0 1 12 0c0 5.6-6 11-6 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  bed: "M3 18v-7h18v7M3 14h18M6 11V8h5v3",
  book: "M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5Zm0 15a2 2 0 0 0 2 2h13",
  play: "M8 5v14l11-7L8 5Z",
  bag: "M5 8h14l-1 12H6L5 8Zm4 0V7a3 3 0 0 1 6 0v1",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01",
  box: "m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9m0-9L4 7.5",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6m-6 4h4",
  spark: "M12 3c.4 3.9 2.6 6.1 6.5 6.5-3.9.4-6.1 2.6-6.5 6.5-.4-3.9-2.6-6.1-6.5-6.5C9.4 9.1 11.6 6.9 12 3Z",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-4v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4",
  key: "M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-3 3v9m0-4h3m-3 2h2",
  chat: "M4 5h16v11H9l-5 4V5Z",
  shield: "M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z",
  db: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3",
  cloud: "M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 9.4 4.3 4.3 0 0 0 7 18Z",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4m-2.5-11-3 14",
  layers: "M4 7.5 12 3l8 4.5-8 4.5-8-4.5Zm0 4.5 8 4.5 8-4.5M4 16.5 12 21l8-4.5",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  pen: "m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Zm9-13 3 3",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 15V9a3 3 0 0 1 3-3h7M18 9v6a3 3 0 0 1-3 3H8",
} as const;
