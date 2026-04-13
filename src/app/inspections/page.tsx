import type { Metadata } from "next";
import { InspectionsHero } from "@/components/inspections/hero";
import { InspectionProcess } from "@/components/inspections/inspection-process";
import { InspectionChecklist } from "@/components/inspections/inspection-checklist";
import { CertificationTiers } from "@/components/inspections/certification-tiers";
import { RefurbishmentSection } from "@/components/inspections/refurbishment";
import { InspectionsCta } from "@/components/inspections/inspections-cta";

export const metadata: Metadata = {
  title: "Inspections & Certification | FAMCO Used Equipment",
  description:
    "Learn about the FAMCO Approved certification process — 52-point inspections, professional refurbishment, and quality grading by certified engineers.",
};

export default function InspectionsPage() {
  return (
    <>
      <InspectionsHero />
      <InspectionProcess />
      <InspectionChecklist />
      <CertificationTiers />
      <RefurbishmentSection />
      <InspectionsCta />
    </>
  );
}
