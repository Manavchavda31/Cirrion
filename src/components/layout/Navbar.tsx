"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { MobileMenu } from "./MobileMenu";
import { nav } from "@/content/site";
import { serviceMenu } from "@/content/services";
import { industries } from "@/content/industries";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

type MenuKey = "services" | "solutions" | "company";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);

  // close everything on navigation
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
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
    if (e.pointerType !== "mouse") return; // touch uses click
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  }, []);
  const hoverClose = useCallback((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  }, []);
  const keepOpen = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") window.clearTimeout(closeTimer.current);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-bg">
        <nav
          ref={navRef}
          aria-label="Primary"
          className="container-x relative flex h-[var(--nav-h)] items-center justify-between"
          onPointerLeave={hoverClose}
          onPointerEnter={keepOpen}
          onBlur={(e) => {
            if (!navRef.current?.contains(e.relatedTarget as Node | null)) setOpen(null);
          }}
        >
          <Link href="/" aria-label="Cirrion — home" onClick={() => track("nav_click", { label: "logo" })}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.primary.map((item) => {
              const key = "menu" in item ? (item.menu as MenuKey) : null;
              const expanded = key && open === key;
              return (
                <li key={item.label} className="relative" onPointerEnter={(e) => key && hoverOpen(key, e)}>
                  {key ? (
                    <button
                      type="button"
                      aria-expanded={!!expanded}
                      aria-controls={`menu-${key}`}
                      onClick={() => {
                        track("nav_menu_toggle", { menu: key });
                        setOpen(expanded ? null : key);
                      }}
                      className={cn(
                        "flex h-10 items-center gap-1.5 rounded-md px-3.5 text-[0.9375rem] text-fg-2 transition-colors hover:text-accent",
                        (expanded || isActive(item.href)) && "text-fg",
                      )}
                    >
                      {item.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                        <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <TrackedLink
                      href={item.href}
                      event="nav_click"
                      eventLabel={item.label}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn("flex h-10 items-center rounded-md px-3.5 text-[0.9375rem] text-fg-2 transition-colors hover:text-accent", isActive(item.href) && "text-fg")}
                    >
                      {item.label}
                    </TrackedLink>
                  )}

                  {key === "services" && (
                    <Panel id="menu-services" open={open === "services"} className="w-[640px]">
                      <div className="grid grid-cols-2 gap-x-2">
                        {serviceMenu.map((s) => (
                          <MenuLink key={s.href} href={s.href} title={s.title} sub={s.sub} />
                        ))}
                      </div>
                      <div className="mt-2 border-t border-line pt-2">
                        <MenuLink href="/services" title="All services" />
                      </div>
                    </Panel>
                  )}
                  {key === "solutions" && (
                    <Panel id="menu-solutions" open={open === "solutions"} className="w-[480px]">
                      <div className="grid grid-cols-2 gap-x-2">
                        {industries.map((ind) => (
                          <MenuLink key={ind.slug} href={`/industries/${ind.slug}`} title={ind.title} />
                        ))}
                      </div>
                      <div className="mt-2 border-t border-line pt-2">
                        <MenuLink href="/industries" title="All industries" />
                      </div>
                    </Panel>
                  )}
                  {key === "company" && (
                    <Panel id="menu-company" open={open === "company"} className="w-[280px]">
                      {nav.company.map((c) => (
                        <MenuLink key={c.href} href={c.href} title={c.label} sub={c.sub} />
                      ))}
                    </Panel>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <TrackedLink href="/contact" event="cta_click" eventLabel="Let's Talk (nav)" className="btn btn-primary btn-sm hidden lg:inline-flex">
              <span>Let&apos;s Talk</span>
            </TrackedLink>
            <button type="button" className="btn btn-ghost btn-sm lg:hidden" aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile(true)}>
              Menu
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  );
}

function MenuLink({ href, title, sub }: { href: string; title: string; sub?: string }) {
  return (
    <TrackedLink href={href} event="nav_click" eventLabel={title} className="block rounded-md px-3 py-2.5 transition-colors hover:bg-bg-2">
      <span className="block text-[0.9375rem] font-medium text-fg">{title}</span>
      {sub && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-fg-3">{sub}</span>}
    </TrackedLink>
  );
}

function Panel({ id, open, className, children }: { id: string; open: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div id={id} data-open={open} className={cn("menu-panel z-10", className)}>
      {children}
    </div>
  );
}
