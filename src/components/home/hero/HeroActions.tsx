import { Cta } from "@/components/ui/Cta";

/** Primary (indigo, arrow nudges on hover) and a clearly secondary outline action. */
export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <Cta href="/contact" event="cta_click" className="!min-h-[52px] !px-6 max-sm:w-full">
        Start a Project
      </Cta>
      <Cta href="/work" variant="ghost" arrow={false} className="!min-h-[52px] !border-[#d9dde6] !bg-transparent !px-6 hover:!border-indigo/30 hover:!bg-indigo-soft hover:!text-fg max-sm:w-full">
        Explore Our Work
        <span className="arrow-ne ml-0.5 text-fg-3" aria-hidden>
          ↗
        </span>
      </Cta>
    </div>
  );
}
