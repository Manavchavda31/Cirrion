import type { ArticleMeta } from "./types";

/**
 * Article index. Bodies live in ./articles/<slug>.mdx.
 * Swap this file for a headless CMS query later; the pages only depend on ArticleMeta.
 */
export const articles: ArticleMeta[] = [
  {
    slug: "ai-in-production-is-an-evaluation-problem",
    title: "AI in production is an evaluation problem",
    excerpt: "Before you optimise prompts or models, build the test set. It's the difference between a demo and a system you can trust.",
    author: "Cirrion Team",
    date: "2026-09-08",
    category: "AI",
    kind: "Technical insight",
    readingTime: "5 min read",
  },
  {
    slug: "build-the-smallest-product-that-replaces-the-spreadsheet",
    title: "Build the smallest product that replaces the spreadsheet",
    excerpt: "A practical way to scope the first release of custom software so it ships fast and earns adoption.",
    author: "Cirrion Team",
    date: "2026-08-19",
    category: "Product",
    kind: "Guide",
    readingTime: "6 min read",
  },
  {
    slug: "multi-tenant-saas-decisions-you-make-on-day-one",
    title: "Multi-tenant SaaS: decisions you make on day one",
    excerpt: "Tenant isolation is cheap to design and expensive to retrofit. Here are the choices that matter early.",
    author: "Cirrion Team",
    date: "2026-07-28",
    category: "Engineering",
    kind: "Technical insight",
    readingTime: "6 min read",
  },
];

export const articleCategories = ["All", "Engineering", "AI", "Product", "UX", "Business", "Technology"] as const;
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
