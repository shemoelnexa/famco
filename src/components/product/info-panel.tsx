"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Gauge,
  Truck,
  Check,
  Banknote,
  ClipboardCheck,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface InfoPanelProps {
  product: Product;
}

const conditionColors: Record<string, string> = {
  Excellent: "bg-emerald-500/10 text-emerald-700",
  Good: "bg-amber-500/10 text-amber-700",
  Fair: "bg-orange-500/10 text-orange-700",
};

const inspectionItems = [
  "Engine & drivetrain",
  "Hydraulic system",
  "Electrical systems",
  "Structural integrity",
  "Brake & steering",
  "Cabin & controls",
  "Tyres / undercarriage",
  "Fluid levels & leaks",
];

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-black/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-black">{title}</span>
        <ChevronDown
          className={cn(
            "size-4 text-black/40 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[600px] pb-5" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function InfoPanel({ product }: InfoPanelProps) {
  const isTruckOrBus =
    product.category === "Commercial Vehicles & Trucks" ||
    product.category === "Buses";

  const hoursOrMileageValue =
    isTruckOrBus && product.hours === 0
      ? product.specifications["Mileage"] || "N/A"
      : `${product.hours.toLocaleString()} hrs`;

  return (
    <div className="lg:sticky lg:top-28">
      {/* Category */}
      <p className="text-[13px] text-black/40 uppercase tracking-[0.05em]">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="mt-2 text-[26px] sm:text-[30px] font-semibold text-black tracking-tighter leading-[1.1]">
        {product.title}
      </h1>

      {/* Price + Condition */}
      <div className="mt-3 flex items-center gap-3">
        <p className="text-[24px] font-bold text-black tracking-tight">
          {formatPrice(product.price, product.currency)}
        </p>
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[12px] font-semibold ${conditionColors[product.condition] || "bg-gray-100 text-gray-600"}`}>
          {product.condition}
        </span>
      </div>

      {/* Badges row */}
      <div className="mt-4 flex flex-wrap gap-2">
        {product.certified && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-famco-blue/8 px-3 py-1.5 text-[12px] font-medium text-famco-blue">
            <ShieldCheck className="size-3.5" />
            FAMCO Approved
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/8 px-3 py-1.5 text-[12px] font-medium text-emerald-700">
          <ClipboardCheck className="size-3.5" />
          52-Point Inspected
        </span>
      </div>

      {/* Quick specs row */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-3 py-2 text-[13px] text-black/60">
          <Calendar className="size-3.5" />
          {product.year}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-3 py-2 text-[13px] text-black/60">
          <Clock className="size-3.5" />
          {hoursOrMileageValue}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/[0.04] px-3 py-2 text-[13px] text-black/60">
          <MapPin className="size-3.5" />
          {product.location}
        </span>
      </div>

      {/* CTA row — Reserve / Enquire / Finance */}
      <div className="mt-6 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-famco-blue text-white h-12 text-[14px] sm:text-[15px] font-medium transition-all duration-200 hover:bg-famco-blue/90 whitespace-nowrap">
            Reserve with Deposit
          </button>
          <button className="flex size-12 items-center justify-center rounded-xl border border-black/10 transition-all hover:bg-black/[0.03]">
            <Heart className="size-5 text-black/40" />
          </button>
        </div>
        <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white h-12 text-[15px] font-medium text-black transition-all duration-200 hover:bg-black/[0.03]">
          Enquire About This Machine
        </button>
        <Link
          href="/contact"
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl h-10 text-[13px] font-medium text-black/50 transition-colors hover:text-black"
        >
          <Banknote className="size-4" />
          Contact us for financing options
        </Link>
      </div>

      {/* Inspection Report — visible, not in accordion */}
      <div className="mt-6 rounded-xl border border-black/[0.06] p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="size-5 text-famco-blue" />
          <h3 className="text-[15px] font-semibold text-black">Inspection Report</h3>
          <span className="ml-auto text-[12px] text-black/35">
            {new Date(product.inspectionDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {inspectionItems.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10">
                <Check className="size-3 text-emerald-600" />
              </div>
              <span className="text-[13px] text-black/60">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-black/[0.04]">
          <div>
            <p className="text-[12px] text-black/35">Overall Grade</p>
            <p className="text-[14px] font-semibold text-black">{product.condition}</p>
          </div>
          <div>
            <p className="text-[12px] text-black/35">Status</p>
            <p className="text-[14px] font-semibold text-emerald-600">
              {product.certified ? "Certified" : "Pending"}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-black/35">Inspected By</p>
            <p className="text-[14px] font-semibold text-black">FAMCO Engineers</p>
          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div className="mt-4">
        <Accordion title="Description & Details" defaultOpen>
          <p className="text-[14px] text-black/55 leading-relaxed">
            {product.description}
          </p>
        </Accordion>

        <Accordion title="Full Specifications">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key}>
                <p className="text-[12px] text-black/35 uppercase tracking-wide">{key}</p>
                <p className="text-[14px] font-medium text-black mt-0.5">{value}</p>
              </div>
            ))}
            <div>
              <p className="text-[12px] text-black/35 uppercase tracking-wide">Make</p>
              <p className="text-[14px] font-medium text-black mt-0.5">{product.make}</p>
            </div>
            <div>
              <p className="text-[12px] text-black/35 uppercase tracking-wide">Model</p>
              <p className="text-[14px] font-medium text-black mt-0.5">{product.model}</p>
            </div>
          </div>
        </Accordion>

        {/* Contact info */}
        <div className="border-t border-black/[0.06] pt-5 mt-0">
          <div className="flex items-center gap-3">
            <Truck className="size-5 text-black/40" />
            <div>
              <p className="text-[13px] font-medium text-black">Available for viewing</p>
              <p className="text-[12px] text-black/40">{product.location} · Call 800 FAMCO (32626)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
