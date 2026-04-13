import { AnimateIn } from "@/components/ui/animate-in";

export function ImageBand() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/products/product-9.jpg"
        alt="Volvo articulated hauler on site"
        className="w-full h-[400px] sm:h-[450px] lg:h-[500px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10">
          <AnimateIn direction="left">
            <div className="max-w-lg">
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-white/50">
                Our Expertise
              </p>
              <h2 className="mt-4 text-[clamp(28px,5vw,48px)] font-semibold text-white tracking-tighter leading-[1.05]">
                From Construction to Logistics —{" "}
                <span className="text-famco-blue">We Know Equipment</span>
              </h2>
              <p className="mt-4 text-[16px] text-white/55 leading-relaxed max-w-md">
                Our team brings hands-on expertise across construction, material handling,
                commercial vehicles, and industrial machinery — ensuring every machine
                meets the highest standards.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
