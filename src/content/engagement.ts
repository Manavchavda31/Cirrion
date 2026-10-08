import type { Faq } from "./types";

/**
 * Ways of working together and general questions.
 * Written as defaults: confirm each one matches how the business actually engages before launch.
 */
export const engagements: { title: string; tag: string; body: string; points: string[] }[] = [
  {
    title: "Discovery sprint",
    tag: "Start here",
    body: "A short, focused first stage for ideas that still need shaping. You leave with a scoped, build-ready plan, whether or not we build it.",
    points: ["Goals, users and constraints agreed", "Clickable prototype of the core flow", "Scope, timeline and technical approach"],
  },
  {
    title: "Fixed-scope project",
    tag: "Defined outcome",
    body: "A clearly bounded product or release, built in short cycles with working demos every week and a defined handover.",
    points: ["Agreed scope and milestones", "Weekly demos and shared roadmap", "Code, documentation and handover included"],
  },
  {
    title: "Ongoing partnership",
    tag: "Keep improving",
    body: "Continued product and engineering after launch: new features, improvements based on real usage, and care for what is already live.",
    points: ["Monthly capacity you can steer", "Monitoring, fixes and upgrades", "Roadmap reviewed with you regularly"],
  },
];

export const generalFaqs: Faq[] = [
  { q: "How quickly will I hear back?", a: "Within one working day. Every brief is read by a person, who replies with questions or a proposed time to talk." },
  { q: "Can we sign an NDA before I share details?", a: "Yes. Tell us in your message or reply to our first email and we will put one in place before you share anything sensitive." },
  { q: "Do you work with clients in other countries and time zones?", a: "Yes. We work async-first, agree overlap hours at the start, and show progress in weekly demos, so location does not slow a project down." },
  { q: "I only have an idea. Is that enough to start?", a: "It is. A discovery sprint is designed for exactly this: it turns an idea into a scoped plan, a prototype and an honest view of cost and timeline." },
  { q: "Who owns the code and the designs?", a: "You do. Source code, designs and documentation transfer to you on delivery." },
  { q: "Can you take over or improve something that already exists?", a: "Yes. We begin with a short technical and product review, then agree whether to stabilise, refactor or rebuild parts of it." },
];
