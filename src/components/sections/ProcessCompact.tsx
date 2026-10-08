import { process } from "@/content/process";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";

const glyphs: Record<string, string> = { Discover: "search", Design: "pen", Build: "code", Validate: "check", Launch: "launch", Grow: "growth" };

/** Six-stage summary for service and industry pages: numbered, with a glyph per stage. The full version lives at /process. */
export function ProcessCompact() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {process.map((s, i) => (
        <Reveal key={s.num} as="li" delay={(i % 3) * 60} className="bg-white p-7">
          <div className="flex items-center justify-between">
            <span className="icon-tile">
              <Glyph name={glyphs[s.title] ?? "spark"} />
            </span>
            <span className="font-display text-[0.875rem] font-semibold text-fg-3">{s.num}</span>
          </div>
          <h3 className="mt-6 text-[1.375rem] font-bold tracking-[-0.03em]">{s.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">{s.lead}</p>
        </Reveal>
      ))}
    </ol>
  );
}
