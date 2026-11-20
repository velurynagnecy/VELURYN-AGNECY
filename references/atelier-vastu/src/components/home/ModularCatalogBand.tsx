"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { CatalogCategory, MODULAR_CATALOG } from "@/data/catalog";
import { RevealSection } from "@/components/ui/RevealSection";

const CATEGORIES: ("All" | CatalogCategory)[] = [
  "All",
  "Kitchens",
  "Wardrobes",
  "Vanities",
  "Lighting",
  "Bespoke",
];

export function ModularCatalogBand() {
  const [activeCategory, setActiveCategory] = useState<
    "All" | CatalogCategory
  >("All");

  const items =
    activeCategory === "All"
      ? MODULAR_CATALOG.slice(0, 4)
      : MODULAR_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <section id="catalog" className="px-3 py-6 sm:px-5 sm:py-8">
      <RevealSection className="mx-auto max-w-[1440px] rounded-[28px] bg-[#0D0D0D] px-6 py-14 text-[#FFFFFF] sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-14">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-medium text-white/55">
              04 / modular systems
            </p>
            <h2 className="font-display mt-2 text-4xl font-medium text-[#FFFFFF] sm:text-5xl">
              Modular systems
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "border-[#FFFFFF] bg-[#FFFFFF] text-[#0D0D0D]"
                      : "border-white/15 bg-transparent text-white/70 hover:border-white/40 hover:text-[#FFFFFF]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-[#FFFFFF] p-4 text-[#0D0D0D]"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F5F5F4]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-2 px-1">
                  <h3 className="font-display text-lg font-semibold text-[#0D0D0D]">
                    {item.name}
                  </h3>
                  <span className="shrink-0 text-sm font-semibold text-[#0D0D0D]">
                    {item.priceLabel}
                  </span>
                </div>
                <p className="mt-1 px-1 text-xs text-[#666666]">
                  {item.finish}
                </p>
                <p className="mt-0.5 px-1 text-[11px] text-[#666666]/80">
                  {item.dimensions}
                </p>
              </div>

              <Link
                href={`/estimate?scope=${encodeURIComponent(
                  item.estimateScope
                )}&item=${encodeURIComponent(`${item.name} (${item.priceLabel})`)}`}
                data-cursor="EXPLORE"
                className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#F5F5F4] px-4 py-2.5 text-xs font-medium text-[#0D0D0D] transition-colors hover:bg-[#0D0D0D] hover:text-[#FFFFFF]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add to Estimate</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-end border-t border-white/10 pt-6">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/80 hover:text-[#FFFFFF]"
          >
            <span>configure full-home turnkey scope</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </RevealSection>
    </section>
  );
}
