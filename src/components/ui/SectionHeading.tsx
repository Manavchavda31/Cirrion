import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
  /** xl: home-page statement size. lg: inner-page section size. */
  size?: "lg" | "xl";
  /** split: title left, lead (and action) right on large screens. */
  layout?: "stack" | "split";
  action?: React.ReactNode;
  className?: string;
};

/** Section header: eyebrow, Manrope title, optional lead and action. */
export function SectionHeading({ eyebrow, title, lead, as: H = "h2", id, size = "lg", layout = "stack", action, className }: Props) {
  if (layout === "split") {
    return (
      <div className={cn("grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end", className)}>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <H id={id} className={cn(size === "xl" ? "h2-xl" : "h2", "mt-5")}>
            {title}
          </H>
        </Reveal>
        {(lead || action) && (
          <Reveal delay={80} className="lg:col-span-4 lg:col-start-9">
            {lead && <p className="lead">{lead}</p>}
            {action && <div className={lead ? "mt-6" : undefined}>{action}</div>}
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <Reveal className={cn("max-w-[52rem]", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <H id={id} className={cn(size === "xl" ? "h2-xl" : "h2", "mt-5")}>
        {title}
      </H>
      {lead && <p className="lead mt-5">{lead}</p>}
      {action && <div className="mt-7">{action}</div>}
    </Reveal>
  );
}
