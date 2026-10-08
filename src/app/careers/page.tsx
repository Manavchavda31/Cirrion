import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Cta } from "@/components/ui/Cta";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Work with Cirrion. We're always interested in senior engineers, designers and product people.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build products with us."
        lead="We have no roles listed right now. If you are a senior engineer, designer or product thinker who cares about craft, we'd still like to hear from you."
        crumbs={[{ name: "Careers", path: "/careers" }]}
      >
        <Cta href={`mailto:${site.email}?subject=Introducing%20myself`} event="cta_click">
          Introduce yourself
        </Cta>
      </PageHero>
      <section className="section">
        <div className="container-x">
          <ul className="rule-list">
            {[
              ["Ownership", "Small team, real responsibility. You'll own outcomes, not tickets."],
              ["Craft", "We care about details users feel: speed, clarity, reliability."],
              ["Flexibility", "Work that respects your time zone and your focus."],
            ].map(([t, b]) => (
              <li key={t} className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-12">
                <h2 className="h3 md:col-span-4">{t}</h2>
                <p className="prose-body md:col-span-7 md:col-start-6">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
