export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  num: string;
  title: string;
  /** short label for menus */
  menuTitle: string;
  menuSub: string;
  /** one line for cards */
  summary: string;
  headline: string;
  intro: string;
  problem: { title: string; body: string[] };
  solution: { title: string; body: string[] };
  capabilities: { title: string; body: string }[];
  outcomes: string[];
  tech: string[];
  faqs: Faq[];
  /** project tags used to pull relevant work */
  workTags: ProjectTag[];
  seoDescription: string;
};

export type Industry = {
  slug: string;
  title: string;
  summary: string;
  headline: string;
  intro: string;
  challenges: { title: string; body: string }[];
  solutions: { title: string; body: string }[];
  features: string[];
  tech: string[];
  faqs: Faq[];
  workTags: ProjectTag[];
  seoDescription: string;
};

export type ProjectTag = "Mobile" | "Web" | "SaaS" | "AI" | "E-commerce" | "Custom Software";

export type ProjectMedia = { cover?: string; gallery: string[] };

export type Project = {
  slug: string;
  name: string;
  /** true only for illustrative placeholders. Real, approved work is false. */
  sample: boolean;
  industry: string;
  type: string;
  tags: ProjectTag[];
  tech: string[];
  outcome: string;
  client: string;
  country?: string;
  year?: string;
  role?: string;
  challenge: string[];
  approach: string[];
  product: string[];
  /** engineering highlights: what was hard and how it was solved */
  highlights: { title: string; text: string }[];
  stack: { label: string; items: string[] }[];
  results: { text: string }[];
  /** only real, verified numbers. Leave empty otherwise. */
  metrics: { value: string; label: string }[];
  testimonial?: { quote: string; name: string; role: string; company: string; country: string };
  /** filled at build time from public/projects/<slug>/ (see lib/projects) */
  media?: ProjectMedia;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  specialization: string;
  skills: string[];
  linkedin?: string;
  photo?: string;
  placeholder: boolean;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  project?: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  category: "Engineering" | "AI" | "Product" | "UX" | "Business" | "Technology";
  kind: "Article" | "Guide" | "Technical insight" | "Case study";
  readingTime: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  lead: string;
  items: string[];
  deliverable: string;
};
