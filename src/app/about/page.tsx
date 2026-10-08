import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cta } from "@/components/ui/Cta";
import { CtaBand } from "@/components/sections/CtaBand";
import { TeamGrid } from "@/components/team/TeamGrid";
import { Proof } from "@/components/home/Proof";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { getAllProjects } from "@/lib/projects";
import { getTeam } from "@/lib/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: "Cirrion is a digital product studio. Product thinking, design and engineering in one accountable team.",
  path: "/about",
});

const principles = [
  { t: "Outcomes before features", b: "We ask what should change for your users and your business, then build the smallest thing that proves it." },
  { t: "Decisions on screens, not in meetings", b: "Prototypes settle arguments early, while changing your mind is still cheap." },
  { t: "Boring where it counts", b: "Proven infrastructure, clear architecture and honest documentation, so your product is easy to hand over and easy to grow." },
  { t: "Nothing hidden", b: "Weekly working demos, a shared roadmap and plain-language reporting. You see the product, not a status slide." },
];

const disciplines = [
  { q: "What it should do", t: "Product", b: "Scope, priorities and the smallest release that proves the idea." },
  { q: "How it should feel", t: "Design", b: "Flows, interfaces and prototypes tested before they are built." },
  { q: "How it should last", t: "Engineering", b: "Clean architecture, tests, monitoring and documentation you can inherit." },
];

const reasons = [
  ["One team, start to finish", "Product, design and engineering are not separate vendors. Intent survives from the first sketch to the production release."],
  ["Senior attention", "The people who scope your project are the people who build it."],
  ["Made to be owned", "You get the code, the documentation and the architecture. Nothing is locked inside Cirrion."],
  ["Built to work across time zones", "Async-first communication, agreed overlap hours and weekly demos, whichever country you are in."],
] as const;

export default function AboutPage() {
  const team = getTeam();
  const projects = getAllProjects();
  return (
    <>
      <PageHero
        eyebrow="About Cirrion"
        title="We design and build serious digital products."
        lead="Cirrion is a product studio for mobile, web, SaaS and AI. We exist because too many software projects fail in the gaps between strategy, design and engineering."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Proof />

      <section className="section" aria-labelledby="story">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">Company story</p>
            <h2 id="story" className="h2 mt-3">
              Why a studio, not a staffing shop.
            </h2>
          </Reveal>
          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            {[
              "Most companies that need software don't need more developers. They need someone accountable for the whole product: what it should do, how it should feel and how it should be built to last.",
              "Cirrion brings those disciplines into one team. We start with the business problem, prove the idea in a prototype, build in short cycles you can see, and stay after launch to improve what real users actually do.",
              "The result is software that gets used: clear on the screen, dependable underneath and simple to extend.",
            ].map((t, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className={i === 0 ? "text-[1.1875rem] leading-relaxed text-fg" : "prose-body"}>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="container-x mt-14">
          <ul className="grid gap-6 md:grid-cols-3">
            {disciplines.map((d, i) => (
              <Reveal key={d.t} as="li" delay={i * 60} className="h-full">
                <div className="card h-full">
                  <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-accent uppercase">{d.q}</p>
                  <h3 className="h3 mt-3">{d.t}</h3>
                  <p className="mt-2 text-[0.9375rem] text-fg-2">{d.b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-gradient relative isolate overflow-hidden" aria-labelledby="mission">
        <svg aria-hidden className="absolute top-1/2 right-[-6%] -z-10 hidden h-[140%] -translate-y-1/2 text-indigo/15 lg:block" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeDasharray="2 8" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" />
          <circle cx="200" cy="10" r="6" fill="#6366F1" fillOpacity=".4" />
          <circle cx="80" cy="200" r="5" fill="#F47B20" />
        </svg>
        <div className="container-x py-[clamp(80px,10vw,136px)]">
          <Reveal>
            <p className="eyebrow">Mission</p>
            <p id="mission" className="h2-xl mt-6 max-w-[20ch]">
              To make serious software accessible to every <span className="text-indigo-deep">ambitious business.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="philosophy">
        <div className="container-x">
          <SectionHeading eyebrow="Philosophy" title={<span id="philosophy">How we think</span>} />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.t} as="li" delay={(i % 2) * 60} className="h-full">
                <div className="card h-full">
                  <p className="text-[0.9375rem] font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="h3 mt-2">{p.t}</h3>
                  <p className="mt-2 text-fg-2">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band" aria-labelledby="why">
        <div className="container-x">
          <SectionHeading eyebrow="Why clients work with us" title={<span id="why">Four reasons that hold up</span>} />
          <ul className="rule-list mt-10">
            {reasons.map(([t, b], i) => (
              <Reveal key={t} as="li" delay={i * 50} className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-12">
                <h3 className="h3 md:col-span-5">{t}</h3>
                <p className="prose-body md:col-span-6 md:col-start-7">{b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <RelatedWork projects={projects} title="What we have built" />

      <section className="section band" aria-labelledby="leadership">
        <div className="container-x">
          <SectionHeading
            eyebrow={team.length === 1 ? "Leadership" : "Leadership & team"}
            title={<span id="leadership">The people behind the work</span>}
            lead={team.length === 1 ? "Founder-led. You talk to the person who builds your product." : "A small, senior team. You talk to the people who build your product."}
          />
          <div className="mt-10">
            <TeamGrid team={team} compact={team.length > 1} />
          </div>
          <Reveal className="mt-10">
            <Cta href="/team" variant="ghost">
              Meet the team
            </Cta>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Let's build something worth using." text="Tell us what you're building and we'll tell you how we'd approach it." />
    </>
  );
}
