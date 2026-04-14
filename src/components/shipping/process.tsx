import { FileText, ClipboardCheck, Truck, PackageCheck } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    icon: FileText,
    title: "1. Quote",
    description: "Tell us what's moving and where. We quote in 24 hours.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Pickup",
    description: "Yard collection scheduled and confirmed by SMS + email.",
  },
  {
    icon: Truck,
    title: "3. Transit",
    description: "Live tracking. Customs clearance handled by FAMCO.",
  },
  {
    icon: PackageCheck,
    title: "4. Delivery",
    description: "Signed handover, condition photos, completion report.",
  },
];

export function ShippingProcess() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="max-w-2xl mb-12">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
              How shipping works
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Four steps from yard to site.
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, i) => (
            <AnimateIn key={step.title} delay={i * 70}>
              <div className="relative h-full rounded-2xl bg-[#FAFAFA] border border-black/[0.05] p-7 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1">
                <div className="size-11 rounded-xl bg-famco-blue/10 flex items-center justify-center mb-4">
                  <step.icon className="size-5 text-famco-blue" />
                </div>
                <h3 className="text-[16px] font-semibold text-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/55 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
