"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { Check, ShieldCheck } from "lucide-react";

const tiers = [
  {
    grade: "Excellent",
    color: "border-emerald-500/30 bg-emerald-500/[0.03]",
    badgeColor: "bg-emerald-500/10 text-emerald-700",
    description: "Machine is in top condition with minimal wear. All systems operating at or near factory specifications. Ready for immediate deployment.",
    criteria: [
      "All 52 inspection points pass",
      "Less than 15% component wear",
      "No active fluid leaks",
      "Full service history available",
      "Cosmetic condition: very good to excellent",
    ],
  },
  {
    grade: "Good",
    color: "border-amber-500/30 bg-amber-500/[0.03]",
    badgeColor: "bg-amber-500/10 text-amber-700",
    description: "Machine shows normal wear for its age and hours. All critical systems functional. May have minor cosmetic imperfections. Reliable for continued operation.",
    criteria: [
      "All critical inspection points pass",
      "15–30% component wear acceptable",
      "No major fluid leaks",
      "Partial service history acceptable",
      "Cosmetic condition: acceptable",
    ],
  },
  {
    grade: "Fair",
    color: "border-orange-500/30 bg-orange-500/[0.03]",
    badgeColor: "bg-orange-500/10 text-orange-700",
    description: "Machine is operational but shows significant wear. Some components may need near-term replacement. Priced accordingly with full transparency on condition.",
    criteria: [
      "Core systems functional",
      "30%+ component wear noted in report",
      "Minor leaks may be present",
      "Cosmetic wear visible",
      "Full disclosure on required maintenance",
    ],
  },
];

export function CertificationTiers() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Condition Grading
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              Every machine receives an honest condition grade based on inspection results.
              No surprises — you know exactly what you&apos;re getting.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {tiers.map((tier, index) => (
            <AnimateIn key={tier.grade} delay={index * 100}>
              <div className={`rounded-2xl border-2 ${tier.color} p-7 h-full flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center rounded-lg px-3 py-1 text-[14px] font-bold ${tier.badgeColor}`}>
                    {tier.grade}
                  </span>
                  <ShieldCheck className="size-5 text-black/15" />
                </div>

                <p className="text-[14px] text-black/50 leading-relaxed mb-6">
                  {tier.description}
                </p>

                <div className="mt-auto space-y-2.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-black/30 mb-3">
                    Criteria
                  </p>
                  {tier.criteria.map((criterion) => (
                    <div key={criterion} className="flex items-start gap-2.5">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black/[0.04] mt-0.5">
                        <Check className="size-3 text-black/40" />
                      </div>
                      <span className="text-[13px] text-black/55 leading-snug">{criterion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
