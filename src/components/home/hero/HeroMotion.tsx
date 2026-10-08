"use client";

import { useEffect } from "react";

/**
 * Drives the two interactive effects through CSS variables on the hero section, so the browser only animates
 * transforms: --hx-px / --hx-py (pointer, -1..1, desktop fine pointers only) and --hx-s (0..1 as the hero
 * scrolls away). Both are throttled to one update per frame and switched off for reduced motion.
 */
export function HeroMotion({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    let inView = true;
    const write = () => {
      raf = 0;
      el.style.setProperty("--hx-px", px.toFixed(3));
      el.style.setProperty("--hx-py", py.toFixed(3));
      const r = el.getBoundingClientRect();
      const s = Math.min(1, Math.max(0, -r.top / (r.height * 0.7)));
      el.style.setProperty("--hx-s", s.toFixed(3));
    };
    const queue = () => {
      if (!raf && inView) raf = requestAnimationFrame(write);
    };

    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const onMove = (e: PointerEvent) => {
      if (!fine.matches || e.pointerType !== "mouse") return;
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      queue();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      queue();
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = !!entry?.isIntersecting;
      if (inView) queue();
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", queue, { passive: true });
    queue();
    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);

  return null;
}
