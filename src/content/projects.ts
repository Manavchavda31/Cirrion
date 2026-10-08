import type { Project } from "./types";

/**
 * Real projects. Every statement below comes from the engineers who built them.
 * Add `metrics` only with numbers the client has approved. Screenshots: see public/projects/README.md.
 */
export const projects: Project[] = [
  {
    slug: "elfworks-accounting",
    name: "ElfWorks Accounting",
    sample: false,
    industry: "Accounting & tax advisory",
    type: "Multi-tenant AI SaaS",
    tags: ["SaaS", "Web", "AI"],
    tech: ["Next.js 15", "React 19", "FastAPI", "PostgreSQL", "Claude", "OpenAI", "Gemini", "AWS"],
    outcome: "A production platform where Australian accounting and tax-advisory firms manage clients, get AI-assisted tax advice and keep their people learning.",
    client: "Australian accounting and tax-advisory firms",
    country: "Australia",
    year: "2026 – present",
    role: "Full-stack engineering, end to end",
    challenge: [
      "Accounting and tax-advisory firms needed client management, tax advice and professional learning in one product, and AI they could trust with real client work.",
      "Tax-advice workflows run for a long time. They had to survive page reloads and dropped connections, and client data had to stay protected at every step.",
    ],
    approach: [
      "Frontend and backend were built together, feature by feature, working directly with the product owner and stakeholders, so feedback became the next release instead of a backlog.",
      "A multi-stage AI workflow routes work across several model providers (Claude, OpenAI, Gemini, Grok and an Australian-sovereign model), so the product is not tied to a single vendor.",
    ],
    product: [
      "Client management for practices, an AI-assisted tax-advice workflow, an AI chat assistant with document uploads and web search, and a built-in CPD learning platform.",
      "AI-generated deliverables export to PDF and DOCX. The platform connects to FYI Practice Management, Postmark email and AWS S3.",
    ],
    highlights: [
      { title: "Durable AI jobs", text: "Long-running workflows run on a PostgreSQL-backed queue and stream progress over resumable Server-Sent Events, so they survive reloads and disconnects." },
      { title: "Secure access", text: "Magic-link and password sign-in, Microsoft SSO, short-lived rotating JWT sessions and rate limiting." },
      { title: "Many models, one workflow", text: "Claude, OpenAI, Gemini, Grok and an Australian-sovereign model sit behind one multi-stage tax-advice pipeline and a chat assistant." },
      { title: "Production hardening", text: "Diagnosed and fixed database connection-pool exhaustion, worker memory timeouts and proxy-aware rate limiting. Deployed with Docker and Caddy on AWS EC2." },
    ],
    stack: [
      { label: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { label: "Backend", items: ["FastAPI", "Async SQLAlchemy 2", "Pydantic v2"] },
      { label: "Database", items: ["PostgreSQL (Supabase)"] },
      { label: "AI", items: ["Claude", "OpenAI", "Gemini", "Grok"] },
      { label: "Infrastructure", items: ["AWS EC2", "AWS S3", "Docker", "Caddy"] },
      { label: "Integrations", items: ["FYI Practice Management", "Postmark", "Microsoft SSO"] },
    ],
    results: [
      { text: "A production SaaS platform for Australian accounting and tax-advisory firms." },
      { text: "A multi-stage AI tax-advice workflow spanning several model providers." },
      { text: "Resumable, durable background jobs for long-running AI work." },
      { text: "Integrations with FYI Practice Management, Postmark email and AWS S3, with PDF and DOCX export." },
    ],
    metrics: [],
  },
  {
    slug: "chatubix",
    name: "ChatUBIX",
    sample: false,
    industry: "Enterprise analytics",
    type: "AI business-intelligence platform",
    tags: ["AI", "Web", "Custom Software"],
    tech: ["Python", "FastAPI", "LLMs", "Text-to-SQL", "Snowflake", "Trino", "Athena", "PostgreSQL"],
    outcome: "An enterprise AI platform that lets business users ask questions of structured and unstructured data in plain language.",
    client: "Enterprise clients",
    year: "2024 – 2026",
    role: "Led architecture and development",
    challenge: [
      "Business users needed answers from data held in Snowflake, Trino, Athena and PostgreSQL, without writing SQL or queuing behind an analyst.",
      "Requirements arrived as ambiguous business questions, not specifications, and answers had to be reliable enough for people to trust.",
    ],
    approach: [
      "Led the architecture and development end to end, from the core APIs to the AI workflows.",
      "Worked directly with product owners and stakeholders to turn ambiguous requirements into production-ready features, and shipped multiple production releases.",
    ],
    product: [
      "Natural-language access to structured and unstructured data, using prompt engineering, semantic search, query routing and Text-to-SQL, with handling specific to each data connector.",
      "When a query fails, a smart fallback guides the user with suggestions instead of a dead end.",
    ],
    highlights: [
      { title: "Text-to-SQL across sources", text: "LLM workflows generate queries for Snowflake, Trino, Athena, PostgreSQL and connector-specific data sources." },
      { title: "Query routing and semantic search", text: "Questions are routed to the right source and searched semantically across unstructured content." },
      { title: "Fallbacks that guide", text: "A smart fallback strategy suggests next steps when a query fails, improving reliability, trust and usability." },
      { title: "Services that scale", text: "FastAPI microservices with asynchronous processing, caching and distributed task execution." },
    ],
    stack: [
      { label: "Backend", items: ["Python", "FastAPI"] },
      { label: "AI", items: ["LLMs", "Prompt engineering", "Semantic search", "Text-to-SQL"] },
      { label: "Data sources", items: ["Snowflake", "Trino", "Athena", "PostgreSQL"] },
      { label: "Architecture", items: ["Microservices", "Async processing", "Caching", "Distributed tasks"] },
    ],
    results: [
      { text: "An enterprise platform for querying structured and unstructured data in natural language." },
      { text: "Multiple production releases delivered with the client and cross-functional teams." },
      { text: "A failure-recovery experience that guides users rather than stopping them." },
    ],
    metrics: [],
  },
  {
    slug: "prepstudy",
    name: "PrepStudy",
    sample: false,
    industry: "Education",
    type: "Exam-preparation platform",
    tags: ["Web", "Custom Software"],
    tech: ["Python", "Django REST Framework", "PostgreSQL", "Elasticsearch", "Redis", "Celery", "OpenCV"],
    outcome: "A platform for exam preparation and participation, with performance insights and exam planning for every user.",
    client: "PrepStudy",
    role: "Project lead",
    challenge: [
      "Exam preparation is search-heavy and performance-sensitive. The platform had to stay fast under heavy user load while giving people insight into how they were doing and help planning their exams.",
    ],
    approach: [
      "Led the design and development of the critical APIs and modules, defined coding standards and ran code reviews.",
      "Kept client communication regular and delivery on track with Agile practices, and resolved complex production issues as they came up.",
    ],
    product: [
      "A platform for preparing for and taking exams, with performance insights and exam planning.",
      "Search and caching were built for speed, so response times held up when many users were active at once.",
    ],
    highlights: [
      { title: "Database performance", text: "Optimised queries and indexing strategies to improve performance and scalability." },
      { title: "Search and caching", text: "Integrated Elasticsearch and Redis to improve response times under heavy user load." },
      { title: "Tested under load", text: "Backed the changes with performance testing and load optimisation." },
      { title: "Team standards", text: "Defined coding standards and ran code reviews as project lead." },
    ],
    stack: [
      { label: "Backend", items: ["Python", "Django REST Framework"] },
      { label: "Database", items: ["PostgreSQL"] },
      { label: "Search and cache", items: ["Elasticsearch", "Redis"] },
      { label: "Background work", items: ["Celery"] },
      { label: "Computer vision", items: ["OpenCV"] },
    ],
    results: [
      { text: "Critical APIs and modules designed and delivered under a project lead." },
      { text: "Faster responses under heavy load through Elasticsearch and Redis." },
      { text: "Tuned database queries and indexes, verified with performance and load testing." },
    ],
    metrics: [],
  },
];
