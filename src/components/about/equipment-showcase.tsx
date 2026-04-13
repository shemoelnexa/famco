import { AnimateIn } from "@/components/ui/animate-in";

const topImages = [
  { src: "/images/products/product-5.jpg", alt: "Volvo FH truck at FAMCO facility" },
  { src: "/images/trucks-front.jpeg", alt: "FAMCO Approved truck fleet" },
];

const bottomImages = [
  { src: "/images/products/product-3.jpg", alt: "Road roller at FAMCO Demo Centre" },
  { src: "/images/products/product-10.jpg", alt: "Volvo excavator at FAMCO yard" },
  { src: "/images/products/product-6.jpg", alt: "Volvo FH truck side view" },
];

export function EquipmentShowcase() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Our Fleet & Facility
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              A glimpse into our equipment yard, demo centre, and the machines we certify every day.
            </p>
          </div>
        </AnimateIn>

        {/* Row 1: 2 equal images */}
        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topImages.map((image) => (
              <div
                key={image.src}
                className="img-zoom rounded-2xl overflow-hidden aspect-[16/10]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* Row 2: 3 equal images */}
        <AnimateIn delay={350}>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bottomImages.map((image) => (
              <div
                key={image.src}
                className="img-zoom rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
