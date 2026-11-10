"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import type { NavGroup, NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";

type Props = { groups: NavGroup[]; links: NavLink[] };

export function Header({ groups, links }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close every menu after navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the desktop menu on outside click or Escape, returning focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const id = open;
        setOpen(null);
        document.getElementById(`nav-trigger-${id}`)?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Lock page scroll behind the mobile menu and close it with Escape.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        document.getElementById("mobile-menu-button")?.focus();
      }
    };
    if (mobileOpen) document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const clearTimer = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };
  const hoverOpen = (id: string) => {
    clearTimer();
    hoverTimer.current = setTimeout(() => setOpen(id), 100);
  };
  const hoverClose = () => {
    clearTimer();
    hoverTimer.current = setTimeout(() => setOpen(null), 200);
  };

  const active = groups.find((g) => g.id === open);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const groupCurrent = (g: NavGroup) =>
    g.columns.some((c) => c.links.some((l) => isCurrent(l.href)) || isCurrent(c.href));

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={hoverClose}
        onMouseEnter={clearTimer}
        className={cn(
          "sticky top-0 z-50 border-b bg-ivory transition-[box-shadow,border-color] duration-300",
          scrolled || open ? "border-stone shadow-[0_12px_32px_-24px_rgba(20,17,15,0.45)]" : "border-transparent",
        )}
      >
        <div className="container-page flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {groups.map((g) => {
                const isOpen = open === g.id;
                const current = groupCurrent(g);
                return (
                  <li key={g.id}>
                    <button
                      id={`nav-trigger-${g.id}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`nav-panel-${g.id}`}
                      onClick={() => setOpen(isOpen ? null : g.id)}
                      onMouseEnter={() => hoverOpen(g.id)}
                      className={cn(
                        "relative inline-flex min-h-11 items-center gap-1 px-3 text-[0.95rem] font-medium transition-colors hover:text-claret",
                        isOpen || current ? "text-ink" : "text-body",
                      )}
                    >
                      {g.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                      {current && (
                        <span aria-hidden="true" className="absolute inset-x-3 -bottom-[15px] h-0.5 bg-claret" />
                      )}
                    </button>
                  </li>
                );
              })}
              {links
                .filter((l) => l.href !== "/contact")
                .map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onMouseEnter={hoverClose}
                      aria-current={isCurrent(l.href) ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center px-3 text-[0.95rem] font-medium transition-colors hover:text-claret",
                        isCurrent(l.href) ? "text-ink" : "text-body",
                      )}
                    >
                      {l.label}
                      {isCurrent(l.href) && (
                        <span aria-hidden="true" className="absolute inset-x-3 -bottom-[15px] h-0.5 bg-claret" />
                      )}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-6 lg:flex">
            <Link
              href="/contact"
              onMouseEnter={hoverClose}
              className="group text-[0.95rem] font-medium text-ink transition-colors hover:text-claret"
            >
              <span className="link-underline">Contact us</span>
            </Link>
            <Link
              href="/contact/request-a-meeting"
              onMouseEnter={hoverClose}
              className="press inline-flex min-h-11 items-center rounded-[3px] bg-claret px-4 text-[0.95rem] font-semibold whitespace-nowrap text-ivory hover:bg-claret-deep"
            >
              Request a meeting
            </Link>
          </div>

          <button
            id="mobile-menu-button"
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop mega menu */}
        {active && (
          <div
            key={active.id}
            id={`nav-panel-${active.id}`}
            role="region"
            aria-label={`${active.label} menu`}
            className="menu-in absolute inset-x-0 top-full hidden border-y border-stone bg-ivory shadow-[0_36px_60px_-36px_rgba(20,17,15,0.45)] lg:block"
          >
            <div
              className={cn(
                "container-page grid gap-10 py-10",
                active.columns.length > 1 ? "xl:grid-cols-[1fr_17rem]" : "grid-cols-[1fr_20rem]",
              )}
            >
              {active.columns.length > 1 ? (
                <div className="grid grid-cols-4 gap-8">
                  {active.columns.map((col) => (
                    <div key={col.title}>
                      <Link
                        href={col.href}
                        onClick={() => setOpen(null)}
                        className="group inline-flex items-center gap-1.5 border-b border-stone pb-3 font-serif text-xl text-ink"
                      >
                        <span className="link-underline">{col.title}</span>
                      </Link>
                      <ul className="mt-3 space-y-0.5">
                        {col.links.slice(col.links[0]?.href === col.href ? 1 : 0).map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setOpen(null)}
                              aria-current={isCurrent(l.href) ? "page" : undefined}
                              className="group flex items-start justify-between gap-2 py-1.5 text-[0.95rem] text-body transition-colors hover:text-claret"
                            >
                              <span>{l.label}</span>
                              <ArrowRight
                                aria-hidden="true"
                                className="mt-1 h-3.5 w-3.5 shrink-0 -translate-x-1 text-claret opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
                  {active.columns[0].links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(null)}
                        aria-current={isCurrent(l.href) ? "page" : undefined}
                        className="group block border-t border-stone py-4"
                      >
                        <span className="flex items-center gap-2 font-serif text-xl text-ink group-hover:text-claret">
                          {l.label}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-4 w-4 -translate-x-1 text-claret opacity-0 transition-[transform,opacity] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </span>
                        {l.description && <span className="mt-1 block text-[0.95rem] text-slate">{l.description}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div
                className={cn(
                  "on-dark flex-col justify-between bg-ink p-7 text-fog",
                  active.columns.length > 1 ? "hidden xl:flex" : "flex",
                )}
              >
                <div>
                  <p className="font-serif text-2xl leading-tight text-ivory">{active.aside.title}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed">{active.aside.body}</p>
                </div>
                <Link
                  href={active.aside.href}
                  onClick={() => setOpen(null)}
                  className="group mt-8 inline-flex items-center gap-2 font-semibold text-rose"
                >
                  <span className="link-underline">{active.aside.cta}</span>
                  <ArrowRight aria-hidden="true" className="arrow-nudge h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu: a full-screen dialog, rendered outside the sticky header. */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ivory lg:hidden"
        >
          <div className="container-page flex h-[76px] shrink-0 items-center justify-between border-b border-stone">
            <Logo />
            <button
              type="button"
              autoFocus
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
              aria-label="Close menu"
              onClick={() => {
                setMobileOpen(false);
                document.getElementById("mobile-menu-button")?.focus();
              }}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-page flex-1 py-4">
            <ul className="divide-y divide-stone">
              {groups.map((g) => (
                <li key={g.id}>
                  <details className="group/d">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-serif text-2xl text-ink [&::-webkit-details-marker]:hidden">
                      {g.label}
                      <ChevronDown
                        aria-hidden="true"
                        className="h-5 w-5 text-slate transition-transform group-open/d:rotate-180"
                      />
                    </summary>
                    <div className="pb-5">
                      {g.columns.map((col) => (
                        <div key={col.title} className="mt-2">
                          {g.columns.length > 1 && (
                            <p className="mt-3 text-xs font-semibold tracking-[0.14em] text-slate uppercase">
                              {col.title}
                            </p>
                          )}
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  aria-current={isCurrent(l.href) ? "page" : undefined}
                                  className="flex min-h-11 items-center text-body aria-[current=page]:font-semibold aria-[current=page]:text-claret"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>
                </li>
              ))}
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-14 items-center font-serif text-2xl text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 pb-10">
              <Link
                href="/contact/request-a-meeting"
                className="press inline-flex min-h-12 items-center justify-center rounded-[3px] bg-claret px-5 font-semibold text-ivory"
              >
                Request a meeting
              </Link>
              <Link
                href="/contact"
                className="press inline-flex min-h-12 items-center justify-center rounded-[3px] border border-ink/25 px-5 font-semibold text-ink"
              >
                Contact us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
