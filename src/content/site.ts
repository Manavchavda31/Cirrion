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
    { value: "8", label: "Disciplines under one roof", icon: "layers", verified: true },
    { value: "3", label: "Products live in production", icon: "rocket", verified: true },
    { value: "6", label: "Stage delivery process", icon: "route", verified: true },
    { value: "8", label: "Industries we design for", icon: "grid", verified: true },
    { value: "1", label: "Accountable team, discovery to launch", icon: "team", verified: true },
    // Flip to verified: true only once each number is real and defensible.
    { value: "6+", label: "Years of experience", icon: "clock", verified: false },
    { value: "100+", label: "Projects delivered", icon: "rocket", verified: false },
    { value: "40+", label: "Global clients", icon: "globe", verified: false },
    { value: "99%", label: "Client satisfaction", icon: "heart", verified: false },
  ],
  founded: "", // TODO
} as const;
