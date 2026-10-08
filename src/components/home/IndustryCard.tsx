import { IndustryMedia } from "@/components/media/IndustryMedia";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { Industry } from "@/content/types";
import { cn } from "@/lib/cn";

/** White industry card: image, number, title, one line, "Explore" link. `feature` is the large card, `wide` lies horizontally. */
export function IndustryCard({ ind, index, variant = "default", priority }: { ind: Industry; index: number; variant?: "default" | "feature" | "wide"; priority?: boolean }) {
  return (
    <TrackedLink
      href={`/industries/${ind.slug}`}
      event="industry_click"
      eventLabel={ind.title}
      className="group card card-hover flex h-full flex-col overflow-hidden !rounded-[22px] !p-0"
    >
      <span
        className={cn(
          "media m-2 mb-0 block shrink-0 !rounded-[16px]",
          variant === "default" && "aspect-[16/10]",
          variant === "feature" && "aspect-[16/10] lg:aspect-auto lg:min-h-[340px] lg:flex-1",
          variant === "wide" && "aspect-[16/10] sm:aspect-[16/7]",
        )}
      >
        <IndustryMedia
          slug={ind.slug}
          priority={priority}
          sizes={variant === "feature" ? "(min-width:1024px) 640px, 100vw" : variant === "wide" ? "(min-width:1024px) 340px, 100vw" : "(min-width:1024px) 320px, (min-width:640px) 50vw, 100vw"}
        />
      </span>
      <span className={cn("flex flex-col p-6", variant !== "feature" && "flex-1", variant === "feature" && "lg:p-8")}>
        <span className="font-display text-[0.875rem] font-semibold text-fg-3">{String(index + 1).padStart(2, "0")}</span>
        <span className={cn("row-title mt-2 block font-display font-bold tracking-[-0.03em]", variant === "feature" ? "text-[clamp(1.75rem,2.4vw,2.25rem)] leading-[1.08]" : "text-[1.375rem] leading-tight")}>
          {ind.title}
        </span>
        <span className={cn("mt-2 block leading-relaxed text-fg-2", variant === "feature" ? "text-[1.0625rem]" : "text-[0.9375rem]")}>{ind.summary}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.9375rem] font-semibold text-accent">
          Explore {ind.title}
          <span className="arrow" aria-hidden>
            →
          </span>
        </span>
      </span>
    </TrackedLink>
  );
}
