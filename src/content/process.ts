import type { ProcessStep } from "./types";

export const process: ProcessStep[] = [
  {
    num: "01",
    title: "Discover",
    lead: "We start with the business, not the backlog.",
    items: ["Business goals", "Users and jobs to be done", "Requirements", "Constraints and risks"],
    deliverable: "A scoped brief, success measures and a build-order you can approve.",
  },
  {
    num: "02",
    title: "Design",
    lead: "Decisions get made on screens, before they get expensive.",
    items: ["UX flows", "Interface design", "System architecture", "Clickable prototype"],
    deliverable: "A tested prototype and an architecture the whole team can reason about.",
  },
  {
    num: "03",
    title: "Build",
    lead: "Working software every week. You see it, not a status report.",
    items: ["Frontend", "Backend and APIs", "Integrations", "Infrastructure"],
    deliverable: "Weekly demos on a live staging environment.",
  },
  {
    num: "04",
    title: "Validate",
    lead: "We try to break it before your users do.",
    items: ["QA and automated tests", "Security review", "Performance budgets", "User testing"],
    deliverable: "A release candidate with known issues documented, not hidden.",
  },
  {
    num: "05",
    title: "Launch",
    lead: "Shipping is a process, not a date.",
    items: ["Deployment and rollback plan", "Monitoring and alerts", "Analytics", "Handover"],
    deliverable: "A monitored production release and full documentation.",
  },
  {
    num: "06",
    title: "Grow",
    lead: "Products improve after launch. We stay for that part.",
    items: ["Maintenance", "Optimisation", "New features", "Scaling"],
    deliverable: "A shared roadmap driven by real usage data.",
  },
];
