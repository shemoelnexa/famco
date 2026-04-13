"use client";

import Link from "next/link";
import { Search, ClipboardCheck, CreditCard, Truck } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    number: "01",
    title: "Browse Equipment",
    description: "Search verified listings by category, make, condition, and location.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select & Inspect",
    description: "Review the 52-point inspection report, specs, and condition grade.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Reserve / Enquire",
    description: "Secure the machine with a deposit or ask our team any questions.",
    icon: CreditCard,
  },
  {
    number: "04",
    title: "Complete Purchase",
    description: "Finalize payment, arrange delivery. Your machine is ready to work.",
    icon: Truck,
  },
];

export function ApprovedProcess() {
  return (
    <section className="bg-[#F0F0F0] py-20 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1]">
              How It Works
            </h2>
            <p className="mt-4 text-[16px] text-black/40 tracking-tight">
              From first search to equipment on-site — four clear steps.
            </p>
          </div>
        </AnimateIn>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px">
            <div className="w-full h-full bg-famco-blue/20" />
            <div className="absolute inset-0 h-full bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,#F0F0F0_8px,#F0F0F0_14px)]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, index) => (
              <AnimateIn key={step.title} delay={index * 120}>
                <div className="group relative flex flex-col items-center text-center h-full">
                  {/* Step circle */}
                  <div className="relative mb-6 z-10">
                    <div className="flex size-[72px] items-center justify-center rounded-2xl bg-white border border-black/[0.06] shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                      <step.icon className="size-7 text-famco-blue" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full bg-famco-blue text-[12px] font-bold text-white shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Content card — equal height */}
                  <div className="w-full flex-1 flex flex-col rounded-2xl bg-famco-blue/[0.06] border border-famco-blue/[0.08] p-6 transition-all duration-300 group-hover:-translate-y-1">
                    <h3 className="text-[18px] font-semibold text-black tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-black/45 leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimateIn delay={500}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/equipment"
              className="rounded-xl bg-black text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-black/85"
            >
              Start Browsing
            </Link>
            <Link
              href="/inspections"
              className="rounded-xl border border-black/15 text-black h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
            >
              Learn About Our Inspections
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
