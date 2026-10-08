import { Area, Avatar, Backdrop, C, Card, Frame, Ico, IconTile, icons, L, Phone, Pill, Ring, T } from "./kit";

/**
 * Bright, code-built scene per industry: a hint of the environment (clinic light, architecture, water, containers)
 * with the product that serves it. Shown wherever no photograph exists in public/industries (see IndustryMedia).
 */
export function IndustryScene({ slug, className }: { slug: string; className?: string }) {
  const Scene = scenes[slug] ?? Professional;
  return (
    <Frame className={className}>
      <Scene />
    </Frame>
  );
}

const scenes: Record<string, () => React.ReactElement> = {
  healthcare: Healthcare,
  fintech: Fintech,
  "real-estate": RealEstate,
  education: Education,
  retail: Retail,
  hospitality: Hospitality,
  logistics: Logistics,
  "professional-services": Professional,
};

/** Tall daylight windows used as a soft interior backdrop. */
function Windows({ x, n = 3, w = 70, gap = 18, y = 30, h = 380, opacity = 0.6 }: { x: number; n?: number; w?: number; gap?: number; y?: number; h?: number; opacity?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x + i * (w + gap)} y={y} width={w} height={h} rx={10} fill="#fff" />
          <line x1={x + i * (w + gap)} x2={x + i * (w + gap) + w} y1={y + h * 0.42} y2={y + h * 0.42} stroke="#E3E8F0" strokeWidth={3} />
        </g>
      ))}
    </g>
  );
}

function Healthcare() {
  return (
    <>
      <Backdrop from="#EEF7FB" to="#F3F1FF" glow={C.cyan} glow2="#A5B4FC" dots={false} />
      <Windows x={36} />
      <rect y={430} width={800} height={70} fill="#E9EEF5" opacity={0.7} />
      {/* tablet */}
      <rect x={170} y={84} width={480} height={316} rx={28} fill="#F1F3F7" stroke="#DDE2EA" filter="url(#ui-sh)" />
      <rect x={184} y={98} width={452} height={288} rx={18} fill="#fff" />
      <Avatar cx={218} cy={130} r={16} fill="#A5D8E6" ring={false} />
      <T x={244} y={126} s={13} w={700}>
        Patient overview
      </T>
      <T x={244} y={143} s={10} w={500} fill={C.fg3}>
        Room 204 · Admitted 2 days
      </T>
      <Pill x={540} y={118} w={80} h={24} fill="#E6F7FA" text="Stable" color="#0E7F95" s={10.5} />
      {[
        { l: "Heart rate", v: "72", u: "bpm", c: C.cyan },
        { l: "SpO₂", v: "98", u: "%", c: C.indigo },
        { l: "Blood pressure", v: "120/80", u: "", c: C.indigo },
      ].map((m, i) => (
        <g key={m.l}>
          <rect x={202 + i * 144} y={164} width={132} height={70} rx={14} fill={C.bg3} />
          <T x={216 + i * 144} y={186} s={10} w={500} fill={C.fg3}>
            {m.l}
          </T>
          <T x={216 + i * 144} y={218} s={24} w={800} fill={C.ink} display>
            {m.v}
          </T>
          {m.u && (
            <T x={218 + i * 144 + m.v.length * 14} y={218} s={10} w={600} fill={m.c}>
              {m.u}
            </T>
          )}
        </g>
      ))}
      <rect x={202} y={248} width={420} height={120} rx={14} fill="#fff" stroke={C.line} />
      <T x={218} y={272} s={11} w={600}>
        ECG · live
      </T>
      <path
        d="M218 330 h60 l8 -10 l8 10 h20 l6 -40 l8 64 l6 -24 h40 l8 -10 l8 10 h20 l6 -40 l8 64 l6 -24 h40 l8 -10 l8 10 h20 l6 -40 l8 64 l6 -24 h44"
        fill="none"
        stroke={C.cyan}
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* appointment */}
      <Card x={506} y={332} w={196} h={70} r={18} />
      <IconTile x={522} y={349} size={36} d={icons.calendar} color="#0E7F95" fill="#E6F7FA" />
      <T x={568} y={365} s={12} w={700}>
        Follow-up
      </T>
      <T x={568} y={383} s={10.5} w={500} fill={C.fg3}>
        Thu · 10:30 · Dr. Rao
      </T>
      <Card x={110} y={300} w={180} h={56} r={16} />
      <IconTile x={124} y={311} size={34} d={icons.shield} color="#0E9F6E" fill="#E7F8F1" />
      <T x={168} y={326} s={11.5} w={700}>
        Records synced
      </T>
      <T x={168} y={342} s={10} w={500} fill={C.fg3}>
        Encrypted · audited
      </T>
    </>
  );
}

