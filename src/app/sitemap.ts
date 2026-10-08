import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/seo";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["/", "/services", "/work", "/industries", "/process", "/about", "/team", "/insights", "/contact", "/careers", "/privacy", "/terms", "/cookies"];
  return [
    ...fixed.map((p) => ({ url: absUrl(p), lastModified: now, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: absUrl(`/industries/${i.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    // sample case studies are noindex, so they stay out of the sitemap until they are real
    ...projects.filter((p) => !p.sample).map((p) => ({ url: absUrl(`/work/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: absUrl(`/insights/${a.slug}`), lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
