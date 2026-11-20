"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTop } from "@/components/providers/SmoothScrollProvider";

const NAV_LINKS = [
  { href: "/projects", label: "Residences" },
  { href: "/materials", label: "Materials" },
  { href: "/catalog", label: "Catalog" },
  { href: "/studio", label: "Studio" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpenForPath, setMenuOpenForPath] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const menuOpen = menuOpenForPath === pathname;
  const setMenuOpen = (open: boolean) =>
    setMenuOpenForPath(open ? pathname : null);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpenForPath(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const items = drawerRef.current.querySelectorAll(".mobile-nav-item");
    gsap.fromTo(
      items,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.42,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Floating White Pill Navbar (always visible at y = 0 and on scroll) */}
      <header className="fixed top-4 right-0 left-0 z-40 px-4 sm:top-5 sm:px-6">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-black/[0.08] bg-white/95 px-4 shadow-sm backdrop-blur-md transition-all duration-300 sm:h-16 sm:px-6">
          <Link
            href="/"
            onClick={handleBrandClick}
            className="flex items-center gap-2 text-[#0D0D0D]"
            aria-label="Atelier Vastu Home"
          >
            <span className="h-2 w-2 rounded-full bg-[#0D0D0D]" />
            <span className="font-display text-base font-semibold tracking-[-0.03em] sm:text-lg">
              atelier vastu
            </span>
          </Link>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-[#0D0D0D]"
                      : "text-[#666666] hover:text-[#0D0D0D]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-[#0D0D0D]"
                  : "text-[#666666] hover:text-[#0D0D0D]"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/estimate"
              data-cursor="EXPLORE"
              className="hidden items-center gap-1.5 rounded-full bg-[#0D0D0D] px-5 py-2.5 text-xs font-medium text-[#FFFFFF] transition-transform hover:scale-[1.02] md:inline-flex"
            >
              <span>Estimate</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-[#F5F5F4] text-[#0D0D0D] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Opaque #0D0D0D Full-Screen Mobile Drawer */}
      {menuOpen && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-[#0D0D0D] px-6 py-6 text-[#FFFFFF] md:hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <span className="font-display text-xl font-semibold tracking-[-0.03em]">
              atelier vastu
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#FFFFFF]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-5 py-8">
            {[
              { href: "/", label: "Home" },
              ...NAV_LINKS,
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === "/" && pathname === "/") {
                    e.preventDefault();
                    scrollToTop();
                  }
                  setMenuOpen(false);
                }}
                className="mobile-nav-item font-display text-4xl font-medium tracking-[-0.04em] text-[#FFFFFF] transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/estimate"
              onClick={() => setMenuOpen(false)}
              className="mobile-nav-item mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFFFFF] px-6 py-4 text-sm font-medium text-[#0D0D0D]"
            >
              <span>Estimate Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="mobile-nav-item border-t border-white/10 pt-5 text-xs text-white/60">
            Chennai · Bengaluru · Hyderabad
          </div>
        </div>
      )}
    </>
  );
}
