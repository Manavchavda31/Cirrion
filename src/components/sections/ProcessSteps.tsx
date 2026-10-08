import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import type { ProcessStep } from "@/content/types";
import { cn } from "@/lib/cn";

const glyphs: Record<string, string> = { Discover: "search", Design: "pen", Build: "code", Validate: "check", Launch: "launch", Grow: "growth" };
const tints = ["from-[#f3f1ff] to-[#eaf2ff]", "from-[#eaf2ff] to-[#f3f1ff]"];

/** Full process: one row per stage with a stage panel, what happens and what you receive, joined by a vertical rail. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="relative">
      <span aria-hidden className="absolute top-4 bottom-4 left-[19px] hidden w-px bg-[linear-gradient(to_bottom,transparent,#d9dde6_6%,#d9dde6_94%,transparent)] lg:block" />
      {steps.map((s, i) => (
        <Reveal key={s.num} as="li" className="relative grid gap-8 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14 lg:pl-16">
          <span aria-hidden className="absolute top-[3.4rem] left-[12px] hidden h-4 w-4 rounded-full border-2 border-indigo bg-white shadow-[0_0_0_6px_rgb(99_102_241/0.12)] lg:block" />
          <div className={cn("relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-br p-7 lg:col-span-4", tints[i % 2])}>
            <svg aria-hidden className="absolute -right-8 -bottom-10 -z-10 h-56 w-56 text-indigo/20" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeDasharray="2 7" />
              <circle cx="100" cy="100" r="46" stroke="currentColor" />
              <circle cx="100" cy="20" r="5" fill="currentColor" />
              {i === 0 && <circle cx="54" cy="100" r="4" fill="#F47B20" />}
            </svg>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-indigo-deep shadow-[var(--shadow-sm)]">
              <Glyph name={glyphs[s.title] ?? "spark"} className="h-6 w-6" />
            </span>
            <span className="font-display text-[clamp(4rem,7vw,6rem)] leading-none font-extrabold tracking-[-0.06em] text-indigo-deep/90">{s.num}</span>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow">Stage {s.num}</p>
            <h3 className="h2 mt-4">{s.title}</h3>
            <p className="mt-4 max-w-[38ch] text-[1.125rem] leading-relaxed text-fg-2">{s.lead}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li key={it} className="tag">
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-[20px] border border-line bg-white p-6">
              <p className="text-[0.75rem] font-semibold tracking-[0.12em] text-fg-3 uppercase">You receive</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg">{s.deliverable}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
