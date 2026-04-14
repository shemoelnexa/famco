"use client";

import Link from "next/link";
import { Gavel, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function AuctionsHero() {
  return (
    <section className="relative bg-[#0A0A0A] text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/trucks-banner.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[13px] font-medium text-white/60 mb-5">
            <Gavel className="size-3.5 text-famco-blue" />
            Live & Timed Auctions
          </span>
          <h1 className="max-w-3xl text-[clamp(36px,6vw,68px)] font-semibold leading-[1] tracking-tighter">
            Bid on certified machinery,{" "}
            <span className="text-famco-blue">every week</span>.
          </h1>
          <p className="mt-5 max-w-lg text-[16px] text-white/55 leading-relaxed">
            Live and timed auctions on inspected, certified used construction equipment
            and trucks from across the GCC. Transparent bidding, verified condition reports,
            and shipping handled end-to-end.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#live"
              className="btn-blue btn-shimmer inline-flex items-center gap-2 rounded-full bg-famco-blue text-white h-12 px-7 text-[14px] font-semibold transition-all duration-300"
            >
              See live auctions
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white h-12 px-7 text-[14px] font-medium transition-all duration-300 hover:bg-white/10"
            >
              Register to bid
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
