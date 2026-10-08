import { testimonials } from "@/content/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Renders nothing until real testimonials exist in content/team. Never fabricated. */
export function Testimonials() {
  const lead = testimonials[0];
  if (!lead) return null;
  const rest = testimonials.slice(1);
  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="container-x">
        <SectionHeading eyebrow="Clients" title={<span id="testimonials-title">In their words</span>} />
        <Reveal className="mt-10 max-w-[48rem]">
          <blockquote>
            <p className="font-semibold tracking-tight text-[clamp(1.5rem,2.6vw,2.125rem)] leading-snug">&ldquo;{lead.quote}&rdquo;</p>
            <footer className="mt-6 text-[0.9375rem] text-fg-2">
              <span className="font-medium text-fg">{lead.name}</span>, {lead.role}, {lead.company} · {lead.country}
            </footer>
          </blockquote>
        </Reveal>
        {rest.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {rest.map((t) => (
              <Reveal key={t.name + t.company}>
                <blockquote className="border-t border-line pt-5">
                  <p className="text-[1.0625rem] text-fg">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-[0.9375rem] text-fg-2">
                    {t.name}, {t.role}, {t.company} · {t.country}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
