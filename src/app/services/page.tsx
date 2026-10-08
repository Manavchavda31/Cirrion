import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceList } from "@/components/home/ServiceList";
import { CtaBand } from "@/components/sections/CtaBand";
import { Cta } from "@/components/ui/Cta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: "Mobile apps, web development, SaaS, AI, custom software, cloud engineering and UI/UX design. One team, from first prototype to production.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything a product needs, under one roof."
        lead="Eight disciplines, one accountable team. We choose the service mix around your outcome, not the other way round."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <Cta href="/contact">Start a Project</Cta>
        <Cta href="/work" variant="ghost" arrow={false}>
          See our work
        </Cta>
      </PageHero>

      <section className="section surface-soft" aria-label="All services">
        <div className="container-x">
          <ServiceList />
        </div>
      </section>

      <CtaBand title="Not sure which service you need? Start with a conversation." text="Describe the outcome you want. We'll recommend what to build first and what to leave for later." label="Talk to us" />
    </>
  );
}
