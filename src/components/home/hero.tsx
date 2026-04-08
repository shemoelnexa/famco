"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src="/images/hero-bg.png"
        alt="Volvo truck on highway"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="max-w-4xl text-[clamp(48px,8vw,96px)] font-semibold text-white leading-[0.95] tracking-tighter animate-fade-in-up"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            Your next equipment starts here
          </h1>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between animate-fade-in-up"
               style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            <p className="max-w-sm text-[15px] text-white/55 leading-[1.65]">
              From inspection to certification, we handle
              the details so you can buy with confidence.
              Your next machine is FAMCO Approved.
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/equipment"
                className="btn-blue btn-shimmer rounded-full bg-famco-blue text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-300"
              >
                Explore
              </Link>
              <Link
                href="#about"
                className="btn-outline rounded-full border border-white/30 text-white h-12 px-8 text-[15px] font-medium inline-flex items-center transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
