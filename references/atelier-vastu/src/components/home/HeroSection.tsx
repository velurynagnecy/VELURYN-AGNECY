"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgImgRef.current && containerRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { scale: 1.05, yPercent: 0 },
          {
            scale: 1.0,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F5F4] px-5 pt-28 pb-16 text-center sm:px-8 lg:px-14"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImgRef}
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
          alt="Modern architectural living room"
          className="h-full w-full object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/35" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        <h1 className="font-display mx-auto text-5xl leading-[0.98] font-medium text-[#FFFFFF] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-[84px]">
          The Art of Modern
          <br />
          Indian Living
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-base">
          Turnkey interior architecture and modular systems across Chennai,
          Bengaluru, and Hyderabad.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            data-cursor="VIEW"
            className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-7 py-3.5 text-sm font-medium text-[#0D0D0D] shadow-md transition-transform hover:scale-[1.02]"
          >
            <span>Explore Residences</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href="/estimate"
            data-cursor="EXPLORE"
            className="inline-flex items-center gap-2 rounded-full bg-[#0D0D0D] px-7 py-3.5 text-sm font-medium text-[#FFFFFF] shadow-md transition-transform hover:scale-[1.02]"
          >
            <span>Estimate Project</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
