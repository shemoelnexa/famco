import { AnimateIn } from "@/components/ui/animate-in";

export function CompanyOverview() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        {/* Top: text columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left */}
          <AnimateIn direction="left">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-black/40">
                Who We Are
              </p>
              <h2 className="mt-4 text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.1]">
                Your Trusted Partner in Used Equipment
              </h2>
            </div>
          </AnimateIn>

          {/* Right */}
          <AnimateIn direction="right" delay={150}>
            <div className="space-y-5">
              <p className="text-[16px] text-black/55 leading-relaxed">
                FAMCO Used Equipment is the dedicated pre-owned division of Al-Futtaim FAMCO,
                one of the Middle East&apos;s largest and most established distributors of heavy
                equipment, trucks, and industrial machinery. With over 45 years of operational
                excellence, we bring that same standard of quality to the used equipment market.
              </p>
              <p className="text-[16px] text-black/55 leading-relaxed">
                Our marketplace connects buyers and sellers of verified used construction equipment,
                material handling systems, commercial vehicles, buses, and industrial machinery
                across the UAE, Saudi Arabia, Qatar, and Bahrain. Every machine listed on our
                platform goes through a rigorous inspection and certification process by our
                in-house engineering team.
              </p>
              <p className="text-[16px] text-black/55 leading-relaxed">
                We don&apos;t just sell equipment — we provide a complete, transparent, and trusted
                buying experience that gives operators and fleet managers the confidence to invest
                in pre-owned machinery.
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* Bottom: image grid — 3 balanced images */}
        <AnimateIn delay={250}>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/products/product-1.jpg"
                alt="Volvo excavator at FAMCO facility"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/products/product-4.jpg"
                alt="CAT excavator at FAMCO Demo Centre"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="img-zoom rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/products/product-2.jpg"
                alt="Tipping trailer at FAMCO yard"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
