import { Cta } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Closing call to action: a deep-navy panel with an orange button. */
export function CtaBand({ title, text, label = "Start a project", href = "/contact" }: { title: React.ReactNode; text?: string; label?: string; href?: string }) {
  return (
    <section className="section-tight" aria-label="Start a project">
      <div className="container-x">
        <Reveal className="theme-navy relative isolate overflow-hidden rounded-xl px-[clamp(24px,5vw,72px)] py-[clamp(40px,6vw,72px)]">
          {/* same dotted map as the hero, very faint */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/world.svg" alt="" width={964} height={412} aria-hidden className="pointer-events-none absolute top-1/2 -right-[8%] -z-10 hidden w-[68%] -translate-y-1/2 opacity-[0.22] [mask-image:linear-gradient(to_right,transparent,black_45%)] md:block" />
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="h2 max-w-[24ch]">{title}</h2>
              {text && <p className="lead mt-4">{text}</p>}
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <Cta href={href} event="cta_click">
                {label}
              </Cta>
              {site.bookingUrl && (
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="link-u text-[0.9375rem] !text-white">
                  or book an intro call <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <a href={`mailto:${site.email}`} className="link-u text-[0.9375rem] !text-white">
                or write to {site.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
