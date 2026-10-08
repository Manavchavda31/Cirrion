"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { techGroups, type TechGroup } from "@/content/tech";
import { techIcons } from "@/content/tech-icons";
import { Glyph } from "@/components/ui/Glyph";
import { cn } from "@/lib/cn";

/** Where each layer floats around the core (desktop stage), and which way its card grows when it opens. */
const place: Record<string, { box: string; line: [number, number]; grow: "left" | "right" | "center" }> = {
  frontend: { box: "left-[6%] top-[9%]", line: [20, 15], grow: "right" },
  backend: { box: "right-[6%] top-[13%]", line: [80, 19], grow: "left" },
  data: { box: "right-[5%] bottom-[17%]", line: [82, 76], grow: "left" },
  ai: { box: "left-1/2 bottom-[4%] -translate-x-1/2", line: [50, 91], grow: "center" },
  cloud: { box: "left-[5%] bottom-[22%]", line: [18, 71], grow: "right" },
};

/** Concept items without a brand mark get a neutral glyph; brands without a mark get a monogram. */
const conceptGlyph: Record<string, string> = { RAG: "layers", "Semantic Search": "search", "Cloud Infrastructure": "cloud", "CI/CD": "route" };

function TechMark({ name }: { name: string }) {
  const icon = techIcons[name];
  if (icon) {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden>
        <path d={icon.path} fill="currentColor" />
      </svg>
    );
  }
  if (conceptGlyph[name]) return <Glyph name={conceptGlyph[name]!} className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />;
  return (
    <span aria-hidden className="grid h-3.5 min-w-3.5 place-items-center rounded-[4px] bg-fg px-[2px] text-[8px] leading-none font-bold text-white">
      {name === "AWS" ? "aws" : name.slice(0, 2)}
    </span>
  );
}

function Pills({ g, className }: { g: TechGroup; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={`${g.label} technologies`}>
      {g.items.map((t, i) => (
        <li
          key={t}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[0.8125rem] font-medium text-fg-2 shadow-[0_1px_0_rgb(17_19_24/0.03)]"
          style={{ animation: `fade-up 0.45s var(--ease-out) both`, animationDelay: `${i * 45}ms` }}
        >
          <TechMark name={t} />
          {t}
        </li>
      ))}
    </ul>
  );
}

/**
 * Technology ecosystem: the Cirrion engineering stack at the centre of a soft gradient stage, with the five layers
 * floating around it. Hovering, focusing or tapping a layer reveals its technologies. While the stage is on screen
 * and nobody has interacted, it slowly cycles through the layers (off under reduced motion).
 */
