import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function AuctionsCta() {
  return (
    <section className="bg-[#0A0A0A] text-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="rounded-3xl bg-gradient-to-br from-famco-blue/15 via-transparent to-transparent border border-white/[0.06] p-10 sm:p-14 text-center">
            <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold tracking-tighter leading-[1.05] max-w-2xl mx-auto">
              Ready to bid on your next machine?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-[16px] text-white/55 leading-relaxed">
              Register once, bid on any auction. Free for verified buyers.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="btn-blue btn-shimmer inline-flex items-center gap-2 rounded-full bg-famco-blue text-white h-12 px-7 text-[14px] font-semibold transition-all duration-300"
              >
                Register to bid
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white h-12 px-7 text-[14px] font-medium transition-all duration-300 hover:bg-white/10"
              >
                Consign your equipment
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
