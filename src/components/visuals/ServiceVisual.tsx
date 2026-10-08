import { Area, Avatar, Backdrop, Bars, Browser, C, Card, Frame, Ico, IconTile, icons, L, Phone, Pill, Ring, T } from "./kit";

/**
 * Light product-UI scene for each service, built in SVG (800 × 500, key content kept in the centre so cards can
 * crop it to other ratios). Used by the home bento, /services and each service page header.
 */
export function ServiceVisual({ slug, className, label }: { slug: string; className?: string; label?: string }) {
  const Scene = scenes[slug] ?? WebApp;
  return (
    <Frame className={className} label={label}>
      <Scene />
    </Frame>
  );
}

const scenes: Record<string, () => React.ReactElement> = {
  "mobile-app-development": MobileApp,
  "web-app-development": WebApp,
  "saas-development": Saas,
  "ai-development": Ai,
  "custom-software": Custom,
  "cloud-engineering": Cloud,
  "ui-ux-design": Design,
  "web-development": Website,
};

function MobileApp() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#EAF2FF" />
      {/* back phone */}
      <g transform="rotate(-8 300 260)">
        <Phone x={190} y={70} w={190} h={390} screen="#F7F7FB">
          <rect x={197} y={77} width={176} height={150} fill="url(#g-indigo)" />
          <T x={215} y={128} s={11} w={500} fill="#fff">
            Balance
          </T>
          <T x={215} y={160} s={28} w={800} fill="#fff" display>
            $8,240
          </T>
          <L x={215} y={180} w={90} h={7} fill="#ffffff66" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={210} y={245 + i * 52} width={150} height={42} rx={12} fill="#fff" />
              <circle cx={232} cy={266 + i * 52} r={11} fill={["#E8E9FF", "#EAF2FF", "#FFF1E6", "#E7F8F1"][i]} />
              <L x={250} y={258 + i * 52} w={60} h={6} />
              <L x={250} y={270 + i * 52} w={38} h={5} />
            </g>
          ))}
        </Phone>
      </g>
      {/* front phone */}
      <Phone x={370} y={50} w={210} h={420}>
        <T x={395} y={100} s={11} w={500} fill={C.fg3}>
          Good morning
        </T>
        <T x={395} y={124} s={21} w={800} display>
          Today
        </T>
        <circle cx={548} cy={112} r={14} fill="#FFE7D4" />
        <circle cx={556} cy={102} r={4} fill={C.orange} stroke="#fff" strokeWidth={2} />
        <rect x={392} y={142} width={166} height={108} rx={18} fill="url(#g-indigo)" />
        <T x={408} y={168} s={9.5} w={600} fill="#ffffffcc" ls={1.4}>
          NEXT UP
        </T>
        <T x={408} y={192} s={17} w={800} fill="#fff" display>
          Design review
        </T>
        <T x={408} y={211} s={10} w={500} fill="#ffffffd9">
          10:30 – 11:15
        </T>
        <rect x={408} y={226} width={134} height={6} rx={3} fill="#ffffff40" />
        <rect x={408} y={226} width={86} height={6} rx={3} fill="#fff" />
        <Card x={392} y={264} w={80} h={70} r={14} shadow="none" />
        <Ring cx={432} cy={299} r={20} v={0.72} sw={6} />
        <Card x={478} y={264} w={80} h={70} r={14} shadow="none" />
        <T x={490} y={287} s={9} w={500} fill={C.fg3}>
          Streak
        </T>
        <T x={490} y={312} s={18} w={800} display>
          12d
        </T>
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={392} y={348 + i * 48} width={166} height={40} rx={12} fill="#fff" stroke={C.line} />
            <rect x={402} y={356 + i * 48} width={24} height={24} rx={7} fill={i ? C.sky : C.lav} />
            <L x={434} y={361 + i * 48} w={70} h={6} />
            <L x={434} y={372 + i * 48} w={44} h={5} />
          </g>
        ))}
      </Phone>
      {/* floating notification */}
      <Card x={500} y={92} w={210} h={62} r={16} />
      <IconTile x={514} y={105} size={36} d={icons.check} color={C.mint} fill="#E7F8F1" />
      <T x={560} y={120} s={12} w={700}>
        Payment confirmed
      </T>
      <T x={560} y={138} s={10.5} w={500} fill={C.fg3}>
        Face ID · just now
      </T>
      {/* release chip */}
      <Card x={120} y={372} w={170} h={56} r={16} />
      <circle cx={146} cy={400} r={6} fill={C.mint} />
      <T x={162} y={396} s={12} w={700}>
        v2.4 released
      </T>
      <T x={162} y={413} s={10} w={500} fill={C.fg3}>
        iOS · Android
      </T>
    </>
  );
}

