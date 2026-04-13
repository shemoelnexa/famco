import type { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { CompanyOverview } from "@/components/about/company-overview";
import { MissionVision } from "@/components/about/mission-vision";
import { ImageBand } from "@/components/about/image-band";
import { ValuesGrid } from "@/components/about/values-grid";
import { EquipmentShowcase } from "@/components/about/equipment-showcase";
import { AboutStats } from "@/components/about/about-stats";
import { AboutCta } from "@/components/about/about-cta";

export const metadata: Metadata = {
  title: "About Us | FAMCO Used Equipment",
  description:
    "Learn about FAMCO — the region's trusted marketplace for verified used construction equipment, trucks, and industrial machinery. Backed by Al-Futtaim with 45+ years of expertise.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyOverview />
      <MissionVision />
      <ImageBand />
      <ValuesGrid />
      <EquipmentShowcase />
      <AboutStats />
      <AboutCta />
    </>
  );
}
