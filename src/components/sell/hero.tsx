"use client";

import { AnimateIn } from "@/components/ui/animate-in";

export function SellHero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/products/product-2.jpg"
        alt="Equipment at FAMCO facility"
        className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 pb-16 sm:pb-20">
          <AnimateIn>
            <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/50">
              Sell With FAMCO
            </p>
            <h1 className="mt-4 max-w-3xl text-[clamp(36px,6vw,72px)] font-semibold text-white leading-[0.95] tracking-tighter">
              Turn Your Equipment Into Revenue
            </h1>
            <p className="mt-5 max-w-lg text-[16px] text-white/55 leading-relaxed tracking-tight">
              List your used machinery with FAMCO and reach verified buyers across
              the UAE, Saudi Arabia, Qatar, and Bahrain.
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
