import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products, getProductById } from "@/data/products";
import { ImageGallery } from "@/components/product/image-gallery";
import { InfoPanel } from "@/components/product/info-panel";
import { RelatedEquipment } from "@/components/product/related-equipment";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* Breadcrumb — simple back link */}
        <nav className="flex items-center gap-2 py-6 text-[13px] text-black/40">
          <Link href="/equipment" className="inline-flex items-center gap-1.5 hover:text-black transition-colors">
            <ArrowLeft className="size-3.5" />
            Back to Equipment
          </Link>
          <span className="mx-1">·</span>
          <span>{product.category}</span>
        </nav>

        {/* Main: gallery + info */}
        <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <ImageGallery images={product.images} alt={product.title} />
          <InfoPanel product={product} />
        </div>

        {/* Related */}
        <div className="mt-20 pb-16">
          <RelatedEquipment product={product} />
        </div>
      </div>
    </div>
  );
}
