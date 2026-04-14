"use client";

import Link from "next/link";
import { ShieldCheck, Heart, ClipboardCheck, RotateCw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { ModelViewer } from "@/components/3d/model-viewer";
import { getModelForProduct } from "@/lib/models-3d";

interface ProductCardProps {
  product: Product;
}

const conditionColors: Record<string, string> = {
  Excellent: "bg-emerald-500/10 text-emerald-700",
  Good: "bg-amber-500/10 text-amber-700",
  Fair: "bg-orange-500/10 text-orange-700",
};

export function ProductCard({ product }: ProductCardProps) {
  const model = getModelForProduct({ category: product.category, id: product.id });
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white border border-black/[0.06] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image area — interactive 3D thumbnail */}
      <Link href={`/equipment/${product.id}`} className="relative block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#F4F4F4] to-[#E9E9E9]">
          <ModelViewer
            src={model.src}
            alt={product.title}
            cameraOrbit={model.cameraOrbit}
            fieldOfView={model.fieldOfView}
            autoRotate
            cameraControls
            disableZoom
            disablePan
            rotationPerSecond="14deg"
            className="absolute inset-0"
          />

          {/* "Drag to rotate" hint */}
          <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white pointer-events-none">
            <RotateCw className="size-3" />
            360° View
          </div>

          {/* Badges overlay */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <div className="flex flex-col gap-1.5">
              {product.certified && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-black shadow-sm">
                  <ShieldCheck className="size-3.5 text-famco-blue" />
                  FAMCO Approved
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-black/60 shadow-sm">
                <ClipboardCheck className="size-3.5 text-emerald-600" />
                52-Point Inspected
              </span>
            </div>
            <span className="flex size-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 cursor-pointer">
              <Heart className="size-3.5 text-black/40" />
            </span>
          </div>

          {/* Image count */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2.5 right-2.5 rounded-md bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-white">
              {product.images.length} photos
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        {/* Title */}
        <Link href={`/equipment/${product.id}`}>
          <h3 className="text-[15px] font-semibold text-black leading-snug tracking-tight line-clamp-1 hover:text-famco-blue transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Key specs row */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${conditionColors[product.condition] || "bg-gray-100 text-gray-600"}`}>
            {product.condition}
          </span>
          <span className="inline-flex items-center rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-black/55">
            {product.year}
          </span>
          <span className="inline-flex items-center rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-black/55">
            {product.hours > 0
              ? `${product.hours.toLocaleString()} hrs`
              : product.specifications["Mileage"] || "N/A"}
          </span>
        </div>

        {/* Location */}
        <p className="mt-2 text-[12px] text-black/35">
          {product.location}
        </p>

        {/* Price */}
        <p className="mt-2 text-[18px] font-bold text-black tracking-tight">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Buttons row */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/equipment/${product.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-black/10 bg-white h-10 text-[13px] font-medium text-black transition-all duration-200 hover:border-black/20"
          >
            View Details
          </Link>
          <Link
            href={`/equipment/${product.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-famco-blue h-10 text-[13px] font-medium text-white transition-all duration-200 hover:bg-famco-blue/90"
          >
            Reserve / Enquire
          </Link>
        </div>
      </div>
    </div>
  );
}
