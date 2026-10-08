import Link from "next/link";
import { ArticleCover } from "@/components/visuals/ArticleCover";
import type { ArticleMeta } from "@/content/types";
import { formatDate } from "@/lib/text";
import { cn } from "@/lib/cn";

/**
 * Article card. `feature`: large cover on top and a big title. `row`: cover on the left, used for the
 * supporting stories. Default: compact card with cover.
 */
export function ArticleCard({ article: a, variant = "default", headingLevel: H = "h3" }: { article: ArticleMeta; variant?: "default" | "feature" | "row"; headingLevel?: "h2" | "h3" }) {
  return (
    <Link href={`/insights/${a.slug}`} className={cn("group card card-hover flex h-full overflow-hidden !rounded-[22px] !p-0", variant === "row" ? "flex-col sm:flex-row" : "flex-col")}>
      <span className={cn("media m-2 block shrink-0 !rounded-[16px]", variant === "row" ? "aspect-[16/10] sm:mb-2 sm:aspect-auto sm:w-[42%]" : "aspect-[16/9] mb-0", variant === "feature" && "lg:aspect-[16/8.5]")}>
        <ArticleCover slug={a.slug} category={a.category} />
      </span>
      <span className={cn("flex flex-1 flex-col p-6", variant === "feature" && "lg:p-8", variant === "row" && "sm:py-6 sm:pr-7 sm:pl-5")}>
        <span className="flex items-center gap-3">
          <span className="pill-soft !px-2.5 !py-1 !text-[0.75rem] !font-semibold">{a.category}</span>
          <span className="text-[0.8125rem] text-fg-3">{a.kind}</span>
        </span>
        <H className={cn("row-title mt-4 font-display font-bold tracking-[-0.03em]", variant === "feature" ? "text-[clamp(1.625rem,2.6vw,2.375rem)] leading-[1.1]" : "text-[1.25rem] leading-snug")}>{a.title}</H>
        <span className={cn("mt-3 block text-fg-2", variant === "feature" ? "text-[1.0625rem] leading-relaxed" : "text-[0.9375rem] leading-relaxed", variant === "row" && "line-clamp-2")}>{a.excerpt}</span>
        <span className="mt-auto flex items-center justify-between gap-4 pt-6 text-[0.8125rem] text-fg-3">
          <span>
            <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.readingTime}
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-fg transition-[background-color,border-color,color] duration-300 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white">
            <span className="arrow" aria-hidden>
              →
            </span>
          </span>
        </span>
      </span>
    </Link>
  );
}
