"use client";

import { useEffect, useRef, useState } from "react";
import { Glyph } from "@/components/ui/Glyph";
import type { ProcessStep } from "@/content/types";
import { cn } from "@/lib/cn";

const glyphs: Record<string, string> = { Discover: "search", Design: "pen", Build: "code", Validate: "check", Launch: "launch", Grow: "growth" };

/**
 * Six-stage journey. Desktop: a horizontal track whose line fills as the section scrolls through the viewport;
 * the active stage lifts and its detail shows below. Mobile: a vertical timeline with the same behaviour.
 * Stages are buttons, so the journey is fully usable by keyboard and without scrolling.
 */
export function ProcessJourney({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [manual, setManual] = useState<number | null>(null);
  const scrolledStep = Math.min(steps.length - 1, Math.floor(progress * steps.length * 0.999));
  const active = manual ?? scrolledStep;
  const lastScrolled = useRef(scrolledStep);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the track enters the lower third of the screen, 1 once its end passes the upper third
      const start = vh * 0.78;
      const end = vh * 0.3;
      const p = (start - r.top) / (r.height + start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // scrolling to a new stage hands control back from a clicked stage
  useEffect(() => {
    if (scrolledStep !== lastScrolled.current) {
      lastScrolled.current = scrolledStep;
      setManual(null);
    }
  }, [scrolledStep]);

  const fill = manual !== null ? (manual + 0.5) / steps.length : Math.max(progress, 0.5 / steps.length);
  const step = steps[active]!;

  return (
    <div ref={ref}>
      {/* desktop: horizontal journey */}
      <div className="hidden lg:block">
        <div className="relative grid grid-cols-6">
          <div aria-hidden className="absolute top-[7px] right-[8.33%] left-[8.33%] h-[2px] rounded-full bg-line" />
          <div
            aria-hidden
            className="absolute top-[7px] left-[8.33%] h-[2px] rounded-full bg-[linear-gradient(90deg,#4f54e5,#6366f1,#8b8ff8)] transition-[width] duration-500 ease-out"
            style={{ width: `calc(${Math.min(1, fill)} * 83.34%)` }}
          />
          {steps.map((s, i) => {
            const done = i < active;
            const on = i === active;
            return (
              <div key={s.num} className="relative flex flex-col items-center px-3 text-center">
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 h-4 w-4 rounded-full border-2 transition-all duration-500",
                    on ? "scale-125 border-indigo bg-white shadow-[0_0_0_6px_rgb(99_102_241/0.15)]" : done ? "border-indigo bg-indigo" : "border-line-2 bg-white",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setManual(i)}
                  aria-pressed={on}
                  aria-controls="process-detail"
                  className={cn(
                    "group mt-6 flex w-full flex-col items-center rounded-[20px] border px-4 pt-6 pb-7 transition-all duration-500 ease-out",
                    on ? "-translate-y-1 border-indigo/25 bg-white shadow-[var(--glow-indigo)]" : "border-transparent hover:bg-white/70",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500",
                      on ? "bg-[linear-gradient(140deg,#5b5fef,#8b8ff8)] text-white shadow-[0_12px_28px_-12px_rgb(99_102_241/0.8)]" : "bg-[linear-gradient(140deg,#f3f1ff,#eaf2ff)] text-indigo-deep",
                    )}
                  >
                    <Glyph name={glyphs[s.title] ?? "spark"} className="h-6 w-6" />
                  </span>
                  <span className={cn("mt-5 font-display text-[0.875rem] font-semibold", on ? "text-indigo-deep" : "text-fg-3")}>{s.num}</span>
                  <span className="mt-1 font-display text-[1.375rem] font-bold tracking-[-0.03em]">{s.title}</span>
                  <span className="mt-2 text-[0.875rem] leading-snug text-fg-2">{s.lead}</span>
                </button>
              </div>
            );
          })}
        </div>

        <div id="process-detail" aria-live="polite" className="mt-8 rounded-[22px] border border-line bg-bg p-8">
          <div key={active} className="page-enter grid grid-cols-12 items-start gap-8">
            <div className="col-span-4">
              <p className="eyebrow">
                Stage {step.num} · {step.title}
              </p>
              <p className="mt-4 font-display text-[1.5rem] leading-snug font-bold tracking-[-0.025em]">{step.lead}</p>
            </div>
            <div className="col-span-4">
              <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-fg-3 uppercase">What happens</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {step.items.map((it) => (
                  <li key={it} className="tag !bg-white">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 border-l border-line pl-8">
              <p className="text-[0.8125rem] font-semibold tracking-[0.1em] text-fg-3 uppercase">You receive</p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-fg">{step.deliverable}</p>
            </div>
          </div>
        </div>
      </div>

      {/* mobile: vertical timeline */}
      <ol className="relative lg:hidden">
        <span aria-hidden className="absolute top-2 bottom-2 left-[27px] w-[2px] rounded-full bg-line" />
        <span
          aria-hidden
          className="absolute top-2 left-[27px] w-[2px] rounded-full bg-[linear-gradient(180deg,#4f54e5,#8b8ff8)] transition-[height] duration-500 ease-out"
          style={{ height: `calc(${Math.min(1, fill)} * (100% - 16px))` }}
        />
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.num} className="relative pb-6 pl-[76px] last:pb-0">
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 left-0 grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500",
                  on || i < active ? "bg-[linear-gradient(140deg,#5b5fef,#8b8ff8)] text-white" : "border border-line bg-white text-indigo-deep",
                )}
              >
                <Glyph name={glyphs[s.title] ?? "spark"} className="h-6 w-6" />
              </span>
              <button type="button" onClick={() => setManual(i)} aria-expanded={on} className="w-full text-left">
                <span className={cn("font-display text-[0.8125rem] font-semibold", on ? "text-indigo-deep" : "text-fg-3")}>{s.num}</span>
                <span className="block font-display text-[1.375rem] leading-tight font-bold tracking-[-0.03em]">{s.title}</span>
                <span className="mt-1 block text-[0.9375rem] leading-snug text-fg-2">{s.lead}</span>
              </button>
              {on && (
                <div className="page-enter mt-4 rounded-2xl border border-line bg-white p-5">
                  <ul className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="tag !text-[0.8125rem]">
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.75rem] font-semibold tracking-[0.1em] text-fg-3 uppercase">You receive</p>
                  <p className="mt-1.5 text-[0.9375rem] text-fg">{s.deliverable}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
