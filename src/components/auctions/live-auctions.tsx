"use client";

import Link from "next/link";
import { Clock, Gavel, MapPin } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { ModelViewer } from "@/components/3d/model-viewer";
import { MODELS } from "@/lib/models-3d";

const lots = [
  {
    id: "AUC-2026-041",
    title: "CAT 320 GC Hydraulic Excavator",
    year: 2019,
    hours: "4,820 hrs",
    location: "Dubai, UAE",
    currentBid: 142000,
    bidders: 14,
    timeLeft: "2d 14h 22m",
    badge: "Live now",
    badgeColor: "bg-rose-500",
    model: MODELS["excavator"],
  },
  {
    id: "AUC-2026-042",
    title: "Volvo FH420 4x2 Tractor Head",
    year: 2020,
    hours: "320,000 km",
    location: "Jebel Ali, UAE",
    currentBid: 98500,
    bidders: 9,
    timeLeft: "1d 04h 11m",
    badge: "Live now",
    badgeColor: "bg-rose-500",
    model: MODELS["tractor-head"],
  },
  {
    id: "AUC-2026-043",
    title: "SDLG L956F Wheel Loader",
    year: 2021,
    hours: "2,910 hrs",
    location: "Abu Dhabi, UAE",
    currentBid: 64200,
    bidders: 6,
    timeLeft: "4d 09h 47m",
    badge: "Closing soon",
    badgeColor: "bg-amber-500",
    model: MODELS["wheel-loader"],
  },
  {
    id: "AUC-2026-044",
    title: "Komatsu HD405 Off-Highway Dump Truck",
    year: 2018,
    hours: "11,400 hrs",
    location: "Dammam, KSA",
    currentBid: 187000,
    bidders: 21,
    timeLeft: "5d 18h 03m",
    badge: "New listing",
    badgeColor: "bg-emerald-500",
    model: MODELS["dump-truck"],
  },
];

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);

export function LiveAuctions() {
  return (
    <section id="live" className="bg-[#F5F5F5] py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
                Live auctions
              </div>
              <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
                Open lots — bid now.
              </h2>
            </div>
            <Link
              href="/equipment"
              className="text-[14px] font-medium text-famco-blue hover:gap-2.5 transition-all inline-flex items-center gap-1.5"
            >
              View all listings →
            </Link>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {lots.map((lot, i) => (
            <AnimateIn key={lot.id} delay={i * 70}>
              <div className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-black/[0.06] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* 3D thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#F4F4F4] to-[#E9E9E9]">
                  <ModelViewer
                    src={lot.model.src}
                    alt={lot.title}
                    cameraOrbit={lot.model.cameraOrbit}
                    fieldOfView={lot.model.fieldOfView}
                    autoRotate
                    cameraControls
                    disableZoom
                    disablePan
                    rotationPerSecond="14deg"
                    className="absolute inset-0"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-black shadow-sm">
                    <span className={`size-1.5 rounded-full ${lot.badgeColor} animate-pulse-dot`} />
                    {lot.badge}
                  </div>
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white">
                    <Clock className="size-3" />
                    {lot.timeLeft}
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <div className="text-[11px] font-mono text-black/40 mb-1.5">
                    Lot #{lot.id}
                  </div>
                  <h3 className="text-[15px] font-semibold text-black leading-snug tracking-tight line-clamp-2">
                    {lot.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-black/60">
                      {lot.year}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-black/60">
                      {lot.hours}
                    </span>
                  </div>
                  <p className="mt-2 text-[12px] text-black/40 inline-flex items-center gap-1">
                    <MapPin className="size-3" />
                    {lot.location}
                  </p>

                  <div className="mt-4 pt-4 border-t border-black/[0.06]">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-[11px] text-black/40 uppercase tracking-wide">
                          Current bid
                        </div>
                        <div className="text-[20px] font-bold text-black tracking-tight">
                          {formatPrice(lot.currentBid)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[11px] text-black/40">Bidders</div>
                        <div className="text-[14px] font-semibold text-black">
                          {lot.bidders}
                        </div>
                      </div>
                    </div>

                    <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-famco-blue text-white h-10 text-[13px] font-semibold transition-all duration-200 hover:bg-famco-blue/90">
                      <Gavel className="size-3.5" />
                      Place bid
                    </button>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
