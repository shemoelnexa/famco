import { ShieldCheck, FileText, Building2, Globe } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const reasons = [
  {
    title: "Verified Equipment",
    description:
      "Every machine undergoes thorough technical inspection and certification before listing.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Reports",
    description:
      "Full inspection reports, condition grading, and service history available for every listing.",
    icon: FileText,
  },
  {
    title: "Al-Futtaim Backed",
    description:
      "45+ years of trust, technical expertise, and operational excellence across the region.",
    icon: Building2,
  },
  {
    title: "Regional Coverage",
    description:
      "Serving buyers and sellers across UAE, Saudi Arabia, Qatar, and Bahrain.",
    icon: Globe,
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#F0F0F0] py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        {/* Header */}
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Why Choose FAMCO
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              The region&apos;s most trusted name in heavy equipment, backed by
              decades of expertise and a commitment to quality.
            </p>
          </div>
        </AnimateIn>

        {/* Cards grid — hover-focus applied directly to card divs */}
        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 hover-focus-group">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl bg-white border border-black/[0.06] p-7 transition-all duration-500 cursor-default hover:shadow-lg hover:-translate-y-1"
              >
                <reason.icon className="size-6 text-black" />
                <h3 className="mt-5 text-[17px] font-semibold text-black tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/45 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
