import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/seo";

/** Search and AI-search crawlers are named explicitly so the intent is visible and easy to change. */
const searchBots = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Claude-SearchBot", "Claude-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...searchBots.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: absUrl("/sitemap.xml"),
  };
}
