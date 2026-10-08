import { Area, Backdrop, Bars, C, Card, Frame, Ico, IconTile, icons, L, Pill, Ring, T } from "./kit";

/** Editorial cover per article (falls back by category). Light, diagrammatic, no stock imagery. */
export function ArticleCover({ slug, category }: { slug: string; category: string }) {
  const Scene = bySlug[slug] ?? byCategory[category] ?? Evaluation;
  return (
    <Frame>
      <Scene />
    </Frame>
  );
}

function Evaluation() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#EAF2FF" />
      <Card x={90} y={70} w={380} h={360} r={22} />
      <T x={116} y={110} s={15} w={800} display>
        Evaluation run #24
      </T>
      <Pill x={370} y={92} w={78} h={24} fill="#E7F8F1" text="Passing" color="#0E9F6E" s={10.5} />
      {Array.from({ length: 7 }, (_, i) => {
        const ok = ![2, 5].includes(i);
        return (
          <g key={i}>
            <rect x={110} y={134 + i * 40} width={340} height={32} rx={9} fill={i % 2 ? "#fff" : C.bg3} />
            <circle cx={128} cy={150 + i * 40} r={6} fill={ok ? C.mint : C.orange} />
            <L x={144} y={146 + i * 40} w={[150, 120, 170, 110, 140, 160, 100][i]!} h={8} />
            <T x={436} y={154 + i * 40} s={10.5} w={600} fill={C.fg3} anchor="end">
              {ok ? "0.9" + (i + 1) : "0.6" + i}
            </T>
          </g>
        );
      })}
      <Card x={500} y={110} w={220} h={150} r={22} />
      <Ring cx={566} cy={185} r={40} v={0.94} sw={10} label="94%" />
      <T x={622} y={176} s={12} w={700}>
        Quality score
      </T>
      <T x={622} y={194} s={10} w={500} fill={C.fg3}>
        +6 pts vs v23
      </T>
      <Card x={500} y={280} w={220} h={150} r={22} />
      <T x={520} y={308} s={11} w={600} fill={C.fg3}>
        Score by version
      </T>
      <Area vals={[0.3, 0.42, 0.38, 0.55, 0.6, 0.72, 0.86]} box={{ x: 520, y: 326, w: 180, h: 84 }} />
    </>
  );
}

function SpreadsheetToProduct() {
  return (
    <>
      <Backdrop from="#FAFAF8" to="#F3F1FF" />
      {/* spreadsheet */}
      <Card x={70} y={100} w={290} h={300} r={16} shadow="sm" />
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <rect key={`${r}-${c}`} x={86 + c * 66} y={118 + r * 30} width={60} height={24} rx={3} fill={r === 0 ? "#E3E5EA" : (r + c) % 5 === 0 ? "#FFF1E6" : C.bg3} />
        )),
      )}
      {/* arrow */}
      <path d="M382 250 h52 m-12 -12 l12 12 l-12 12" fill="none" stroke={C.indigo} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {/* product */}
      <Card x={456} y={80} w={280} h={340} r={22} />
      <rect x={476} y={100} width={30} height={30} rx={9} fill="url(#g-indigo)" />
      <T x={518} y={121} s={15} w={800} display>
        Orders
      </T>
      <Pill x={648} y={102} w={70} h={26} fill={C.indigo} text="+ New" color="#fff" s={11} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={476} y={150 + i * 56} width={240} height={46} rx={12} fill={i === 0 ? C.lav : C.bg3} />
          <circle cx={498} cy={173 + i * 56} r={10} fill={["#C7D2FE", "#BAE6FD", "#DDD6FE", "#FDE4CF"][i]} />
          <L x={516} y={166 + i * 56} w={90} h={7} fill={i === 0 ? "#C9CBF7" : C.sk} />
          <L x={516} y={178 + i * 56} w={56} h={6} />
          <Pill x={636} y={161 + i * 56} w={66} h={22} fill="#fff" text={["Ready", "Packed", "Sent", "Paid"][i]} color={C.indigoDeep} s={10} />
        </g>
      ))}
      <Bars vals={[0.4, 0.6, 0.5, 0.8, 1]} box={{ x: 476, y: 380, w: 120, h: 24 }} />
    </>
  );
}

function Tenancy() {
  const tenants = ["Tenant A", "Tenant B", "Tenant C"];
  return (
    <>
      <Backdrop from="#EAF2FF" to="#F3F1FF" />
      {tenants.map((t, i) => (
        <g key={t} transform={`translate(${i * 40} ${i * -50})`}>
          <path d={`M180 ${330} l200 -70 l220 70 l-200 70 z`} fill={i === 2 ? "url(#g-indigo)" : "#fff"} stroke={i === 2 ? "none" : C.line} filter="url(#ui-sh-sm)" opacity={i === 2 ? 0.95 : 1} />
          <T x={400} y={336} s={13} w={700} fill={i === 2 ? "#fff" : C.ink} anchor="middle">
            {t}
          </T>
        </g>
      ))}
      <Card x={590} y={70} w={170} h={118} r={18} />
      <IconTile x={606} y={86} size={36} d={icons.shield} />
      <T x={606} y={146} s={12} w={700}>
        Row-level isolation
      </T>
      <T x={606} y={164} s={10} w={500} fill={C.fg3}>
        tenant_id on every query
      </T>
      <Card x={40} y={80} w={180} h={64} r={16} />
      <Ico d={icons.db} x={58} y={100} size={24} color={C.indigo} />
      <T x={94} y={108} s={12} w={700}>
        Shared schema
      </T>
      <T x={94} y={125} s={10} w={500} fill={C.fg3}>
        Per-tenant config
      </T>
    </>
  );
}

const bySlug: Record<string, () => React.ReactElement> = {
  "ai-in-production-is-an-evaluation-problem": Evaluation,
  "build-the-smallest-product-that-replaces-the-spreadsheet": SpreadsheetToProduct,
  "multi-tenant-saas-decisions-you-make-on-day-one": Tenancy,
};
const byCategory: Record<string, () => React.ReactElement> = { AI: Evaluation, Product: SpreadsheetToProduct, Engineering: Tenancy, Business: SpreadsheetToProduct, UX: SpreadsheetToProduct, Technology: Tenancy };
