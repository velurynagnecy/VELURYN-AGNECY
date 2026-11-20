"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionServiceItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  link: string;
  external?: boolean;
  tag?: string;
}

interface InteractiveAccordionProps {
  items: AccordionServiceItem[];
  activeId?: string | null;
  onItemChange?: (id: string | null) => void;
  className?: string;
}

export function InteractiveAccordion({
  items,
  activeId: controlledActiveId,
  onItemChange,
  className,
}: InteractiveAccordionProps) {
  const [internalActiveId, setInternalActiveId] = useState<string | null>(items[0]?.id || null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleToggle = (id: string) => {
    const nextId = activeId === id ? null : id;
    if (controlledActiveId === undefined) {
      setInternalActiveId(nextId);
    }
    if (onItemChange) {
      onItemChange(nextId);
    }
  };

  return (
    <div className={cn("w-full flex flex-col space-y-1", className)}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl transition-all duration-300 border",
              isActive
                ? "bg-white shadow-md border-black/10 dark:bg-zinc-900 dark:border-white/10"
                : "bg-white/60 hover:bg-white border-transparent hover:border-black/5 dark:bg-zinc-900/40 dark:hover:bg-zinc-900"
            )}
          >
            <motion.button
              type="button"
              onClick={() => handleToggle(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="w-full text-left relative py-4 px-5 outline-none select-none cursor-pointer"
              initial={false}
            >
              <div className="flex items-center gap-4 md:gap-5">
                {/* Number Badge with Animated Halo */}
                <div className="relative flex items-center justify-center w-9 h-9 shrink-0">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-black dark:bg-white"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : isHovered ? 0.9 : 0.75,
                      opacity: isActive ? 1 : isHovered ? 0.12 : 0.05,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  />
                  <motion.span
                    className={cn(
                      "relative z-10 text-xs font-bold font-mono transition-colors",
                      isActive ? "text-white dark:text-black" : "text-neutral-500 dark:text-neutral-400"
                    )}
                  >
                    {item.number}
                  </motion.span>
                </div>

                {/* Title & Tag */}
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 flex-1">
                  <motion.h3
                    style={{ color: isActive ? '#EBF3FF' : '#D8E6FC' }}
                    className={cn(
                      "text-lg md:text-xl font-semibold tracking-tight transition-colors",
                      isActive ? "!text-[#EBF3FF]" : "!text-[#D8E6FC]"
                    )}
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {item.tag && (
                    <span className="inline-flex self-start md:self-auto items-center text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-black/[0.04] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Rotating Plus-to-X Icon */}
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
                  <motion.div
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 22,
                    }}
                    className="text-neutral-800 dark:text-neutral-200"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M8 2V14M2 8H14" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Animated Progressive Line Indicator */}
              <motion.div
                className="absolute bottom-0 left-5 right-5 h-[1.5px] bg-black dark:bg-white origin-left"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isActive ? 1 : isHovered ? 0.35 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            </motion.button>

            {/* Expandable Content Area */}
            <AnimatePresence initial={false} mode="wait">
              {isActive && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { type: "spring", stiffness: 320, damping: 30 },
                      opacity: { duration: 0.22, delay: 0.08 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { type: "spring", stiffness: 320, damping: 30 },
                      opacity: { duration: 0.12 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-1 pb-5 pl-16 pr-6 md:pl-18 md:pr-8">
                    <p className="text-sm md:text-base leading-relaxed mb-4 !text-[#D8E6FC]" style={{ color: '#D8E6FC' }}>
                      {item.desc}
                    </p>

                    <div>
                      {item.external ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold !text-[#EBF3FF] hover:opacity-75 transition-opacity group"
                          style={{ color: '#EBF3FF' }}
                        >
                          <span>Explore {item.title}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          to={item.link}
                          className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold !text-[#EBF3FF] hover:opacity-75 transition-opacity group"
                          style={{ color: '#EBF3FF' }}
                        >
                          <span>Explore {item.title}</span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default InteractiveAccordion;
