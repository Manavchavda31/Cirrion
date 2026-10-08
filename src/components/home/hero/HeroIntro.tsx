"use client";

import Image from "next/image";
import { useLayoutEffect } from "react";

/**
 * First-visit intro: the Cirrion mark and wordmark with a thin indigo line drawing underneath, then a soft fade
 * into the hero, whose entrance is timed to begin as this fades (see --intro in globals.css).
 *
 * Rendered on the server so it covers the first paint, and timed entirely in CSS so it clears itself even
 * without JavaScript and never takes pointer events. It is skipped (html.intro-seen) on later page loads in the
 * same session (set by the boot script in app/layout.tsx) and on client-side navigation back to the home page.
 */
export function HeroIntro() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-seen")) return;
    // mounted by a client-side navigation rather than the first document load: never replay
    if (performance.now() > 1500) {
      root.classList.add("intro-seen");
      return;
    }
    const t = window.setTimeout(() => root.classList.add("intro-seen"), 1100);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="intro" aria-hidden>
      <div className="relative flex flex-col items-center">
        <span className="intro-glow absolute top-1/2 left-1/2 -z-10 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(232_233_255/0.95),rgb(243_241_255/0.4)_60%,transparent)]" />
        <span className="intro-logo flex items-center gap-3">
          <Image src="/brand/mark.png" alt="" width={258} height={262} priority className="h-11 w-auto" />
          <Image src="/brand/word.png" alt="" width={303} height={54} priority className="h-[22px] w-auto" />
        </span>
        <span className="mt-6 block h-[2px] w-40 overflow-hidden rounded-full bg-indigo-soft">
          <span className="intro-line block h-full w-full rounded-full bg-[linear-gradient(90deg,#4f54e5,#6366f1_70%,#f47b20)]" />
        </span>
      </div>
    </div>
  );
}