export function TechEcosystem() {
  const [active, setActive] = useState("ai");
  const touched = useRef(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e?.isIntersecting && !touched.current) {
        timer = window.setInterval(() => {
          if (touched.current) return window.clearInterval(timer);
          setActive((cur) => techGroups[(techGroups.findIndex((g) => g.key === cur) + 1) % techGroups.length]!.key);
        }, 3800);
      }
    });
    if (stage.current) io.observe(stage.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  const choose = (k: string) => {
    touched.current = true;
    setActive(k);
  };
  const current = techGroups.find((g) => g.key === active)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
      {/* left: statement + layer index */}
      <div className="lg:col-span-4">
        <p className="eyebrow">Technology</p>
        <h2 id="tech-title" className="h2-xl mt-5">
          The stack behind what we build.
        </h2>
        <p className="lead mt-6">We choose technology based on the product, the outcome and long-term flexibility.</p>
        <ul className="mt-10 hidden border-t border-line lg:block">
          {techGroups.map((g) => (
            <li key={g.key} className="border-b border-line">
              <button
                type="button"
                onMouseEnter={() => choose(g.key)}
                onFocus={() => choose(g.key)}
                onClick={() => choose(g.key)}
                aria-pressed={g.key === active}
                className="group flex w-full items-center gap-4 py-4 text-left"
              >
                <span className={cn("h-2 w-2 rounded-full transition-all duration-300", g.key === active ? "scale-125 bg-indigo shadow-[0_0_0_4px_rgb(99_102_241/0.15)]" : "bg-line-2")} />
                <span className={cn("font-display text-[1.0625rem] font-bold tracking-[-0.02em] transition-colors", g.key === active ? "text-fg" : "text-fg-3 group-hover:text-fg")}>{g.label}</span>
                <span className="ml-auto text-[0.875rem] text-fg-3">{g.job}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* right: the stage */}
      <div className="lg:col-span-8">
        <div ref={stage} className="relative isolate hidden aspect-[1.18/1] overflow-hidden rounded-[32px] border border-white bg-[linear-gradient(140deg,#f3f1ff_0%,#eef0ff_45%,#eaf2ff_100%)] shadow-[inset_0_0_0_1px_rgb(99_102_241/0.08)] md:block">
          {/* atmosphere */}
          <div aria-hidden className="eco-glow absolute top-[45%] left-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.22),transparent)]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(17_19_24/0.06)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />

          {/* orbits + connectors */}
          <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {Object.entries(place).map(([k, p]) => (
              <line
                key={k}
                x1="50"
                y1="45"
                x2={p.line[0]}
                y2={p.line[1]}
                stroke={k === active ? "#6366F1" : "#6366F1"}
                strokeOpacity={k === active ? 0.75 : 0.18}
                strokeWidth={k === active ? 1.6 : 1}
                strokeDasharray={k === active ? "5 6" : "2 5"}
                vectorEffect="non-scaling-stroke"
                className={k === active ? "eco-flow" : undefined}
                style={{ transition: "stroke-opacity .4s" }}
              />
            ))}
          </svg>
          <div aria-hidden className="absolute top-[45%] left-1/2 -z-10 aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo/15" />
          <div aria-hidden className="absolute top-[45%] left-1/2 -z-10 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-indigo/15" />

          {/* core */}
          <div className="absolute top-[45%] left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2">
            <div className="eco-float-sm relative grid aspect-square place-items-center rounded-[28%] border border-white bg-white/90 text-center shadow-[0_30px_70px_-30px_rgb(30_34_80/0.45)] backdrop-blur">
              <span aria-hidden className="absolute inset-[18%] -z-10 rounded-full bg-indigo/20 blur-2xl" />
              <div>
                <Image src="/brand/mark.png" alt="" width={258} height={262} className="mx-auto h-auto w-[34%]" />
                <p className="mt-3 text-[0.6875rem] font-semibold tracking-[0.22em] text-fg-3 uppercase">Cirrion</p>
                <p className="mt-1 font-display text-[clamp(0.95rem,1.4vw,1.25rem)] leading-tight font-extrabold tracking-[-0.02em]">
                  Engineering
                  <br />
                  stack
                </p>
              </div>
            </div>
          </div>

          {/* layers */}
          {techGroups.map((g) => {
            const p = place[g.key]!;
            const on = g.key === active;
            return (
              <div key={g.key} className={cn("absolute z-10", p.box)}>
                <div
                  className={cn(
                    "rounded-[20px] border bg-white/95 p-3 backdrop-blur transition-[box-shadow,border-color,width,opacity] duration-500 ease-out",
                    on ? "w-[288px] border-indigo/30 shadow-[0_0_0_1px_rgb(99_102_241/0.12),0_30px_60px_-28px_rgb(79_84_229/0.55)]" : "w-[176px] border-white opacity-90 shadow-[0_16px_40px_-24px_rgb(30_34_80/0.35)] hover:opacity-100",
                    p.grow === "left" && "ml-auto",
                  )}
                >
                  <button
                    type="button"
                    onMouseEnter={() => choose(g.key)}
                    onFocus={() => choose(g.key)}
                    onClick={() => choose(g.key)}
                    aria-expanded={on}
                    aria-controls={`tech-${g.key}`}
                    className="flex w-full items-center gap-3 rounded-xl text-left"
                  >
                    <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500", on ? "bg-[linear-gradient(140deg,#5b5fef,#8b8ff8)] text-white" : "bg-lavender text-indigo-deep")}>
                      <Glyph name={g.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1rem] leading-tight font-bold tracking-[-0.02em]">{g.label}</span>
                      <span className="block truncate text-[0.75rem] text-fg-3">{on ? g.job : `${g.items.length} technologies`}</span>
                    </span>
                  </button>
                  <div id={`tech-${g.key}`} hidden={!on}>
                    {on && <Pills g={g} className="mt-3 border-t border-line pt-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* small screens: simplified ecosystem as a selectable list */}
        <div className="md:hidden">
          <div className="rounded-[26px] bg-[linear-gradient(140deg,#f3f1ff,#eaf2ff)] p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/80 p-4">
              <Image src="/brand/mark.png" alt="" width={258} height={262} className="h-10 w-auto" />
              <p className="font-display text-[1.0625rem] leading-tight font-extrabold tracking-[-0.02em]">
                Cirrion engineering stack
                <span className="block text-[0.8125rem] font-medium tracking-normal text-fg-3">Tap a layer to see its tools</span>
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Technology layers">
              {techGroups.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => choose(g.key)}
                  aria-pressed={g.key === active}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.875rem] font-semibold transition-colors",
                    g.key === active ? "bg-indigo-deep text-white" : "bg-white text-fg-2",
                  )}
                >
                  <Glyph name={g.icon} className="h-4 w-4" />
                  {g.label}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-2xl bg-white p-4" aria-live="polite">
              <p className="text-[0.8125rem] text-fg-3">{current.job}</p>
              <Pills key={current.key} g={current} className="mt-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
