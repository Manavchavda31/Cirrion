import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  /** Optional block on the right (large screens), e.g. a fact list. */
  aside?: React.ReactNode;
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** Shared inner-page header: white band with the hero's blue wash and faint dotted map, breadcrumbs, eyebrow, title, lead and actions. */
export function PageHero({ eyebrow, title, lead, crumbs, children, aside }: Props) {
  return (
    <section className="band relative isolate overflow-hidden border-t-0">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_90%_at_88%_10%,rgb(62_120_184/0.10),transparent_70%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero/world.svg"
        alt=""
        width={964}
        height={412}
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-[6%] -z-10 hidden w-[52%] -translate-y-1/2 opacity-[0.16] [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:block"
      />
      <div className="container-x py-14 md:py-20">
        {crumbs && (
          <div className="hero-in mb-8" style={i(0)}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <div className={aside ? "grid gap-12 lg:grid-cols-12" : undefined}>
          <div className={aside ? "lg:col-span-7" : undefined}>
            <p className="eyebrow hero-in" style={i(1)}>
              {eyebrow}
            </p>
            <h1 className="h1-page hero-in mt-4 max-w-[22ch]" style={i(2)}>
              {title}
            </h1>
            {lead && (
              <p className="lead hero-in mt-6" style={i(3)}>
                {lead}
              </p>
            )}
            {children && (
              <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={i(4)}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="hero-in lg:col-span-4 lg:col-start-9" style={i(3)}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
