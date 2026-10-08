import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { CtaBand } from "@/components/sections/CtaBand";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description: "Software for healthcare, fintech, real estate, education, retail, hospitality, logistics and professional services.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built around how your sector works."
        lead="We learn the workflow first. Each industry has its own constraints, users and regulations, and the software should respect them."
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />
      <section className="section surface-soft" aria-label="All industries">
        <div className="container-x">
          <IndustriesShowcase />
        </div>
      </section>
      <CtaBand title="Don't see your industry?" text="We work across sectors. Tell us about your workflow and we'll tell you honestly whether we're the right fit." label="Talk to us" />
    </>
  );
}
