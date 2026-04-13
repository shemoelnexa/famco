"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { ClipboardCheck, ScanSearch, Wrench, BadgeCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submission & Intake",
    description: "Equipment arrives at our facility. We log all details — make, model, year, hours, declared condition — and assign an inspection team.",
    icon: ClipboardCheck,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    number: "02",
    title: "52-Point Inspection",
    description: "Certified FAMCO engineers inspect every major system. Each component is tested, photographed, and graded. Nothing is skipped.",
    icon: ScanSearch,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    number: "03",
    title: "Refurbishment",
    description: "Machines that need work go through our in-house facility — engine service, bodywork, component replacement, and cosmetic restoration.",
    icon: Wrench,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    number: "04",
    title: "Certification & Listing",
    description: "A second engineer reviews all work. Machines that pass receive the FAMCO Approved seal and are listed with a full inspection report.",
    icon: BadgeCheck,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export function InspectionProcess() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              The 4-Phase Process
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              From arrival to certification — here&apos;s how a machine earns the FAMCO Approved seal.
            </p>
          </div>
        </AnimateIn>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-black/[0.08]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimateIn key={step.title} delay={index * 100}>
                <div className="relative flex flex-col items-center text-center">
                  {/* Number + Icon */}
                  <div className={`relative flex size-[72px] items-center justify-center rounded-2xl ${step.color} mb-5 z-10 bg-white`}>
                    <step.icon className="size-7" />
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Arrow between steps (mobile/tablet) */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block lg:hidden absolute -right-3 top-[36px]">
                      <ArrowRight className="size-4 text-black/15" />
                    </div>
                  )}

                  <h3 className="text-[17px] font-semibold text-black tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-black/45 leading-relaxed max-w-[240px]">
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
