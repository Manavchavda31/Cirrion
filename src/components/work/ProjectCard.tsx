import { TrackedLink } from "@/components/ui/TrackedLink";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/content/types";

/** Text-first case-study card. A screenshot appears only if a real one exists. */
export function ProjectCard({ project: p, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <TrackedLink href={`/work/${p.slug}`} event="case_study_click" eventLabel={p.name} className="group card card-hover flex h-full flex-col !rounded-[22px]">
      <ProjectMedia project={p} priority={priority} sizes="(min-width:1024px) 33vw, 100vw" className="mb-6 aspect-[16/10] !rounded-[14px]" />
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow !text-[0.72rem]">{p.industry}</p>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-2 text-fg transition-[background-color,border-color,color] duration-300 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white">
          <span className="arrow" aria-hidden>
            →
          </span>
        </span>
      </div>
      <h3 className="row-title mt-5 font-display text-[1.75rem] leading-tight font-bold tracking-[-0.035em]">{p.name}</h3>
      <p className="meta mt-1">{p.type}</p>
      {p.sample && <p className="meta mt-2">Sample project</p>}
      <p className="mt-5 leading-relaxed text-fg-2">{p.outcome}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-7" aria-label="Technology">
        {p.tech.slice(0, 4).map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <span className="sr-only">View case study</span>
    </TrackedLink>
  );
}
