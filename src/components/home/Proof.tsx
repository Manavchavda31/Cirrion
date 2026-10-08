import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Proof strip. Only entries flagged `verified` are rendered, so nothing is ever invented.
 * Update site.proof with real, defensible numbers when available.
 */
export function Proof() {
  const items = site.proof.filter((p) => p.verified);
  if (!items.length) return null;
  return (
    <section aria-label="At a glance" className="band border-t-0">
      <div className="container-x">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.label} as="li" delay={i * 60} className="border-line py-8 pr-6 max-lg:odd:border-r max-lg:[&:nth-child(n+3)]:border-t lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="text-[clamp(2.5rem,4vw,3.25rem)] leading-none font-bold tracking-tight text-navy">{p.value}</p>
              <p className="mt-3 max-w-[24ch] text-[0.9375rem] leading-snug text-fg-2">{p.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
