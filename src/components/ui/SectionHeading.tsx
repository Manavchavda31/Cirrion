import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

/** Section header: small eyebrow, serif title, optional lead beneath. */
export function SectionHeading({ eyebrow, title, lead, as: H = "h2", className }: Props) {
  return (
    <Reveal className={cn("max-w-[48rem]", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <H className="h2 mt-3">{title}</H>
      {lead && <p className="lead mt-4">{lead}</p>}
    </Reveal>
  );
}