function WebApp() {
  return (
    <>
      <Backdrop from="#F4F6FA" to="#EAF2FF" />
      <Browser x={110} y={60} w={580} h={400} url="portal.yourcompany.com">
        <rect x={110} y={94} width={130} height={366} fill="#FBFBFD" />
        <line x1={240} x2={240} y1={94} y2={460} stroke={C.line} />
        <rect x={126} y={110} width={22} height={22} rx={7} fill="url(#g-indigo)" />
        <L x={156} y={117} w={60} h={8} fill="#D9DCE6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={122} y={150 + i * 34} width={106} height={26} rx={8} fill={i === 1 ? C.lav : "transparent"} />
            <rect x={132} y={158 + i * 34} width={10} height={10} rx={3} fill={i === 1 ? C.indigo : "#DADDE6"} />
            <L x={150} y={159 + i * 34} w={i === 1 ? 54 : 46} h={7} fill={i === 1 ? "#C9CBF7" : C.sk} />
          </g>
        ))}
        <T x={262} y={130} s={20} w={800} display>
          Requests
        </T>
        <Pill x={590} y={113} w={84} h={26} fill={C.indigo} text="+ New" color="#fff" s={11} />
        {/* table */}
        <rect x={258} y={152} width={416} height={290} rx={14} fill="#fff" stroke={C.line} />
        <rect x={258} y={152} width={416} height={36} rx={14} fill="#FBFBFD" />
        {["Client", "Owner", "Status"].map((h, i) => (
          <T key={h} x={276 + i * 140} y={175} s={10.5} w={600} fill={C.fg3}>
            {h}
          </T>
        ))}
        {[0, 1, 2, 3, 4].map((r) => {
          const st = [
            ["Approved", "#E7F8F1", "#0E9F6E"],
            ["In review", C.lav, C.indigoDeep],
            ["Approved", "#E7F8F1", "#0E9F6E"],
            ["Waiting", "#FFF1E6", "#C2570C"],
            ["In review", C.lav, C.indigoDeep],
          ][r]!;
          return (
            <g key={r}>
              <line x1={258} x2={674} y1={188 + r * 50} y2={188 + r * 50} stroke={C.line} />
              <circle cx={288} cy={213 + r * 50} r={12} fill={["#C7D2FE", "#BAE6FD", "#DDD6FE", "#FDE4CF", "#C7D2FE"][r]} />
              <L x={308} y={209 + r * 50} w={70 - (r % 2) * 14} h={8} />
              <Avatar cx={428} cy={213 + r * 50} r={11} fill={["#A5B4FC", "#93C5FD", "#C4B5FD", "#A5B4FC", "#93C5FD"][r]} ring={false} />
              <L x={446} y={209 + r * 50} w={48} h={8} />
              <Pill x={556} y={202 + r * 50} w={82} h={22} fill={st[1]} text={st[0]} color={st[2]} s={10} />
            </g>
          );
        })}
      </Browser>
      {/* role chip */}
      <Card x={500} y={404} w={180} h={58} r={16} />
      <IconTile x={514} y={416} size={34} d={icons.key} />
      <T x={558} y={431} s={12} w={700}>
        Role: Partner
      </T>
      <T x={558} y={448} s={10} w={500} fill={C.fg3}>
        Access scoped · audited
      </T>
    </>
  );
}

