import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightsList } from "@/components/insights/InsightsList";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { articles } from "@/content/articles";
import { buildMetadata } from "@/lib/seo";
import type { ArticleMeta } from "@/content/types";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Practical writing on engineering, AI, product and business from the Cirrion team.",
  path: "/insights",
});

const focus: Partial<Record<ArticleMeta["category"], string>> = {
  AI: "Evaluation, retrieval and keeping AI features trustworthy in production.",
  Product: "Scoping, sequencing and shipping software people actually adopt.",
  Engineering: "Architecture and infrastructure decisions that are cheap now and costly later.",
  UX: "Interface and research decisions that remove friction.",
  Business: "How software choices connect to the way a company operates.",
  Technology: "Tools and platforms, and when they earn their place.",
};

const writing = [
  { t: "Specific over generic", b: "Each piece starts from a real decision a team has to make, and ends with something you can apply." },
  { t: "Trade-offs, not hype", b: "We say what a choice costs as well as what it gives you, so you can decide with open eyes." },
  { t: "From the people who build", b: "Written by the team that designs and ships the products, not by a content calendar." },
];

export default function InsightsPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const cats = Array.from(new Set(sorted.map((a) => a.category)));

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="How we think about building."
        lead="Practical notes on engineering, AI and product decisions. Written to be useful, not to rank."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />

      {latest.length > 0 && (
        <section className="section-tight" aria-labelledby="latest">
          <div className="container-x">
            <h2 id="latest" className="h2">
              Latest
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((a, i) => (
                <Reveal key={a.slug} delay={i * 60}>
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section band" aria-labelledby="topics">
        <div className="container-x">
          <SectionHeading eyebrow="Topics" title={<span id="topics">What we write about</span>} lead="Subjects where projects most often go right or wrong." />
          <ul className="rule-list mt-10">
            {cats.map((c, i) => {
              const n = sorted.filter((a) => a.category === c).length;
              return (
                <Reveal key={c} as="li" delay={i * 50} className="grid gap-x-8 gap-y-1 py-6 md:grid-cols-12 md:items-baseline">
                  <h3 className="h3 md:col-span-3">{c}</h3>
                  <p className="meta md:col-span-2">
                    {n} {n === 1 ? "article" : "articles"}
                  </p>
                  <p className="text-fg-2 md:col-span-6">{focus[c]}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="section-tight" aria-labelledby="all">
          <div className="container-x">
            <h2 id="all" className="sr-only">
              All articles
            </h2>
            <InsightsList articles={rest} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="how-we-write">
        <div className="container-x">
          <SectionHeading eyebrow="How we write" title={<span id="how-we-write">Notes we would want to read</span>} />
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {writing.map((w, i) => (
              <Reveal key={w.t} as="li" delay={i * 60} className="border-t border-line-2 pt-5">
                <h3 className="h3">{w.t}</h3>
                <p className="mt-2 text-fg-2">{w.b}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Have a problem worth solving?" text="We're always glad to talk through a product idea, even if it never becomes a project." label="Talk to us" />
    </>
  );
}
