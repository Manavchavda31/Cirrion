import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/content/types";

export function RelatedWork({ projects, title = "Relevant work" }: { projects: Project[]; title?: string }) {
  if (!projects.length) return null;
  return (
    <section className="section hairline-t" aria-labelledby="related-work">
      <div className="container-x">
        <SectionHeading eyebrow="Selected work" title={<span id="related-work">{title}</span>} lead="Products we have designed and engineered, told as case studies." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
