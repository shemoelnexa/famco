"use client";

import { ClipboardCheck, Search, Wrench, ShieldCheck, Sparkles } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    title: "Submit & Evaluate",
    description: "Sellers submit their equipment to FAMCO where our team evaluates condition, history, and market readiness.",
    icon: ClipboardCheck,
  },
  {
    title: "Inspect & Assess",
    description: "Full technical inspection by certified FAMCO engineers covering mechanical, hydraulic, electrical, and structural systems.",
    icon: Search,
  },
  {
    title: "Refurbish & Service",
    description: "Professional refurbishment including service, maintenance, paint, and cosmetic improvements as needed.",
    icon: Wrench,
  },
  {
    title: "Certify & List",
    description: "FAMCO Approved certification issued. Equipment is listed on the marketplace, ready for buyers.",
    icon: ShieldCheck,
  },
];

export function ApprovedProcess() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left column — sticky on desktop */}
          <AnimateIn direction="left">
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-1.5 text-[13px] font-medium text-black/60">
                <Sparkles className="size-3.5" />
                Our Process
              </span>
              <h2 className="mt-6 text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.1]">
                How We Inspect & Certify
              </h2>
              <p className="mt-4 max-w-sm text-[15px] text-black/45 leading-relaxed">
                We turn used equipment into verified, market-ready machines through our rigorous 4-step approval process.
              </p>
            </div>
          </AnimateIn>

          {/* Right column — stacked cards */}
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
              <AnimateIn key={step.title} delay={index * 120} direction="right">
                <div className="group rounded-2xl border border-black/[0.06] bg-white p-7 sm:p-8 transition-all duration-300 cursor-default hover:bg-famco-blue hover:border-famco-blue hover:shadow-xl hover:shadow-famco-blue/15">
                  {/* Icon + Title row */}
                  <div className="flex items-center gap-4">
                    <step.icon className="size-7 text-black transition-colors duration-300 group-hover:text-white" />
                    <h3 className="text-[20px] font-semibold text-black tracking-tight transition-colors duration-300 group-hover:text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-[15px] text-black/50 leading-relaxed transition-colors duration-300 group-hover:text-white/75">
                    {step.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
