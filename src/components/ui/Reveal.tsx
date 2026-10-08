import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "article" | "p" | "span" | "h2" | "h3";
  delay?: number;
  className?: string;
};

/** Scroll-triggered fade-up. Pure markup; ScrollReveal does the observing. */
export function Reveal({ children, as: Tag = "div", delay = 0, className }: Props) {
  return (
    <Tag className={cn("reveal", className)} style={{ "--d": delay } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
