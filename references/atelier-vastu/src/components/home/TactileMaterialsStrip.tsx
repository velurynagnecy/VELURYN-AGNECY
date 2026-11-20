"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MATERIALS, MaterialGroup } from "@/data/materials";
import { RevealSection } from "@/components/ui/RevealSection";

const FILTERS: ("All" | MaterialGroup)[] = [
  "All",
  "Stone",
  "Timber",
  "Metals",
  "Textiles",
];

export function TactileMaterialsStrip() {
  const [activeGroup, setActiveGroup] = useState<"All" | MaterialGroup>("All");

  const visible =
    activeGroup === "All"
      ? MATERIALS
      : MATERIALS.filter((m) => m.group === activeGroup);

  return (
    <section className="border-t border-black/[0.08] bg-[#FFFFFF] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <RevealSection className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium text-[#666666]">03 / materials</p>
            <h2 className="font-display mt-2 text-4xl font-medium text-[#0D0D0D] sm:text-5xl">
              Tactile architectural surfaces
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((group) => {
              const active = activeGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#0D0D0D] bg-[#0D0D0D] text-[#FFFFFF]"
                      : "border-black/[0.08] bg-[#F5F5F4] text-[#666666] hover:border-black/25 hover:text-[#0D0D0D]"
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </RevealSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {visible.map((mat) => (
            <Link
              key={mat.id}
              href={`/materials#${mat.id}`}
              data-cursor="VIEW"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-black/[0.08] bg-[#F5F5F4]">
                <img
                  src={mat.textureImage}
                  alt={mat.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2 px-1">
                <div>
                  <p className="text-sm font-medium text-[#0D0D0D]">
                    {mat.shortLabel}
                  </p>
                  <p className="text-xs text-[#666666]">{mat.group}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#666666] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0D0D0D]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
