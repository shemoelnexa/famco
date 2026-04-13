"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/ui/animate-in";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Engine & Drivetrain",
    points: [
      "Engine oil level & condition",
      "Coolant level & radiator condition",
      "Air filter & intake system",
      "Exhaust system & emissions",
      "Transmission fluid & operation",
      "Drive shaft & axle condition",
      "Fuel system & injectors",
      "Engine mounts & vibration",
    ],
  },
  {
    title: "Hydraulic System",
    points: [
      "Hydraulic fluid level & quality",
      "Pump pressure & flow rate",
      "Cylinder operation & seals",
      "Hose condition & fittings",
      "Control valve function",
      "Hydraulic filter condition",
      "System leak inspection",
    ],
  },
  {
    title: "Electrical Systems",
    points: [
      "Battery condition & charge",
      "Alternator output",
      "Wiring harness integrity",
      "Lighting system (all lights)",
      "Instrument panel & gauges",
      "Starter motor operation",
      "Fuse box & relays",
    ],
  },
  {
    title: "Structural & Chassis",
    points: [
      "Frame & structural welds",
      "Boom / arm / bucket condition",
      "Pin & bushing wear",
      "Counterweight mounting",
      "Cab structure integrity",
      "Corrosion assessment",
    ],
  },
  {
    title: "Brakes & Steering",
    points: [
      "Service brake operation",
      "Parking brake function",
      "Brake pad / shoe thickness",
      "Steering response & play",
      "Power steering fluid",
      "Steering linkage condition",
    ],
  },
  {
    title: "Undercarriage / Tyres",
    points: [
      "Track / tyre condition & tread",
      "Roller & idler wear",
      "Sprocket condition",
      "Track tension adjustment",
      "Wheel bearing condition",
      "Suspension components",
    ],
  },
  {
    title: "Cabin & Controls",
    points: [
      "Seat condition & adjustment",
      "HVAC system operation",
      "Visibility (mirrors, cameras)",
      "Control levers & pedals",
      "Safety harness / seatbelt",
      "Door & window operation",
    ],
  },
  {
    title: "Safety & Compliance",
    points: [
      "Fire extinguisher presence",
      "Emergency stop function",
      "Reverse alarm / camera",
      "Safety decals & markings",
      "RTA / regulatory compliance",
      "Documentation verification",
    ],
  },
];

function ChecklistCategory({
  category,
  defaultOpen,
}: {
  category: (typeof categories)[0];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-black/[0.06] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 bg-white hover:bg-black/[0.01] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10">
            <Check className="size-3.5 text-emerald-600" />
          </div>
          <span className="text-[15px] font-semibold text-black tracking-tight">
            {category.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-medium text-black/30">
            {category.points.length} points
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-black/30 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="px-4 sm:px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {category.points.map((point) => (
            <div key={point} className="flex items-center gap-2.5 py-1.5">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="size-3 text-emerald-500" />
              </div>
              <span className="text-[13px] text-black/55">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InspectionChecklist() {
  return (
    <section className="bg-[#F0F0F0] py-20">
      <div className="mx-auto max-w-[900px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              The 52-Point Checklist
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              Every system. Every component. Documented and graded by certified FAMCO engineers.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <ChecklistCategory
                key={category.title}
                category={category}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </AnimateIn>

        {/* Total count */}
        <AnimateIn delay={250}>
          <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-famco-blue/[0.06] border border-famco-blue/10 px-6 py-4">
            <span className="text-[32px] font-bold text-famco-blue tracking-tighter">52</span>
            <div>
              <p className="text-[14px] font-semibold text-black">inspection points total</p>
              <p className="text-[13px] text-black/40">across 8 system categories</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
