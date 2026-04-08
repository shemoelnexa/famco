import Link from "next/link";
import { ShieldCheck, Heart, Phone } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white border border-black/[0.06] transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      {/* Image area — fills the card edge to edge */}
      <Link href={`/equipment/${product.id}`} className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Badges overlay on image */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            {product.certified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[12px] font-semibold text-black shadow-sm">
                <ShieldCheck className="size-3.5 text-famco-blue" />
                FAMCO Approved
              </span>
            ) : (
              <span />
            )}
            <span className="flex size-9 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer">
              <Heart className="size-4 text-black/40" />
            </span>
          </div>

          {/* Dots at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 pb-3">
            <span className="h-[5px] w-5 rounded-full bg-white" />
            {product.images.slice(1).map((_, i) => (
              <span key={i} className="size-[5px] rounded-full bg-white/50" />
            ))}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        {/* Title */}
        <Link href={`/equipment/${product.id}`}>
          <h3 className="text-[16px] font-semibold text-black leading-snug tracking-tight line-clamp-1 hover:text-famco-blue transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Specs line */}
        <p className="mt-1 text-[13px] text-black/40">
          {product.category} · {product.year} · {product.hours > 0
            ? `${product.hours.toLocaleString()} hrs`
            : product.specifications["Mileage"] || "N/A"}
        </p>

        {/* Price */}
        <p className="mt-2.5 text-[18px] font-bold text-black tracking-tight">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Buttons row */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link
            href={`/equipment/${product.id}`}
            className="btn-outline inline-flex items-center justify-center rounded-full border border-black/15 bg-white h-11 text-[13px] font-semibold text-black transition-all duration-300 hover:border-black/30 hover:bg-black/[0.02]"
          >
            View Details
          </Link>
          <Link
            href={`/equipment/${product.id}`}
            className="btn-primary btn-shimmer inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1a1a1a] h-11 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-black"
          >
            <Phone className="size-3.5" />
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
