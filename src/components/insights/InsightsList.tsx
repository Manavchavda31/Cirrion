"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { articleCategories } from "@/content/articles";
import type { ArticleMeta } from "@/content/types";
import { cn } from "@/lib/cn";

export function InsightsList({ articles }: { articles: ArticleMeta[] }) {
  const [cat, setCat] = useState<(typeof articleCategories)[number]>("All");
  const shown = useMemo(() => (cat === "All" ? articles : articles.filter((a) => a.category === cat)), [cat, articles]);
  const has = (c: string) => c === "All" || articles.some((a) => a.category === c);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {articleCategories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={c === cat}
            disabled={!has(c)}
            onClick={() => setCat(c)}
            className={cn(
              "flex h-10 shrink-0 items-center rounded-md border px-4 text-[0.9375rem] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
              c === cat ? "border-navy bg-navy text-white" : "border-line-2 text-fg-2 hover:border-fg hover:text-fg",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {shown.length} {shown.length === 1 ? "article" : "articles"}
      </p>
      {shown.length === 0 ? (
        <p className="mt-10 rounded-lg border border-line p-10 text-center text-fg-2">No articles in this category yet.</p>
      ) : (
        <div key={cat} className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a, i) => (
            <div key={a.slug} className="page-enter" style={{ animationDelay: `${i * 60}ms` }}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