function Saas() {
  const tiers = [
    { n: "Starter", p: "$19", hi: false, x: 90 },
    { n: "Growth", p: "$49", hi: true, x: 300 },
    { n: "Scale", p: "$129", hi: false, x: 510 },
  ];
  return (
    <>
      <Backdrop from="#F3F1FF" to="#F4F6FA" />
      {tiers.map((t) => (
        <g key={t.n} transform={t.hi ? "translate(0 -16)" : undefined}>
          <Card x={t.x} y={110} w={200} h={290} r={20} fill={t.hi ? "url(#g-indigo)" : "#fff"} stroke={!t.hi} />
          {t.hi && <Pill x={t.x + 118} y={126} w={66} h={22} fill="#ffffff2e" text="Popular" color="#fff" s={10} />}
          <T x={t.x + 22} y={150} s={13} w={600} fill={t.hi ? "#ffffffcc" : C.fg3}>
            {t.n}
          </T>
          <T x={t.x + 22} y={198} s={38} w={800} fill={t.hi ? "#fff" : C.ink} display>
            {t.p}
          </T>
          <T x={t.x + 26 + t.p.length * 22} y={198} s={12} w={500} fill={t.hi ? "#ffffffb3" : C.fg3}>
            /mo
          </T>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <Ico d={icons.check} x={t.x + 22} y={226 + i * 28} size={15} color={t.hi ? "#fff" : C.indigo} sw={2.2} />
              <L x={t.x + 46} y={231 + i * 28} w={[96, 80, 110, 70][i]!} h={7} fill={t.hi ? "#ffffff55" : C.sk} />
            </g>
          ))}
          <rect x={t.x + 22} y={348} width={156} height={34} rx={10} fill={t.hi ? "#fff" : C.ink} />
          <T x={t.x + 100} y={370} s={12} w={700} fill={t.hi ? C.indigoDeep : "#fff"} anchor="middle">
            Choose plan
          </T>
        </g>
      ))}
      {/* tenants chip */}
      <Card x={530} y={40} w={190} h={60} r={16} />
      <IconTile x={544} y={53} size={34} d={icons.layers} />
      <T x={588} y={68} s={12} w={700}>
        248 tenants
      </T>
      <T x={588} y={86} s={10} w={500} fill={C.fg3}>
        Isolated · per-tenant config
      </T>
      <Card x={60} y={420} w={220} h={52} r={16} />
      <T x={80} y={442} s={10} w={500} fill={C.fg3}>
        Monthly recurring revenue
      </T>
      <T x={80} y={461} s={14} w={800} display>
        $184k
      </T>
      <Area vals={[0.2, 0.3, 0.28, 0.45, 0.5, 0.7, 0.9]} box={{ x: 170, y: 432, w: 96, h: 28 }} sw={2.2} />
    </>
  );
}

function Ai() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#EAF2FF" glow="#8B8FF8" />
      {/* retrieved documents stack */}
      {[2, 1, 0].map((i) => (
        <g key={i} transform={`translate(${i * 14} ${i * -14})`}>
          <Card x={80} y={170} w={190} h={230} r={16} shadow={i === 0 ? "md" : "sm"} />
        </g>
      ))}
      <IconTile x={98} y={190} size={34} d={icons.doc} />
      <T x={142} y={204} s={12} w={700}>
        Policy_2026.pdf
      </T>
      <T x={142} y={220} s={10} w={500} fill={C.fg3}>
        Retrieved · p.14
      </T>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={98} y={248 + i * 20} width={[150, 134, 152, 110, 140, 92][i]} height={8} rx={4} fill={i === 2 || i === 3 ? "#C9CBF7" : C.sk} />
      ))}
      {/* chat */}
      <Card x={300} y={70} w={420} h={370} r={22} />
      <rect x={322} y={92} width={36} height={36} rx={11} fill="url(#g-indigo)" />
      <Ico d={icons.spark} x={330} y={100} size={20} color="#fff" fill="#fff" />
      <T x={370} y={108} s={14} w={700} display>
        Finance assistant
      </T>
      <T x={370} y={124} s={10.5} w={500} fill={C.fg3}>
        Grounded in your documents
      </T>
      <Pill x={626} y={98} w={74} h={24} fill="#E7F8F1" text="Grounded" color="#0E9F6E" s={10} />
      <rect x={430} y={150} width={268} height={50} rx={16} fill={C.indigo} />
      <T x={448} y={172} s={12} w={500} fill="#fff">
        Which invoices are more than
      </T>
      <T x={448} y={189} s={12} w={500} fill="#fff">
        30 days overdue?
      </T>
      <rect x={322} y={216} width={330} height={150} rx={16} fill={C.bg3} />
      <T x={340} y={242} s={12} w={500} fill={C.ink}>
        Three invoices are overdue:
      </T>
      {[
        ["INV-1042", "41 days"],
        ["INV-1057", "36 days"],
        ["INV-1063", "33 days"],
      ].map(([a, b], i) => (
        <g key={a}>
          <rect x={340} y={256 + i * 32} width={294} height={26} rx={8} fill="#fff" />
          <T x={352} y={273 + i * 32} s={11} w={600}>
            {a}
          </T>
          <T x={622} y={273 + i * 32} s={11} w={500} fill={C.fg3} anchor="end">
            {b}
          </T>
        </g>
      ))}
      <Pill x={322} y={380} w={96} h={24} fill="#fff" text="↳ ledger.sql" color={C.fg2} s={10} />
      <Pill x={426} y={380} w={110} h={24} fill="#fff" text="↳ Policy_2026" color={C.fg2} s={10} />
      <rect x={322} y={412} width={376} height={1} fill={C.line} />
    </>
  );
}

