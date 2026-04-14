import { TrendingUp, ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const results = [
  { title: "CAT 950M Wheel Loader", soldFor: "AED 312,000", over: "+18% over reserve", buyer: "Verified Buyer · KSA" },
  { title: "Volvo EC480E Excavator", soldFor: "AED 488,000", over: "+11% over reserve", buyer: "Verified Buyer · UAE" },
  { title: "Hino 700 Series 26t Tipper", soldFor: "AED 168,000", over: "+24% over reserve", buyer: "Verified Buyer · Oman" },
  { title: "Komatsu PC210 Excavator", soldFor: "AED 244,500", over: "+9% over reserve", buyer: "Verified Buyer · Bahrain" },
];

export function PastResults() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
                Past results
              </div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
                Recent hammer prices.
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3.5 py-1.5 text-[12px] font-semibold">
              <TrendingUp className="size-3.5" />
              Avg +15% over reserve
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((r, i) => (
            <AnimateIn key={r.title} delay={i * 60}>
              <div className="rounded-2xl bg-[#FAFAFA] border border-black/[0.05] p-5 transition-all duration-300 hover:bg-white hover:shadow-md">
                <div className="text-[14px] font-semibold text-black tracking-tight line-clamp-2">
                  {r.title}
                </div>
                <div className="mt-3 text-[18px] font-bold text-black tracking-tight">
                  {r.soldFor}
                </div>
                <div className="mt-1 text-[12px] font-semibold text-emerald-600 inline-flex items-center gap-1">
                  <ArrowUpRight className="size-3" />
                  {r.over}
                </div>
                <div className="mt-3 text-[11px] text-black/40">{r.buyer}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
