import Link from "next/link";
import type { ArticleMeta } from "@/content/types";
import { formatDate } from "@/lib/text";

/** Text-only article card. */
export function ArticleCard({ article: a }: { article: ArticleMeta }) {
  return (
    <Link href={`/insights/${a.slug}`} className="card group flex h-full flex-col">
      <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-accent uppercase">{a.category}</p>
      <h3 className="h3 mt-2">{a.title}</h3>
      <p className="mt-3 text-fg-2">{a.excerpt}</p>
      <p className="meta mt-auto pt-6">
        {a.kind} · {formatDate(a.date)} · {a.readingTime}
      </p>
    </Link>
  );
}
