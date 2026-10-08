import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd } from "@/lib/seo";
import type { Faq as FaqType } from "@/content/types";

/** Native <details> keeps it accessible and JS-free; the plus icon is CSS-only. */
export function Faq({ items }: { items: FaqType[] }) {
  if (!items.length) return null;
  return (
    <>
      <div className="faq border-t border-line">
        {items.map((f) => (
          <details key={f.q} className="border-b border-line">
            <summary className="flex items-center justify-between gap-6 py-5 font-semibold tracking-tight text-[1.125rem] leading-snug">
              <span>{f.q}</span>
              <span aria-hidden className="faq-icon" />
            </summary>
            <p className="prose-body pb-6">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </>
  );
}
