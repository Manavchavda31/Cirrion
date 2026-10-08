import type { TeamMember, Testimonial } from "./types";

/** Founder is real. The other three are placeholders: replace with real people. Photos: public/team/<slug>.jpg is picked up automatically. */
export const team: TeamMember[] = [
  {
    slug: "founder",
    name: "Kaushik",
    role: "Founder & Principal Engineer",
    bio: "Python engineer who leads products end to end: a multi-tenant AI platform for accounting firms, an enterprise text-to-SQL assistant and an exam-preparation platform.",
    specialization: "AI systems, Python and full-stack SaaS",
    skills: ["Python", "FastAPI", "Next.js", "LLMs"],
    placeholder: false,
  },
  {
    slug: "design-lead",
    name: "Team Member",
    role: "Design Lead",
    bio: "Replace with a short, specific biography.",
    specialization: "Product design, prototyping",
    skills: ["UX", "Design systems"],
    placeholder: true,
  },
  {
    slug: "frontend-lead",
    name: "Team Member",
    role: "Frontend Lead",
    bio: "Replace with a short, specific biography.",
    specialization: "Web applications, performance",
    skills: ["Next.js", "TypeScript"],
    placeholder: true,
  },
  {
    slug: "delivery-lead",
    name: "Team Member",
    role: "Delivery Lead",
    bio: "Replace with a short, specific biography.",
    specialization: "Project delivery, client communication",
    skills: ["Planning", "QA"],
    placeholder: true,
  },
];

/** Real testimonials only. Empty by design: the testimonials section hides until this has entries. */
export const testimonials: Testimonial[] = [];
