import { ArticleCard } from "@/components/insights/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import type { ArticleMeta } from "@/content/types";

/** One featured article and two supporting stories. */
export function InsightsFeature({ articles }: { articles: ArticleMeta[] }) {
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <ArticleCard article={lead} variant="feature" />
      </Reveal>
      <div className="grid gap-5 lg:col-span-5">
        {rest.slice(0, 2).map((a, i) => (
          <Reveal key={a.slug} delay={80 + i * 80}>
            <ArticleCard article={a} variant="row" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
