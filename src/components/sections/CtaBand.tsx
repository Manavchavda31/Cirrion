import { Cta } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { CtaVisual } from "@/components/visuals/CtaVisual";

/**
 * Closing call to action on every page: a full-width lavender-to-blue band that picks up the hero's language,
 * with the copy on the left and a quiet product-ecosystem drawing on the right.
 */
export function CtaBand({
  title,
  text,
  label = "Start a Project",
  href = "/contact",
  eyebrow = "Ready to build?",
}: {
  title: React.ReactNode;
  text?: string;
  label?: string;
  href?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden surface-gradient" aria-labelledby="cta-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(99_102_241/0.25),transparent)]" />
      <div className="container-x grid items-center gap-12 py-[clamp(88px,10vw,136px)] lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cta-title" className="h2-xl mt-6 max-w-[15ch]">
            {title}
          </h2>
          {text && <p className="lead mt-6 max-w-[44ch]">{text}</p>}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Cta href={href} event="cta_click" className="max-sm:w-full">
              {label}
            </Cta>
            {site.bookingUrl ? (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost max-sm:w-full">
                Schedule a Call
                <span className="arrow-ne text-fg-3" aria-hidden>
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Cta href="/contact#brief" variant="ghost" arrow={false} className="max-sm:w-full">
                Schedule a Call
              </Cta>
            )}
          </div>
          <a href={`mailto:${site.email}`} className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-fg-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-indigo-deep shadow-[0_1px_2px_rgb(17_19_24/0.06)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
              </svg>
            </span>
            <span className="link-grow font-medium text-fg">{site.email}</span>
          </a>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-6">
          <CtaVisual />
        </Reveal>
      </div>
    </section>
  );
}
