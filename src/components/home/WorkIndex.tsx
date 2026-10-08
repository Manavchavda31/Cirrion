import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { Project } from "@/content/types";

/** Case-study index: large editorial rows rather than cards. Text-first, like every project listing on the site. */
export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <ol className="border-t border-line">
      {projects.map((p, i) => (
        <Reveal key={p.slug} as="li" delay={i * 70} className="border-b border-line">
          <TrackedLink
            href={`/work/${p.slug}`}
            event="case_study_click"
            eventLabel={p.name}
            className="group relative isolate grid gap-x-8 gap-y-3 py-8 transition-colors duration-300 md:grid-cols-12 md:items-center lg:py-10"
          >
            <span aria-hidden className="absolute inset-y-0 -inset-x-4 -z-10 rounded-2xl bg-[linear-gradient(90deg,#f3f1ff,#eaf2ff00)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:-inset-x-6" />
            <span className="font-display text-[0.9375rem] font-semibold text-fg-3 md:col-span-1">0{i + 1}</span>
            <span className="md:col-span-4">
              <span className="row-title block font-display text-[clamp(1.5rem,2.4vw,2.125rem)] leading-tight font-bold tracking-[-0.035em]">{p.name}</span>
              <span className="mt-1 block text-[0.875rem] text-fg-3">
                {p.type} · {p.industry}
              </span>
            </span>
            <span className="text-[0.9688rem] leading-relaxed text-fg-2 md:col-span-5">{p.outcome}</span>
            <span className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
              <span className="flex flex-wrap gap-1.5 md:hidden xl:flex">
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="tag !px-2.5 !py-0.5 !text-[0.75rem]">
                    {t}
                  </span>
                ))}
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-2 bg-white text-fg transition-[background-color,border-color,color] duration-300 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white">
                <span className="arrow" aria-hidden>
                  →
                </span>
              </span>
            </span>
          </TrackedLink>
        </Reveal>
      ))}
    </ol>
  );
}
