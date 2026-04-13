"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ShoppingCart, Tag, ClipboardCheck, ShieldCheck } from "lucide-react";

const actions = [
  {
    title: "Buy Equipment",
    description: "Browse verified, inspection-certified machines ready to work.",
    icon: ShoppingCart,
    href: "/equipment",
  },
  {
    title: "Sell Equipment",
    description: "List your equipment with FAMCO and reach buyers across the region.",
    icon: Tag,
    href: "/sell",
  },
  {
    title: "Get Inspected",
    description: "Book a professional 52-point inspection for any machine.",
    icon: ClipboardCheck,
    href: "/contact",
  },
];

export function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/equipment?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/equipment");
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] overflow-hidden">
      <img
        src="/images/hero-construction.jpg"
        alt="CAT excavator and hauler on construction site"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      <div className="relative z-10 flex min-h-[85vh] sm:min-h-[90vh] flex-col justify-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          {/* Trust strip */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up"
               style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
            <ShieldCheck className="size-4 text-famco-blue" />
            <span className="text-[13px] font-medium text-white/50 tracking-tight">
              FAMCO Approved — Inspected, Certified, Ready to Work
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-[clamp(36px,6vw,68px)] font-semibold text-white leading-[1] tracking-tighter animate-fade-in-up"
              style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
            Buy & sell verified used equipment
          </h1>
          <p className="mt-4 max-w-lg text-[16px] text-white/50 leading-relaxed animate-fade-in-up"
             style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
            The region&apos;s trusted marketplace for inspected construction equipment,
            trucks, and industrial machinery.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch}
                className="mt-8 max-w-2xl animate-fade-in-up"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
            <div className="flex items-center rounded-xl bg-white h-14 pl-5 pr-2 shadow-lg">
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

          {/* Action cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl animate-fade-in-up"
               style={{ animationDelay: "0.55s", animationFillMode: "both" }}>
            {actions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-start gap-3 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] p-4 transition-all duration-300 hover:bg-white/[0.14] hover:border-white/[0.15]"
              >
                <action.icon className="size-5 text-white/60 shrink-0 mt-0.5 transition-colors duration-300 group-hover:text-famco-blue" />
                <div>
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/40 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
