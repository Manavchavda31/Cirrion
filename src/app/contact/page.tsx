import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { Faq } from "@/components/ui/Faq";
import { generalFaqs } from "@/content/engagement";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell Cirrion what you're building. Send a project brief and get a reply from a senior team member within one working day.",
  path: "/contact",
});

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf8,#ffffff)]">
        <div aria-hidden className="absolute -top-[30%] right-[-10%] -z-10 h-[90%] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.5)_60%,transparent)]" />
        <div className="container-x page-top pb-14 md:pb-20">
          <div className="hero-in mt-4 mb-10" style={i(0)}>
            <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          </div>
          <p className="eyebrow hero-in" style={i(1)}>
            Contact
          </p>
          <h1 className="h1-page hero-in mt-6 max-w-[16ch]" style={i(2)}>
            Tell us what you&apos;re building.
          </h1>
          <p className="lead hero-in mt-6" style={i(3)}>
            A few details are enough. If you&apos;re still shaping the idea, say so. That&apos;s what discovery is for.
          </p>
        </div>
      </section>

      <section id="brief" className="section-tight scroll-mt-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8 lg:col-start-5 lg:order-2">
            <div className="rounded-[24px] border border-line bg-white p-[clamp(20px,3.5vw,44px)] shadow-[var(--shadow-md)]">
              <ContactForm />
            </div>
          </div>

          <dl className="space-y-6 lg:col-span-4 lg:order-1">
            <div>
              <dt className="text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Prefer email?</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="link-u text-[1.0625rem]">
                  {site.email}
                </a>
              </dd>
            </div>
            {site.bookingUrl && (
              <div>
                <dt className="text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Prefer a call?</dt>
                <dd className="mt-2">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="link-u text-[1.0625rem]">
                    Book a 30-minute intro call <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Response time</dt>
              <dd className="mt-2 text-fg-2">Within one working day.</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Confidentiality</dt>
              <dd className="mt-2 max-w-[34ch] text-fg-2">
                Happy to sign an NDA before you share details. Read our{" "}
                <Link href="/privacy" className="link-u">
                  privacy policy
                </Link>
                .
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section band" aria-labelledby="contact-faq">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Before you write</p>
            <h2 id="contact-faq" className="h2 mt-3">
              Common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={generalFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
