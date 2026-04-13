import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function AboutCta() {
  return (
    <section className="bg-[#F0F0F0] py-28">
      <AnimateIn>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
            Ready to Work <span className="text-famco-blue">With Us?</span>
          </h2>
          <p className="mt-4 text-[18px] text-black/45 leading-relaxed tracking-tight">
            Whether you&apos;re looking to buy verified equipment or sell your existing fleet,
            FAMCO is here to help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/equipment"
              className="btn-primary btn-shimmer inline-flex items-center justify-center rounded-full bg-black text-white h-12 px-8 text-[15px] font-medium transition-colors hover:bg-black/85"
            >
              Browse Equipment
            </Link>
            <Link
              href="/contact"
              className="btn-outline inline-flex items-center justify-center rounded-full border border-black/20 text-black h-12 px-8 text-[15px] font-medium transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
