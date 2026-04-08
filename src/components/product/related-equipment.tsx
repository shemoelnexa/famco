"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/equipment/product-card";
import type { Product } from "@/lib/types";

interface RelatedEquipmentProps {
  product: Product;
}

export function RelatedEquipment({ product }: RelatedEquipmentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id);

  if (related.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[13px] text-black/35 uppercase tracking-[0.1em]">You may also like</p>
          <h2 className="mt-2 text-[28px] font-semibold text-black tracking-tighter">
            Similar Equipment
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all hover:border-black/25 hover:text-black"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex size-10 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all hover:border-black/25 hover:text-black"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2"
      >
        {related.map((p) => (
          <div key={p.id} className="w-[300px] shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
