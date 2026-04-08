"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Phone,
  Heart,
  ChevronDown,
  MapPin,
  Calendar,
  Clock,
  Gauge,
  Truck,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface InfoPanelProps {
  product: Product;
}

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
        className="flex w-full items-center justify-between py-5 text-left"
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

  const hoursOrMileageLabel = isTruckOrBus && product.hours === 0 ? "Mileage" : "Hours";

  return (
    <div className="lg:sticky lg:top-28">
      {/* Category */}
      <p className="text-[13px] text-black/40 uppercase tracking-[0.05em]">
        {product.category}
      </p>

      {/* Title */}
      <h1 className="mt-2 text-[28px] sm:text-[32px] font-semibold text-black tracking-tighter leading-[1.1]">
        {product.title}
      </h1>

      {/* Price */}
      <p className="mt-3 text-[24px] font-bold text-black tracking-tight">
        {formatPrice(product.price, product.currency)}
      </p>

      {/* Badges */}
      {product.certified && (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-famco-blue/8 px-3 py-1.5 text-[12px] font-medium text-famco-blue">
          <ShieldCheck className="size-3.5" />
          FAMCO Approved · Inspected {product.inspectionDate}
        </div>
      )}

      {/* Quick specs row */}
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-[13px] text-black/60">
          <Calendar className="size-3.5" />
          {product.year}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-[13px] text-black/60">
          <Clock className="size-3.5" />
          {hoursOrMileageValue}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-[13px] text-black/60">
          <MapPin className="size-3.5" />
          {product.location}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3.5 py-2 text-[13px] text-black/60">
          <Gauge className="size-3.5" />
          {product.condition}
        </span>
      </div>

      {/* CTA row */}
      <div className="mt-7 flex items-center gap-3">
        <button className="btn-primary btn-shimmer flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] text-white h-12 text-[15px] font-medium transition-all hover:bg-black">
          <Phone className="size-4" />
          Enquire Now
        </button>
        <button className="btn-outline flex size-12 items-center justify-center rounded-full border border-black/12 transition-all hover:bg-black/[0.04]">
          <Heart className="size-5 text-black/50" />
        </button>
      </div>

      {/* Accordion sections */}
      <div className="mt-6">
        <Accordion title="Description & Details" defaultOpen>
          <p className="text-[14px] text-black/55 leading-relaxed">
            {product.description}
          </p>
        </Accordion>

        <Accordion title="Specifications">
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

        <Accordion title="Inspection Report">
          <div className="flex items-start gap-3 rounded-xl bg-famco-blue/5 p-4">
            <ShieldCheck className="size-5 text-famco-blue shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-medium text-black">FAMCO Certified Inspection</p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] text-black/35 uppercase tracking-wide">Date</p>
                  <p className="text-[13px] font-medium text-black mt-0.5">
                    {new Date(product.inspectionDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-black/35 uppercase tracking-wide">Grade</p>
                  <p className="text-[13px] font-medium text-black mt-0.5">{product.condition}</p>
                </div>
                <div>
                  <p className="text-[11px] text-black/35 uppercase tracking-wide">Status</p>
                  <p className="text-[13px] font-medium text-emerald-600 mt-0.5">
                    {product.certified ? "Certified" : "Pending"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[13px] text-black/45 leading-relaxed">
                All mechanical, hydraulic, electrical, and structural components have been evaluated by FAMCO certified technicians.
              </p>
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
