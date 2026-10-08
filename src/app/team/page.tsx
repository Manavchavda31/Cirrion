import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { TeamGrid } from "@/components/team/TeamGrid";
import { getTeam } from "@/lib/team";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description: "Meet the people behind Cirrion: product, design and engineering owned end to end by the people who do the work.",
  path: "/team",
});

export default function TeamPage() {
  const team = getTeam();
  const anyPlaceholder = team.some((m) => m.placeholder);
  const solo = team.length === 1;
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="The people building your product."
        lead={solo ? "Founder-led. The person who scopes your project is the person who builds it." : "A small, senior team. The people who scope your project are the people who build it."}
        crumbs={[{ name: "Team", path: "/team" }]}
      />
      <section className="section" aria-label="Team members">
        <div className="container-x">
          {anyPlaceholder && <p className="mb-10 max-w-[64ch] text-[0.875rem] text-fg-3">Profiles marked as placeholders show the final layout and will be replaced with real people, photos and biographies.</p>}
          <h2 className="sr-only">Team members</h2>
          <TeamGrid team={team} />
        </div>
      </section>
      <CtaBand title="Want to work with us?" text="Start a project or introduce yourself. We read everything." label="Get in touch" />
    </>
  );
}
