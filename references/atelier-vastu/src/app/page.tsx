import { HeroSection } from "@/components/home/HeroSection";
import { WhoWeAreBand } from "@/components/home/WhoWeAreBand";
import { SignatureResidencesGrid } from "@/components/home/SignatureResidencesGrid";
import { TactileMaterialsStrip } from "@/components/home/TactileMaterialsStrip";
import { ModularCatalogBand } from "@/components/home/ModularCatalogBand";
import { RealInteriorsPortfolio } from "@/components/home/RealInteriorsPortfolio";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAreBand />
      <SignatureResidencesGrid />
      <TactileMaterialsStrip />
      <ModularCatalogBand />
      <RealInteriorsPortfolio />
    </>
  );
}
