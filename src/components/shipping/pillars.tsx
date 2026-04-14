import { AnimateIn } from "@/components/ui/animate-in";

const services = [
  {
    label: "GCC Road Freight",
    description:
      "Daily lanes between UAE, KSA, Oman, Bahrain, Qatar, Kuwait. Multi-axle low-bed trailers for over-dimensional loads.",
    image: "/images/trucks-front.jpeg",
  },
  {
    label: "International Sea Freight",
    description:
      "RoRo and container shipping out of Jebel Ali to Africa, the Indian subcontinent, and beyond. Customs handled both ends.",
    image: "/images/trucks-banner.jpeg",
  },
  {
    label: "Yard-to-Site Delivery",
    description:
      "Last-mile delivery to construction sites, ports, and quarries with wheeled or tracked cradle setups.",
    image: "/images/trucks-rear.jpeg",
  },
];

export function ShippingPillars() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="max-w-2xl mb-12">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
              Services
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Three transport modes, one network.
            </h2>
            <p className="mt-4 text-[16px] text-black/55 leading-relaxed">
              Whatever the size of the machine and wherever it&apos;s going, we have a route.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <AnimateIn key={s.label} delay={i * 80}>
              <div className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-[#0A0A0A] text-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/[0.04]">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-7">
                  <h3 className="text-[20px] font-semibold tracking-tight leading-tight">
                    {s.label}
                  </h3>
                  <p className="mt-2.5 text-[14px] text-white/55 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
