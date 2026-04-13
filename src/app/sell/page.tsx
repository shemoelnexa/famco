import type { Metadata } from "next";
import { SellHero } from "@/components/sell/hero";
import { SellProcess } from "@/components/sell/sell-process";
import { SellBenefits } from "@/components/sell/sell-benefits";
import { SellForm } from "@/components/sell/sell-form";
import { SellCta } from "@/components/sell/sell-cta";

export const metadata: Metadata = {
  title: "Sell Your Equipment | FAMCO Used Equipment",
  description:
    "Sell your used construction equipment, trucks, and machinery through FAMCO. Professional valuation, refurbishment, and access to verified buyers across the region.",
};

export default function SellPage() {
  return (
    <>
      <SellHero />
      <SellProcess />
      <SellBenefits />
      <SellForm />
      <SellCta />
    </>
  );
}
