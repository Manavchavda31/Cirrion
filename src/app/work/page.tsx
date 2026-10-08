import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Selected work from Cirrion: an AI SaaS platform for accounting firms, an enterprise text-to-SQL assistant and an exam-preparation platform, told as product case studies.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Products, not just projects."
        lead="Every case study follows the same structure: the challenge, how we approached it, what we built and what changed."
        crumbs={[{ name: "Work", path: "/work" }]}
      />
      <section className="section">
        <div className="container-x">
          <h2 className="sr-only">All projects</h2>
          <WorkGrid projects={getAllProjects()} />
        </div>
      </section>
      <CtaBand title="Your product could be next." text="Tell us what you're building and we'll show you how we'd approach it." />
    </>
  );
}
