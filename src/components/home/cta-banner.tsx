import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function CtaBanner() {
  return (
    <section className="bg-[#F0F0F0] py-28">
      <AnimateIn>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
            Ready to Find Your Next <span className="text-famco-blue">Machine?</span>
          </h2>
          <p className="mt-4 text-[18px] text-black/45 leading-relaxed tracking-tight">
            Browse our full range of FAMCO Approved equipment and find the perfect
            machine for your next project.
          </p>
          <div className="mt-8">
            <Link
              href="/equipment"
              className="btn-primary btn-shimmer inline-flex items-center justify-center rounded-full bg-black text-white h-12 px-8 text-[15px] font-medium transition-colors hover:bg-black/85"
            >
              Browse All Equipment
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
