import { Cta } from "@/components/ui/Cta";
import { HeroEcosystem } from "./HeroEcosystem";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

const capabilities = ["Mobile", "Web", "AI", "SaaS", "Software"];

/**
 * Art-directed hero: an editorial headline row (statement left, supporting copy and actions right), then a wide
 * product-ecosystem stage that runs off the bottom of the fold and fades into the next section.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf8_0%,#fafaf8_78%,#ffffff_100%)]">
      {/* atmosphere: barely-there lavender and blue light, no hard blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-[18%] left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(243_241_255/0.95),rgb(234_242_255/0.55)_60%,transparent)]" />
        <div className="eco-glow absolute top-[6%] right-[-8%] h-[46%] w-[42%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(99_102_241/0.09),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(rgb(17_19_24/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(17_19_24/0.035)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="container-x pt-[calc(var(--nav-space)+clamp(12px,3vw,40px))]">
        <div className="grid gap-x-12 gap-y-8 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-end">
          <div>
            <p className="eyebrow hero-in" style={i(0)}>
              Digital product &amp; software engineering
            </p>
            <h1 id="hero-title" className="display hero-in mt-6 uppercase" style={i(1)}>
              <span className="block">Create</span>
              <span className="block bg-[linear-gradient(100deg,#4f54e5_0%,#6366f1_60%,#7c80f6_100%)] bg-clip-text text-transparent">
                What&rsquo;s next<span className="text-orange">.</span>
              </span>
            </h1>
          </div>
          <div className="xl:pb-3">
            <p className="lead hero-in !max-w-[38ch] text-fg-2" style={i(2)}>
              Cirrion designs and engineers digital products that turn ambitious ideas into powerful, scalable business solutions.
            </p>
            <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={i(3)}>
              <Cta href="/contact" event="cta_click" className="max-sm:w-full">
                Start a Project
              </Cta>
              <Cta href="/work" variant="ghost" arrow={false} className="max-sm:w-full">
                Explore Our Work
                <span className="arrow-ne ml-0.5 text-fg-3" aria-hidden>
                  ↗
                </span>
              </Cta>
            </div>
          </div>
        </div>

        <ul className="hero-in mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.75rem] font-semibold tracking-[0.18em] text-fg-3 uppercase md:mt-12" style={i(4)} aria-label="Capabilities">
          {capabilities.map((c, n) => (
            <li key={c} className="flex items-center gap-3">
              {n > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-indigo/50" />}
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-8 md:mt-10">
        <HeroEcosystem />
      </div>
    </section>
  );
}
