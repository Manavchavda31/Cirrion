import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Industries", href: "/industries" },
      { label: "Process", href: "/process" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Dark brand ending: statement and contact, three link columns, a huge low-contrast wordmark that rises in on
 * scroll, and the legal bar. Social links appear only once their URLs are configured (content/site), so the
 * footer never points at a generic home page.
 */
export function Footer() {
  return (
    <footer className="theme-dark relative isolate overflow-hidden" aria-label="Site footer">
      <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(99_102_241/0.16),transparent)]" />
      <div className="container-x">
        <div className="grid gap-x-10 gap-y-14 pt-[clamp(72px,9vw,120px)] pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo light />
            <p className="mt-10 font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-white">
              Digital products.
              <br />
              <span className="text-[#a5a8ff]">Engineered to matter.</span>
            </p>
            <p className="mt-6 max-w-[44ch] text-[1rem] leading-relaxed text-ink-fg-2">
              Cirrion designs and engineers mobile apps, web platforms, SaaS products, AI systems and custom software.
            </p>
            <a href={`mailto:${site.email}`} className="group mt-8 inline-flex items-center gap-3 text-[1.0625rem] font-medium text-white">
              <span className="link-grow">{site.email}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-indigo group-hover:bg-indigo">
                <span className="arrow-ne text-[0.875rem]" aria-hidden>
                  ↗
                </span>
              </span>
            </a>
          </div>

          {cols.map((c, idx) => (
            <nav key={c.title} aria-label={c.title} className={idx === 0 ? "lg:col-span-2 lg:col-start-7" : "lg:col-span-2"}>
              <h2 className="font-sans text-[0.75rem] font-semibold tracking-[0.16em] text-[#7d8494] uppercase">{c.title}</h2>
              <ul className="mt-6 space-y-3.5 text-[1rem]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-ink-fg-2 transition-colors duration-200 hover:text-white">
                      <span className="link-grow">{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Connect" className="lg:col-span-2">
            <h2 className="font-sans text-[0.75rem] font-semibold tracking-[0.16em] text-[#7d8494] uppercase">Connect</h2>
            <ul className="mt-6 space-y-3.5 text-[1rem]">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-ink-fg-2 transition-colors duration-200 hover:text-white">
                    <span className="link-grow">{s.label}</span>
                    <span className="arrow-ne text-[0.8125rem] opacity-60" aria-hidden>
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-ink-fg-2 transition-colors duration-200 hover:text-white">
                  <span className="link-grow">Start a project</span>
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="text-ink-fg-2 transition-colors duration-200 hover:text-white">
                  <span className="link-grow">Email us</span>
                </a>
              </li>
              {site.bookingUrl && (
                <li>
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-ink-fg-2 transition-colors duration-200 hover:text-white">
                    <span className="link-grow">Book a call</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* decorative wordmark: SVG so it spans the container exactly and stays out of the text tree */}
      <div aria-hidden className="wordmark-reveal container-x">
        <svg viewBox="0 0 1000 196" className="block h-auto w-full" focusable="false">
          <text x="500" y="214" textAnchor="middle" textLength="1000" lengthAdjust="spacing" className="wordmark" style={{ fontSize: 268 }} fill="currentColor">
            CIRRION
          </text>
        </svg>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-4 border-t border-white/[0.08] py-7 text-[0.875rem] text-[#8a91a0] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
