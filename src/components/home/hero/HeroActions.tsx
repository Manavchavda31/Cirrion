import { Cta } from "@/components/ui/Cta";

/** Primary (indigo, lifts with a deeper glow, arrow travels) and a clearly secondary outline action. */
export function HeroActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      <Cta href="/contact" event="cta_click" className="hc-cta !min-h-[52px] !px-6 max-sm:w-full">
        Start a Project
      </Cta>
      <Cta href="/work" variant="ghost" arrow={false} className="hc-cta !min-h-[52px] !border-line !bg-white/80 !px-6 hover:!border-indigo/30 hover:!bg-white hover:!text-fg max-sm:w-full">
        Explore Our Work
        <span className="arrow-ne ml-0.5 text-fg-3" aria-hidden>
          ↗
        </span>
      </Cta>
    </div>
  );
}
