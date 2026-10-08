import Image from "next/image";
import { process } from "@/content/process";
import { Reveal } from "@/components/ui/Reveal";

/** Photo for each stage: public/process/<title-lowercase>.jpg (4:3). */
export const stagePhoto = (title: string) => `/process/${title.toLowerCase()}.jpg`;

/** Six-stage summary. `photos` is on for the home page and off where another photo already sits on the page (service pages). The full version lives at /process. */
export function ProcessCompact({ photos = true }: { photos?: boolean }) {
  if (!photos) {
    return (
      <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {process.map((s, i) => (
          <Reveal key={s.num} as="li" delay={(i % 3) * 50} className="border-t border-line-2 pt-5">
            <p className="text-[0.9375rem] font-medium text-accent">{s.num}</p>
            <h3 className="mt-2 text-[1.375rem]">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-fg-2">{s.lead}</p>
          </Reveal>
        ))}
      </ol>
    );
  }
  return (
    <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {process.map((s, i) => (
        <Reveal key={s.num} as="li" delay={(i % 3) * 50} className="h-full">
          <div className="group h-full">
            <div className="photo relative aspect-[4/3]">
              <Image src={stagePhoto(s.title)} alt="" width={1200} height={900} sizes="(min-width:1024px) 400px, (min-width:640px) 45vw, 100vw" className="h-full w-full" />
              <span className="absolute top-3 left-3 grid h-9 min-w-9 place-items-center rounded-md bg-navy px-2 text-[0.875rem] font-semibold text-white transition-colors duration-200 group-hover:bg-orange group-hover:text-navy">{s.num}</span>
            </div>
            <h3 className="mt-5 text-[1.375rem]">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-fg-2">{s.lead}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
