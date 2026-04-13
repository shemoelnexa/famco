"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { number: "45", suffix: "+", label: "Years of Excellence" },
  { number: "500", suffix: "+", label: "Equipment Sold" },
  { number: "4", suffix: "", label: "Countries Served" },
  { number: "100", suffix: "%", label: "Verified & Certified" },
  { number: "200", suffix: "+", label: "Active Buyers" },
  { number: "24", suffix: "hr", label: "Listing Turnaround" },
];

export function AboutStats() {
  return (
    <section className="bg-[#141414] py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-white tracking-tighter leading-[1.05]">
              FAMCO in <span className="text-famco-blue">Numbers</span>
            </h2>
            <p className="mt-4 text-[16px] text-white/40 tracking-tight">
              The track record that makes us the region&apos;s most trusted equipment marketplace.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="group/stats grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group/item flex flex-col items-start bg-[#141414] px-8 py-8 transition-all duration-500 cursor-default
                  group-hover/stats:opacity-40 group-hover/stats:blur-[1px]
                  hover:!opacity-100 hover:!blur-0"
              >
                <div className="flex items-baseline">
                  <span className="text-[clamp(28px,7vw,56px)] font-semibold text-white tracking-tighter leading-none transition-colors duration-300 group-hover/item:text-famco-blue">
                    <AnimatedCounter value={`${stat.number}${stat.suffix}`} />
                  </span>
                </div>
                <p className="mt-3 text-[14px] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