function Custom() {
  const cols = [
    { t: "New", n: 6, c: C.indigo },
    { t: "In progress", n: 4, c: C.orange },
    { t: "Done", n: 9, c: C.mint },
  ];
  return (
    <>
      <Backdrop from="#F4F6FA" to="#F3F1FF" />
      <Browser x={80} y={50} w={640} h={410} url="ops.yourcompany.com/pipeline">
        <T x={104} y={128} s={20} w={800} display>
          Operations pipeline
        </T>
        <Pill x={560} y={110} w={140} h={26} fill={C.lav} text="This quarter" color={C.indigoDeep} s={10.5} />
        {cols.map((col, ci) => (
          <g key={col.t}>
            <rect x={100 + ci * 204} y={150} width={192} height={290} rx={14} fill={C.bg3} />
            <circle cx={118 + ci * 204} cy={172} r={4} fill={col.c} />
            <T x={130 + ci * 204} y={176} s={11.5} w={700}>
              {col.t}
            </T>
            <T x={276 + ci * 204} y={176} s={11} w={500} fill={C.fg3} anchor="end">
              {col.n}
            </T>
            {[0, 1, 2].slice(0, ci === 1 ? 2 : 3).map((k) => (
              <g key={k}>
                <rect x={110 + ci * 204} y={192 + k * 78} width={172} height={66} rx={12} fill="#fff" stroke={C.line} />
                <L x={124 + ci * 204} y={206 + k * 78} w={[96, 80, 110][k]!} h={8} fill="#D9DCE6" />
                <L x={124 + ci * 204} y={222 + k * 78} w={64} h={6} />
                <circle cx={132 + ci * 204} cy={244 + k * 78} r={8} fill={["#C7D2FE", "#BAE6FD", "#FDE4CF"][k]} />
                <circle cx={146 + ci * 204} cy={244 + k * 78} r={8} fill={["#BAE6FD", "#DDD6FE", "#C7D2FE"][k]} stroke="#fff" strokeWidth={2} />
                <T x={268 + ci * 204} y={248 + k * 78} s={11} w={700} anchor="end">
                  {["$18k", "$42k", "$65k", "$24k", "$38k", "$12k", "$31k", "$9k", "$56k"][ci * 3 + k]}
                </T>
              </g>
            ))}
          </g>
        ))}
        {/* drag-in-progress card */}
        <g transform="rotate(3 420 380)">
          <rect x={318} y={350} width={172} height={66} rx={12} fill="#fff" stroke={C.indigo} strokeWidth={1.5} filter="url(#ui-sh)" />
          <L x={332} y={364} w={100} h={8} fill="#C9CBF7" />
          <L x={332} y={380} w={60} h={6} />
          <Pill x={332} y={392} w={70} h={18} fill={C.lav} text="Approval" s={9} />
        </g>
      </Browser>
    </>
  );
}

