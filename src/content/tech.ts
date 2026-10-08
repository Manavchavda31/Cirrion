
/** The stack the studio ships with today (taken from delivered projects). Keep it honest: add only what you would build in. */
export const techGroups: { label: string; job: string; items: string[] }[] = [
  { label: "Frontend", job: "What people see and touch", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { label: "Backend", job: "Logic, APIs and integrations", items: ["Python", "FastAPI", "Django REST", "SQLAlchemy", "Pydantic", "Celery"] },
  { label: "Data", job: "Where the truth lives", items: ["PostgreSQL", "Supabase", "Redis", "Elasticsearch", "Snowflake", "Trino", "Athena"] },
  { label: "AI", job: "Reasoning on your data", items: ["Claude", "OpenAI", "Gemini", "Text-to-SQL", "Semantic search", "RAG"] },
  { label: "Cloud", job: "How it ships and stays up", items: ["AWS EC2", "AWS S3", "Docker", "Caddy"] },
];