function Fintech() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#EAF2FF" />
      <rect y={420} width={800} height={80} fill="#EEF0F6" opacity={0.8} />
      {/* card behind */}
      <g transform="rotate(-12 560 220)">
        <rect x={430} y={150} width={290} height={180} rx={22} fill="url(#g-indigo)" filter="url(#ui-sh)" />
        <rect x={456} y={190} width={42} height={32} rx={7} fill="#fff" fillOpacity={0.55} />
        <path d="M678 186 a16 16 0 0 1 0 28 M688 178 a26 26 0 0 1 0 44" fill="none" stroke="#fff" strokeOpacity={0.7} strokeWidth={3} strokeLinecap="round" />
        <T x={456} y={282} s={16} w={600} fill="#fff" ls={3}>
          •••• 4821
        </T>
        <circle cx={668} cy={292} r={14} fill="#fff" fillOpacity={0.35} />
        <circle cx={688} cy={292} r={14} fill={C.orange} fillOpacity={0.85} />
      </g>
      {/* phone */}
      <Phone x={200} y={40} w={230} h={440}>
        <T x={230} y={96} s={11} w={500} fill={C.fg3}>
          Total balance
        </T>
        <T x={230} y={130} s={30} w={800} display>
          $24,680
        </T>
        <T x={366} y={130} s={16} w={700} fill={C.fg3} display>
          .50
        </T>
        <Pill x={230} y={144} w={86} h={22} fill="#E7F8F1" text="+ 4.2% month" color="#0E9F6E" s={9.5} />
        <Area vals={[0.25, 0.35, 0.3, 0.5, 0.45, 0.62, 0.58, 0.8, 0.92]} box={{ x: 222, y: 180, w: 186, h: 90 }} />
        {["1W", "1M", "1Y", "All"].map((p, i) => (
          <Pill key={p} x={226 + i * 46} y={282} w={40} h={22} fill={i === 1 ? C.indigo : C.bg3} text={p} color={i === 1 ? "#fff" : C.fg3} s={10} />
        ))}
        {[
          ["Salary", "+$5,200", "#0E9F6E"],
          ["Rent", "−$1,850", C.ink],
          ["Groceries", "−$142", C.ink],
        ].map(([a, b, c], i) => (
          <g key={a}>
            <rect x={222} y={320 + i * 46} width={186} height={38} rx={12} fill="#fff" stroke={C.line} />
            <circle cx={242} cy={339 + i * 46} r={10} fill={[C.soft, C.sky, "#FFF1E6"][i]} />
            <T x={260} y={343 + i * 46} s={11} w={600}>
              {a}
            </T>
            <T x={398} y={343 + i * 46} s={11} w={700} fill={c} anchor="end">
              {b}
            </T>
          </g>
        ))}
      </Phone>
      {/* toast */}
      <Card x={470} y={360} w={220} h={64} r={18} />
      <IconTile x={486} y={374} size={36} d={icons.check} color="#0E9F6E" fill="#E7F8F1" />
      <T x={532} y={390} s={12} w={700}>
        Transfer sent
      </T>
      <T x={532} y={408} s={10.5} w={500} fill={C.fg3}>
        $1,200 · instant · verified
      </T>
    </>
  );
}

