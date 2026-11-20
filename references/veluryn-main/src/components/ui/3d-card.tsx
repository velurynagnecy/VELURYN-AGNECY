"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or location, e.g., "Vietnam" */
  subtitle: string;
  /** The URL for the background image. */
  imageUrl: string;
  /** The text for the primary action button, e.g., "Book your trip" */
  actionText?: string;
  /** The destination URL for the top-right link. */
  href?: string;
  /** Callback function when the primary action button is clicked. */
  onActionClick?: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A responsive and theme-adaptive travel card with a 3D tilt effect on hover.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText = "Explore", href = "#", onActionClick, className },
    ref
  ) => {
    // --- 3D Tilt Animation Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const isExternal = href.startsWith("http");

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          // Base styles for the card container, using theme variables for border
          "relative h-[26rem] w-full max-w-[22rem] rounded-2xl bg-transparent shadow-2xl border border-white/20 dark:border-white/10",
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] grid-rows-[1fr_auto] rounded-xl shadow-lg overflow-hidden border border-[#FFD504]/20 bg-gradient-to-br from-[#0a1e5e] via-[#071644] to-[#040d2b]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(255, 213, 4, 0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(11, 95, 255, 0.25) 0%, transparent 50%)",
            }}
          />

          {/* Subtle Geometric Wireframe Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Branded Watermark Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex flex-col items-center gap-1.5 opacity-25">
            <span className="text-xl text-[#FFD504]">✦</span>
            <span className="text-[10px] tracking-[0.3em] font-semibold uppercase text-white">VELURYN</span>
          </div>

          {/* Optional Background Image (if valid real asset is provided in future) */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`${title}, ${subtitle}`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-xl object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          )}

          {/* Darkening overlay for text contrast */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

          {/* Card Content (Header & Footer) */}
          <div className="relative flex flex-col justify-between rounded-xl p-5 text-white h-full z-10">
            
            {/* Header section with text and link */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <motion.h2 
                  style={{ transform: "translateZ(50px)" }}
                  className="text-2xl font-bold tracking-tight text-white drop-shadow-sm"
                >
                  {title}
                </motion.h2>
                <motion.p 
                  style={{ transform: "translateZ(40px)" }}
                  className="text-sm font-medium text-white/85 mt-1"
                >
                  {subtitle}
                </motion.p>
              </div>
              {isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${title}`}
                  style={{ transform: "translateZ(60px)" }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-inset ring-[#FFD504]/40 transition-colors hover:bg-[#FFD504] hover:text-[#061340]"
                >
                  <ArrowUpRight className="h-5 w-5 text-[#FFD504] transition-colors group-hover:text-[#061340]" />
                </a>
              ) : (
                <Link
                  to={href}
                  aria-label={`Learn more about ${title}`}
                  style={{ transform: "translateZ(60px)" }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-inset ring-[#FFD504]/40 transition-colors hover:bg-[#FFD504] hover:text-[#061340]"
                >
                  <ArrowUpRight className="h-5 w-5 text-[#FFD504] transition-colors group-hover:text-[#061340]" />
                </Link>
              )}
            </div>

            {/* Footer Button */}
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (onActionClick) {
                    e.preventDefault();
                    onActionClick();
                  }
                }}
                style={{ transform: "translateZ(40px)" }}
                className={cn(
                  "w-full rounded-lg py-3 text-center text-sm font-semibold transition-all cursor-pointer block",
                  "bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/25 text-white hover:bg-[#FFD504] hover:text-[#061340] hover:ring-[#FFD504] shadow-sm"
                )}
              >
                {actionText}
              </a>
            ) : (
              <Link
                to={href}
                onClick={(e) => {
                  if (onActionClick) {
                    e.preventDefault();
                    onActionClick();
                  }
                }}
                style={{ transform: "translateZ(40px)" }}
                className={cn(
                  "w-full rounded-lg py-3 text-center text-sm font-semibold transition-all cursor-pointer block",
                  "bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/25 text-white hover:bg-[#FFD504] hover:text-[#061340] hover:ring-[#FFD504] shadow-sm"
                )}
              >
                {actionText}
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";

export default InteractiveTravelCard;
