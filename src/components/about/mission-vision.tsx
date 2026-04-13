import { Target, Eye } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function MissionVision() {
  return (
    <section className="bg-[#F0F0F0] py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
              What Drives Us
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              A clear purpose and a forward-looking vision guide everything we do.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <AnimateIn delay={100}>
            <div className="group rounded-2xl border border-black/[0.06] bg-white p-8 sm:p-10 transition-all duration-300 cursor-default hover:bg-famco-blue hover:border-famco-blue hover:shadow-xl hover:shadow-famco-blue/15 h-full">
              <Target className="size-7 text-black transition-colors duration-300 group-hover:text-white" />
              <h3 className="mt-6 text-[22px] font-semibold text-black tracking-tight transition-colors duration-300 group-hover:text-white">
                Our Mission
              </h3>
              <p className="mt-4 text-[15px] text-black/50 leading-relaxed transition-colors duration-300 group-hover:text-white/75">
                To make buying and selling used heavy equipment simple, transparent, and trusted.
                We connect businesses across the region with verified, inspection-certified machinery
                that performs from day one — reducing downtime, eliminating uncertainty, and delivering
                real value.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={220}>
            <div className="group rounded-2xl border border-black/[0.06] bg-white p-8 sm:p-10 transition-all duration-300 cursor-default hover:bg-famco-blue hover:border-famco-blue hover:shadow-xl hover:shadow-famco-blue/15 h-full">
              <Eye className="size-7 text-black transition-colors duration-300 group-hover:text-white" />
              <h3 className="mt-6 text-[22px] font-semibold text-black tracking-tight transition-colors duration-300 group-hover:text-white">
                Our Vision
              </h3>
              <p className="mt-4 text-[15px] text-black/50 leading-relaxed transition-colors duration-300 group-hover:text-white/75">
                To become the Middle East&apos;s leading digital marketplace for pre-owned industrial
                equipment — setting the standard for quality assurance, customer experience, and market
                trust in the used equipment industry. We envision a future where every transaction is
                backed by data, transparency, and Al-Futtaim integrity.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
