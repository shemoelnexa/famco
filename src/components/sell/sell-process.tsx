import { Upload, Search, Wrench, Megaphone } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const steps = [
  {
    step: "01",
    title: "Submit Your Equipment",
    description: "Fill out the form below with your equipment details — make, model, year, condition, and photos. Our team will review within 24 hours.",
    icon: Upload,
  },
  {
    step: "02",
    title: "Inspection & Valuation",
    description: "Our certified engineers conduct a full technical inspection and provide a fair market valuation based on condition, demand, and specifications.",
    icon: Search,
  },
  {
    step: "03",
    title: "Refurbishment (Optional)",
    description: "We offer professional refurbishment — servicing, bodywork, paint, and cosmetic improvements to maximize your equipment's resale value.",
    icon: Wrench,
  },
  {
    step: "04",
    title: "Listed & Sold",
    description: "Your equipment is FAMCO Approved and listed on our marketplace with full inspection reports. We handle buyer enquiries and close the deal.",
    icon: Megaphone,
  },
];

export function SellProcess() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              How Selling Works
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              A straightforward 4-step process from submission to sale.
            </p>
          </div>
        </AnimateIn>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <AnimateIn key={step.title} delay={index * 100}>
              <div className="relative rounded-2xl border border-black/[0.06] bg-white p-6 h-full">
                <span className="text-[48px] font-bold text-black/[0.04] leading-none tracking-tighter absolute top-4 right-5">
                  {step.step}
                </span>
                <step.icon className="size-6 text-famco-blue" />
                <h3 className="mt-4 text-[16px] font-semibold text-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/45 leading-relaxed">
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
