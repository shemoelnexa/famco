"use client";

import Link from "next/link";
import { Truck, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { ModelViewer } from "@/components/3d/model-viewer";
import { MODELS } from "@/lib/models-3d";

export function ShippingHero() {
  return (
    <section className="relative bg-[#0A0A0A] text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <img
          src="/images/trucks-portrait.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 items-center">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium text-white/60 mb-5">
              <Truck className="size-3.5 text-famco-blue" />
              Shipping & Logistics
            </span>
            <h1 className="max-w-3xl text-[clamp(36px,6vw,68px)] font-semibold leading-[1] tracking-tighter">
              Ship your machine{" "}
              <span className="text-famco-blue">anywhere</span>.
            </h1>
            <p className="mt-5 max-w-lg text-[16px] text-white/55 leading-relaxed">
              FAMCO operates a logistics network across the GCC, Africa, and South Asia.
              Yard pickup, customs clearance, and delivery — one partner, one quote, one timeline.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#quote"
                className="btn-blue btn-shimmer inline-flex items-center gap-2 rounded-full bg-famco-blue text-white h-12 px-7 text-[14px] font-semibold transition-all duration-300"
              >
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="tel:+97180032626"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white h-12 px-7 text-[14px] font-medium transition-all duration-300 hover:bg-white/10"
              >
                Call logistics desk
              </a>
            </div>
          </AnimateIn>

          <div className="hidden lg:block relative h-[460px]">
            <ModelViewer
              src={MODELS["tractor-head"].src}
              alt="Heavy-haul prime mover"
              cameraOrbit={MODELS["tractor-head"].cameraOrbit}
              fieldOfView={MODELS["tractor-head"].fieldOfView}
              autoRotate
              cameraControls
              disableZoom
              disablePan
              rotationPerSecond="14deg"
              className="w-full h-full"
            />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-famco-blue/30 blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
