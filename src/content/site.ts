/**
 * Single source of truth for company facts.
 * Anything marked TODO must be confirmed by the business before launch.
 */
const env = process.env;

/** Social profiles appear only when a real URL is configured, so the footer never links to a generic home page. */
const socials = [
  { label: "LinkedIn", href: env.NEXT_PUBLIC_LINKEDIN_URL ?? "" },
  { label: "GitHub", href: env.NEXT_PUBLIC_GITHUB_URL ?? "" },
  { label: "Instagram", href: env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
  { label: "X", href: env.NEXT_PUBLIC_X_URL ?? "" },
].filter((s) => s.href);

export const site = {
  name: "Cirrion",
  legalName: "Cirrion", // TODO: registered legal entity name
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cirrion.com", // TODO: confirm production domain
  tagline: "A product studio for software that has to work.",
  description:
    "Cirrion is a digital product studio. We design and engineer mobile apps, web platforms, SaaS products, AI systems and custom business software.",
  email: env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@cirrion.com", // TODO: confirm mailbox, or set NEXT_PUBLIC_CONTACT_EMAIL
  /** Optional scheduling link (Cal.com, Calendly...). When set, "Book a call" buttons appear. */
  bookingUrl: env.NEXT_PUBLIC_BOOKING_URL ?? "",
  socials,
  /**
   * Proof points. Only set `verified: true` when the number is real and defensible.
   * Unverified entries fall back to the neutral statement so nothing is ever invented.
   */
  proof: [
    { value: "8", label: "Disciplines under one roof", verified: true },
    { value: "6", label: "Stage delivery process", verified: true },
    { value: "1", label: "Accountable team, discovery to launch", verified: true },
    { value: "3", label: "Products delivered to production, from AI SaaS to enterprise analytics", verified: true },
  ],
  founded: "", // TODO
} as const;

export const nav = {
  primary: [
    { label: "Services", href: "/services", menu: "services" },
    { label: "Work", href: "/work" },
    { label: "Solutions", href: "/industries", menu: "solutions" },
    { label: "Company", href: "/about", menu: "company" },
    { label: "Insights", href: "/insights" },
  ],
  company: [
    { label: "About", href: "/about", sub: "Story, philosophy, approach" },
    { label: "Team", href: "/team", sub: "The people building your product" },
    { label: "Process", href: "/process", sub: "Six stages, no surprises" },
    { label: "Careers", href: "/careers", sub: "Work with Cirrion" },
    { label: "Contact", href: "/contact", sub: "Tell us what you're building" },
  ],
} as const;
