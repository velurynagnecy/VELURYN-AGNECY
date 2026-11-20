"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { scrollToTop } from "@/components/providers/SmoothScrollProvider";

const FOOTER_COLUMNS = [
  {
    title: "Residences",
    links: [
      { label: "All Projects", href: "/projects" },
      { label: "Boat Club Villa", href: "/projects/boat-club-road-villa-chennai" },
      { label: "Indiranagar Penthouse", href: "/projects/indiranagar-penthouse-bengaluru" },
      { label: "Jubilee Hills Duplex", href: "/projects/jubilee-hills-duplex-hyderabad" },
    ],
  },
  {
    title: "Systems",
    links: [
      { label: "Modular Catalog", href: "/catalog" },
      { label: "Material Library", href: "/materials" },
      { label: "Estimate Calculator", href: "/estimate" },
      { label: "45-Day Protocol", href: "/studio" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About Atelier", href: "/studio" },
      { label: "Chennai Studio", href: "/contact" },
      { label: "Bengaluru Lab", href: "/contact" },
      { label: "Hyderabad Gallery", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Warranty", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative overflow-hidden bg-[#F7F7F5] text-[#0D0D0D]">
      {/* Top Clean Editorial Grid */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-6 pt-28 pb-10 sm:px-10 sm:pt-36 lg:px-14 lg:pt-40">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#0D0D0D]" />
              <span className="font-display text-xl font-semibold tracking-[-0.03em] text-[#0D0D0D]">
                atelier vastu
              </span>
            </Link>

            <p className="mt-4 max-w-[260px] text-xs leading-relaxed text-[#666666]">
              Built for modern Indian living, engineered to 0.2mm architectural
              precision.
            </p>

            <div className="mt-6 flex items-center gap-4 text-[#0D0D0D]">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="transition-opacity hover:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="mailto:concierge@ateliervastu.in"
                aria-label="Email Atelier Vastu"
                className="transition-opacity hover:opacity-60"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+914448129040"
                aria-label="Call Atelier Vastu"
                className="transition-opacity hover:opacity-60"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 4 Clean Link Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold text-[#0D0D0D]">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-[#666666] transition-colors hover:text-[#0D0D0D]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="mt-14 text-center">
          <p className="text-xs font-medium text-[#0D0D0D]/80">
            © {new Date().getFullYear()} Atelier Vastu.
          </p>
        </div>
      </div>

      {/* Scenic Architectural Pavilion Bottom Horizon + Oversized White Wordmark */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[360px]">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
          alt="Sunlit modern architectural pavilion horizon"
          className="h-full w-full object-cover object-center"
        />

        {/* Smooth top fade blending the #F7F7F5 top footer seamlessly into the sky */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F7F7F5] via-[#F7F7F5]/75 to-transparent sm:h-44" />

        {/* Giant Monumental White Wordmark */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-end justify-center px-3 sm:bottom-5">
          <span
            aria-hidden="true"
            className="font-display select-none text-[13.5vw] leading-[0.82] font-bold tracking-[-0.055em] text-[#FFFFFF]/95 drop-shadow-sm lg:text-[13vw]"
          >
            atelier vastu
          </span>
        </div>
      </div>
    </footer>
  );
}
