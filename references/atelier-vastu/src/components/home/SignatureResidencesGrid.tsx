import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { RevealSection } from "@/components/ui/RevealSection";

const FEATURED = PROJECTS.filter((p) => p.featured);

export function SignatureResidencesGrid() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <RevealSection className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium text-[#666666]">
              02 / signature residences
            </p>
            <h2 className="font-display mt-2 text-4xl font-medium text-[#0D0D0D] sm:text-5xl">
              Selected residences
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="EXPLORE"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0D0D0D] transition-opacity hover:opacity-65"
          >
            <span>View all residences</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </RevealSection>

        <div className="grid gap-6 md:grid-cols-2">
          {FEATURED.map((project, idx) => (
            <RevealSection key={project.slug} delay={idx * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="VIEW"
                className="group block rounded-3xl bg-[#F5F5F4] p-5 transition-colors hover:bg-[#EFEFED] sm:p-6"
              >
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-medium text-[#0D0D0D] sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#666666]">
                    {project.city} ·{" "}
                    {project.areaSqFt.toLocaleString("en-IN")} sq. ft.
                  </p>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#FFFFFF]">
                  <img
                    src={project.heroImage}
                    alt={`${project.title} — ${project.city}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-4 bottom-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0D0D0D] text-[#FFFFFF] shadow-md transition-transform duration-300 group-hover:scale-110">
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
