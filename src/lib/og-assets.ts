import fs from "node:fs";
import path from "node:path";

const root = () => path.join(/* turbopackIgnore: true */ process.cwd());

/** Inter woff files (satori needs non-variable woff). */
export const ogFont = (weight: 400 | 600 | 700) => fs.readFileSync(path.join(root(), "node_modules/@fontsource/inter/files", `inter-latin-${weight}-normal.woff`));

/** Manrope woff for display text in social images. */
export const ogDisplayFont = (weight: 700 | 800) => fs.readFileSync(path.join(root(), "node_modules/@fontsource/manrope/files", `manrope-latin-${weight}-normal.woff`));

/** Light (white + orange) logo lockup as a data URI for social images. */
export const ogLogo = (file: "mark-light.png" | "word-light.png") => `data:image/png;base64,${fs.readFileSync(path.join(root(), "public/brand", file)).toString("base64")}`;

export const OG = {
  ink: "#10131A",
  indigo: "#A5A8FF",
  text: "#FFFFFF",
  muted: "#A7ADBA",
  glow: "radial-gradient(circle at 85% 0%, rgba(99,102,241,0.45), rgba(16,19,26,0) 55%)",
} as const;
