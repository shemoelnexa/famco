import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function InspectionsCta() {
  return (
    <section className="bg-[#F0F0F0] py-20">
      <AnimateIn>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
            Need an Inspection for <span className="text-famco-blue">Your Equipment?</span>
          </h2>
          <p className="mt-4 text-[16px] text-black/45 leading-relaxed tracking-tight">
            Whether you&apos;re selling through FAMCO or want an independent assessment,
            our certified engineers can inspect any machine.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-famco-blue text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-famco-blue/90"
            >
              Book an Inspection
            </Link>
            <Link
              href="/equipment"
              className="rounded-xl border border-black/15 text-black h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-200 hover:bg-black hover:text-white hover:border-black"
            >
              Browse Approved Equipment
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
