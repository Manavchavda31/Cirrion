import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServiceList } from "@/components/home/ServiceList";
import { IndustriesList } from "@/components/home/IndustriesList";
import { TechSection } from "@/components/home/TechSection";
import { Testimonials } from "@/components/home/Testimonials";
import { WorkGrid } from "@/components/work/WorkGrid";
import { ProcessCompact } from "@/components/sections/ProcessCompact";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { getAllProjects } from "@/lib/projects";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.name}: Digital product studio for mobile, web, SaaS and AI`,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="position-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Our position</p>
            <h2 id="position-title" className="h2 mt-3 max-w-[24ch]">
              We don&apos;t just provide developers. We design and build digital products.
            </h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-5 lg:self-end">
            <p className="prose-body">
              Product thinking, design and engineering sit in one team, so decisions are made once and carried through to launch. No handoffs to lose intent, no gaps to fall through.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title={<span id="services-title">What we build</span>}
            lead="Each engagement starts with the business problem. The technology follows."
          />
          <div className="mt-10">
            <ServiceList only={["mobile-app-development", "web-app-development", "saas-development", "ai-development"]} />
          </div>
          <Reveal className="mt-10">
            <Cta href="/services" variant="ghost">
              All services
            </Cta>
          </Reveal>
        </div>
      </section>

      <section className="section band" id="work" aria-labelledby="work-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Selected work"
            title={<span id="work-title">Products, not just projects</span>}
            lead="Each engagement is a product with users, constraints and a definition of done. Here is how we approached three of them."
          />
          <div className="mt-10">
            <WorkGrid projects={getAllProjects()} showFilters={false} />
          </div>
          <Reveal className="mt-10">
            <Cta href="/work" variant="ghost">
              All work
            </Cta>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Process"
            title={<span id="process-title">Six stages, no surprises</span>}
            lead="You always know what happens next, what you'll receive, and what we need from you."
          />
          <div className="mt-10">
            <ProcessCompact />
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="industries-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Industries"
            title={<span id="industries-title">Built around how your sector works</span>}
            lead="We learn the workflow first. The software should fit the business, not the other way round."
          />
          <div className="mt-10">
            <IndustriesList only={["healthcare", "fintech", "real-estate", "hospitality"]} />
          </div>
          <Reveal className="mt-10">
            <Cta href="/industries" variant="ghost">
              All industries
            </Cta>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="tech-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Technology"
            title={<span id="tech-title">The right tools, chosen last</span>}
            lead="We start with the outcome you need, then pick the stack that gets you there and keeps you flexible."
          />
          <div className="mt-10">
            <TechSection />
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section band" aria-labelledby="insights-title">
        <div className="container-x">
          <SectionHeading
            eyebrow="Insights"
            title={<span id="insights-title">How we think about building</span>}
            lead="Practical notes on engineering, AI and product decisions."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Cta href="/insights" variant="ghost">
              All insights
            </Cta>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Have a product in mind?" text="Tell us what you're building. We'll reply within one working day." />
    </>
  );
}
