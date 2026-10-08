"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { IndustryIcon } from "@/components/visuals/IndustryIcon";
import { MobileMenu } from "./MobileMenu";
import { companyMenu, primaryNav, servicesMenu, solutionsMenu, type MenuKey } from "@/content/navigation";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

/**
 * Floating navbar: a translucent bar that firms up after scrolling, with mega menus for Services, Solutions and
 * Industries and a compact Company menu. Mouse opens on hover (with a short close delay); touch and keyboard use the
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
                <li key={item.label} className={key === "company" ? "relative" : undefined} onPointerEnter={(e) => (key ? hoverOpen(key, e) : setOpen(null))}>
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
                  {key === "company" && <CompanyPanel open={open === "company"} />}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <TrackedLink href="/contact" event="cta_click" eventLabel="Let's Talk (nav)" className="btn btn-primary btn-sm hidden lg:inline-flex">
              <span>Let&apos;s Talk</span>
              <span className="arrow" aria-hidden>
                →
              </span>
            </TrackedLink>
            <TrackedLink href="/contact" event="cta_click" eventLabel="Let's Talk (nav, mobile)" className="btn btn-primary btn-sm !min-h-[40px] !px-3.5 !text-[0.875rem] max-[359px]:hidden lg:hidden">
              Let&apos;s Talk
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
          <SolutionsPanel open={open === "solutions"} />
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

const solutionIcons = [
  <path key="mvp" d="M12 3c3 2 5 5.5 5 9.5L15 15H9l-2-2.5C7 8.5 9 5 12 3Zm-3 12-2 4 3-1m5-3 2 4-3-1m-2-9.5v.01" />,
  <path key="saas" d="M4 7.5 12 3l8 4.5-8 4.5-8-4.5Zm0 4.5 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />,
  <path key="ai" d="M12 3v3m0 12v3M3 12h3m12 0h3M9 9h6v6H9z" />,
  <path key="sheet" d="M4 5h16v14H4zM4 10h16M10 10v9" />,
  <path key="portal" d="M3 6h18v12H3zM3 9.5h18M7 13.5h5" />,
  <path key="scale" d="M4 19h16M6 15l4-4 3 3 5-6m0 0h-3.5M18 8v3.5" />,
];

function SolutionsPanel({ open }: { open: boolean }) {
  return (
    <div id="menu-solutions" className="mega hidden lg:block" data-open={open}>
      <div className="grid grid-cols-[1fr_340px] gap-8 p-7">
        <div>
          <p className="mega-head">Solutions by outcome</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1">
            {solutionsMenu.map((l, i) => (
              <li key={l.label}>
                <MegaLink
                  href={l.href}
                  label={l.label}
                  sub={l.sub}
                  icon={
                    <span className="icon-tile !h-10 !w-10 !rounded-xl">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {solutionIcons[i]}
                      </svg>
                    </span>
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <TrackedLink href="/work/elfworks-accounting" event="nav_click" eventLabel="Featured case study (mega menu)" className="group flex flex-col rounded-2xl border border-line bg-bg p-6 transition-[border-color,box-shadow] duration-300 hover:border-indigo/30 hover:shadow-[var(--glow-indigo)]">
          <p className="mega-head !text-accent">Featured case study</p>
          <p className="mt-3 font-display text-[1.25rem] leading-tight font-bold tracking-[-0.025em]">ElfWorks Accounting</p>
          <p className="mt-2 text-[0.875rem] leading-snug text-fg-2">A multi-tenant AI SaaS platform for accounting and tax-advisory firms.</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {["SaaS", "AI", "Web"].map((t) => (
              <li key={t} className="tag !py-0.5 !text-[0.75rem]">
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.875rem] font-semibold text-accent">
            Read the case study
            <span className="arrow" aria-hidden>
              →
            </span>
          </span>
        </TrackedLink>
      </div>
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

function CompanyPanel({ open }: { open: boolean }) {
  return (
    <div id="menu-company" className="mega mega-compact !top-[calc(100%+26px)] !left-1/2 hidden w-[320px] !-translate-x-1/2 lg:block" data-open={open}>
      <ul className="space-y-0.5 p-4 pb-3">
        {companyMenu.map((c) => (
          <li key={c.href} className="px-2.5">
            <MegaLink href={c.href} label={c.label} sub={c.sub} />
          </li>
        ))}
      </ul>
      <a href={`mailto:${site.email}`} className="flex items-center justify-between border-t border-line px-6 py-3.5 text-[0.875rem] text-fg-2 transition-colors hover:text-accent">
        {site.email}
        <span className="arrow-ne" aria-hidden>
          ↗
        </span>
      </a>
    </div>
  );
}
