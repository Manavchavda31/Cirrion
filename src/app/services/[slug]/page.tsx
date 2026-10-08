import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { Faq } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessCompact } from "@/components/sections/ProcessCompact";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { getService, services } from "@/content/services";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata, serviceLd } from "@/lib/seo";
import { midSentence } from "@/lib/text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.seoDescription, path: `/services/${s.slug}`, image: `/og/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const work = getAllProjects().filter((p) => p.tags.some((t) => s.workTags.includes(t))).slice(0, 3);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={`Service ${s.num}`}
        title={s.headline}
        lead={s.intro}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.title, path: `/services/${s.slug}` },
        ]}
        aside={<ServiceVisual slug={s.slug} />}
      >
        <Cta href="/contact">Start a Project</Cta>
        <Cta href="#capabilities" variant="ghost" arrow={false}>
          What&apos;s included
        </Cta>
      </PageHero>

      <section aria-label="Outcomes" className="surface-white border-y border-line">
        <div className="container-x">
          <ul className="grid md:grid-cols-3">
            {s.outcomes.map((o, i) => (
              <Reveal key={o} as="li" delay={i * 60} className={`flex items-start gap-3 py-7 md:py-9 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}>
                <span aria-hidden className="mt-[0.15em] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lavender text-[0.75rem] text-indigo-deep">✓</span>
                <span className="text-[1.0625rem] leading-snug">{o}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Problem and solution">
        <div className="container-x space-y-[clamp(56px,7vw,96px)]">
          {[
            { label: "The problem", data: s.problem },
            { label: "Our approach", data: s.solution },
          ].map(({ label, data }) => (
            <div key={label} className="grid gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <p className="eyebrow">{label}</p>
                <h2 className="h2 mt-3">{data.title}</h2>
              </Reveal>
              <div className="space-y-5 lg:col-span-6 lg:col-start-7">
                {data.body.map((p, i) => (
                  <Reveal key={i} delay={60 + i * 60}>
                    <p className="prose-body">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="section band scroll-mt-24" aria-labelledby="cap-title">
        <div className="container-x">
          <SectionHeading eyebrow="Capabilities" title={<span id="cap-title">What&apos;s included</span>} lead="Scope is set together during discovery. These are the building blocks we draw from." />
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <Reveal key={c.title} as="li" delay={(i % 3) * 60} className="h-full">
                <div className="card h-full">
                  <h3 className="h3">{c.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-fg-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="proc-title">
        <div className="container-x">
          <SectionHeading eyebrow="Process" title={<span id="proc-title">How we work</span>} lead="The same six stages on every engagement, scaled to the size of the product." />
          <div className="mt-10">
            <ProcessCompact />
          </div>
        </div>
      </section>

      <section className="section-tight surface-white border-y border-line" aria-labelledby="tech-title">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Technology</p>
            <h2 id="tech-title" className="h3 mt-3 max-w-[18ch]">
              Chosen for the problem, not the trend.
            </h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-7 lg:col-start-6" aria-label="Technologies we use for this service">
            {s.tech.map((t) => (
              <li key={t} className="tag px-4 py-1.5 text-[0.9375rem]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedWork projects={work} />

      <section className="section band" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2 mt-3">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      <section className="section-tight" aria-label="Other services">
        <div className="container-x">
          <p className="eyebrow">Also from Cirrion</p>
          <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex items-baseline justify-between border-b border-line py-5 font-display text-[1.375rem] font-bold tracking-[-0.025em] transition-colors hover:text-accent">
                  <span>{o.title}</span>
                  <span aria-hidden className="arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Ready to talk about your ${midSentence(s.menuTitle)} project?`} text="Tell us what you're building. We'll reply within one working day with next steps." />

      <JsonLd data={serviceLd({ title: s.title, description: s.seoDescription, path: `/services/${s.slug}` })} />
    </>
  );
}
