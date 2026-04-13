"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { ShieldCheck } from "lucide-react";

export function InspectionsHero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/products/product-10.jpg"
        alt="FAMCO engineer inspecting equipment"
        className="w-full h-[420px] sm:h-[480px] lg:h-[540px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 pb-16 sm:pb-20">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium text-white/50 mb-5">
              <ShieldCheck className="size-3.5 text-famco-blue" />
              FAMCO Approved Program
            </span>
            <h1 className="max-w-3xl text-[clamp(36px,6vw,72px)] font-semibold text-white leading-[0.95] tracking-tighter">
              Inspections & Certification
            </h1>
            <p className="mt-5 max-w-lg text-[16px] text-white/50 leading-relaxed tracking-tight">
              Every machine listed on FAMCO goes through a rigorous multi-phase process —
              so you can buy with confidence, without physically seeing it.
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
