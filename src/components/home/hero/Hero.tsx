import { HeroAmbientBackground } from "./HeroAmbientBackground";
import { HeroContent } from "./HeroContent";
import { HeroMotion } from "./HeroMotion";
import { HeroVisual } from "./HeroVisual";

/**
 * Home hero. Desktop (≥1280px): an asymmetric composition, copy on the left ~40% and the product ecosystem on
 * the right ~60%, running past the viewport edge as part of the canvas. Below that it recomposes: copy first,
 * then the visual at full container width (tablet) or as a simplified three-piece scene (phones).
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hx relative isolate overflow-hidden bg-bg">
      <HeroAmbientBackground />
      <div className="container-x grid items-center gap-y-12 pt-[calc(var(--nav-space)+clamp(16px,4vw,48px))] pb-6 md:min-h-[90svh] md:gap-y-14 xl:min-h-[92svh] xl:grid-cols-[46%_54%] xl:pt-[var(--nav-space)] xl:pb-10">
        <HeroContent />
        <div className="hx-scroll relative mx-auto w-full max-w-[880px] xl:mx-0 xl:w-[clamp(780px,62vw,1060px)] xl:max-w-none">
          <HeroVisual />
        </div>
      </div>
      <HeroMotion target="hero" />
    </section>
  );
}
