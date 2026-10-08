import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.name}: ${p.type} case study`,
    description: p.outcome,
    path: `/work/${p.slug}`,
    image: `/og/work/${p.slug}`,
    // illustrative placeholders stay out of search; real projects are indexed
    noindex: p.sample,
  });
}

function Block({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <section className="hairline-t py-[clamp(48px,6vw,80px)]" aria-labelledby={`cs-${n}`}>
      <div className="container-x grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id={`cs-${n}`} className="eyebrow lg:sticky lg:top-24">
            {label}
          </h2>
        </div>
        <div className="lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProjectBySlug(slug);
  if (!p) notFound();

  const all = getAllProjects();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length]!;

  // Sections are numbered dynamically so an optional section never leaves a gap.
  const sections: { label: string; body: React.ReactNode }[] = [];

  const paragraphs = (items: string[]) => (
    <div className="space-y-5">
      {items.map((t, i) => (
        <Reveal key={i} delay={i * 50}>
          <p className={i === 0 ? "text-[1.1875rem] leading-relaxed text-fg" : "prose-body"}>{t}</p>
        </Reveal>
      ))}
    </div>
  );

  sections.push({ label: "The challenge", body: paragraphs(p.challenge) });
  sections.push({ label: "The approach", body: paragraphs(p.approach) });
  sections.push({ label: "What we built", body: paragraphs(p.product) });
  sections.push({
    label: "Engineering highlights",
    body: (
      <ul className="grid gap-4 sm:grid-cols-2">
        {p.highlights.map((h, i) => (
          <Reveal key={h.title} as="li" delay={(i % 2) * 60} className="h-full">
            <div className="card h-full">
              <h3 className="h3">{h.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-fg-2">{h.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    ),
  });
  sections.push({
    label: "Technology",
    body: (
      <dl className="rule-list">
        {p.stack.map((g, i) => (
          <Reveal key={g.label} as="div" delay={(i % 3) * 40} className="grid gap-2 border-t border-line py-4 first:border-t-0 sm:grid-cols-[10rem_1fr]">
            <dt className="text-[0.9375rem] font-semibold">{g.label}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    ),
  });
  sections.push({
    label: "Results",
    body: (
      <div>
        {p.metrics.length > 0 && (
          <dl className="mb-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-display font-extrabold tracking-[-0.04em] text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-fg">{m.value}</dd>
                <dt className="mt-2 text-fg-2">{m.label}</dt>
              </div>
            ))}
          </dl>
        )}
        <ul className="rule-list">
          {p.results.map((r, i) => (
            <Reveal key={i} as="li" delay={i * 50} className="flex gap-3 py-4 text-[1.0625rem]">
              <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-indigo" />
              {r.text}
            </Reveal>
          ))}
        </ul>
        {p.metrics.length === 0 && <p className="meta mt-5">Measured figures are published here only once the client has approved them.</p>}
      </div>
    ),
  });
  if (p.media?.gallery.length) {
    sections.push({
      label: "Product gallery",
      body: (
        <div className="grid gap-4 sm:grid-cols-2">
          {p.media.gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 60} className={i === 0 && p.media!.gallery.length % 2 === 1 ? "sm:col-span-2" : ""}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line">
                <Image src={src} alt={`${p.name} screenshot ${i + 1}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
              </div>
            </Reveal>
          ))}
        </div>
      ),
    });
  }
  if (p.testimonial) {
    sections.push({
      label: "Client testimonial",
      body: (
        <blockquote>
          <p className="font-display font-bold tracking-[-0.025em] text-[clamp(1.5rem,2.6vw,2.125rem)] leading-snug">&ldquo;{p.testimonial.quote}&rdquo;</p>
          <footer className="mt-6 text-fg-2">
            <span className="font-medium text-fg">{p.testimonial.name}</span>, {p.testimonial.role}, {p.testimonial.company} · {p.testimonial.country}
          </footer>
        </blockquote>
      ),
    });
  }

  const meta = [
    ["Client", p.client],
    ["Industry", p.industry],
    ["Type", p.type],
    ["Role", p.role],
    ["Period", p.year],
    ["Country", p.country],
  ].filter((x): x is [string, string] => Boolean(x[1]));

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf8,#ffffff)]">
        <div aria-hidden className="absolute -top-[30%] right-[-10%] -z-10 h-[90%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.5)_60%,transparent)]" />
        <div className="container-x page-top pb-14 md:pb-20">
          <div className="hero-in mt-4 mb-10" style={{ "--i": 0 } as React.CSSProperties}>
            <Breadcrumbs
              items={[
                { name: "Work", path: "/work" },
                { name: p.name, path: `/work/${p.slug}` },
              ]}
            />
          </div>
          <p className="eyebrow hero-in" style={{ "--i": 1 } as React.CSSProperties}>
            Case study · {p.type}
            {p.sample && " · Sample project"}
          </p>
          <h1 className="h1-page hero-in mt-6" style={{ "--i": 2 } as React.CSSProperties}>
            {p.name}
          </h1>
          <p className="lead hero-in mt-6" style={{ "--i": 3 } as React.CSSProperties}>
            {p.outcome}
          </p>

          <dl className="hero-in mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line-2 pt-6 md:grid-cols-3 lg:grid-cols-6" style={{ "--i": 4 } as React.CSSProperties}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">{k}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          {p.sample && <p className="meta mt-6 max-w-[64ch]">This is a sample project. It shows how a Cirrion case study is structured and is not a real client engagement.</p>}
        </div>
      </section>

      {p.media?.cover && (
        <section className="container-x pt-10" aria-label="Product screenshot">
          <ProjectMedia project={p} priority sizes="100vw" className="aspect-[16/9] w-full" />
        </section>
      )}

      {sections.map((s, i) => (
        <Block key={s.label} n={String(i + 2).padStart(2, "0")} label={s.label}>
          {s.body}
        </Block>
      ))}

      <section className="surface-soft" aria-label="Next project">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="container-x py-12 md:py-16">
            <p className="eyebrow">Next project</p>
            <div className="mt-3 flex items-end justify-between gap-6">
              <div>
                <p className="h2 transition-colors group-hover:text-accent">{next.name}</p>
                <p className="mt-3 max-w-[56ch] text-fg-2">{next.outcome}</p>
              </div>
              <span aria-hidden className="arrow text-2xl text-fg-3">
                →
              </span>
            </div>
          </div>
        </Link>
      </section>

      <CtaBand title="Have something like this in mind?" text="Tell us what you're building. We'll reply within one working day." />
    </>
  );
}
