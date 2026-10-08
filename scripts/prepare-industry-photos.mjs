/**
 * Prepares industry photographs for the site.
 *
 *   npm run photos              # reads assets/industry-photos/<slug>.(jpg|jpeg|png|webp|tif|tiff)
 *   npm run photos -- <dir>     # or any other folder
 *
 * Each file is cropped to 16:10 around its most interesting region, capped at 2400 px wide and written to
 * public/industries/<slug>.webp. The site picks it up automatically (lib/media.ts) and next/image serves
 * responsive AVIF/WebP sizes from it, replacing the code-built scene for that industry.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SLUGS = ["healthcare", "fintech", "real-estate", "education", "retail", "hospitality", "logistics", "professional-services"];
const src = path.resolve(process.argv[2] ?? "assets/industry-photos");
const out = path.resolve("public/industries");

if (!fs.existsSync(src)) {
  console.error(`No folder at ${src}. Put <slug>.jpg files there (slugs: ${SLUGS.join(", ")}).`);
  process.exit(1);
}
fs.mkdirSync(out, { recursive: true });

const files = fs.readdirSync(src).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
let done = 0;
for (const f of files) {
  const slug = path.parse(f).name.toLowerCase();
  if (!SLUGS.includes(slug)) {
    console.warn(`skip ${f}: name must be one of ${SLUGS.join(", ")}`);
    continue;
  }
  const meta = await sharp(path.join(src, f)).metadata();
  const width = Math.min(2400, meta.width ?? 2400);
  const height = Math.round(width / 1.6);
  const target = path.join(out, `${slug}.webp`);
  await sharp(path.join(src, f))
    .rotate()
    .resize({ width, height, fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 82, effort: 6 })
    .toFile(target);
  console.log(`✓ ${slug}.webp  ${width}×${height}  ${Math.round(fs.statSync(target).size / 1024)} KB`);
  done++;
}
console.log(done ? `\n${done} photo(s) ready in public/industries.` : "Nothing converted.");
