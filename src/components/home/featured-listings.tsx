import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/equipment/product-card";
import { getFeaturedProducts } from "@/data/products";
import { AnimateIn } from "@/components/ui/animate-in";

export function FeaturedListings() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
                Featured Equipment
              </h2>
              <p className="mt-4 text-[16px] text-black/45 tracking-tight">
                Hand-picked verified machines ready for immediate deployment
              </p>
            </div>
            <Link
              href="/equipment"
              className="hidden sm:flex items-center gap-1.5 text-[14px] font-medium text-black/50 hover:text-black transition-colors"
            >
              View All
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </AnimateIn>

        {/* Grid */}
        <AnimateIn delay={200}>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimateIn>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/equipment"
            className="flex items-center gap-1.5 text-[14px] font-medium text-black/50 hover:text-black transition-colors"
          >
            View All Equipment
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
