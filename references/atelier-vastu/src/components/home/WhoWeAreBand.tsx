import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";

export function WhoWeAreBand() {
  return (
    <section className="px-3 pt-6 sm:px-5 sm:pt-8">
      <RevealSection className="mx-auto max-w-[1440px] rounded-[28px] bg-[#0D0D0D] px-6 py-14 text-[#FFFFFF] sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-14">
        <p className="text-xs font-medium text-white/55">01 / who we are</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-4xl leading-[1.04] font-medium text-[#FFFFFF] sm:text-5xl">
              What we build
            </h2>
            <Link
              href="/studio"
              data-cursor="EXPLORE"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-6 py-3 text-xs font-medium text-[#0D0D0D] transition-transform hover:scale-[1.02]"
            >
              <span>More about studio</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-10 lg:col-span-7">
            <p className="font-display text-2xl leading-[1.28] font-normal text-white/90 sm:text-3xl">
              We design and build complete residential interiors—combining
              natural Indian stone and timber with precision factory-built
              modular woodwork, delivered in 45 days.
            </p>

            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
              <div>
                <p className="font-display text-2xl font-medium text-[#FFFFFF] sm:text-4xl">
                  45 days
                </p>
                <p className="mt-1 text-xs text-white/55">modular handover</p>
              </div>
              <div>
                <p className="font-display text-2xl font-medium text-[#FFFFFF] sm:text-4xl">
                  10 years
                </p>
                <p className="mt-1 text-xs text-white/55">structural warranty</p>
              </div>
              <div>
                <p className="font-display text-2xl font-medium text-[#FFFFFF] sm:text-4xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-white/55">in-house CNC</p>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
