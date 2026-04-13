import Link from "next/link";
import { Building2, Package, Truck, Bus, Factory, ShieldCheck, Globe, Award } from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS, type Category } from "@/lib/types";
import { getCategoryCounts } from "@/data/products";
import { AnimateIn } from "@/components/ui/animate-in";

const CATEGORY_CONFIG: Record<
  Category,
  { icon: React.ElementType; image: string }
> = {
  "Construction Equipment": {
    icon: Building2,
    image: "/images/products/product-1.jpg",
  },
  "Material Handling": {
    icon: Package,
    image: "/images/products/product-11.jpg",
  },
  "Commercial Vehicles & Trucks": {
    icon: Truck,
    image: "/images/products/product-17.jpg",
  },
  Buses: {
    icon: Bus,
    image: "/images/products/product-8.jpg",
  },
  "Industrial Machinery": {
    icon: Factory,
    image: "/images/products/product-5.jpg",
  },
};

const FEATURES = [
  { icon: ShieldCheck, label: "Verified" },
  { icon: Award, label: "Certified" },
  { icon: Globe, label: "Regional" },
];

const CATEGORY_SHORT: Record<Category, string> = {
  "Construction Equipment": "Construction",
  "Material Handling": "Material Handling",
  "Commercial Vehicles & Trucks": "Trucks & Vehicles",
  Buses: "Buses",
  "Industrial Machinery": "Industrial",
};

export function CategoryBrowser() {
  const counts = getCategoryCounts();

  return (
    <section className="bg-[#F0F0F0] py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        {/* Small label */}
        <AnimateIn>
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.1em] text-black/35">
            Browse Equipment
          </p>
        </AnimateIn>

        {/* Large headline — no inline badge */}
        <h2 className="mx-auto mt-6 max-w-3xl text-center text-[clamp(26px,4vw,40px)] font-semibold text-black tracking-tighter leading-[1.2]">
          FAMCO delivers verified used equipment to help you{" "}
          <span className="text-black/40">scale operations, reduce costs, and build with confidence</span>
        </h2>

        {/* Feature icons row */}
        <AnimateIn delay={200}>
          <div className="mt-10 flex items-center justify-center gap-10">
            {FEATURES.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-2.5">
                <feature.icon className="size-7 text-black" />
                <span className="text-[13px] font-medium text-black/50">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Bento grid: row 1 = 2 wide cards, row 2 = 3 equal cards */}
        <AnimateIn delay={350}>
          <div className="mt-14 flex flex-col gap-4">
            {/* Row 1: 2 cards, equal width */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CATEGORIES.slice(0, 2).map((category) => {
                const config = CATEGORY_CONFIG[category];
                const Icon = config.icon;
                const slug = CATEGORY_SLUGS[category];
                const count = counts[category] || 0;

                return (
                  <Link
                    key={category}
                    href={`/equipment?category=${slug}`}
                    className="group relative overflow-hidden rounded-3xl"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                      <img
                        src={config.image}
                        alt={category}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-5 text-white" />
                          <div>
                            <h3 className="text-[16px] font-semibold text-white">
                              {CATEGORY_SHORT[category]}
                            </h3>
                            <p className="text-[12px] text-white/55">
                              {count} listings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Row 2: 3 cards, equal width */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CATEGORIES.slice(2).map((category) => {
                const config = CATEGORY_CONFIG[category];
                const Icon = config.icon;
                const slug = CATEGORY_SLUGS[category];
                const count = counts[category] || 0;

                return (
                  <Link
                    key={category}
                    href={`/equipment?category=${slug}`}
                    className="group relative overflow-hidden rounded-3xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                      <img
                        src={config.image}
                        alt={category}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="flex items-center gap-2.5">
                          <Icon className="size-5 text-white" />
                          <div>
                            <h3 className="text-[15px] font-semibold text-white">
                              {CATEGORY_SHORT[category]}
                            </h3>
                            <p className="text-[12px] text-white/55">
                              {count} listings
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