function Cloud() {
  const node = (x: number, y: number, label: string, d: string, status = true) => (
    <g>
      <Card x={x} y={y} w={168} h={64} r={16} />
      <IconTile x={x + 14} y={y + 14} size={36} d={d} />
      <T x={x + 62} y={y + 30} s={12.5} w={700}>
        {label}
      </T>
      <circle cx={x + 66} cy={y + 45} r={3.5} fill={status ? C.mint : C.orange} />
      <T x={x + 74} y={y + 49} s={10} w={500} fill={C.fg3}>
        {status ? "Healthy" : "Scaling"}
      </T>
    </g>
  );
  return (
    <>
      <Backdrop from="#EAF2FF" to="#F3F1FF" />
      {/* connections */}
      <g fill="none" stroke={C.indigo} strokeOpacity={0.45} strokeWidth={1.6} strokeDasharray="4 6">
        <path d="M400 128 V 170" />
        <path d="M400 230 C 400 260, 210 250, 210 282" />
        <path d="M400 230 V 282" />
        <path d="M400 230 C 400 260, 590 250, 590 282" />
        <path d="M210 346 C 210 380, 400 370, 400 398" />
        <path d="M400 346 V 398" />
        <path d="M590 346 C 590 380, 400 370, 400 398" />
      </g>
      {node(316, 64, "Edge & CDN", icons.cloud)}
      <Card x={276} y={170} w={248} h={60} r={16} fill="url(#g-indigo)" stroke={false} />
      <Ico d={icons.shield} x={296} y={188} size={24} color="#fff" />
      <T x={332} y={198} s={13} w={700} fill="#fff">
        API gateway
      </T>
      <T x={332} y={215} s={10} w={500} fill="#ffffffcc">
        Auth · rate limits · 99.98%
      </T>
      {node(126, 282, "Orders API", icons.code)}
      {node(316, 282, "AI service", icons.spark)}
      {node(506, 282, "Workers", icons.layers, false)}
      <Card x={300} y={398} w={200} h={60} r={16} />
      <IconTile x={314} y={410} size={36} d={icons.db} />
      <T x={362} y={426} s={12.5} w={700}>
        PostgreSQL
      </T>
      <T x={362} y={444} s={10} w={500} fill={C.fg3}>
        Primary + replica
      </T>
      <Pill x={600} y={90} w={130} h={26} fill="#fff" text="✓ Deploy #482" color="#0E9F6E" s={10.5} />
    </>
  );
}

function Design() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#FAFAF8" />
      {/* canvas toolbar */}
      <Card x={300} y={36} w={200} h={40} r={12} shadow="sm" />
      {[icons.pen, icons.grid, icons.layers, icons.search].map((d, i) => (
        <Ico key={i} d={d} x={320 + i * 44} y={46} size={20} color={i === 0 ? C.indigo : C.fg3} />
      ))}
      {/* wireframe */}
      <T x={110} y={112} s={11} w={600} fill={C.fg3}>
        1 · Wireframe
      </T>
      <rect x={110} y={124} width={190} height={330} rx={20} fill="#fff" stroke="#D9DDE6" strokeDasharray="5 5" />
      <rect x={130} y={148} width={150} height={90} rx={10} fill={C.bg3} />
      <path d="M190 182 l14 14 l10 -8 l14 18 h-52 z" fill="#DADDE6" />
      <L x={130} y={254} w={120} h={10} fill="#E3E5EA" />
      <L x={130} y={274} w={90} h={8} fill="#ECEEF3" />
      <rect x={130} y={300} width={150} height={34} rx={8} fill="none" stroke="#D9DDE6" strokeDasharray="4 4" />
      <rect x={130} y={350} width={70} height={70} rx={10} fill={C.bg3} />
      <rect x={210} y={350} width={70} height={70} rx={10} fill={C.bg3} />
      {/* arrow */}
      <path d="M322 290 h56 m-12 -10 l12 10 l-12 10" fill="none" stroke={C.indigo} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      {/* hi-fi */}
      <T x={400} y={112} s={11} w={600} fill={C.fg3}>
        2 · High fidelity
      </T>
      <Card x={400} y={124} w={200} h={330} r={22} />
      <rect x={416} y={140} width={168} height={110} rx={14} fill="url(#g-indigo)" />
      <circle cx={556} cy={164} r={30} fill="#fff" fillOpacity={0.18} />
      <T x={430} y={234} s={15} w={800} fill="#fff" display>
        Featured
      </T>
      <T x={416} y={280} s={17} w={800} display>
        Plan your week
      </T>
      <L x={416} y={292} w={130} h={7} />
      <rect x={416} y={312} width={168} height={38} rx={11} fill={C.ink} />
      <T x={500} y={336} s={12} w={700} fill="#fff" anchor="middle">
        Continue
      </T>
      <rect x={416} y={364} width={80} height={72} rx={12} fill={C.lav} />
      <rect x={504} y={364} width={80} height={72} rx={12} fill={C.sky} />
      {/* components */}
      <Card x={632} y={150} w={110} h={240} r={18} shadow="sm" />
      <T x={650} y={176} s={10} w={600} fill={C.fg3} ls={1}>
        COMPONENTS
      </T>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={650} y={192 + i * 46} width={74} height={36} rx={10} fill={[C.lav, C.sky, "#fff", C.bg3][i]} stroke={i === 2 ? C.line : "none"} />
      ))}
      <rect x={662} y={204} width={50} height={12} rx={6} fill={C.indigo} />
      <circle cx={687} cy={256} r={8} fill="none" stroke={C.indigo} strokeWidth={2} />
      <rect x={662} y={298} width={50} height={12} rx={6} fill={C.ink} />
      <rect x={662} y={344} width={30} height={12} rx={6} fill={C.orange} />
      {/* cursor */}
      <path d="M566 392 l0 34 l9 -9 l7 15 l7 -3 l-7 -15 l12 0 z" fill={C.ink} stroke="#fff" strokeWidth={2} strokeLinejoin="round" />
      <Pill x={588} y={430} w={54} h={20} fill={C.indigo} text="Mia" color="#fff" s={10} />
    </>
  );
}

