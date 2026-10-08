import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Faq } from "@/content/types";

export const absUrl = (path = "/") => new URL(path, site.url).toString();

type Meta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  /** Path of a generated share image, e.g. /og/services/ai-development. Defaults to the site-wide image. */
  image?: string;
};

export function buildMetadata({ title, description, path, noindex, type = "website", publishedTime, image }: Meta): Metadata {
  const url = absUrl(path);
  const img = absUrl(image ?? "/opengraph-image");
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      publishedTime,
      locale: "en_US",
      images: [{ url: img, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description, images: [img] },
  };
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absUrl("/icon.svg"),
  description: site.description,
  email: site.email,
  sameAs: site.socials.map((s) => s.href),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  description: site.description,
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absUrl(it.path),
  })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (s: { title: string; description: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.description,
  url: absUrl(s.path),
  provider: { "@type": "Organization", name: site.name, url: site.url },
});

export const articleLd = (a: { title: string; description: string; path: string; date: string; author: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  datePublished: a.date,
  author: { "@type": "Organization", name: a.author },
  publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absUrl("/icon.svg") } },
  mainEntityOfPage: absUrl(a.path),
});
