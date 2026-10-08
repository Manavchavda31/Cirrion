import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { getService } from "@/content/services";
import { cn } from "@/lib/cn";

type Slot = { slug: string; title?: string; className: string; variant: "hero" | "wide" | "tall" };

/** Deliberately unequal: one large primary card, one wide card, then supporting cards and a closing prompt. */
const slots: Slot[] = [
  { slug: "mobile-app-development", variant: "hero", className: "lg:col-span-6 lg:row-span-2" },
  { slug: "web-app-development", variant: "wide", className: "lg:col-span-6" },
  { slug: "saas-development", variant: "tall", className: "lg:col-span-3" },
  { slug: "ai-development", variant: "tall", className: "lg:col-span-3" },
  { slug: "custom-software", variant: "tall", className: "lg:col-span-4" },
  { slug: "cloud-engineering", title: "Cloud & DevOps", variant: "tall", className: "lg:col-span-4" },
];

export function ServicesBento() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {slots.map((slot, i) => {
        const s = getService(slot.slug);
        if (!s) return null;
        const title = slot.title ?? s.title;
        return (
          <Reveal key={s.slug} as="li" delay={(i % 3) * 70} className={cn("h-full", slot.variant === "hero" && "sm:col-span-2", slot.variant === "wide" && "sm:col-span-2", slot.className)}>
            <TrackedLink
              href={`/services/${s.slug}`}
              event="service_click"
              eventLabel={title}
              className={cn(
                "group card card-hover flex h-full overflow-hidden !p-0",
                slot.variant === "wide" ? "flex-col md:flex-row" : "flex-col",
              )}
            >
              <span
                className={cn(
                  "media block shrink-0 !rounded-none",
                  slot.variant === "hero" && "aspect-[16/11] lg:aspect-auto lg:min-h-[380px] lg:flex-1",
                  slot.variant === "wide" && "aspect-[16/10] md:order-2 md:aspect-auto md:w-[54%]",
                  slot.variant === "tall" && "aspect-[16/10]",
                )}
              >
                <ServiceVisual slug={s.slug} />
              </span>
              <span className={cn("flex flex-col p-6 lg:p-7", slot.variant === "wide" && "md:flex-1 md:justify-center lg:p-9", slot.variant === "hero" && "lg:p-9")}>
                <span className="flex items-center gap-3 text-[0.8125rem] font-semibold text-fg-3">
                  <span className="font-display text-indigo-deep">{s.num}</span>
                  <span className="h-px w-6 bg-line-2" />
                  {slot.variant === "hero" ? "Primary capability" : "Service"}
                </span>
                <span className={cn("row-title mt-3 block font-display font-bold tracking-[-0.03em]", slot.variant === "hero" ? "text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.08]" : "text-[1.375rem] leading-tight")}>
                  {title}
                </span>
                <span className={cn("mt-3 block leading-relaxed text-fg-2", slot.variant === "hero" ? "max-w-[44ch] text-[1.0625rem]" : "text-[0.9688rem]")}>{s.summary}</span>
                {slot.variant === "hero" && (
                  <span className="mt-5 flex flex-wrap gap-2">
                    {s.capabilities.slice(0, 4).map((c) => (
                      <span key={c.title} className="tag">
                        {c.title}
                      </span>
                    ))}
                  </span>
                )}
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
      <Reveal as="li" delay={140} className="h-full sm:col-span-2 lg:col-span-4">
        <div className="relative isolate flex h-full min-h-[260px] flex-col overflow-hidden rounded-[20px] bg-[linear-gradient(140deg,#4f54e5,#6366f1)] p-7 text-white lg:p-8">
          <svg aria-hidden className="absolute -right-10 -bottom-12 -z-10 h-64 w-64 text-white/25" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeDasharray="2 7" />
            <circle cx="100" cy="100" r="46" stroke="currentColor" />
            <circle cx="100" cy="20" r="5" fill="currentColor" />
            <circle cx="180" cy="100" r="5" fill="currentColor" />
            <circle cx="54" cy="100" r="4" fill="#F47B20" />
          </svg>
          <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-white/90 uppercase">Not sure where to start?</p>
          <p className="mt-4 max-w-[18ch] font-display text-[1.625rem] leading-[1.12] font-bold tracking-[-0.03em]">Bring the problem. We&apos;ll shape the product.</p>
          <TrackedLink href="/services" event="cta_click" eventLabel="All services (bento)" className="btn btn-light btn-sm mt-auto self-start">
            All eight services
            <span className="arrow" aria-hidden>
              →
            </span>
          </TrackedLink>
        </div>
      </Reveal>
    </ul>
  );
}
