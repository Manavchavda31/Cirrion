import { techGroups } from "@/content/tech";
import { Reveal } from "@/components/ui/Reveal";

/** Technology grouped by the job each layer does. Content: content/tech. */
export function TechSection() {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {techGroups.map((g, i) => (
        <Reveal key={g.label} delay={i * 50} className="border-t border-line-2 pt-5">
          <h3 className="font-sans text-[0.9375rem] font-semibold">{g.label}</h3>
          <p className="mt-1 text-[0.875rem] text-fg-3">{g.job}</p>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-fg-2">
            {g.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
