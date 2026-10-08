"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/content/site";
import { serviceMenu } from "@/content/services";
import { TrackedLink } from "@/components/ui/TrackedLink";

const links = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Solutions", href: "/industries" },
  { label: "Company", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
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
      className="invisible fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg opacity-0 transition-[opacity,visibility] duration-200 data-[open=true]:visible data-[open=true]:opacity-100 lg:hidden"
    >
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5">
        <Logo />
        <button ref={closeBtn} type="button" onClick={onClose} className="btn btn-ghost btn-sm">
          Close
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pt-4 pb-8">
        <ul>
          {links.map((l) => (
            <li key={l.href} className="border-b border-line">
              <TrackedLink href={l.href} event="nav_click" eventLabel={l.label} onClick={onClose} className="flex items-center justify-between py-4 font-semibold tracking-tight text-[1.625rem]">
                {l.label}
              </TrackedLink>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Services</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.9375rem] text-fg-2">
          {serviceMenu.map((s) => (
            <li key={s.href}>
              <Link href={s.href} onClick={onClose} className="hover:text-accent">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[0.8125rem] font-semibold tracking-[0.06em] text-fg-3 uppercase">Company</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.9375rem] text-fg-2">
          {nav.company.map((c) => (
            <li key={c.href}>
              <Link href={c.href} onClick={onClose} className="hover:text-accent">
                {c.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <TrackedLink href="/contact" event="cta_click" eventLabel="Start a project (mobile menu)" onClick={onClose} className="btn btn-primary w-full">
            <span>Start a project</span>
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
