"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { IndustryIcon } from "@/components/visuals/IndustryIcon";
import { MobileMenu } from "./MobileMenu";
import { primaryNav, servicesMenu, type MenuKey } from "@/content/navigation";
import { industries } from "@/content/industries";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/**
 * Floating navbar: a translucent bar that firms up after scrolling, with mega menus for Services and Industries. Mouse opens on hover (with a short close delay); touch and keyboard use the
 * buttons. Escape closes and returns focus to the trigger.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen((cur) => {
        if (cur) navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="menu-${cur}"]`)?.focus();
        return null;
      });
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const hoverOpen = useCallback((key: MenuKey, e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  }, []);
  const hoverClose = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 180);
  }, []);
  const keepOpen = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") window.clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string, match?: string[]) => {
    const list = match ?? [href];
    return list.some((h) => (h === "/" ? pathname === "/" : pathname.startsWith(h)));
  };

  return (
    <>
      <header className="nav-shell" data-scrolled={scrolled} data-open={open !== null}>
        <nav
          ref={navRef}
          aria-label="Primary"
          className="nav-bar"
          onPointerLeave={hoverClose}
          onPointerEnter={keepOpen}
          onBlur={(e) => {
            if (!navRef.current?.contains(e.relatedTarget as Node | null)) setOpen(null);
          }}
        >
          <Link href="/" aria-label="Cirrion home" className="shrink-0 rounded-lg" onClick={() => track("nav_click", { label: "logo" })}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => {
              const key = item.menu ?? null;
              const expanded = key !== null && open === key;
              const active = isActive(item.href, item.match);
              return (
                <li key={item.label} onPointerEnter={(e) => (key ? hoverOpen(key, e) : setOpen(null))}>
                  {key ? (
                    <button
                      type="button"
                      className="nav-link"
                      data-active={active}
                      aria-expanded={expanded}
                      aria-controls={`menu-${key}`}
                      onClick={() => {
                        track("nav_menu_toggle", { menu: key });
                        setOpen(expanded ? null : key);
                      }}
                    >
                      {item.label}
                      <Chevron />
                    </button>
                  ) : (
                    <TrackedLink href={item.href} event="nav_click" eventLabel={item.label} aria-current={active ? "page" : undefined} className="nav-link">
                      {item.label}
                    </TrackedLink>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <TrackedLink href="/contact" event="cta_click" eventLabel="Start a Project (nav)" className="btn btn-primary btn-sm hidden lg:inline-flex">
              <span>Start a Project</span>
              <span className="arrow" aria-hidden>
                →
              </span>
            </TrackedLink>
            <TrackedLink href="/contact" event="cta_click" eventLabel="Start a Project (nav, mobile)" className="btn btn-primary btn-sm !min-h-[40px] !px-3.5 !text-[0.875rem] max-[399px]:hidden lg:hidden">
              Start a Project
            </TrackedLink>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/80 text-fg transition-colors hover:bg-lavender lg:hidden"
              aria-expanded={mobile}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setMobile(true)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                <path d="M2.5 6h13M2.5 12h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ServicesPanel open={open === "services"} />
          <IndustriesPanel open={open === "industries"} />
        </nav>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  );
}

function Chevron() {
  return (
    <svg className="nav-chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaLink({ href, label, sub, icon }: { href: string; label: string; sub?: string; icon?: React.ReactNode }) {
  return (
    <TrackedLink href={href} event="nav_click" eventLabel={label} className={cn("mega-link group", sub && "items-start")}>
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block leading-snug font-medium">{label}</span>
        {sub && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-3">{sub}</span>}
      </span>
      <span className="arrow text-[0.875rem] text-indigo" aria-hidden>
        →
      </span>
    </TrackedLink>
  );
}

function ServicesPanel({ open }: { open: boolean }) {
  return (
    <div id="menu-services" className="mega hidden lg:block" data-open={open}>
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_300px] gap-8 p-7">
        {servicesMenu.map((g) => (
          <div key={g.title}>
            <p className="mega-head">{g.title}</p>
            <ul className="mt-4 space-y-0.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <MegaLink href={l.href} label={l.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <FeaturePanel />
      </div>
      <div className="flex items-center justify-between border-t border-line px-7 py-4 text-[0.875rem]">
        <p className="text-fg-3">Eight disciplines, one accountable team. From first prototype to production.</p>
        <TrackedLink href="/services" event="nav_click" eventLabel="All services" className="inline-flex items-center gap-1.5 font-semibold text-accent">
          All services
          <span className="arrow" aria-hidden>
            →
          </span>
        </TrackedLink>
      </div>
    </div>
  );
}

function FeaturePanel() {
  return (
    <div className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-[linear-gradient(140deg,#f3f1ff,#eaf2ff)] p-6 ring-1 ring-indigo/10">
      <svg aria-hidden className="absolute -right-6 -bottom-8 -z-10 h-44 w-44 text-indigo/25" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="56" stroke="currentColor" strokeDasharray="2 6" />
        <circle cx="80" cy="80" r="30" stroke="currentColor" />
        <circle cx="80" cy="24" r="4" fill="#6366F1" fillOpacity=".5" />
        <circle cx="136" cy="80" r="4" fill="#6366F1" fillOpacity=".5" />
        <circle cx="40" cy="120" r="3.5" fill="#F47B20" />
      </svg>
      <p className="mega-head !text-accent">Start here</p>
      <p className="mt-3 font-display text-[1.375rem] leading-tight font-bold tracking-[-0.03em]">Have a product idea?</p>
      <p className="mt-2 text-[0.9375rem] leading-snug text-fg-2">Let&apos;s turn it into something real.</p>
      <TrackedLink href="/contact" event="cta_click" eventLabel="Start a Project (mega menu)" className="btn btn-primary btn-sm mt-auto self-start">
        Start a Project
        <span className="arrow" aria-hidden>
          →
        </span>
      </TrackedLink>
    </div>
  );
}

function IndustriesPanel({ open }: { open: boolean }) {
  return (
    <div id="menu-industries" className="mega hidden lg:block" data-open={open}>
      <div className="p-7">
        <p className="mega-head">Industries we build for</p>
        <ul className="mt-4 grid grid-cols-4 gap-x-6 gap-y-2">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <MegaLink
                href={`/industries/${ind.slug}`}
                label={ind.title}
                sub={ind.summary}
                icon={
                  <span className="icon-tile !h-10 !w-10 !rounded-xl">
                    <IndustryIcon slug={ind.slug} className="h-[22px] w-[22px]" />
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-line px-7 py-4 text-[0.875rem]">
        <p className="text-fg-3">We learn the workflow first. The software should fit the business.</p>
        <TrackedLink href="/industries" event="nav_click" eventLabel="All industries" className="inline-flex items-center gap-1.5 font-semibold text-accent">
          All industries
          <span className="arrow" aria-hidden>
            →
          </span>
        </TrackedLink>
      </div>
    </div>
  );
}
