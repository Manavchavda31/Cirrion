import { z } from "zod";

export const services = ["Mobile App", "Website", "Web Application", "SaaS", "AI", "Custom Software", "UI/UX", "Other"] as const;
export const budgets = ["Below $5k", "$5k–$15k", "$15k–$50k", "$50k+", "Let's Discuss"] as const;
export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"] as const;

export const leadInputSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().min(2, "Where are you based?").max(80),
  service: z.enum(services, { message: "Choose what you're building" }),
  budget: z.enum(budgets, { message: "Choose a budget range" }),
  timeline: z.enum(timelines, { message: "Choose a timeline" }),
  message: z.string().trim().min(20, "Give us a little more detail (20+ characters)").max(4000),
  /** honeypot: real users never fill this */
  website: z.string().max(500).optional().default(""),
  /** Cloudflare Turnstile token, present only when the widget is configured */
  turnstile: z.string().max(4000).optional().default(""),
  source: z.string().max(200).optional().default(""),
  landing_page: z.string().max(300).optional().default(""),
});
export type LeadInput = z.infer<typeof leadInputSchema>;

export const leadStatuses = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

/** The structured lead every submission becomes. Shape is CRM-ready. */
export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  source: string;
  landing_page: string;
  created_at: string;
  status: LeadStatus;
};
