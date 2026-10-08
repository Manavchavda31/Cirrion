import { industries } from "@/content/industries";
import { Reveal } from "@/components/ui/Reveal";
import { IndustryCard } from "./IndustryCard";
import { cn } from "@/lib/cn";

/**
 * Editorial industries layout with hierarchy: a large featured card, four supporting cards, then one wide card
 * and two standard ones. Collapses to one column on phones.
 */
const layout = [
  { v: "feature", c: "lg:col-span-2 lg:row-span-2" },
  { v: "default", c: "" },
  { v: "default", c: "" },
  { v: "default", c: "" },
  { v: "default", c: "" },
  { v: "wide", c: "sm:col-span-2" },
  { v: "default", c: "" },
  { v: "default", c: "" },
] as const;

export function IndustriesShowcase() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {industries.map((ind, i) => {
        const slot = layout[i] ?? layout[1];
        return (
          <Reveal key={ind.slug} as="li" delay={(i % 4) * 60} className={cn("h-full", slot.v === "feature" && "sm:col-span-2", slot.c)}>
            <IndustryCard ind={ind} index={i} variant={slot.v} />
          </Reveal>
        );
      })}
    </ul>
  );
}
