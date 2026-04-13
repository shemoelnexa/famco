"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { Cog, PaintBucket, Wrench, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Cog,
    title: "Mechanical Servicing",
    description: "Full engine service, fluid replacement, filter changes, belt and hose inspection. Drivetrain checked and adjusted to OEM specs.",
    image: "/images/products/product-1.jpg",
  },
  {
    icon: Wrench,
    title: "Component Replacement",
    description: "Worn tyres, seals, bearings, hoses, and filters replaced. Hydraulic cylinders re-sealed. Electrical components tested and swapped if needed.",
    image: "/images/products/product-4.jpg",
  },
  {
    icon: PaintBucket,
    title: "Bodywork & Cosmetics",
    description: "Dent and rust repair, professional repaint, decal replacement, cabin cleaning. The machine should look as good as it runs.",
    image: "/images/products/product-3.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Final Quality Check",
    description: "A second engineer reviews all refurbishment work. Operational test, leak check, and final sign-off before the FAMCO Approved seal is issued.",
    image: "/images/products/product-5.jpg",
  },
];

export function RefurbishmentSection() {
  return (
    <section className="bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[13px] font-medium text-white/40 mb-5">
              <Wrench className="size-3.5 text-famco-blue" />
              Refurbishment
            </span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-white tracking-tighter leading-[1.05] max-w-lg">
              Restored to Working Standard,{" "}
              <span className="text-famco-blue">Not Just Cleaned</span>
            </h2>
            <p className="mt-4 text-[16px] text-white/35 tracking-tight max-w-lg">
              Our in-house facility handles everything from engine overhauls to cosmetic touch-ups.
              When a machine leaves FAMCO, it&apos;s ready for the next job.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <AnimateIn key={step.title} delay={index * 100}>
              <div className="group relative rounded-2xl overflow-hidden aspect-[16/10]">
                {/* Background image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-300" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                      <step.icon className="size-4.5 text-white" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-white/30">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-white/45 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
