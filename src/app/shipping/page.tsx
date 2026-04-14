import { ShippingHero } from "@/components/shipping/hero";
import { ShippingPillars } from "@/components/shipping/pillars";
import { ShippingCoverage } from "@/components/shipping/coverage";
import { ShippingProcess } from "@/components/shipping/process";
import { ShippingQuoteForm } from "@/components/shipping/quote-form";

export const metadata = {
  title: "Shipping & Logistics | FAMCO Used Equipment",
  description:
    "Move your machinery anywhere across the GCC and beyond. End-to-end logistics — yard pickup, customs, delivery — handled by FAMCO.",
};

export default function ShippingPage() {
  return (
    <>
      <ShippingHero />
      <ShippingPillars />
      <ShippingCoverage />
      <ShippingProcess />
      <ShippingQuoteForm />
    </>
  );
}
