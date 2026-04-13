import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function SellCta() {
  return (
    <section className="bg-[#F0F0F0] py-20">
      <AnimateIn>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
            Need Help? <span className="text-famco-blue">Talk to Our Team</span>
          </h2>
          <p className="mt-4 text-[16px] text-black/45 leading-relaxed tracking-tight">
            Not sure if your equipment qualifies? Have questions about the process?
            Our team is ready to help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-black text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-black/85"
            >
              Contact Us
            </Link>
            <Link
              href="/equipment"
              className="rounded-xl border border-black/15 text-black h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
            >
              Browse Equipment
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
