import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Proof } from "@/components/home/Proof";
import { Position } from "@/components/home/Position";
import { ServicesBento } from "@/components/home/ServicesBento";
import { WorkIndex } from "@/components/home/WorkIndex";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { TechEcosystem } from "@/components/home/TechEcosystem";
import { InsightsFeature } from "@/components/home/InsightsFeature";
import { Testimonials } from "@/components/home/Testimonials";
import { ProcessJourney } from "@/components/sections/ProcessJourney";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cta } from "@/components/ui/Cta";
import { getAllProjects } from "@/lib/projects";
import { articles } from "@/content/articles";
import { process } from "@/content/process";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name}: Digital product studio for mobile, web, SaaS and AI`,
  description: site.description,
  path: "/",
});

/** Background rhythm: off-white hero → white → soft grey → white → off-white → white → white/gradient stage → off-white → gradient CTA → ink footer. */
export default function Home() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <>
      <Hero />
      <Proof className="pt-4" />
      <Position />

      <section className="section surface-soft" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHeading
            layout="split"
            size="xl"
            eyebrow="Services"
            id="services-title"
            title="What we build"
            lead="Each engagement starts with the business problem. The technology follows."
            action={
              <Cta href="/services" variant="ghost">
                All services
              </Cta>
            }
          />
          <div className="mt-14 lg:mt-16">
            <ServicesBento />
          </div>
        </div>
      </section>

      <section className="section surface-white" id="work" aria-labelledby="work-title">
        <div className="container-x">
          <SectionHeading
            layout="split"
            size="xl"
            eyebrow="Selected work"
            id="work-title"
            title="Products, not just projects."
            lead="Each engagement is a product with users, constraints and a definition of done."
            action={
              <Cta href="/work" variant="ghost">
                All work
              </Cta>
            }
          />
          <div className="mt-12 lg:mt-16">
            <WorkIndex projects={getAllProjects()} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-title">
        <div className="container-x">
          <SectionHeading
            layout="split"
            size="xl"
            eyebrow="Industries"
            id="industries-title"
            title="Built around how your sector works."
            lead="We learn the workflow first. The software should fit the business, not the other way round."
            action={
              <Cta href="/industries" variant="ghost">
                All industries
              </Cta>
            }
          />
          <div className="mt-14 lg:mt-16">
            <IndustriesShowcase />
          </div>
        </div>
      </section>

      <section className="section surface-white" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading
            layout="split"
            size="xl"
            eyebrow="Process"
            id="process-title"
            title="Six stages, no surprises."
            lead="You always know what happens next, what you'll receive, and what we need from you."
            action={
              <Cta href="/process" variant="ghost">
                How we work
              </Cta>
            }
          />
          <div className="mt-14 lg:mt-20">
            <ProcessJourney steps={process} />
          </div>
        </div>
      </section>

      <section className="section surface-white border-t border-line" aria-labelledby="tech-title">
        <div className="container-x">
          <TechEcosystem />
        </div>
      </section>

      <Testimonials />

      <section className="section" aria-labelledby="insights-title">
        <div className="container-x">
          <SectionHeading
            layout="split"
            size="xl"
            eyebrow="Insights"
            id="insights-title"
            title="How we think about building."
            lead="Practical notes on engineering, AI and product decisions."
            action={
              <Cta href="/insights" variant="ghost">
                All Insights
              </Cta>
            }
          />
          <div className="mt-14 lg:mt-16">
            <InsightsFeature articles={latest} />
          </div>
        </div>
      </section>

      <CtaBand title="Let's turn your idea into something real." text="Tell us what you're building. We'll help you plan, design and engineer it." />
    </>
  );
}
