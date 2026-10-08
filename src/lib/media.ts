import fs from "node:fs";
import path from "node:path";

const EXT = ["avif", "webp", "jpg", "jpeg", "png"];
const cache = new Map<string, string | null>();

/**
 * Server-only. Returns the public URL of a photo at public/<dir>/<slug>.<ext> if one exists, else null.
 * Lets real photography replace the code-built scenes by dropping a file in, with no code change.
 */
export function findPhoto(dir: string, slug: string): string | null {
  const key = `${dir}/${slug}`;
  if (cache.has(key) && process.env.NODE_ENV === "production") return cache.get(key)!;
  let found: string | null = null;
  for (const e of EXT) {
    if (fs.existsSync(path.join(/* turbopackIgnore: true */ process.cwd(), "public", dir, `${slug}.${e}`))) {
      found = `/${dir}/${slug}.${e}`;
      break;
    }
  }
  cache.set(key, found);
  return found;
}
