import { TrackedLink } from "@/components/ui/TrackedLink";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/content/types";

/** Text-first case-study card. A screenshot appears only if a real one exists. */
export function ProjectCard({ project: p, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <TrackedLink href={`/work/${p.slug}`} event="case_study_click" eventLabel={p.name} className="card group flex h-full flex-col">
      <ProjectMedia project={p} priority={priority} sizes="(min-width:1024px) 33vw, 100vw" className="mb-5 aspect-[16/10]" />
      <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-accent uppercase">{p.industry}</p>
      <h3 className="h3 mt-2">{p.name}</h3>
      <p className="meta mt-1">{p.type}</p>
      {p.sample && <p className="meta mt-2">Sample project</p>}
      <p className="mt-4 text-fg-2">{p.outcome}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology">
        {p.tech.slice(0, 4).map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-[0.9375rem] font-medium text-accent">
        View case study <span className="arrow" aria-hidden>→</span>
      </p>
    </TrackedLink>
  );
}
