"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  Search,
  ShoppingCart,
  Tag,
  ClipboardCheck,
  ShieldCheck,
  Gavel,
  Truck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ModelViewer } from "@/components/3d/model-viewer";
import { MODELS } from "@/lib/models-3d";

const actions = [
  {
    title: "Buy Equipment",
    description: "Browse verified, inspection-certified machines.",
    icon: ShoppingCart,
    href: "/equipment",
  },
  {
    title: "Sell Equipment",
    description: "List with FAMCO and reach buyers across the region.",
    icon: Tag,
    href: "/sell",
  },
  {
    title: "Get Inspected",
    description: "Book a professional 52-point inspection.",
    icon: ClipboardCheck,
    href: "/contact",
  },
];

const slides = [
  {
    key: "direct",
    eyebrow: "Direct Sales",
    eyebrowIcon: ShieldCheck,
    title: "Buy & sell verified used equipment",
    subtitle:
      "The region's trusted marketplace for inspected construction equipment, trucks, and industrial machinery.",
    bg: "/images/hero-construction.jpg",
    showSearch: true,
    showActions: true,
    show3D: true,
  },
  {
    key: "auctions",
    eyebrow: "Live Auctions",
    eyebrowIcon: Gavel,
    title: "Bid on certified machinery, every week",
    subtitle:
      "Live and timed auctions on inspected equipment from across the GCC. Transparent bidding, verified condition.",
    bg: "/images/trucks-banner.jpeg",
    cta: { label: "View auctions", href: "/auctions" },
    show3D: true,
  },
  {
    key: "shipping",
    eyebrow: "Shipping & Logistics",
    eyebrowIcon: Truck,
    title: "Ship your equipment anywhere",
    subtitle:
      "FAMCO's logistics network moves machines across the GCC and beyond — by road, sea, and air.",
    bg: "/images/trucks-portrait.jpeg",
    cta: { label: "Request a quote", href: "/shipping" },
    show3D: true,
  },
];

export function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 28,
  });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, 7000);
    const stop = () => clearInterval(id);
    emblaApi.on("pointerDown", stop);
    return () => clearInterval(id);
  }, [emblaApi]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/equipment?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/equipment");
    }
  };

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative pt-[112px] bg-black">
      <div className="relative overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide, idx) => (
              <div
                key={slide.key}
                className="relative shrink-0 grow-0 basis-full min-h-[640px] sm:min-h-[720px]"
              >
                {/* Background */}
                <img
                  src={slide.bg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Content grid */}
                <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-10 items-end h-full pt-16 sm:pt-24 pb-16 sm:pb-20 min-h-[640px] sm:min-h-[720px]">
                    {/* Copy column */}
                    <div className="self-end">
                      <div
                        className={`flex items-center gap-2 mb-5 transition-all duration-700 ${
                          selected === idx
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                        }`}
                      >
                        <slide.eyebrowIcon className="size-4 text-famco-blue" />
                        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
                          {slide.eyebrow}
                        </span>
                      </div>

                      <h1
                        className={`max-w-[640px] text-[clamp(36px,5.4vw,64px)] font-semibold text-white leading-[1.02] tracking-tighter transition-all duration-700 delay-100 ${
                          selected === idx
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                        }`}
                      >
                        {slide.title}
                      </h1>

                      <p
                        className={`mt-5 max-w-xl text-[16px] text-white/65 leading-relaxed transition-all duration-700 delay-200 ${
                          selected === idx
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                        }`}
                      >
                        {slide.subtitle}
                      </p>

                      {slide.showSearch && (
                        <form
                          onSubmit={handleSearch}
                          className={`mt-8 max-w-2xl transition-all duration-700 delay-300 ${
                            selected === idx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-6"
                          }`}
                        >
                          <div className="flex items-center rounded-xl bg-white h-14 pl-5 pr-2 shadow-2xl">
                            <Search className="size-5 text-black/30 shrink-0" />
                            <input
                              type="text"
                              placeholder="Search by keyword, make, model..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="flex-1 bg-transparent px-3 text-[15px] text-black placeholder:text-black/35 outline-none"
                            />
                            <button
                              type="submit"
                              className="rounded-lg bg-famco-blue text-white h-10 px-4 sm:px-6 text-[14px] font-medium transition-all duration-200 hover:bg-famco-blue/90 shrink-0"
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      )}

                      {slide.showActions && (
                        <div
                          className={`mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl transition-all duration-700 delay-400 ${
                            selected === idx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-6"
                          }`}
                        >
                          {actions.map((action) => (
                            <Link
                              key={action.title}
                              href={action.href}
                              className="group flex items-start gap-3 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] p-4 transition-all duration-300 hover:bg-white/[0.14] hover:border-white/[0.2]"
                            >
                              <action.icon className="size-5 text-white/60 shrink-0 mt-0.5 transition-colors duration-300 group-hover:text-famco-blue" />
                              <div>
                                <h3 className="text-[14px] font-semibold text-white tracking-tight">
                                  {action.title}
                                </h3>
                                <p className="mt-1 text-[12px] text-white/45 leading-relaxed">
                                  {action.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {slide.cta && (
                        <div
                          className={`mt-8 transition-all duration-700 delay-300 ${
                            selected === idx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-6"
                          }`}
                        >
                          <Link
                            href={slide.cta.href}
                            className="btn-blue btn-shimmer inline-flex items-center gap-2 rounded-full bg-famco-blue text-white h-12 px-7 text-[14px] font-semibold transition-all duration-300"
                          >
                            {slide.cta.label}
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* 3D ornament column */}
                    {slide.show3D && (
                      <div className="hidden lg:block self-stretch relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ModelViewer
                            src={
                              idx === 0
                                ? MODELS["tractor-head"].src
                                : idx === 1
                                  ? MODELS["excavator"].src
                                  : MODELS["dump-truck"].src
                            }
                            alt={slide.eyebrow}
                            cameraOrbit={
                              idx === 0
                                ? "45deg 75deg 8m"
                                : idx === 1
                                  ? "60deg 70deg 6m"
                                  : "120deg 75deg 9m"
                            }
                            fieldOfView="32deg"
                            autoRotate
                            cameraControls
                            disableZoom
                            disablePan
                            rotationPerSecond="14deg"
                            className="w-full h-full max-h-[520px]"
                          />
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-famco-blue/30 blur-3xl rounded-full pointer-events-none" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide controls */}
        <button
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={scrollNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 size-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.key}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                selected === i
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