function RealEstate() {
  return (
    <>
      <Backdrop from="#F8F5F0" to="#E8F0FF" glow="#8EA8F5" glow2="#F3E3CC" dots={false} />
      {/* ground */}
      <rect y={402} width={800} height={98} fill="#EEEAE3" />
      <rect y={402} width={800} height={4} fill="#E3DDD3" />
      {/* tree */}
      <circle cx={108} cy={290} r={58} fill="#D7E6DA" />
      <circle cx={140} cy={316} r={42} fill="#CADDCF" />
      <rect x={116} y={330} width={6} height={74} rx={3} fill="#B9A992" />
      {/* house: stone base, glass volume, cantilevered upper volume with wood */}
      <rect x={180} y={300} width={430} height={102} fill="#F2EEE8" stroke="#E2DCD2" />
      <rect x={200} y={312} width={250} height={90} fill="url(#g-sky-glass)" />
      {[262, 324, 386].map((x) => (
        <rect key={x} x={x} y={312} width={3} height={90} fill="#C7D0DE" />
      ))}
      <rect x={470} y={312} width={120} height={90} fill="#E7DCCB" />
      {Array.from({ length: 11 }, (_, i) => (
        <rect key={i} x={474 + i * 10.6} y={312} width={2} height={90} fill="#D6C5AC" />
      ))}
      <rect x={170} y={294} width={450} height={8} fill="#2A2F3A" />
      <rect x={250} y={170} width={430} height={124} fill="#FFFFFF" stroke="#E6E2DA" />
      <rect x={270} y={186} width={300} height={92} fill="url(#g-sky-glass)" />
      {[330, 390, 450, 510].map((x) => (
        <rect key={x} x={x} y={186} width={3} height={92} fill="#C7D0DE" />
      ))}
      <rect x={586} y={186} width={78} height={92} fill="#E7DCCB" />
      <rect x={240} y={164} width={450} height={7} fill="#2A2F3A" />
      {/* glass reflections */}
      <path d="M280 186 l40 0 l-30 92 l-40 0 z M420 312 l26 0 l-30 90 l-26 0 z" fill="#fff" opacity={0.35} />
      {/* listing card */}
      <Card x={500} y={52} w={210} h={168} r={18} />
      <rect x={514} y={66} width={182} height={70} rx={12} fill="url(#g-sky-glass)" />
      <rect x={514} y={110} width={182} height={26} fill="#EFEAE2" opacity={0.9} />
      <T x={516} y={160} s={13} w={700}>
        Modern villa · Oak Ridge
      </T>
      <T x={516} y={188} s={20} w={800} display>
        $2,850,000
      </T>
      <Ico d={icons.bed} x={516} y={198} size={14} color={C.fg3} />
      <T x={534} y={209} s={10} w={500} fill={C.fg3}>
        4 bd · 3 ba · 320 m²
      </T>
      <Card x={96} y={58} w={176} h={56} r={16} />
      <IconTile x={108} y={69} size={34} d={icons.pin} />
      <T x={152} y={84} s={11.5} w={700}>
        12 new enquiries
      </T>
      <T x={152} y={100} s={10} w={500} fill={C.fg3}>
        Routed to agents
      </T>
    </>
  );
}

