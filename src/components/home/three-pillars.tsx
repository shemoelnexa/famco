import Link from "next/link";
import { ArrowRight, Gavel, ShoppingCart, Truck } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const pillars = [
  {
    eyebrow: "Direct Sales",
    title: "Buy & sell verified machines",
    description:
      "A curated marketplace of inspected, certified used equipment — ready to view, ready to ship.",
    icon: ShoppingCart,
    href: "/equipment",
    cta: "Browse equipment",
    image: "/images/products/product-3.jpg",
  },
  {
    eyebrow: "Live Auctions",
    title: "Bid weekly on certified machinery",
    description:
      "Live and timed auctions on excavators, loaders, and trucks. Transparent bidding on inspected stock.",
    icon: Gavel,
    href: "/auctions",
    cta: "View auctions",
    image: "/images/products/product-10.jpg",
  },
  {
    eyebrow: "Shipping & Logistics",
    title: "Ship anywhere across the GCC & beyond",
    description:
      "End-to-end logistics — yard pickup, customs, delivery. One partner, one quote, one timeline.",
    icon: Truck,
    href: "/shipping",
    cta: "Request a quote",
    image: "/images/trucks-banner.jpeg",
  },
];

export function ThreePillars() {
  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
              What we do
            </div>
            <h2 className="text-[clamp(28px,3.6vw,44px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Three ways FAMCO moves equipment.
            </h2>
            <p className="mt-4 text-[16px] text-black/55 leading-relaxed">
              Whether you&apos;re buying, bidding, or shipping — we operate the full lifecycle for verified used machinery.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <AnimateIn key={p.eyebrow} delay={i * 80}>
              <Link
                href={p.href}
                className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-[#0A0A0A] text-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/[0.04]"
              >
                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <p.icon className="size-4 text-famco-blue" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {p.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-semibold tracking-tight leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] text-white/55 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-famco-blue group-hover:gap-2.5 transition-all">
                    {p.cta}
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
