import Image from "next/image";
import { services } from "@/content/services";
import { Reveal } from "@/components/ui/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";

/** Photo cards for every service (or the `only` subset, in that order). Images live in public/services/<slug>.jpg (4:3). */
export function ServiceList({ only }: { only?: string[] }) {
  const list = only ? only.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean) : services;
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((s, i) => (
        <Reveal key={s.slug} as="li" delay={(i % 4) * 50} className="h-full">
          <TrackedLink href={`/services/${s.slug}`} event="service_click" eventLabel={s.title} className="group flex h-full flex-col">
            <span className="photo block aspect-[4/3]">
              <Image src={`/services/${s.slug}.jpg`} alt="" width={1200} height={900} sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 100vw" className="h-full w-full" />
            </span>
            <span className="mt-5 block text-[0.875rem] font-medium text-fg-3">{s.num}</span>
            <span className="row-title mt-1 block text-[1.25rem] leading-snug font-semibold tracking-tight transition-colors group-hover:text-accent">{s.title}</span>
            <span className="mt-2 block text-[0.9375rem] leading-snug text-fg-2">{s.summary}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 pt-1 text-[0.9375rem] font-semibold text-accent">
              Learn more
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </TrackedLink>
        </Reveal>
      ))}
    </ul>
  );
}
