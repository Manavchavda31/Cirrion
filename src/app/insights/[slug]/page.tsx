import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { articles, getArticle } from "@/content/articles";
import { articleLd, buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/text";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, type: "article", publishedTime: a.date, image: `/og/insights/${a.slug}` });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  // Article bodies are MDX files named after the slug. Swap for a CMS fetch later; the page only needs <Body />.
  const { default: Body } = await import(`@/content/articles/${a.slug}.mdx`);
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).concat(articles.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 2);

  return (
    <>
      <article>
        <header className="band border-t-0">
          <div className="container-x py-14 md:py-20">
            <div className="hero-in mb-8" style={{ "--i": 0 } as React.CSSProperties}>
              <Breadcrumbs
                items={[
                  { name: "Insights", path: "/insights" },
                  { name: a.title, path: `/insights/${a.slug}` },
                ]}
              />
            </div>
            <p className="eyebrow hero-in" style={{ "--i": 1 } as React.CSSProperties}>
              {a.category} · {a.kind}
            </p>
            <h1 className="h1-page hero-in mt-4 max-w-[24ch]" style={{ "--i": 2 } as React.CSSProperties}>
              {a.title}
            </h1>
            <p className="lead hero-in mt-6" style={{ "--i": 3 } as React.CSSProperties}>
              {a.excerpt}
            </p>
            <p className="meta hero-in mt-8" style={{ "--i": 4 } as React.CSSProperties}>
              {a.author} · <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingTime}
            </p>
          </div>
        </header>

        <div className="container-x">
          <div className="article mx-auto max-w-[720px] py-[clamp(40px,5vw,72px)]">
            <Body />
          </div>
        </div>
      </article>

      <section className="section-tight band" aria-labelledby="more">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="more" className="h2">
              Keep reading
            </h2>
            <Link href="/insights" className="link-u hidden text-[0.9375rem] sm:inline-flex">
              All insights
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 60}>
                <ArticleCard article={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Building something like this?" text="Tell us what you're working on. We'll reply within one working day." />
      <JsonLd data={articleLd({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, date: a.date, author: a.author })} />
    </>
  );
}
