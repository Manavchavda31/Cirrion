import Image from "next/image";
import { stagePhoto } from "./ProcessCompact";
import { Reveal } from "@/components/ui/Reveal";
import type { ProcessStep } from "@/content/types";

/** Full process: one ruled row per stage with what happens and what you receive. */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="rule-list">
      {steps.map((s) => (
        <Reveal key={s.num} as="li" className="group grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
          <div className="photo aspect-[4/3] lg:col-span-4">
            <Image src={stagePhoto(s.title)} alt="" width={1200} height={900} sizes="(min-width:1024px) 400px, 100vw" className="h-full w-full" />
          </div>
          <div className="lg:col-span-5">
            <p className="text-[0.9375rem] font-semibold text-accent">Stage {s.num.slice(1)}</p>
            <h3 className="h2 mt-2">{s.title}</h3>
            <p className="mt-3 max-w-[36ch] text-[1.0625rem] text-fg-2">{s.lead}</p>
            <ul className="mt-5 space-y-2 text-fg-2">
              {s.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 lg:border-l lg:border-line lg:pl-8">
            <p className="text-[0.9375rem] font-semibold text-fg-3">You receive</p>
            <p className="mt-3 text-fg">{s.deliverable}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
