import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";

const pillars = [
  { icon: "search", t: "Product", b: "What it should do, and the smallest release that proves it." },
  { icon: "pen", t: "Design", b: "Flows and interfaces tested before they are built." },
  { icon: "code", t: "Engineering", b: "Architecture you can inherit, run and extend." },
];

/** Editorial statement of what Cirrion is (and is not), with the three disciplines that sit in one team. */
export function Position() {
  return (
    <section className="section surface-white" aria-labelledby="position-title">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow">Our position</p>
            <h2 id="position-title" className="h2-xl mt-6 max-w-[17ch]">
              <span className="text-[#858d9c]">We don&apos;t just provide developers.</span>{" "}
              <span>
                We design and build <span className="text-indigo-deep">digital products.</span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:self-end">
            <blockquote className="border-l-2 border-indigo pl-6">
              <p className="text-[1.1875rem] leading-relaxed text-fg">
                &ldquo;Product thinking, design and engineering sit in one team, so decisions are made once and carried through launch.&rdquo;
              </p>
            </blockquote>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-3 lg:mt-20">
          {pillars.map((p, i) => (
            <Reveal key={p.t} as="li" delay={i * 80} className="bg-white p-7 lg:p-8">
              <div className="flex items-center gap-4">
                <span className="icon-tile">
                  <Glyph name={p.icon} />
                </span>
                <p className="font-display text-[1.25rem] font-bold tracking-[-0.025em]">{p.t}</p>
                <span className="ml-auto font-display text-[0.875rem] font-semibold text-fg-3">0{i + 1}</span>
              </div>
              <p className="mt-4 text-[0.9688rem] leading-relaxed text-fg-2">{p.b}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.875rem] text-fg-3">
          <span className="inline-flex items-center gap-2">
            <Glyph name="team" className="h-4 w-4 text-indigo" /> One accountable team
          </span>
          <span className="inline-flex items-center gap-2">
            <Glyph name="handoff" className="h-4 w-4 text-indigo" /> No handoffs between vendors
          </span>
          <span className="inline-flex items-center gap-2">
            <Glyph name="demo" className="h-4 w-4 text-indigo" /> Working demos every week
          </span>
        </Reveal>
      </div>
    </section>
  );
}
