import Image from "next/image";
import type { Project } from "@/content/types";

/**
 * Real screenshot when one exists (public/projects/<slug>/cover.*). Renders nothing otherwise:
 * there are no placeholder drawings, so a case study never shows invented interface.
 */
export function ProjectMedia({ project: p, className = "", sizes = "(min-width:1024px) 60vw, 100vw", priority = false }: { project: Project; className?: string; sizes?: string; priority?: boolean }) {
  const cover = p.media?.cover;
  if (!cover) return null;
  return (
    <div className={`relative overflow-hidden rounded-lg border border-line bg-bg-2 ${className}`}>
      <Image src={cover} alt={`${p.name} screenshot`} fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  );
}
