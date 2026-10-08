/** The stack the studio builds with, grouped by the job each layer does. Keep it honest: add only what you would ship. */
export type TechGroup = { key: string; label: string; job: string; icon: string; items: string[] };

export const techGroups: TechGroup[] = [
  { key: "frontend", label: "Frontend", job: "What people see and touch", icon: "monitor", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { key: "backend", label: "Backend", job: "Logic, APIs and integrations", icon: "server", items: ["Python", "FastAPI", "Django", "Node.js", "PostgreSQL"] },
  { key: "data", label: "Data", job: "Where the truth lives", icon: "db", items: ["PostgreSQL", "Redis", "Supabase", "Elasticsearch", "Snowflake"] },
  { key: "ai", label: "AI", job: "Reasoning on your data", icon: "spark", items: ["OpenAI", "Claude", "Gemini", "RAG", "Semantic Search"] },
  { key: "cloud", label: "Cloud", job: "How it ships and stays up", icon: "cloud", items: ["AWS", "Docker", "CI/CD", "S3", "Cloud Infrastructure"] },
];
