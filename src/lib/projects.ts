import fs from "node:fs";
import path from "node:path";
import { projects } from "@/content/projects";
import type { Project, ProjectTag } from "@/content/types";

/**
 * Server-only. Adds real screenshots to each project when files exist in
 * public/projects/<slug>/ (cover.* and shot-1.* ... shot-6.*). No code change needed to add them.
 */
const EXT = ["png", "jpg", "jpeg", "webp"];

function find(dir: string, base: string, slug: string) {
  for (const e of EXT) {
    if (fs.existsSync(path.join(/* turbopackIgnore: true */ dir, `${base}.${e}`))) return `/projects/${slug}/${base}.${e}`;
  }
  return undefined;
}

let cache: Project[] | null = null;
export function getAllProjects(): Project[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const list = projects.map((p) => {
    const dir = path.join(/* turbopackIgnore: true */ process.cwd(), "public", "projects", p.slug);
    const cover = find(dir, "cover", p.slug);
    const gallery: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const g = find(dir, `shot-${i}`, p.slug);
      if (g) gallery.push(g);
    }
    return { ...p, media: { cover, gallery } };
  });
  cache = list;
  return list;
}

export const getProjectBySlug = (slug: string) => getAllProjects().find((p) => p.slug === slug);
export const getRelatedProjects = (tags: ProjectTag[], limit = 3) => getAllProjects().filter((p) => p.tags.some((t) => tags.includes(t))).slice(0, limit);
