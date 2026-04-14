"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Phone,
  MapPin,
  Globe,
  UserRound,
  ChevronDown,
  Truck,
  ConstructionIcon,
  Wrench,
  Container,
  ArrowRight,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Buy Equipment", href: "/equipment", hasMega: true },
  { label: "Auctions", href: "/auctions" },
  { label: "Sell Equipment", href: "/sell" },
  { label: "Shipping", href: "/shipping" },
  { label: "Inspections", href: "/inspections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MEGA_CATEGORIES = [
  {
    icon: Truck,
    label: "Trucks",
    href: "/equipment?category=trucks",
    description: "Tractor heads, tippers, mixers",
  },
  {
    icon: ConstructionIcon,
    label: "Excavators",
    href: "/equipment?category=excavators",
    description: "Tracked & wheeled excavators",
  },
  {
    icon: Wrench,
    label: "Loaders",
    href: "/equipment?category=loaders",
    description: "Wheel loaders & backhoes",
  },
  {
    icon: Container,
    label: "Trailers",
    href: "/equipment?category=trailers",
    description: "Tipping, flatbed, low-bed",
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      {/* Utility bar — collapses on scroll */}
      <div
        className={`bg-[#0A0A0A] text-white/70 text-[12px] overflow-hidden transition-[height] duration-300 ${
          scrolled ? "h-0" : "h-10"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 h-10 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+97180032626"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="size-3.5" />
              <span>+971 800 FAMCO</span>
            </a>
            <span className="flex items-center gap-2 text-white/50">
              <MapPin className="size-3.5" />
              <span>Dubai, UAE</span>
            </span>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="size-3.5" />
              <span>EN</span>
              <span className="text-white/30">|</span>
              <span className="text-white/40 hover:text-white/70">AR</span>
            </button>
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <UserRound className="size-3.5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav — always white, full-bleed */}
      <div
        className={`bg-white border-b border-black/[0.06] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.06)]" : "shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/images/famco-logo.png"
                alt="Al-Futtaim FAMCO Used"
                className="h-9 w-auto"
              />
            </Link>

            {/* Nav */}
            <nav className="hidden xl:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                if (link.hasMega) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setMegaOpen(true)}
                      onMouseLeave={() => setMegaOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 text-[14px] font-medium transition-all duration-300 inline-flex items-center gap-1 ${
                          isActive
                            ? "text-black"
                            : "text-black/55 hover:text-black"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`size-3.5 transition-transform duration-300 ${
                            megaOpen ? "rotate-180" : ""
                          }`}
                        />
                        {isActive && (
                          <span className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full bg-black" />
                        )}
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                      isActive
                        ? "text-black"
                        : "text-black/55 hover:text-black"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full bg-black" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTAs */}
            <div className="hidden xl:flex items-center gap-3 relative z-10">
              <Link
                href="/sell"
                className="btn-outline rounded-full border border-black/15 text-black h-10 px-5 text-[13px] font-medium inline-flex items-center transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
              >
                Sell Equipment
              </Link>
              <Link
                href="/equipment"
                className="btn-blue btn-shimmer rounded-full bg-famco-blue text-white h-10 px-5 text-[13px] font-medium inline-flex items-center transition-all duration-300"
              >
                Browse Equipment
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="xl:hidden relative z-10">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <button className="inline-flex items-center justify-center size-10 rounded-lg text-black hover:bg-black/[0.04] transition-colors" />
                  }
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] bg-[#141414] border-white/10"
                >
                  <nav className="mt-8 flex flex-col gap-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/sell"
                      onClick={() => setMobileOpen(false)}
                      className="mt-4 w-full rounded-full border border-white/20 text-white h-11 px-6 text-[14px] font-medium inline-flex items-center justify-center"
                    >
                      Sell Equipment
                    </Link>
                    <Link
                      href="/equipment"
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-full bg-famco-blue text-white h-11 px-6 text-[14px] font-medium inline-flex items-center justify-center"
                    >
                      Browse Equipment
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mega-menu panel */}
        <div
          className={`absolute left-0 right-0 top-full bg-white border-b border-black/[0.06] shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)] transition-all duration-300 origin-top ${
            megaOpen
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-95 pointer-events-none"
          }`}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black/40 mb-4">
                  Browse by category
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {MEGA_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-start gap-3 rounded-xl p-4 border border-black/[0.06] hover:border-famco-blue/30 hover:bg-famco-blue/[0.03] transition-all duration-300"
                    >
                      <div className="rounded-lg bg-black/[0.04] p-2.5 group-hover:bg-famco-blue/10 transition-colors">
                        <cat.icon className="size-5 text-black/70 group-hover:text-famco-blue transition-colors" />
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-black tracking-tight">
                          {cat.label}
                        </div>
                        <div className="mt-0.5 text-[12px] text-black/45">
                          {cat.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/equipment"
                  onClick={() => setMegaOpen(false)}
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-famco-blue hover:gap-2.5 transition-all"
                >
                  View all equipment
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl bg-[#0A0A0A] p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <img
                    src="/images/trucks-portrait.jpeg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                </div>
                <div className="relative">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-famco-blue mb-2">
                    Featured
                  </div>
                  <div className="text-[18px] font-semibold tracking-tight leading-tight">
                    Volvo FH420 4x2 Tractor Head
                  </div>
                  <div className="mt-1 text-[12px] text-white/55">
                    Inspected · Certified · Ready to ship
                  </div>
                  <Link
                    href="/equipment"
                    onClick={() => setMegaOpen(false)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:gap-2.5 transition-all"
                  >
                    See listing
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