function Education() {
  return (
    <>
      <Backdrop from="#F3F1FF" to="#FAFAF8" />
      <Windows x={590} n={2} w={80} y={20} h={300} opacity={0.7} />
      {/* laptop */}
      <rect x={150} y={70} width={440} height={290} rx={18} fill="#1A1D24" filter="url(#ui-sh)" />
      <rect x={162} y={82} width={416} height={266} rx={8} fill="#fff" />
      <rect x={110} y={360} width={520} height={18} rx={9} fill="#E3E6EC" />
      <rect x={330} y={360} width={80} height={7} rx={3.5} fill="#CDD2DB" />
      {/* course player */}
      <rect x={176} y={96} width={260} height={150} rx={12} fill="url(#g-indigo)" />
      <circle cx={306} cy={171} r={26} fill="#fff" fillOpacity={0.9} />
      <Ico d={icons.play} x={296} y={160} size={22} color={C.indigo} fill={C.indigo} />
      <rect x={176} y={256} width={260} height={6} rx={3} fill={C.sk} />
      <rect x={176} y={256} width={170} height={6} rx={3} fill={C.indigo} />
      <T x={176} y={286} s={14} w={800} display>
        Module 4 · Data literacy
      </T>
      <L x={176} y={298} w={180} h={7} />
      <L x={176} y={312} w={130} h={7} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={450} y={96 + i * 46} width={114} height={38} rx={10} fill={i === 1 ? C.lav : C.bg3} />
          <circle cx={466} cy={115 + i * 46} r={6} fill={i < 1 ? C.mint : i === 1 ? C.indigo : "#D5D9E2"} />
          <L x={478} y={111 + i * 46} w={70} h={7} fill={i === 1 ? "#C9CBF7" : C.sk} />
        </g>
      ))}
      {/* quiz card */}
      <Card x={496} y={262} w={210} h={130} r={20} />
      <Ring cx={556} cy={327} r={36} v={0.92} sw={9} label="92%" />
      <T x={606} y={314} s={12} w={700}>
        Quiz complete
      </T>
      <T x={606} y={332} s={10} w={500} fill={C.fg3}>
        18 of 20 correct
      </T>
      <Pill x={606} y={344} w={78} h={22} fill="#E7F8F1" text="Passed" color="#0E9F6E" s={10} />
      {/* mentor chip */}
      <Card x={96} y={286} w={190} h={60} r={18} />
      <Avatar cx={126} cy={316} r={16} fill="#C4B5FD" ring={false} />
      <T x={152} y={312} s={11.5} w={700}>
        Mentor session
      </T>
      <circle cx={156} cy={326} r={3.5} fill={C.orange} />
      <T x={164} y={330} s={10} w={500} fill={C.fg3}>
        Live in 5 min
      </T>
    </>
  );
}

function Sneaker({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={4} y={70} width={196} height={18} rx={9} fill="#fff" stroke="#D5DBE6" strokeWidth={1.5} />
      <rect x={4} y={80} width={196} height={8} rx={4} fill="#E9ECF2" />
      <path d="M10 72 C 10 52, 30 42, 62 40 L 96 20 C 106 13, 120 13, 127 22 L 142 44 C 164 48, 188 54, 198 66 L 198 72 Z" fill="#fff" stroke="#D5DBE6" strokeWidth={1.5} />
      <path d="M70 62 L 112 33 M86 66 L 128 37" stroke={C.indigo} strokeWidth={6} strokeLinecap="round" />
      <path d="M100 28 l12 9 M108 22 l12 9" stroke="#C7CDD8" strokeWidth={2.4} strokeLinecap="round" />
      <rect x={8} y={50} width={9} height={16} rx={3} fill={C.orange} />
    </g>
  );
}

function Retail() {
  return (
    <>
      <Backdrop from="#F8F6F2" to="#EEF0FF" glow="#A5B4FC" glow2="#F3E3CC" dots={false} />
      {/* display wall + shelf */}
      <rect x={40} y={40} width={330} height={360} rx={18} fill="#fff" opacity={0.65} />
      <rect x={60} y={270} width={290} height={12} rx={6} fill="#E7DCCB" />
      <rect x={60} y={150} width={290} height={10} rx={5} fill="#E7DCCB" />
      <Sneaker x={90} y={170} s={1.15} />
      <rect x={110} y={84} width={70} height={64} rx={10} fill="#E8E9FF" />
      <rect x={196} y={70} width={60} height={78} rx={10} fill="#EAF2FF" />
      <rect x={270} y={96} width={56} height={52} rx={10} fill="#F1F2F6" />
      <rect y={400} width={800} height={100} fill="#EEECE8" />
      {/* phone: product page */}
      <Phone x={410} y={30} w={220} h={440}>
        <rect x={417} y={37} width={206} height={190} fill="#F1F2F6" />
        <Sneaker x={430} y={100} s={0.88} />
        <circle cx={600} cy={74} r={14} fill="#fff" />
        <Ico d={icons.bag} x={591} y={65} size={18} color={C.ink} />
        <circle cx={608} cy={66} r={7} fill={C.orange} />
        <T x={608} y={69.5} s={9} w={700} fill="#fff" anchor="middle">
          2
        </T>
        <T x={432} y={256} s={15} w={800} display>
          Runner Two
        </T>
        <T x={432} y={276} s={11} w={500} fill={C.fg3}>
          Everyday trainer
        </T>
        <T x={604} y={258} s={16} w={800} anchor="end" display>
          $129
        </T>
        {["40", "41", "42", "43"].map((z, i) => (
          <Pill key={z} x={432 + i * 46} y={296} w={38} h={30} fill={i === 2 ? C.ink : C.bg3} text={z} color={i === 2 ? "#fff" : C.fg2} s={11} />
        ))}
        <rect x={432} y={346} width={176} height={42} rx={12} fill={C.indigo} />
        <T x={520} y={372} s={12.5} w={700} fill="#fff" anchor="middle">
          Add to bag
        </T>
      </Phone>
      {/* tracking */}
      <Card x={540} y={300} w={180} h={84} r={18} />
      <IconTile x={554} y={314} size={34} d={icons.truck} />
      <T x={598} y={328} s={11.5} w={700}>
        Out for delivery
      </T>
      <T x={598} y={344} s={10} w={500} fill={C.fg3}>
        Arrives by 6 pm
      </T>
      <rect x={554} y={360} width={152} height={6} rx={3} fill={C.sk} />
      <rect x={554} y={360} width={118} height={6} rx={3} fill={C.indigo} />
    </>
  );
}

