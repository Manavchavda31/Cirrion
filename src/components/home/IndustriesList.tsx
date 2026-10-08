import Image from "next/image";
import { industries } from "@/content/industries";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** Photo cards for every entry in content/industries (or the `only` subset); each links to /industries/[slug]. */
export function IndustriesList({ only }: { only?: string[] }) {
  const list = only ? only.map((slug) => industries.find((x) => x.slug === slug)!).filter(Boolean) : industries;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((ind, i) => (
        <Reveal key={ind.slug} as="li" delay={(i % 4) * 50} className="h-full">
          <TrackedLink href={`/industries/${ind.slug}`} event="industry_click" eventLabel={ind.title} className="group block h-full" aria-label={`${ind.title}: ${ind.summary}`}>
            <span className="photo block aspect-[1200/1218]">
              <Image src={`/industries/${ind.slug}.jpg`} alt="" width={1200} height={1218} sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 100vw" className="h-full w-full" />
            </span>
            <span className="mt-4 block text-[0.9375rem] leading-snug text-fg-2">{ind.summary}</span>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent">
              Explore {ind.title}
              <span className="arrow transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </TrackedLink>
        </Reveal>
      ))}
    </ul>
  );
}
