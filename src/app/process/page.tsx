import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBand } from "@/components/sections/CtaBand";
import { process } from "@/content/process";
import { engagements } from "@/content/engagement";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description: "Cirrion's six-stage product process: discover, design, build, validate, launch and grow. What happens at each stage and what you receive.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="Six stages. No surprises."
        lead="You always know what happens next, what you'll receive and what we need from you. The same rhythm scales from a focused MVP to a multi-team platform."
        crumbs={[{ name: "Process", path: "/process" }]}
      />
      <section className="section-tight" aria-label="Process stages">
        <div className="container-x">
          <h2 className="sr-only">The six stages</h2>
          <ProcessSteps steps={process} />
        </div>
      </section>
      <section className="section band" aria-labelledby="ways">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ways to work together"
            title={<span id="ways">Start small, or go all in</span>}
            lead="Most projects begin with discovery. From there, the shape of the work follows what the product needs."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} as="li" delay={i * 60} className="h-full">
                <div className="card flex h-full flex-col bg-bg">
                  <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-accent uppercase">{e.tag}</p>
                  <h3 className="h3 mt-3">{e.title}</h3>
                  <p className="mt-3 text-fg-2">{e.body}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.9375rem]">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title="Start with discovery." text="A short, focused first stage that turns an idea into a scoped, build-ready plan." />
    </>
  );
}
