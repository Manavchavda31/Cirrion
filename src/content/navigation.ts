/**
 * Navigation data for the floating navbar, its mega menus and the mobile sheet.
 * Every link points at an existing route (or an anchor on one), so the menus never lead to a dead page.
 */
export type NavLink = { label: string; href: string; sub?: string };
export type NavGroup = { title: string; links: NavLink[] };

const svc = (slug: string, anchor = "") => `/services/${slug}${anchor}`;

export const servicesMenu: NavGroup[] = [
  {
    title: "Product Engineering",
    links: [
      { label: "Mobile Apps", href: svc("mobile-app-development") },
      { label: "Web Applications", href: svc("web-app-development") },
      { label: "SaaS Development", href: svc("saas-development") },
      { label: "Custom Software", href: svc("custom-software") },
    ],
  },
  {
    title: "AI & Intelligent Systems",
    links: [
      { label: "AI Applications", href: svc("ai-development") },
      { label: "AI Automation", href: svc("ai-development", "#capabilities") },
      { label: "RAG", href: svc("ai-development", "#capabilities") },
      { label: "AI Integrations", href: svc("ai-development", "#capabilities") },
      { label: "Intelligent Workflows", href: svc("custom-software", "#capabilities") },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "UI/UX Design", href: svc("ui-ux-design") },
      { label: "Product Design", href: svc("ui-ux-design", "#capabilities") },
      { label: "Design Systems", href: svc("ui-ux-design", "#capabilities") },
      { label: "Product Strategy", href: "/process" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { label: "Backend & APIs", href: svc("cloud-engineering") },
      { label: "Cloud", href: svc("cloud-engineering", "#capabilities") },
      { label: "DevOps", href: svc("cloud-engineering", "#capabilities") },
      { label: "Integrations", href: svc("web-app-development", "#capabilities") },
    ],
  },
];

export const solutionsMenu: NavLink[] = [
  { label: "Launch an MVP", sub: "From idea to a first release people adopt", href: "/process#ways" },
  { label: "Build a SaaS platform", sub: "Multi-tenant, billing-ready, built to scale", href: svc("saas-development") },
  { label: "Add AI to your product", sub: "Assistants, RAG and automation on your data", href: svc("ai-development") },
  { label: "Replace the spreadsheets", sub: "Software shaped around how you work", href: svc("custom-software") },
  { label: "Customer & partner portals", sub: "Self-service for the people you serve", href: svc("web-app-development") },
  { label: "Modernise & scale", sub: "APIs, cloud and DevOps for what outgrew v1", href: svc("cloud-engineering") },
];

export const companyMenu: NavLink[] = [
  { label: "About", href: "/about", sub: "Story, philosophy, approach" },
  { label: "Team", href: "/team", sub: "The people building your product" },
  { label: "Process", href: "/process", sub: "Six stages, no surprises" },
  { label: "Careers", href: "/careers", sub: "Work with Cirrion" },
  { label: "Contact", href: "/contact", sub: "Tell us what you're building" },
];

export type MenuKey = "services" | "solutions" | "industries" | "company";

export const primaryNav: { label: string; href: string; menu?: MenuKey; match?: string[] }[] = [
  { label: "Services", href: "/services", menu: "services" },
  { label: "Work", href: "/work" },
  { label: "Solutions", href: "/process", menu: "solutions", match: ["/process"] },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "Company", href: "/about", menu: "company", match: ["/about", "/team", "/careers", "/contact"] },
  { label: "Insights", href: "/insights" },
];
