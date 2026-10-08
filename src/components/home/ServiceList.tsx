import { services } from "@/content/services";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { cn } from "@/lib/cn";

/**
 * All services (or the `only` subset, in that order) as visual cards. The first card is wide so the grid opens
 * with hierarchy instead of eight equal tiles.
 */
export function ServiceList({ only }: { only?: string[] }) {
  const list = only ? only.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean) : services;
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => {
        const wide = i === 0;
        return (
          <Reveal key={s.slug} as="li" delay={(i % 3) * 70} className={cn("h-full", wide && "md:col-span-2")}>
            <TrackedLink href={`/services/${s.slug}`} event="service_click" eventLabel={s.title} className={cn("group card card-hover flex h-full overflow-hidden !rounded-[22px] !p-0", wide ? "flex-col md:flex-row" : "flex-col")}>
              <span className={cn("media m-2 block shrink-0 !rounded-[16px]", wide ? "aspect-[16/10] md:order-2 md:mb-2 md:aspect-auto md:w-[56%]" : "mb-0 aspect-[16/10]")}>
                <ServiceVisual slug={s.slug} />
              </span>
              <span className={cn("flex flex-1 flex-col p-6 lg:p-7", wide && "md:justify-center lg:p-10")}>
                <span className="font-display text-[0.875rem] font-semibold text-indigo-deep">{s.num}</span>
                <span className={cn("row-title mt-2 block font-display font-bold tracking-[-0.03em]", wide ? "text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.08]" : "text-[1.375rem] leading-tight")}>{s.title}</span>
                <span className={cn("mt-3 block leading-relaxed text-fg-2", wide ? "text-[1.0625rem]" : "text-[0.9688rem]")}>{s.summary}</span>
                <span className="mt-4 text-[0.8125rem] text-fg-3">{s.menuSub}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-semibold text-accent">
                  Explore
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </span>
              </span>
            </TrackedLink>
          </Reveal>
        );
      })}
    </ul>
  );
}
