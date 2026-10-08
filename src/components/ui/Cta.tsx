import { cn } from "@/lib/cn";
import { TrackedLink } from "./TrackedLink";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  event?: string;
};

export function Cta({ href, children, variant = "primary", size = "md", arrow = true, className, event }: Props) {
  return (
    <TrackedLink
      href={href}
      event={event}
      className={cn("btn", variant === "primary" ? "btn-primary" : variant === "light" ? "btn-light" : "btn-ghost", size === "sm" && "btn-sm", className)}
    >
      <span>{children}</span>
      {arrow && (
        <span className="arrow" aria-hidden>
          →
        </span>
      )}
    </TrackedLink>
  );
}
