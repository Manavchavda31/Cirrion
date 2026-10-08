import Link from "next/link";
import { Cta } from "@/components/ui/Cta";
import { site } from "@/content/site";
import { HeroVisual } from "./HeroVisual";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** The four product lines under the hero. Each links to its service page. */
const lines = [
  {
    title: "AI Solutions",
    sub: "Intelligent systems",
    href: "/services/ai-development",
    icon: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M7 7l2 2m6 6 2 2M17 7l-2 2M9 15l-2 2M9 9h6v6H9z" />,
  },
  {
    title: "Web Applications",
    sub: "Modern and scalable",
    href: "/services/web-app-development",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.500 18.300 12 21c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3Z" />
      </>
    ),
  },
  {
    title: "Mobile Applications",
    sub: "Seamless experiences",
    href: "/services/mobile-app-development",
    icon: (
      <>
        <rect x="7" y="2.500" width="10" height="19" rx="2.500" />
        <path d="M11 18.500h2" />
      </>
    ),
  },
  {
    title: "Custom Software",
    sub: "Built for your business",
    href: "/services/custom-software",
    icon: <path d="m12 2.500 8.500 4.800v9.400L12 21.500l-8.500-4.800V7.300L12 2.500Zm0 9.500 8.500-4.700M12 12v9.500M12 12 3.500 7.300" />,
  },
];

/**
 * Hero: copy and verified facts on the left, code-built artwork (dotted map, glass tiles) on the right,
 * product lines along the bottom. Facts come from site.proof (verified entries only).
 */
export function Hero() {
  const facts = site.proof.filter((p) => p.verified).slice(0, 3);
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* light blue wash top-right, warm-grey curve bottom-right */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_82%_28%,rgb(62_120_184/0.13),transparent_72%)]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(11_22_34/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(11_22_34/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(70%_80%_at_70%_30%,black,transparent)]"
      />
      <div aria-hidden className="absolute -right-[10%] -bottom-24 -z-10 h-72 w-[70%] rounded-[50%] bg-bg-3/70 blur-2xl" />

      <div className="container-x grid items-center gap-10 pt-12 pb-10 md:pt-16 lg:grid-cols-12 lg:gap-6 lg:pt-20">
        <div className="lg:col-span-5">
          <p className="eyebrow hero-in" style={i(0)}>
            Digital product engineering
          </p>
          <h1 id="hero-title" className="h1 hero-in mt-5 text-balance" style={i(1)}>
            Create what&rsquo;s <span className="text-orange-deep">next.</span>
          </h1>
          <p className="lead hero-in mt-6 max-w-[42ch]" style={i(2)}>
            We turn ambitious ideas into digital products that solve real problems and create lasting value.
          </p>
          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={i(3)}>
            <Cta href="/contact" event="cta_click">
              Start a project
            </Cta>
            <Cta href="/work" variant="ghost" arrow={false}>
              Explore our work
            </Cta>
          </div>
          <ul className="hero-in mt-10 flex max-w-[30rem] divide-x divide-line" style={i(4)} aria-label="At a glance">
            {facts.map((p) => (
              <li key={p.label} className="flex-1 px-4 first:pl-0">
                <p className="text-[1.75rem] leading-none font-bold tracking-tight text-navy">{p.value}</p>
                <p className="mt-2 text-[0.8125rem] leading-snug text-fg-2">{p.label}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in relative lg:col-span-7" style={i(2)}>
          <HeroVisual />
          {/* brand line, wide screens only */}
          <p className="absolute right-0 bottom-[2%] hidden text-right text-[0.8125rem] leading-[1.9] font-medium tracking-[0.14em] text-fg-3 uppercase 2xl:block" aria-hidden>
            Ideas
            <br />
            Products
            <br />
            People
            <br />
            Real impact
            <span className="mt-2 ml-auto block h-0.5 w-8 bg-orange" />
          </p>
        </div>
      </div>

      <div className="container-x pb-14 lg:pb-16">
        <ul className="hero-in grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" style={i(5)} aria-label="What we build">
          {lines.map((l) => (
            <li key={l.title}>
              <Link
                href={l.href}
                className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-line bg-bg-2/85 p-4 shadow-[inset_0_1px_0_rgb(255_255_255)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200 ease-out after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:border-line-2 hover:shadow-sm hover:after:scale-x-100 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-bg text-accent transition-colors duration-200 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {l.icon}
                  </svg>
                </span>
                <span>
                  <span className="block text-[0.9375rem] leading-tight font-semibold text-fg transition-colors group-hover:text-accent">{l.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-fg-3">{l.sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
