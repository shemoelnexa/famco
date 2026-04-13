import { ShieldCheck, Users, Zap, Award, Handshake, BarChart3 } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const values = [
  {
    title: "Quality First",
    description:
      "Every machine is inspected, certified, and backed by our quality guarantee before it reaches the marketplace.",
    icon: ShieldCheck,
  },
  {
    title: "Customer Focus",
    description:
      "We build lasting relationships by putting our customers' needs at the center of every decision we make.",
    icon: Users,
  },
  {
    title: "Operational Speed",
    description:
      "From inspection to listing, our streamlined process gets equipment market-ready fast — without cutting corners.",
    icon: Zap,
  },
  {
    title: "Industry Expertise",
    description:
      "Decades of hands-on experience across construction, logistics, and industrial sectors.",
    icon: Award,
  },
  {
    title: "Integrity & Trust",
    description:
      "Transparent pricing, honest condition reports, and no hidden surprises. Every transaction is built on trust.",
    icon: Handshake,
  },
  {
    title: "Data-Driven",
    description:
      "Market analytics, fair pricing benchmarks, and detailed reporting help both buyers and sellers make informed decisions.",
    icon: BarChart3,
  },
];

export function ValuesGrid() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Our Values
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              The principles that guide our team and shape every interaction.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 hover-focus-group">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-[#F0F0F0] border border-black/[0.04] p-7 transition-all duration-500 cursor-default hover:shadow-lg hover:-translate-y-1"
              >
                <value.icon className="size-6 text-black" />
                <h3 className="mt-5 text-[17px] font-semibold text-black tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/45 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