function Website() {
  return (
    <>
      <Backdrop from="#FAFAF8" to="#EAF2FF" />
      <Browser x={70} y={50} w={520} h={400} url="yourcompany.com">
        <rect x={88} y={100} width={18} height={18} rx={6} fill="url(#g-indigo)" />
        <L x={114} y={105} w={60} h={8} fill="#D9DCE6" />
        {[0, 1, 2].map((i) => (
          <L key={i} x={340 + i * 52} y={106} w={40} h={7} />
        ))}
        <rect x={500} y={98} width={74} height={24} rx={8} fill={C.ink} />
        <Pill x={90} y={150} w={130} h={22} fill={C.lav} text="Now booking projects" s={9.5} />
        <T x={90} y={210} s={32} w={800} display>
          A website
        </T>
        <T x={90} y={246} s={32} w={800} display>
          that earns trust.
        </T>
        <L x={90} y={266} w={220} h={8} />
        <L x={90} y={282} w={170} h={8} />
        <rect x={90} y={306} width={118} height={36} rx={10} fill={C.indigo} />
        <rect x={216} y={306} width={100} height={36} rx={10} fill="#fff" stroke={C.line} />
        <rect x={360} y={150} width={210} height={200} rx={18} fill="url(#g-indigo)" />
        <circle cx={520} cy={196} r={44} fill="#fff" fillOpacity={0.18} />
        <rect x={384} y={290} width={120} height={40} rx={10} fill="#fff" fillOpacity={0.9} />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={90 + i * 164} y={376} width={150} height={60} rx={12} fill={C.bg3} />
        ))}
      </Browser>
      <Card x={540} y={170} w={200} h={210} r={20} />
      <T x={560} y={200} s={11} w={600} fill={C.fg3}>
        Core Web Vitals
      </T>
      {[
        { l: "Perf", v: 0.98, c: C.mint, n: "98" },
        { l: "A11y", v: 1, c: C.indigo, n: "100" },
        { l: "SEO", v: 1, c: C.indigo, n: "100" },
      ].map((m, i) => (
        <g key={m.l}>
          <Ring cx={583 + i * 58} cy={250} r={20} v={m.v} sw={5} color={m.c} />
          <T x={583 + i * 58} y={255} s={12} w={800} anchor="middle" display>
            {m.n}
          </T>
          <T x={583 + i * 58} y={290} s={10} w={500} fill={C.fg3} anchor="middle">
            {m.l}
          </T>
        </g>
      ))}
      <L x={560} y={318} w={160} h={7} />
      <Bars vals={[0.4, 0.55, 0.5, 0.7, 0.62, 0.85, 1]} box={{ x: 560, y: 330, w: 160, h: 34 }} />
    </>
  );
}
