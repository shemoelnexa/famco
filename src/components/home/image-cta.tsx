import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function ImageCta() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width background image */}
      <img
        src="/images/products/product-2.jpg"
        alt="FAMCO Approved Fleet"
        className="w-full h-[500px] sm:h-[550px] lg:h-[600px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10">
          <AnimateIn direction="left">
            <div className="max-w-lg">
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/50">
                FAMCO Approved
              </p>
              <h2 className="mt-4 text-[clamp(28px,5vw,48px)] font-semibold text-white tracking-tighter leading-[1.05]">
                Proved & Approved.
                <br />
                Your Vehicle, Ready to Roll.
              </h2>
              <p className="mt-4 text-[16px] text-white/55 leading-relaxed max-w-md">
                Every machine undergoes full inspection, refurbishment, and certification before it reaches you.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/equipment"
                  className="btn-blue btn-shimmer rounded-full bg-famco-blue text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-300"
                >
                  Browse Equipment
                </Link>
                <Link
                  href="/contact"
                  className="btn-outline rounded-full border border-white/30 text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-300 hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
