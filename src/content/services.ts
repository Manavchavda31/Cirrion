import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "mobile-app-development",
    num: "01",
    title: "Mobile App Development",
    menuTitle: "Mobile Development",
    menuSub: "iOS / Android / Cross-platform",
    summary: "Apps people open every day, designed around real-world use.",
    headline: "Mobile apps built for the way people actually use them.",
    intro:
      "From first prototype to store release, we design and build iOS and Android apps that are fast on real devices, clear on small screens and ready to grow with your user base.",
    problem: {
      title: "Most apps are launched, then abandoned.",
      body: [
        "Downloads are easy to buy. Retention is not. Apps fail when the core flow takes too many taps, when they break on older devices, or when the backend can't keep up with the first thousand users.",
        "Store rejections, offline edge cases and notification fatigue are rarely in the original scope, and they decide whether an app is used or deleted.",
      ],
    },
    solution: {
      title: "One team owns the product end to end.",
      body: [
        "We validate the core flow in a prototype before writing production code, build the app and its API together, and test on real devices from the first sprint.",
        "You get a release-ready app, a documented backend and a monitoring setup, so launch day is uneventful in the best way.",
      ],
    },
    capabilities: [
      { title: "iOS and Android", body: "Native-quality apps for both platforms, with shared code where it makes sense." },
      { title: "Cross-platform builds", body: "One codebase when speed and budget matter, native modules when performance demands it." },
      { title: "Offline and sync", body: "Apps that stay useful with poor connectivity and reconcile safely when it returns." },
      { title: "Push and messaging", body: "Notification strategy that informs users without training them to switch it off." },
      { title: "Payments and auth", body: "Secure sign-in, subscriptions, in-app purchases and third-party payment integrations." },
      { title: "Store release", body: "Submission, review handling, staged rollouts and post-launch crash monitoring." },
    ],
    outcomes: ["A validated core flow before build starts", "Weekly builds on real devices", "Crash and performance monitoring from day one"],
    tech: ["iOS", "Android", "Cross-platform", "Python", "FastAPI", "PostgreSQL", "AWS"],
    faqs: [
      { q: "Native or cross-platform?", a: "It depends on the product. We recommend cross-platform when speed and shared logic matter most, and native modules where hardware access or performance demands it. We'll explain the trade-off for your case during discovery." },
      { q: "Can you take over an existing app?", a: "Yes. We start with a short technical review of the codebase, then agree whether to stabilise, refactor or rebuild parts of it." },
      { q: "Do you handle App Store and Google Play submission?", a: "Yes. That includes store listings, review responses and staged rollouts." },
      { q: "Who owns the code?", a: "You do. All source code and assets transfer to you on delivery." },
    ],
    workTags: ["Mobile"],
    seoDescription: "Mobile app development for iOS and Android. Product design, engineering and store release from one team.",
  },
  {
    slug: "web-development",
    num: "02",
    title: "Website Development",
    menuTitle: "Web Development",
    menuSub: "Websites / Web Apps / SaaS",
    summary: "Fast, accessible websites that earn trust and convert.",
    headline: "Websites that load fast, read clearly and win trust.",
    intro:
      "A company website is often the first evidence a buyer sees. We build marketing sites and content platforms that are quick, accessible, findable in search and simple for your team to update.",
    problem: {
      title: "The site says less than the business does.",
      body: [
        "Templates look like every competitor. Pages take four seconds to load. Content changes need a developer. Search engines can't read the structure.",
        "The result is a website that costs money to maintain and does little to build credibility.",
      ],
    },
    solution: {
      title: "Designed as a system, built to be edited.",
      body: [
        "We design a component-based site around your positioning, build it for performance and accessibility, and connect a content system your team can use without a developer.",
        "Every page ships with structured data, metadata and analytics so you can measure what it does.",
      ],
    },
    capabilities: [
      { title: "Brand-led design", body: "Layouts and motion that express your positioning, not a template." },
      { title: "Performance engineering", body: "Image optimisation, code splitting and Core Web Vitals budgets." },
      { title: "Content management", body: "Headless or MDX-based content your team can publish without code." },
      { title: "SEO foundations", body: "Semantic markup, structured data, sitemaps and clean information architecture." },
      { title: "Accessibility", body: "Keyboard navigation, contrast and screen-reader support built in, not bolted on." },
      { title: "Analytics", body: "Event tracking that connects marketing activity to enquiries." },
    ],
    outcomes: ["Sub-two-second loads on mobile networks", "A site your team can update themselves", "Measurable enquiry tracking"],
    tech: ["Next.js", "React", "TypeScript", "MDX", "Vercel"],
    faqs: [
      { q: "Can we update content ourselves?", a: "Yes. We set up a content workflow suited to your team, from MDX files to a headless CMS." },
      { q: "Do you handle hosting?", a: "We deploy to modern edge hosting and can manage it for you or hand it to your team." },
      { q: "Will it rank in search?", a: "We build the technical foundations: speed, structure, metadata and structured data. Rankings also depend on content and competition, and we'll be honest about both." },
      { q: "Can you redesign without losing our current rankings?", a: "Yes. We map existing URLs and set up redirects so equity is preserved." },
    ],
    workTags: ["Web", "E-commerce"],
    seoDescription: "Website development for growing businesses: fast, accessible, SEO-ready and easy for your team to manage.",
  },
  {
    slug: "web-app-development",
    num: "03",
    title: "Web Application Development",
    menuTitle: "Web Applications",
    menuSub: "Portals / Dashboards / Platforms",
    summary: "Browser-based software for customers, teams and partners.",
    headline: "Web applications your team and customers rely on daily.",
    intro:
      "Dashboards, portals, booking flows and internal tools, engineered for clarity under real load, with permissions, audit trails and integrations designed in from the start.",
    problem: {
      title: "Spreadsheets and email are running the business.",
      body: [
        "Critical processes live in shared inboxes and spreadsheets. Data is duplicated, permissions are informal and nobody is sure which version is correct.",
        "Off-the-shelf tools cover 70% of the workflow and force workarounds for the rest.",
      ],
    },
    solution: {
      title: "Software shaped around your workflow.",
      body: [
        "We map the workflow first, design the smallest useful version, and build it on a foundation that can absorb new roles, data and integrations.",
        "Role-based access, audit logging and clean APIs are part of the base build.",
      ],
    },
    capabilities: [
      { title: "Portals and dashboards", body: "Clear interfaces for customers, staff and partners, with the right data for each role." },
      { title: "Workflow automation", body: "Approvals, notifications and hand-offs encoded in the system instead of in people's heads." },
      { title: "Integrations", body: "Payments, accounting, CRM, email and third-party APIs connected reliably." },
      { title: "Roles and permissions", body: "Granular access control with audit trails." },
      { title: "Reporting", body: "Exports and analytics that answer real questions." },
      { title: "Performance at scale", body: "Query design, caching and background jobs that keep the app responsive." },
    ],
    outcomes: ["One source of truth for the workflow", "Role-based access and audit history", "An API ready for the next integration"],
    tech: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis"],
    faqs: [
      { q: "How do you decide what goes in version one?", a: "We rank workflow steps by business impact and risk, then ship the smallest version that replaces the manual process." },
      { q: "Can it integrate with our existing systems?", a: "Yes. We audit available APIs during discovery and design around any limitations." },
      { q: "How do you handle security?", a: "Authentication, role-based access, input validation, encrypted data and dependency scanning are standard. Higher-risk projects add a dedicated security review." },
    ],
    workTags: ["Web", "Custom Software", "SaaS"],
    seoDescription: "Custom web application development: portals, dashboards and internal platforms built around your workflow.",
  },
  {
    slug: "saas-development",
    num: "04",
    title: "SaaS Development",
    menuTitle: "SaaS Products",
    menuSub: "Multi-tenant / Subscription / Platform",
    summary: "Multi-tenant products designed to scale as a business.",
    headline: "SaaS products built to become businesses.",
    intro:
      "Multi-tenant architecture, billing, onboarding and analytics, engineered together so your product can go from first customer to first thousand without a rewrite.",
    problem: {
      title: "An MVP that can't become a product.",
      body: [
        "Prototypes built for a demo rarely survive real customers. Tenant data is mixed, billing is manual, onboarding is a call with the founder.",
        "Rewriting at growth stage is slow, expensive and risky for a live customer base.",
      ],
    },
    solution: {
      title: "Start small on a foundation that scales.",
      body: [
        "We design tenancy, roles, billing and observability before features. Then we ship a focused first release quickly.",
        "The architecture is documented and modular, so new capabilities are additions, not rebuilds.",
      ],
    },
    capabilities: [
      { title: "Multi-tenant architecture", body: "Safe data isolation, per-tenant configuration and admin tooling." },
      { title: "Subscriptions and billing", body: "Plans, trials, invoicing, usage-based pricing and payment provider integration." },
      { title: "Onboarding flows", body: "Self-serve activation that gets customers to value without a sales call." },
      { title: "Product analytics", body: "Event tracking that shows where users succeed and where they stall." },
      { title: "Admin and support tools", body: "Impersonation, audit logs and tenant management for your team." },
      { title: "API and integrations", body: "Public APIs and webhooks for customers who want to build on you." },
    ],
    outcomes: ["Tenant isolation designed in from day one", "Billing that runs without manual work", "A roadmap ready for the first hundred customers"],
    tech: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "AWS", "Docker"],
    faqs: [
      { q: "Can you build our MVP first?", a: "Yes. We define a focused first release and design the architecture to grow beyond it." },
      { q: "How do you approach multi-tenancy?", a: "We choose an isolation model based on your data sensitivity, scale and compliance needs, then enforce it at the data layer, not only in application code." },
      { q: "Can you work with our in-house team?", a: "Yes. We can lead the build, or embed to accelerate a team you already have." },
    ],
    workTags: ["SaaS", "Web"],
    seoDescription: "SaaS product development: multi-tenant architecture, billing, onboarding and analytics from an experienced product team.",
  },
  {
    slug: "ai-development",
    num: "05",
    title: "AI & Automation",
    menuTitle: "AI & Automation",
    menuSub: "AI Applications / Agents / Automation",
    summary: "AI systems that do real work inside real businesses.",
    headline: "AI that works inside your business, not next to it.",
    intro:
      "We build AI applications, retrieval systems and workflow automation connected to your data and your processes, with evaluation, guardrails and cost control built in.",
    problem: {
      title: "AI demos are easy. AI in production is not.",
      body: [
        "A prototype that answers questions well in a demo can hallucinate on real data, leak information across users or cost more than the work it replaces.",
        "Most teams lack the evaluation, monitoring and integration work needed to trust an AI system with real decisions.",
      ],
    },
    solution: {
      title: "Grounded in your data, measured in production.",
      body: [
        "We start from a specific workflow and a measurable target, ground the model in your own data with retrieval, and build evaluation sets before optimisation.",
        "Guardrails, permission-aware retrieval, logging and cost monitoring make the system safe to depend on.",
      ],
    },
    capabilities: [
      { title: "AI applications", body: "Assistants and copilots embedded in your product or internal tools." },
      { title: "Retrieval (RAG)", body: "Answers grounded in your documents and data, with source citations." },
      { title: "Data assistants", body: "Natural-language access to databases with permission-aware query generation." },
      { title: "AI agents", body: "Multi-step agents that call tools and APIs, with human approval where it matters." },
      { title: "Process automation", body: "Document handling, classification, extraction and routing." },
      { title: "Evaluation and monitoring", body: "Test sets, quality scoring and cost tracking so you know it works." },
    ],
    outcomes: ["A measurable target before build", "Answers grounded in your own data", "Cost and quality monitoring in production"],
    tech: ["LLMs", "RAG", "AI agents", "Automation", "Python", "FastAPI", "PostgreSQL"],
    faqs: [
      { q: "Will our data be used to train models?", a: "Not by us. We select providers and configurations based on your data policy and can deploy with providers that offer no-training terms." },
      { q: "How do you reduce hallucinations?", a: "By grounding answers in retrieved sources, constraining outputs, and measuring accuracy on an evaluation set built from your real questions." },
      { q: "What does it cost to run?", a: "We estimate inference and infrastructure costs during design and monitor them in production." },
      { q: "Can AI connect to our database?", a: "Yes, with read-only access, schema-aware query generation and permission checks. We treat this as a security design problem first." },
    ],
    workTags: ["AI"],
    seoDescription: "AI development and automation: RAG, data assistants and agents built with evaluation, guardrails and cost control.",
  },
  {
    slug: "custom-software",
    num: "06",
    title: "Custom Business Software",
    menuTitle: "Custom Software",
    menuSub: "CRM / ERP / Internal Platforms",
    summary: "Platforms built around the way your business really runs.",
    headline: "Software built around how your business really runs.",
    intro:
      "CRM, ERP modules, operations platforms and internal systems that replace patchwork tools with one coherent system, designed with the people who use it every day.",
    problem: {
      title: "Your process doesn't fit the software you bought.",
      body: [
        "Generic platforms force your team to adapt to the tool. Workarounds multiply, data drifts between systems and reporting becomes a monthly manual exercise.",
        "As the business grows, the cost of the workaround grows faster.",
      ],
    },
    solution: {
      title: "Model the business, then build the system.",
      body: [
        "We map how work actually flows, identify what should be automated and what needs human judgement, and build the system in stages so value arrives early.",
        "Integrations with existing tools are handled deliberately, so you can migrate at your own pace.",
      ],
    },
    capabilities: [
      { title: "CRM and sales tooling", body: "Pipelines, quoting and account management fitted to your sales process." },
      { title: "Operations platforms", body: "Scheduling, dispatch, inventory and fulfilment in one place." },
      { title: "Finance and back office", body: "Invoicing, approvals, reconciliation and reporting workflows." },
      { title: "Data migration", body: "Careful, verified migration from legacy systems and spreadsheets." },
      { title: "Integrations", body: "Accounting, payments, e-commerce, messaging and third-party APIs." },
      { title: "Reporting and BI", body: "Dashboards and exports that leadership can trust." },
    ],
    outcomes: ["One system instead of five workarounds", "Staged rollout with early value", "Verified data migration"],
    tech: ["Python", "Django", "FastAPI", "PostgreSQL", "React", "AWS"],
    faqs: [
      { q: "Why not buy off-the-shelf?", a: "Often you should. We'll tell you if an existing tool fits. Custom software makes sense when your workflow is a competitive advantage or no product fits without heavy workarounds." },
      { q: "How do you manage scope?", a: "We define a first release around the highest-value workflow, then plan subsequent phases from real usage." },
      { q: "What about training and adoption?", a: "We involve end users during design and provide training material and hand-over sessions before launch." },
    ],
    workTags: ["Custom Software", "SaaS"],
    seoDescription: "Custom business software: CRM, operations platforms and internal systems built around your workflow.",
  },
  {
    slug: "cloud-engineering",
    num: "07",
    title: "Cloud & Engineering",
    menuTitle: "Cloud & Engineering",
    menuSub: "APIs / Infrastructure / DevOps",
    summary: "Reliable backends, APIs and infrastructure.",
    headline: "Backends and infrastructure that stay up and stay affordable.",
    intro:
      "API design, cloud architecture, CI/CD and observability. The foundations behind products that need to be fast, secure and dependable as they grow.",
    problem: {
      title: "The product is fine until it isn't.",
      body: [
        "Manual deployments, missing monitoring and slow queries stay invisible until traffic spikes or a key customer complains.",
        "Cloud bills grow quietly, and nobody is sure which service to blame.",
      ],
    },
    solution: {
      title: "Boring, well-instrumented, repeatable.",
      body: [
        "We design APIs and data models for clarity, automate builds and deployments, and add the monitoring that turns incidents into short, understood events.",
        "Infrastructure is defined as code, so environments are reproducible and costs are visible.",
      ],
    },
    capabilities: [
      { title: "API design", body: "Consistent, documented, versioned APIs your team and partners can build on." },
      { title: "Cloud architecture", body: "AWS-based architectures sized for your workload and budget." },
      { title: "CI/CD pipelines", body: "Automated tests, builds and zero-downtime deployments." },
      { title: "Containers", body: "Docker-based environments that behave the same locally and in production." },
      { title: "Observability", body: "Logging, metrics and alerting that shorten time to diagnosis." },
      { title: "Performance and cost review", body: "Query tuning, caching and right-sizing of infrastructure." },
    ],
    outcomes: ["Automated, repeatable deployments", "Alerts before customers notice", "Visible and controlled cloud costs"],
    tech: ["AWS", "Docker", "CI/CD", "Python", "FastAPI", "PostgreSQL", "Redis"],
    faqs: [
      { q: "Can you audit our current setup?", a: "Yes. A short architecture and infrastructure review produces a prioritised list of risks and improvements." },
      { q: "Do you offer ongoing support?", a: "Yes. We offer monitoring, maintenance and on-call arrangements agreed per project." },
      { q: "Can you reduce our cloud bill?", a: "Often. We review usage, right-size resources and remove waste, and report the savings we find." },
    ],
    workTags: ["SaaS", "Custom Software", "AI"],
    seoDescription: "Cloud engineering, API design and DevOps: reliable, observable infrastructure for growing products.",
  },
  {
    slug: "ui-ux-design",
    num: "08",
    title: "UI/UX & Product Design",
    menuTitle: "UI/UX",
    menuSub: "Product Design / UX / Prototyping",
    summary: "Interfaces designed with engineering, not handed to it.",
    headline: "Product design that engineers can actually build.",
    intro:
      "Research, flows, interface design and interactive prototypes, produced by designers who work alongside the engineers building the product.",
    problem: {
      title: "Beautiful screens, unbuildable products.",
      body: [
        "Designs handed over the wall ignore technical constraints, skip edge cases and drift during implementation.",
        "Users pay for it with confusing flows and inconsistent interfaces.",
      ],
    },
    solution: {
      title: "Design and engineering in one room.",
      body: [
        "We prototype the riskiest flows first, test them with real users, then build a design system that maps directly to code components.",
        "Design decisions are documented, so they survive the launch.",
      ],
    },
    capabilities: [
      { title: "Product discovery", body: "Interviews, workflow mapping and problem framing." },
      { title: "UX flows and IA", body: "Task flows and information architecture that reduce steps and errors." },
      { title: "Interface design", body: "Clear, accessible interfaces with considered typography and motion." },
      { title: "Prototyping", body: "Interactive prototypes for testing before development." },
      { title: "Design systems", body: "Tokens and components mapped one-to-one to code." },
      { title: "Usability testing", body: "Structured sessions and prioritised findings." },
    ],
    outcomes: ["Risky flows tested before build", "A design system matched to code", "Accessible interfaces by default"],
    tech: ["Design systems", "Prototyping", "Usability testing", "Accessibility"],
    faqs: [
      { q: "Can you design without building?", a: "Yes. We deliver design work as a standalone engagement, including a documented design system for your team." },
      { q: "Do you do branding?", a: "We design product and digital identity systems. For full brand strategy we'll recommend specialist partners." },
      { q: "How do you test designs?", a: "With clickable prototypes and moderated sessions with your real users, kept short and focused." },
    ],
    workTags: ["Web", "Mobile", "SaaS"],
    seoDescription: "UI/UX and product design: research, prototyping and design systems built with engineering.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Mega-menu groups (6) → link targets */
export const serviceMenu = [
  { num: "01", title: "Mobile Development", sub: "iOS / Android / Cross-platform", href: "/services/mobile-app-development" },
  { num: "02", title: "Web Development", sub: "Websites / Web Apps / SaaS", href: "/services/web-development" },
  { num: "03", title: "AI & Automation", sub: "AI Applications / Agents / Automation", href: "/services/ai-development" },
  { num: "04", title: "Custom Software", sub: "CRM / ERP / Internal Platforms", href: "/services/custom-software" },
  { num: "05", title: "UI/UX", sub: "Product Design / UX / Prototyping", href: "/services/ui-ux-design" },
  { num: "06", title: "Cloud & Engineering", sub: "APIs / Infrastructure / DevOps", href: "/services/cloud-engineering" },
] as const;
