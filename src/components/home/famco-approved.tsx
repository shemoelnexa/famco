"use client";

import { useState } from "react";
import {
  ShieldCheck,
  ClipboardCheck,
  Wrench,
  BadgeCheck,
  Cog,
  Droplets,
  Zap,
  Shield,
  Gauge,
  ScanSearch,
  Check,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

const phases = [
  {
    id: "inspect",
    tag: "Phase 01",
    title: "52-Point Inspection",
    subtitle: "Nothing hidden, nothing missed",
    icon: ClipboardCheck,
    image: "/images/products/product-4.jpg",
    description:
      "Certified FAMCO engineers inspect every major system — engine, hydraulics, electrical, structural, brakes, and cabin. Each component is photographed, tested, and graded.",
    checks: [
      { icon: Cog, label: "Engine & Drivetrain" },
      { icon: Droplets, label: "Hydraulic Systems" },
      { icon: Zap, label: "Electrical & Wiring" },
      { icon: Shield, label: "Structural Integrity" },
      { icon: Gauge, label: "Brakes & Steering" },
      { icon: ScanSearch, label: "Cabin & Controls" },
    ],
    stat: { value: "52", label: "inspection points" },
  },
  {
    id: "refurbish",
    tag: "Phase 02",
    title: "Professional Refurbishment",
    subtitle: "Restored, not just cleaned",
    icon: Wrench,
    image: "/images/products/product-3.jpg",
    description:
      "Machines that need work go through our in-house facility. Engine servicing, bodywork repair, component replacement, and a fresh coat of paint — we bring equipment back to working standard.",
    checks: [
      { icon: Cog, label: "Mechanical Servicing" },
      { icon: Wrench, label: "Component Replacement" },
      { icon: Shield, label: "Bodywork & Paint" },
      { icon: Gauge, label: "Final Quality Check" },
    ],
    stat: { value: "100%", label: "serviced in-house" },
  },
  {
    id: "certify",
    tag: "Phase 03",
    title: "Certified & Listed",
    subtitle: "The FAMCO Approved seal",
    icon: BadgeCheck,
    image: "/images/products/product-5.jpg",
    description:
      "A second engineer reviews all work. Only machines that pass receive the FAMCO Approved certification — with a full inspection report, condition grade, and photo documentation available to buyers.",
    checks: [
      { icon: BadgeCheck, label: "FAMCO Approved Seal" },
      { icon: ClipboardCheck, label: "Inspection Report" },
      { icon: ShieldCheck, label: "Condition Grading" },
      { icon: ScanSearch, label: "Photo Documentation" },
    ],
    stat: { value: "0%", label: "compromise" },
  },
];

export function FamcoApproved() {
  const [activePhase, setActivePhase] = useState(0);
  const active = phases[activePhase];

  return (
    <section className="bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* Header */}
        <AnimateIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[13px] font-medium text-white/40">
                <ShieldCheck className="size-3.5 text-famco-blue" />
                FAMCO Approved
              </span>
              <h2 className="mt-5 text-[clamp(32px,5vw,52px)] font-semibold text-white tracking-tighter leading-[1]">
                Every Machine Earns
                <br />
                <span className="text-famco-blue">Its Certification</span>
              </h2>
            </div>
            <p className="max-w-sm text-[15px] text-white/35 leading-relaxed lg:text-right">
              No shortcuts. No exceptions. Three phases stand between a used machine
              and the FAMCO Approved seal.
            </p>
          </div>
        </AnimateIn>

        {/* Phase selector tabs */}
        <AnimateIn delay={100}>
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
            {phases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(index)}
                className={`shrink-0 flex items-center gap-2.5 rounded-xl px-3.5 sm:px-5 py-3 sm:py-3.5 transition-all duration-300 ${
                  index === activePhase
                    ? "bg-white text-black"
                    : "bg-white/[0.05] text-white/50 hover:bg-white/[0.08] hover:text-white/70"
                }`}
              >
                <phase.icon className={`size-5 ${index === activePhase ? "text-famco-blue" : ""}`} />
                <div className="text-left">
                  <p className={`text-[11px] font-medium uppercase tracking-wider ${index === activePhase ? "text-famco-blue" : "text-white/30"}`}>
                    {phase.tag}
                  </p>
                  <p className="text-[13px] sm:text-[14px] font-semibold tracking-tight">
                    {phase.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Active phase content */}
        <AnimateIn delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
            {/* Left: Image with overlay */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto">
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Stat overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-end gap-3">
                  <span className="text-[clamp(56px,8vw,80px)] font-bold text-white leading-none tracking-tighter">
                    {active.stat.value}
                  </span>
                  <span className="text-[15px] text-white/50 mb-3">
                    {active.stat.label}
                  </span>
                </div>
              </div>

              {/* Phase badge */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-md px-3 py-1.5 text-[12px] font-semibold text-white">
                  <active.icon className="size-3.5" />
                  {active.tag}
                </span>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 sm:p-8">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-widest text-famco-blue mb-2">
                  {active.tag}
                </p>
                <h3 className="text-[28px] sm:text-[32px] font-semibold text-white tracking-tighter leading-[1.1]">
                  {active.title}
                </h3>
                <p className="mt-1 text-[15px] text-white/30 italic">
                  {active.subtitle}
                </p>
                <p className="mt-5 text-[15px] text-white/50 leading-relaxed">
                  {active.description}
                </p>

                {/* Checklist */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {active.checks.map((check) => (
                    <div
                      key={check.label}
                      className="flex items-center gap-2.5 rounded-lg bg-white/[0.04] border border-white/[0.04] px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15">
                        <Check className="size-3 text-emerald-400" />
                      </div>
                      <span className="text-[13px] text-white/60">{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom navigation hint */}
              <div className="mt-8 flex items-center justify-between pt-5 border-t border-white/[0.06]">
                <div className="flex gap-1.5">
                  {phases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhase(i)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i === activePhase
                          ? "w-8 bg-famco-blue"
                          : "w-3 bg-white/15 hover:bg-white/25"
                      }`}
                    />
                  ))}
                </div>
                {activePhase < phases.length - 1 ? (
                  <button
                    onClick={() => setActivePhase((p) => p + 1)}
                    className="flex items-center gap-1 text-[13px] font-medium text-white/40 hover:text-white/70 transition-colors"
                  >
                    Next Phase
                    <ChevronRight className="size-4" />
                  </button>
                ) : (
                  <Link
                    href="/equipment"
                    className="flex items-center gap-1 text-[13px] font-medium text-famco-blue hover:text-famco-blue/80 transition-colors"
                  >
                    Browse Approved Equipment
                    <ChevronRight className="size-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Bottom trust bar */}
        <AnimateIn delay={300}>
          <div className="mt-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] px-6 sm:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-famco-blue/15">
                  <ShieldCheck className="size-5 text-famco-blue" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-white tracking-tight">
                    The FAMCO Approved Guarantee
                  </p>
                  <p className="text-[13px] text-white/35">
                    Inspected. Refurbished. Certified. Ready to work.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-5">
                {["Inspected", "Refurbished", "Certified"].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5 sm:gap-2">
                    {i > 0 && (
                      <div className="w-6 h-px bg-white/10 -ml-3 mr--1" />
                    )}
                    <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check className="size-3 text-emerald-400" />
                    </div>
                    <span className="text-[13px] font-medium text-white/50">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