function Palm({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 0 C 6 -60, 4 -120, 18 -180" fill="none" stroke="#C9B79C" strokeWidth={9} strokeLinecap="round" />
      {[
        "M18 -180 C 50 -200, 80 -190, 100 -165 C 70 -178, 45 -178, 18 -180Z",
        "M18 -180 C 40 -170, 60 -140, 62 -110 C 48 -140, 34 -160, 18 -180Z",
        "M18 -180 C -10 -200, -45 -192, -66 -166 C -36 -180, -10 -180, 18 -180Z",
        "M18 -180 C -6 -166, -24 -140, -26 -112 C -12 -142, 2 -162, 18 -180Z",
        "M18 -180 C 20 -212, 40 -232, 66 -238 C 44 -222, 30 -204, 18 -180Z",
      ].map((d) => (
        <path key={d} d={d} fill="#8DBFA3" />
      ))}
    </g>
  );
}

function Hospitality() {
  return (
    <>
      <Backdrop from="#E6F3FB" to="#FFF7EE" glow="#7CC8F2" glow2="#F7DDBE" dots={false} />
      <circle cx={660} cy={90} r={34} fill="#FFE9CC" opacity={0.9} />
      {/* resort building */}
      <rect x={110} y={140} width={460} height={210} fill="#FBF9F5" stroke="#E9E3D9" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x={100} y={140 + r * 70} width={480} height={7} fill="#E6DED1" />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={126 + i * 74} y={154 + r * 70} width={60} height={50} rx={3} fill="url(#g-sky-glass)" />
          ))}
        </g>
      ))}
      <rect x={110} y={350} width={460} height={10} fill="#E3DACB" />
      {/* deck + pool */}
      <rect y={360} width={800} height={140} fill="#EFE8DC" />
      <path d="M60 392 H 740 L 760 470 H 40 Z" fill="url(#g-water)" />
      <path d="M90 418 q 30 -8 60 0 t 60 0 t 60 0 M330 440 q 30 -8 60 0 t 60 0 t 60 0 M520 410 q 30 -8 60 0 t 60 0" fill="none" stroke="#fff" strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
      {/* loungers */}
      {[150, 250, 350].map((x) => (
        <g key={x}>
          <rect x={x} y={372} width={70} height={10} rx={5} fill="#fff" stroke="#E2DACD" />
          <path d={`M${x + 52} 372 l 18 -16`} stroke="#fff" strokeWidth={9} strokeLinecap="round" />
        </g>
      ))}
      <Palm x={60} y={392} s={1.05} />
      <Palm x={610} y={392} s={0.9} flip />
      {/* booking card */}
      <Card x={500} y={170} w={220} h={176} r={20} />
      <T x={520} y={200} s={14} w={800} display>
        Ocean suite
      </T>
      <T x={700} y={200} s={11} w={700} anchor="end" fill={C.ink}>
        4.9
      </T>
      <Ico d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" x={664} y={190} size={13} color={C.orange} fill={C.orange} />
      {[
        ["Check in", "12 Dec"],
        ["Check out", "15 Dec"],
      ].map(([a, b], i) => (
        <g key={a}>
          <rect x={560 + i * 92} y={214} width={86} height={46} rx={10} fill={C.bg3} />
          <T x={570 + i * 92} y={232} s={9.5} w={500} fill={C.fg3}>
            {a}
          </T>
          <T x={570 + i * 92} y={250} s={12} w={700}>
            {b}
          </T>
        </g>
      ))}
      <rect x={520} y={270} width={178} height={24} rx={8} fill="#fff" stroke={C.line} />
      <T x={532} y={286} s={10.5} w={500} fill={C.fg2}>
        2 adults · 1 room
      </T>
      <rect x={520} y={304} width={178} height={30} rx={10} fill={C.indigo} />
      <T x={609} y={323} s={11.5} w={700} fill="#fff" anchor="middle">
        Book now
      </T>
    </>
  );
}

