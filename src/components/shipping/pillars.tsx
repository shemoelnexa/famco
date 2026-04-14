import { AnimateIn } from "@/components/ui/animate-in";
import { ModelViewer } from "@/components/3d/model-viewer";
import { MODELS } from "@/lib/models-3d";

const services = [
  {
    label: "GCC Road Freight",
    description:
      "Daily lanes between UAE, KSA, Oman, Bahrain, Qatar, Kuwait. Multi-axle low-bed trailers for over-dimensional loads.",
    model: MODELS["tractor-head"],
  },
  {
    label: "International Sea Freight",
    description:
      "RoRo and container shipping out of Jebel Ali to Africa, the Indian subcontinent, and beyond. Customs handled both ends.",
    model: MODELS["dump-truck"],
  },
  {
    label: "Yard-to-Site Delivery",
    description:
      "Last-mile delivery to construction sites, ports, and quarries with wheeled or tracked cradle setups.",
    model: MODELS["tipping-trailer"],
  },
];

export function ShippingPillars() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="max-w-2xl mb-12">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
              Services
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Three transport modes, one network.
            </h2>
            <p className="mt-4 text-[16px] text-black/55 leading-relaxed">
              Whatever the size of the machine and wherever it&apos;s going, we have a route.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <AnimateIn key={s.label} delay={i * 80}>
              <div className="group relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white p-7 h-full flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl border border-white/[0.04]">
                <div className="relative h-44 -mx-3 mb-4 pointer-events-none">
                  <ModelViewer
                    src={s.model.src}
                    alt={s.label}
                    cameraOrbit={s.model.cameraOrbit}
                    fieldOfView={s.model.fieldOfView}
                    autoRotate
                    cameraControls={false}
                    disableZoom
                    disablePan
                    rotationPerSecond="10deg"
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-[20px] font-semibold tracking-tight leading-tight">
                  {s.label}
                </h3>
                <p className="mt-2.5 text-[14px] text-white/55 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
