import { Search, FileSearch, Gavel, Truck } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    icon: Search,
    title: "1. Browse upcoming lots",
    description:
      "Every machine is FAMCO-inspected and listed with photos, specs, and a 52-point report.",
  },
  {
    icon: FileSearch,
    title: "2. Review the inspection report",
    description:
      "Download the certified condition report. No surprises, no hidden defects.",
  },
  {
    icon: Gavel,
    title: "3. Place your bid",
    description:
      "Live auctions run on the scheduled date. Timed auctions accept bids any time before close.",
  },
  {
    icon: Truck,
    title: "4. Win, pay, ship",
    description:
      "Pay via bank transfer or LC. We arrange logistics across the GCC and beyond.",
  },
];

export function AuctionsHowItWorks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="max-w-2xl mb-12">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
              How it works
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Bidding on FAMCO is simple.
            </h2>
            <p className="mt-4 text-[16px] text-black/55 leading-relaxed">
              Four steps from browsing to delivery. Every machine is inspected, certified, and ready to ship.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <AnimateIn key={step.title} delay={i * 70}>
              <div className="relative h-full rounded-2xl bg-[#FAFAFA] border border-black/[0.05] p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                <div className="size-11 rounded-xl bg-famco-blue/10 flex items-center justify-center mb-4">
                  <step.icon className="size-5 text-famco-blue" />
                </div>
                <h3 className="text-[16px] font-semibold text-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/55 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
