import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";

const cols = [
  {
    title: "Studio",
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

export function Footer() {
  return (
    <footer className="theme-navy" aria-label="Site footer">
      <div className="container-x">
        <div className="grid gap-12 py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-[38ch] text-[0.9375rem] text-fg-2">
              {site.tagline} We design and engineer mobile apps, web platforms, AI systems and custom software.
            </p>
            <a href={`mailto:${site.email}`} className="link-u mt-5 inline-block text-[0.9375rem] !text-white">
              {site.email}
            </a>
          </div>

          {cols.map((c, idx) => (
            <nav key={c.title} aria-label={c.title} className={idx === 0 ? "md:col-span-2 md:col-start-7" : "md:col-span-2"}>
              <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-fg-3 uppercase">{c.title}</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-fg-2 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {site.socials.length > 0 && (
            <nav aria-label="Social" className="md:col-span-2">
              <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-fg-3 uppercase">Follow</h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-fg-2 transition-colors hover:text-white">
                      {s.label} <span aria-hidden>↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-[0.875rem] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
