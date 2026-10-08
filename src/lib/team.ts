import fs from "node:fs";
import path from "node:path";
import { team } from "@/content/team";
import type { TeamMember } from "@/content/types";

/** Server-only. Uses public/team/<slug>.(jpg|jpeg|png|webp) as the member photo when present. */
export function getTeam(): TeamMember[] {
  // Placeholder profiles are hidden on the public site. Set NEXT_PUBLIC_SHOW_PLACEHOLDER_TEAM=1 to preview the full layout.
  const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDER_TEAM === "1";
  return team.filter((m) => showPlaceholders || !m.placeholder).map((m) => {
    if (m.photo) return m;
    for (const e of ["jpg", "jpeg", "png", "webp"]) {
      if (fs.existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", "team", `${m.slug}.${e}`))) return { ...m, photo: `/team/${m.slug}.${e}` };
    }
    return m;
  });
}
