import Link from "next/link";
import { ArrowRight, Gavel, ShoppingCart, Truck } from "lucide-react";
import { ModelViewer } from "@/components/3d/model-viewer";
import { MODELS } from "@/lib/models-3d";
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
    model: MODELS["tractor-head"],
    accent: "from-famco-blue/15 to-transparent",
  },
  {
    eyebrow: "Live Auctions",
    title: "Bid weekly on certified machinery",
    description:
      "Live and timed auctions on excavators, loaders, and trucks. Transparent bidding on inspected stock.",
    icon: Gavel,
    href: "/auctions",
    cta: "View auctions",
    model: MODELS["excavator"],
    accent: "from-amber-400/15 to-transparent",
  },
  {
    eyebrow: "Shipping & Logistics",
    title: "Ship anywhere across the GCC & beyond",
    description:
      "End-to-end logistics — yard pickup, customs, delivery. One partner, one quote, one timeline.",
    icon: Truck,
    href: "/shipping",
    cta: "Request a quote",
    model: MODELS["dump-truck"],
    accent: "from-emerald-400/15 to-transparent",
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
                className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white p-7 h-full flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/[0.04]"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* 3D ornament */}
                <div className="relative h-48 sm:h-56 -mx-3 mb-4 pointer-events-none">
                  <ModelViewer
                    src={p.model.src}
                    alt={p.model.label}
                    cameraOrbit={p.model.cameraOrbit}
                    fieldOfView={p.model.fieldOfView}
                    autoRotate
                    cameraControls={false}
                    disableZoom
                    disablePan
                    rotationPerSecond="10deg"
                    className="w-full h-full"
                  />
                </div>

                <div className="relative">
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
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-famco-blue group-hover:gap-2.5 transition-all">
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
