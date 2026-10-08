"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { companyMenu, servicesMenu, solutionsMenu, type NavLink } from "@/content/navigation";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Group = { key: string; label: string; href: string; links: NavLink[] };

const groups: Group[] = [
  {
    key: "services",
    label: "Services",
    href: "/services",
    // one entry per destination page keeps the mobile list short
    links: servicesMenu.flatMap((g) => g.links).filter((l, i, all) => all.findIndex((x) => x.href.split("#")[0] === l.href.split("#")[0]) === i),
  },
  { key: "solutions", label: "Solutions", href: "/process", links: solutionsMenu },
  { key: "industries", label: "Industries", href: "/industries", links: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
  { key: "company", label: "Company", href: "/about", links: companyMenu },
];

/** Full-screen sheet for small screens: direct links plus accordion groups, focus trapped while open. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>("services");

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = Array.from(ref.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")).filter((el) => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0]!;
      const last = f[f.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [open, onClose]);

  const link = "flex items-center justify-between py-4 font-display text-[1.5rem] font-bold tracking-[-0.03em]";

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      data-open={open}
      className="invisible fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg opacity-0 transition-[opacity,visibility] duration-300 data-[open=true]:visible data-[open=true]:opacity-100 lg:hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_80%_0%,rgb(99_102_241/0.12),transparent_70%)]" />
      <div className="relative flex h-[72px] shrink-0 items-center justify-between px-5">
        <Logo />
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-fg">
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="relative flex flex-1 flex-col px-5 pt-2 pb-8">
        <ul className="divide-y divide-line border-y border-line">
          {groups.map((g) => {
            const isOpen = expanded === g.key;
            return (
              <li key={g.key}>
                <button type="button" className={cn(link, "w-full text-left")} aria-expanded={isOpen} aria-controls={`m-${g.key}`} onClick={() => setExpanded(isOpen ? null : g.key)}>
                  {g.label}
                  <span className={cn("grid h-8 w-8 place-items-center rounded-lg bg-bg-3 text-indigo-deep transition-transform duration-300", isOpen && "rotate-45 bg-lavender")} aria-hidden>
                    <svg width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div id={`m-${g.key}`} hidden={!isOpen} className="pb-5">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9375rem] text-fg-2">
                    {g.links.map((l) => (
                      <li key={l.label}>
                        <TrackedLink href={l.href} event="nav_click" eventLabel={l.label} onClick={onClose} className="hover:text-accent">
                          {l.label}
                        </TrackedLink>
                      </li>
                    ))}
                  </ul>
                  <TrackedLink href={g.href} event="nav_click" eventLabel={`${g.label} overview`} onClick={onClose} className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-accent">
                    {g.key === "company" ? "About Cirrion" : g.key === "solutions" ? "How we work" : `All ${g.label.toLowerCase()}`}
                    <span className="arrow" aria-hidden>
                      →
                    </span>
                  </TrackedLink>
                </div>
              </li>
            );
          })}
          {[
            { label: "Work", href: "/work" },
            { label: "Insights", href: "/insights" },
          ].map((l) => (
            <li key={l.href}>
              <TrackedLink href={l.href} event="nav_click" eventLabel={l.label} onClick={onClose} className={link}>
                {l.label}
                <span className="arrow text-[1.125rem] text-fg-3" aria-hidden>
                  →
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <TrackedLink href="/contact" event="cta_click" eventLabel="Start a Project (mobile menu)" onClick={onClose} className="btn btn-primary w-full">
            <span>Start a Project</span>
            <span className="arrow" aria-hidden>
              →
            </span>
          </TrackedLink>
          <a href={`mailto:${site.email}`} className="mt-5 block text-center text-[0.9375rem] text-fg-2">
            {site.email}
          </a>
        </div>
      </nav>
    </div>
  );
}
