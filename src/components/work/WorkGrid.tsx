"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project, ProjectTag } from "@/content/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function WorkGrid({ projects, limit, showFilters = true }: { projects: Project[]; limit?: number; showFilters?: boolean }) {
  const [filter, setFilter] = useState<"All" | ProjectTag>("All");
  // only offer filters that have at least one project
  const projectFilters = useMemo(() => {
    const tags: ProjectTag[] = [];
    projects.forEach((p) => p.tags.forEach((t) => !tags.includes(t) && tags.push(t)));
    return ["All", ...tags] as ("All" | ProjectTag)[];
  }, [projects]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    projectFilters.forEach((f) => m.set(f, f === "All" ? projects.length : projects.filter((p) => p.tags.includes(f)).length));
    return m;
  }, [projects, projectFilters]);

  const shown = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));
    return limit ? list.slice(0, limit) : list;
  }, [filter, projects, limit]);

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter projects" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {projectFilters.map((f) => {
            const n = counts.get(f) ?? 0;
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                disabled={n === 0}
                onClick={() => {
                  setFilter(f);
                  track("work_filter", { filter: f });
                }}
                className={cn(
                  "flex h-10 shrink-0 items-center gap-2 rounded-md border px-4 text-[0.9375rem] transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                  active ? "border-navy bg-navy text-white" : "border-line-2 text-fg-2 hover:border-fg hover:text-fg",
                )}
              >
                {f}
                <span className={cn("text-[0.8125rem]", active ? "text-white/70" : "text-fg-3")}>{n}</span>
              </button>
            );
          })}
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-lg border border-line p-10 text-center text-fg-2">No projects in this category yet.</div>
      ) : (
        <div key={filter} className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", showFilters && "mt-8")}>
          {shown.map((p, i) => (
            <div key={p.slug} className="page-enter" style={{ animationDelay: `${i * 60}ms` }}>
              <ProjectCard project={p} priority={i === 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
