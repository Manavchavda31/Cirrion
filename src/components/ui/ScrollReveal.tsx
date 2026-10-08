"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One IntersectionObserver for the whole site; elements opt in with `.reveal` (see globals.css). */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    const observe = () => document.querySelectorAll(".reveal:not(.is-in), .wordmark-reveal:not(.is-in)").forEach((el) => io.observe(el));
    observe();
    // catch elements that mount later (client components, streaming)
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
