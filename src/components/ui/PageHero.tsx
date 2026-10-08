import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  /** Optional visual on the right (large screens): a framed scene, photo or fact list. */
  aside?: React.ReactNode;
  /** Frame the aside as a media panel (rounded, bordered, shadowed). */
  framedAside?: boolean;
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Shared inner-page header: the hero's atmosphere at a quieter scale, breadcrumbs, eyebrow, Manrope title, lead and actions. */
export function PageHero({ eyebrow, title, lead, crumbs, children, aside, framedAside = true }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf8,#fafaf8_70%,#ffffff)]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-[30%] right-[-10%] h-[90%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.5)_60%,transparent)]" />
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgb(17_19_24/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.03)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(70%_70%_at_70%_0%,black,transparent)]" />
      </div>
      <div className="container-x page-top pb-[clamp(56px,7vw,104px)]">
        {crumbs && (
          <div className="hero-in mt-4 mb-10" style={i(0)}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <div className={aside ? "grid items-center gap-12 lg:grid-cols-12 lg:gap-10" : undefined}>
          <div className={aside ? "lg:col-span-6" : "max-w-[60rem]"}>
            <p className="eyebrow hero-in" style={i(1)}>
              {eyebrow}
            </p>
            <h1 className={cn("h1-page hero-in mt-6", aside ? "max-w-[16ch]" : "max-w-[18ch]")} style={i(2)}>
              {title}
            </h1>
            {lead && (
              <p className="lead hero-in mt-7" style={i(3)}>
                {lead}
              </p>
            )}
            {children && (
              <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={i(4)}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="hero-in lg:col-span-6" style={i(3)}>
              {framedAside ? <div className="media relative aspect-[16/11] !rounded-[26px] border border-white shadow-[var(--shadow-lg)] ring-1 ring-line">{aside}</div> : aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
