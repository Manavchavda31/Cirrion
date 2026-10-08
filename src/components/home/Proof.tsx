import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Glyph } from "@/components/ui/Glyph";
import { cn } from "@/lib/cn";

/**
 * Metrics strip: clean numbers with small indigo icons on soft pastel circles.
 * Only entries flagged `verified` in content/site render, so nothing is ever invented.
 */
export function Proof({ className }: { className?: string }) {
  const items = site.proof.filter((p) => p.verified).slice(0, 5);
  if (!items.length) return null;
  return (
    <section aria-label="At a glance" className={cn("surface-white", className)}>
      <div className="container-x">
        <ul className={cn("grid grid-cols-2 border-y border-line md:grid-cols-3", items.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
          {items.map((p, i) => (
            <Reveal
              key={p.label}
              as="li"
              delay={i * 70}
              className={cn(
                "relative px-1 py-9 sm:px-6 lg:py-11",
                // separators: a hairline between columns, never on the outer edges
                "[&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:inset-y-8 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-line",
                "max-md:[&:nth-child(odd)]:before:hidden max-md:[&:nth-child(n+3)]:border-t max-md:[&:nth-child(n+3)]:border-line",
                "md:max-lg:[&:nth-child(3n+1)]:before:hidden md:max-lg:[&:nth-child(n+4)]:border-t md:max-lg:[&:nth-child(n+4)]:border-line",
                i === items.length - 1 && items.length % 2 === 1 && "max-md:col-span-2",
              )}
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(140deg,#f3f1ff,#eaf2ff)] text-indigo-deep ring-1 ring-indigo/10">
                <Glyph name={p.icon} className="h-[20px] w-[20px]" />
              </span>
              <p className="mt-6 font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-extrabold tracking-[-0.045em] text-fg">{p.value}</p>
              <p className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-fg-2">{p.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
