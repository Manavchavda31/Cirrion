import fs from "node:fs";
import path from "node:path";

const root = () => path.join(/* turbopackIgnore: true */ process.cwd());

/** Inter woff files (satori needs non-variable woff). */
export const ogFont = (weight: 400 | 600 | 700) => fs.readFileSync(path.join(root(), "node_modules/@fontsource/inter/files", `inter-latin-${weight}-normal.woff`));

/** Light (white + orange) logo lockup as a data URI for social images. */
export const ogLogo = (file: "mark-light.png" | "word-light.png") => `data:image/png;base64,${fs.readFileSync(path.join(root(), "public/brand", file)).toString("base64")}`;

export const OG = { navy: "#0B1622", orange: "#F97316", text: "#FFFFFF", muted: "#D3DAE2" } as const;