function Container({ x, y, w = 150, h = 54, fill, rib }: { x: number; y: number; w?: number; h?: number; fill: string; rib: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={fill} />
      {Array.from({ length: Math.floor(w / 9) - 1 }, (_, i) => (
        <rect key={i} x={x + 6 + i * 9} y={y + 5} width={2.2} height={h - 10} fill={rib} />
      ))}
    </g>
  );
}

function Logistics() {
  return (
    <>
      <Backdrop from="#EAF2FF" to="#E9F6F8" glow="#5B8DEF" glow2={C.cyan} dots={false} />
      {/* container yard */}
      <g opacity={0.95}>
        <Container x={40} y={250} fill="#3D6FD8" rib="#3362C4" />
        <Container x={196} y={250} fill="#F1F3F7" rib="#E1E5EC" />
        <Container x={352} y={250} fill="#5B8DEF" rib="#4F7FE0" />
        <Container x={40} y={192} fill="#E6EAF2" rib="#D6DCE6" />
        <Container x={196} y={192} fill="#6366F1" rib="#5A5DE6" />
        <Container x={118} y={134} fill="#5B8DEF" rib="#4F7FE0" />
        <Container x={352} y={192} fill="#3D6FD8" rib="#3362C4" />
      </g>
      <rect y={304} width={800} height={196} fill="#E9EDF3" />
      <rect y={304} width={800} height={3} fill="#DDE3EC" />
      <rect x={0} y={392} width={800} height={4} fill="#fff" opacity={0.7} />
      {/* truck */}
      <g>
        <rect x={210} y={300} width={290} height={84} rx={6} fill="#FBFCFE" stroke="#DCE1EA" />
        <rect x={210} y={370} width={290} height={6} fill="#E3E8F0" />
        <rect x={232} y={318} width={60} height={8} rx={4} fill={C.indigo} opacity={0.75} />
        <path d="M504 318 h56 a14 14 0 0 1 12 7 l22 36 v23 h-90 z" fill="#FFFFFF" stroke="#DCE1EA" />
        <path d="M528 326 h30 l18 30 h-48 z" fill="url(#g-sky-glass)" />
        {[260, 300, 450, 560].map((x) => (
          <g key={x}>
            <circle cx={x} cy={388} r={17} fill="#2A2F3A" />
            <circle cx={x} cy={388} r={7} fill="#C9CFDA" />
          </g>
        ))}
      </g>
      {/* route card */}
      <Card x={452} y={50} w={240} h={200} r={20} />
      <rect x={502} y={66} width={208} height={104} rx={12} fill="#F1F5FB" />
      <path d="M518 150 C 556 150, 556 100, 596 104 S 656 80, 692 86" fill="none" stroke={C.indigo} strokeWidth={3} strokeLinecap="round" strokeDasharray="1 7" />
      <circle cx={518} cy={150} r={7} fill="#fff" stroke={C.indigo} strokeWidth={3} />
      <circle cx={692} cy={86} r={7} fill={C.indigo} />
      <circle cx={596} cy={104} r={11} fill="#fff" filter="url(#ui-sh-sm)" />
      <Ico d={icons.truck} x={588} y={96} size={16} color={C.indigo} />
      <T x={506} y={196} s={11} w={500} fill={C.fg3}>
        Shipment #48211
      </T>
      <T x={506} y={220} s={18} w={800} display>
        ETA 14:20
      </T>
      <Pill x={638} y={204} w={72} h={24} fill="#E7F8F1" text="On time" color="#0E9F6E" s={10.5} />
      {/* fleet chip */}
      <Card x={86} y={52} w={190} h={58} r={16} />
      <IconTile x={98} y={64} size={34} d={icons.route} />
      <T x={142} y={78} s={11.5} w={700}>
        38 vehicles live
      </T>
      <T x={142} y={95} s={10} w={500} fill={C.fg3}>
        Routes optimised 06:00
      </T>
    </>
  );
}

