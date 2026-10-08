import { C, Ico, icons } from "./kit";

const stages = [
  { label: "Idea", d: icons.spark, x: 30, y: 64 },
  { label: "Prototype", d: icons.pen, x: 380, y: 52 },
  { label: "Build", d: icons.code, x: 396, y: 300 },
  { label: "Launch", d: icons.arrowUp, x: 24, y: 312 },
];

/** Abstract ecosystem for the closing CTA: a glowing core, orbits, four stage chips and flowing connections. Decorative. */
export function CtaVisual() {
  const cx = 260;
  const cy = 200;
  return (
    <svg viewBox="0 0 520 400" className="ui-svg mx-auto h-auto w-full max-w-[600px]" aria-hidden>
      <defs>
        <radialGradient id="cta-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={170} fill="url(#cta-core)" className="eco-glow" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r={150} fill="none" stroke={C.indigo} strokeOpacity={0.14} strokeDasharray="2 7" />
      <circle cx={cx} cy={cy} r={96} fill="none" stroke={C.indigo} strokeOpacity={0.16} />

      {/* small product elements on the orbit */}
      <g opacity={0.95}>
        <rect x={322} y={150} width={86} height={58} rx={10} fill="#fff" filter="url(#ui-sh-sm)" />
        <rect x={322} y={150} width={86} height={14} rx={7} fill="#FBFBFD" />
        <rect x={330} y={174} width={46} height={6} rx={3} fill={C.sk} />
        <rect x={330} y={186} width={66} height={12} rx={4} fill={C.lav} />
        <rect x={120} y={204} width={36} height={64} rx={9} fill="#16181E" filter="url(#ui-sh-sm)" />
        <rect x={124} y={208} width={28} height={56} rx={6} fill="#fff" />
        <rect x={128} y={216} width={20} height={14} rx={3} fill="url(#g-indigo)" />
        <rect x={128} y={236} width={16} height={4} rx={2} fill={C.sk} />
      </g>

      {stages.map((s, i) => {
        const p = `M${s.x + 54} ${s.y + 22} C ${(s.x + 54 + cx) / 2} ${s.y + 22}, ${cx} ${(s.y + cy) / 2}, ${cx} ${cy}`;
        return (
          <g key={s.label}>
            <path d={p} fill="none" stroke={C.indigo} strokeOpacity={0.4} strokeWidth={1.4} strokeDasharray="3 7" className="eco-flow" />
            <circle r={3.5} fill={i === 3 ? C.orange : C.indigo} className="eco-motion" visibility="hidden">
              <set attributeName="visibility" to="visible" begin={`${i * 0.9}s`} />
              <animateMotion dur={`${5 + i}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" path={p} />
            </circle>
          </g>
        );
      })}

      {/* core */}
      <g className="eco-float-sm">
        <rect x={cx - 58} y={cy - 58} width={116} height={116} rx={32} fill="#fff" filter="url(#ui-sh)" />
        <image href="/brand/mark.png" x={cx - 30} y={cy - 32} width={60} height={61} />
        <circle cx={cx} cy={cy} r={72} fill="none" stroke="#fff" strokeOpacity={0.9} strokeWidth={2} />
      </g>

      {stages.map((s, i) => (
        <g key={s.label} className={i % 2 ? "eco-float" : "eco-float-sm"} style={{ animationDelay: `${-i * 2.5}s` }}>
          <rect x={s.x} y={s.y} width={108} height={44} rx={14} fill="#fff" filter="url(#ui-sh-sm)" />
          <rect x={s.x + 8} y={s.y + 8} width={28} height={28} rx={9} fill={i === 0 ? "url(#g-indigo)" : C.lav} />
          <Ico d={s.d} x={s.x + 13} y={s.y + 13} size={18} color={i === 0 ? "#fff" : C.indigo} fill={i === 0 ? "#fff" : "none"} />
          <text x={s.x + 44} y={s.y + 27} fontSize={13} fontWeight={700} fill={C.ink}>
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
