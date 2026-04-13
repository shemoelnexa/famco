import { TrendingUp, Users, ShieldCheck, Globe, Banknote, Headphones } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const benefits = [
  {
    title: "Higher Resale Value",
    description: "FAMCO Approved certification increases buyer confidence and your equipment's market value.",
    icon: TrendingUp,
  },
  {
    title: "Regional Buyer Network",
    description: "Access verified buyers across UAE, Saudi Arabia, Qatar, and Bahrain.",
    icon: Globe,
  },
  {
    title: "Professional Refurbishment",
    description: "Optional servicing, bodywork, and cosmetic improvements to maximize sale price.",
    icon: ShieldCheck,
  },
  {
    title: "Fair Market Valuation",
    description: "Data-driven pricing based on condition, demand, and market benchmarks.",
    icon: Banknote,
  },
  {
    title: "Wider Buyer Base",
    description: "Your equipment reaches fleet managers, contractors, and operators across the region.",
    icon: Users,
  },
  {
    title: "Dedicated Support",
    description: "A FAMCO account manager handles the entire process — from listing to closing.",
    icon: Headphones,
  },
];

export function SellBenefits() {
  return (
    <section className="bg-[#F0F0F0] py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Why Sell With FAMCO
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              We don&apos;t just list your equipment — we get it sold at the right price.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white border border-black/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <benefit.icon className="size-6 text-famco-blue" />
                <h3 className="mt-4 text-[16px] font-semibold text-black tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/45 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
