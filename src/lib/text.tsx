export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** Lower-cases a title for use mid-sentence while keeping acronyms and brand casing (AI, SaaS, UI/UX, FinTech). */
export const midSentence = (title: string) => title.replace(/[A-Za-z][\w/]*/g, (w) => ((w.match(/[A-Z]/g) ?? []).length >= 2 ? w : w.toLowerCase()));
