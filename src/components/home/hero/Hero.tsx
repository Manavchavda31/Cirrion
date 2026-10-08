import { HeroAmbientBackground } from "./HeroAmbientBackground";
import { HeroCapabilities } from "./HeroCapabilities";
import { HeroContent } from "./HeroContent";
import { HeroIntro } from "./HeroIntro";
import { HeroMotion } from "./HeroMotion";
import { HeroVisual } from "./HeroVisual";

/**
 * Home hero: a centred statement over a light, breathing atmosphere, the product ecosystem as the large central
 * area, and a quiet capability strip that closes the composition. Tablet and phone use their own arrangement
 * of the visual (see HeroVisual). The first visit of a session opens with HeroIntro.
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hx hc relative isolate overflow-hidden bg-bg">
      <HeroIntro />
      <HeroAmbientBackground />
      <div className="container-x pt-[calc(var(--nav-space)+clamp(16px,3vw,36px))] pb-[clamp(48px,6vw,80px)]">
        <HeroContent />
        <div className="hc-scroll relative mx-auto mt-12 max-w-[1240px] md:mt-12">
          <HeroVisual />
        </div>
        <div className="relative mt-6 lg:-mt-[clamp(24px,4vw,64px)]">
          <HeroCapabilities />
        </div>
      </div>
      <HeroMotion target="hero" />
    </section>
  );
}