function Person({ x, y, s = 1, shirt, skin = "#E7C9B0", hair = "#3B3330" }: { x: number; y: number; s?: number; shirt: string; skin?: string; hair?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-46 120 C -46 70, -26 52, 0 52 C 26 52, 46 70, 46 120 Z" fill={shirt} />
      <rect x={-9} y={38} width={18} height={18} rx={6} fill={skin} />
      <circle cx={0} cy={22} r={24} fill={skin} />
      <path d="M-24 18 C -24 -6, 24 -8, 24 14 C 14 4, -6 4, -24 18 Z" fill={hair} />
    </g>
  );
}

function Professional() {
  return (
    <>
      <Backdrop from="#F4F6FA" to="#EEF0FF" dots={false} />
      {/* glass office */}
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={20 + i * 128} y={20} width={120} height={330} rx={4} fill="#fff" opacity={0.55} />
      ))}
      <rect y={340} width={800} height={160} fill="#E9ECF3" />
      {/* meeting: three people around a table */}
      <Person x={150} y={210} s={1.05} shirt="#3D4352" />
      <Person x={270} y={196} s={1.1} shirt="#6366F1" skin="#C99A7A" hair="#1F1B19" />
      <Person x={392} y={212} s={1} shirt="#D9DEE8" skin="#F0D3BC" hair="#6B4B3A" />
      <rect x={80} y={322} width={400} height={18} rx={6} fill="#FFFFFF" stroke="#DCE1EA" />
      <rect x={180} y={308} width={70} height={14} rx={3} fill="#C9D3E6" />
      <rect x={300} y={312} width={56} height={10} rx={3} fill="#E3E7EF" />
      {/* client portal panel */}
      <Card x={466} y={60} w={270} h={300} r={20} />
      <T x={488} y={92} s={11} w={500} fill={C.fg3}>
        Client portal
      </T>
      <T x={488} y={116} s={17} w={800} display>
        Matter #2041
      </T>
      <Pill x={648} y={98} w={70} h={24} fill={C.lav} text="Active" s={10} />
      {[
        ["Engagement letter", "Signed"],
        ["Q3 statements", "Received"],
        ["Board pack", "Drafting"],
      ].map(([a, b], i) => (
        <g key={a}>
          <rect x={484} y={136 + i * 44} width={234} height={36} rx={10} fill={C.bg3} />
          <Ico d={icons.doc} x={494} y={144 + i * 44} size={18} color={C.indigo} />
          <T x={520} y={158 + i * 44} s={11} w={600}>
            {a}
          </T>
          <T x={708} y={158 + i * 44} s={10} w={600} fill={i === 2 ? "#C2570C" : "#0E9F6E"} anchor="end">
            {b}
          </T>
        </g>
      ))}
      <rect x={484} y={276} width={234} height={66} rx={12} fill="#fff" stroke={C.line} />
      <Ico d={icons.spark} x={496} y={288} size={16} color={C.indigo} fill={C.indigo} />
      <T x={518} y={300} s={10.5} w={700} fill={C.indigoDeep}>
        AI extracted
      </T>
      <T x={496} y={322} s={10.5} w={500} fill={C.fg2}>
        Contract value
      </T>
      <T x={706} y={322} s={11} w={700} anchor="end">
        $240,000
      </T>
      <T x={496} y={336} s={10.5} w={500} fill={C.fg2}>
        Renewal
      </T>
      <T x={706} y={336} s={11} w={700} anchor="end">
        Mar 2027
      </T>
    </>
  );
}
