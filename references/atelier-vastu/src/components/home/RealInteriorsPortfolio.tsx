import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealSection } from "@/components/ui/RevealSection";

interface InteriorCard {
  slug: string;
  title: string;
  caption: string;
  image: string;
}

const REAL_INTERIORS: InteriorCard[] = [
  {
    slug: "boat-club-road-villa-chennai",
    title: "Boat Club Courtyard Salon",
    caption: "Chennai · 4,850 sq. ft. villa",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "indiranagar-penthouse-bengaluru",
    title: "Indiranagar Gallery Axis",
    caption: "Bengaluru · 3,600 sq. ft. penthouse",
    image:
      "https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "jubilee-hills-duplex-hyderabad",
    title: "Jubilee Hills Dining Pavilion",
    caption: "Hyderabad · 3,250 sq. ft. duplex",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=85",
  },
];

export function RealInteriorsPortfolio() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <RevealSection className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium text-[#666666]">
              05 / real interiors
            </p>
            <h2 className="font-display mt-2 text-4xl font-medium text-[#0D0D0D] sm:text-5xl">
              Real interiors
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="EXPLORE"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D0D0D] transition-opacity hover:opacity-65"
          >
            <span>Explore all dossiers</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </RevealSection>

        <div className="grid gap-6 lg:grid-cols-3">
          {REAL_INTERIORS.map((card) => (
            <RevealSection key={card.slug}>
              <Link
                href={`/projects/${card.slug}`}
                data-cursor="VIEW"
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-black/[0.08] bg-[#F5F5F4]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3 rounded-2xl bg-white/95 p-4 text-[#0D0D0D] backdrop-blur-md transition-transform group-hover:-translate-y-0.5">
                  <div>
                    <p className="font-display text-lg font-semibold leading-tight">
                      {card.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#666666]">
                      {card.caption}
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0D0D0D] text-[#FFFFFF]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
