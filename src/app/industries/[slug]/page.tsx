import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/ui/Cta";
import { Faq } from "@/components/ui/Faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedWork } from "@/components/sections/RelatedWork";
import { IndustryMedia } from "@/components/media/IndustryMedia";
import { getIndustry, industries } from "@/content/industries";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { midSentence } from "@/lib/text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return buildMetadata({ title: `${ind.title} software development`, description: ind.seoDescription, path: `/industries/${ind.slug}`, image: `/og/industries/${ind.slug}` });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const work = getAllProjects().filter((p) => p.tags.some((t) => ind.workTags.includes(t))).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Industry / ${ind.title}`}
        title={ind.headline}
        lead={ind.intro}
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: ind.title, path: `/industries/${ind.slug}` },
        ]}
        aside={<IndustryMedia slug={ind.slug} priority sizes="(min-width:1024px) 600px, 100vw" />}
      >
        <Cta href="/contact">Discuss your project</Cta>
      </PageHero>

      <section className="section" aria-labelledby="challenges">
        <div className="container-x">
          <SectionHeading eyebrow="Industry challenges" title={<span id="challenges">What makes {midSentence(ind.title)} hard</span>} />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {ind.challenges.map((c, i) => (
              <Reveal key={c.title} as="li" delay={i * 60} className="h-full">
                <div className="card h-full">
                  <h3 className="h3">{c.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-fg-2">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band" aria-labelledby="solutions">
        <div className="container-x">
          <SectionHeading eyebrow="Solutions" title={<span id="solutions">How we solve it</span>} />
          <ul className="rule-list mt-10">
            {ind.solutions.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 50} className="grid gap-x-8 gap-y-2 py-8 md:grid-cols-12">
                <h3 className="h3 md:col-span-5">{s.title}</h3>
                <p className="prose-body md:col-span-6 md:col-start-7">{s.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="features">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Relevant features</p>
            <h2 id="features" className="h3 mt-3">
              Typical building blocks
            </h2>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {ind.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-line py-3.5">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-indigo" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Technology</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              {ind.tech.map((t) => (
                <li key={t} className="tag px-4 py-1.5 text-[0.9375rem]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RelatedWork projects={work} title="Related case studies" />

      <section className="section band" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2 mt-3">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={ind.faqs} />
          </div>
        </div>
      </section>

      <CtaBand title={`Building for ${midSentence(ind.title)}? Let's talk.`} text="Tell us about your users and constraints. We'll reply within one working day." />
    </>
  );
}
