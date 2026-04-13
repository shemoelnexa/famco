"use client";

import { AnimateIn } from "@/components/ui/animate-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { number: "500", suffix: "+", label: "Equipment Sold" },
  { number: "45", suffix: "+", label: "Years Experience" },
  { number: "4", suffix: "", label: "Countries Served" },
  { number: "100", suffix: "%", label: "Verified Machines" },
];

export function StatsBar() {
  return (
    <section className="bg-[#F0F0F0] py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="group/stats grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group/item relative flex flex-col items-start px-8 py-6 transition-all duration-500 cursor-default
                  ${index > 0 ? "lg:border-l lg:border-black/[0.08]" : ""}
                  ${index === 2 ? "border-t border-black/[0.08] lg:border-t-0" : ""}
                  ${index === 3 ? "border-t border-black/[0.08] lg:border-t-0" : ""}
                  group-hover/stats:opacity-50
                  hover:!opacity-100
                `}
              >
                {/* Number */}
                <div className="flex items-baseline">
                  <span className="text-[clamp(48px,6vw,72px)] font-semibold text-black tracking-tighter leading-none transition-colors duration-300 group-hover/item:text-famco-blue">
                    <AnimatedCounter value={`${stat.number}${stat.suffix}`} />
                  </span>
                </div>

                {/* Label */}
                <p className="mt-3 text-[14px] text-black/40">
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
