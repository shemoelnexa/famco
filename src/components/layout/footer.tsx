"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const DISCOVER_LINKS = [
  { label: "Equipment", href: "/equipment" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES_LINKS = [
  { label: "Construction Equipment", href: "/equipment?category=construction-equipment" },
  { label: "Material Handling", href: "/equipment?category=material-handling" },
  { label: "Trucks & Vehicles", href: "/equipment?category=commercial-vehicles-trucks" },
  { label: "Buses", href: "/equipment?category=buses" },
  { label: "Industrial Machinery", href: "/equipment?category=industrial-machinery" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
];

const SUPPORT_LINKS = [
  { label: "FAQ", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#141414] text-white">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12 py-20 lg:py-24">
        <AnimateIn>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
            {/* Left: Headline + Email */}
            <div className="max-w-md">
              <h2 className="text-[clamp(32px,4vw,44px)] font-semibold tracking-tighter leading-[1.08] text-white">
                Your Next Machine{"\n"}
                <br />
                Starts Here
              </h2>
              <p className="mt-5 text-[15px] text-white/40 leading-relaxed tracking-tight">
                Join our network and get notified about new verified equipment listings.
              </p>

              {/* Email input */}
              <div className="mt-8 flex items-center rounded-full border border-white/15 bg-white/[0.04] h-12 pl-5 pr-1.5 focus-within:border-white/30 transition-colors">
                <input
                  type="email"
                  placeholder="Enter a email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 outline-none tracking-tight"
                />
                <button className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-md transition-all duration-300 hover:scale-105 hover:bg-white/90">
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right: Link columns */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {/* Discover */}
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/30 mb-5">
                  Discover
                </h3>
                <ul className="space-y-3.5">
                  {DISCOVER_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/30 mb-5">
                  Categories
                </h3>
                <ul className="space-y-3.5">
                  {CATEGORIES_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/30 mb-5">
                  Social Media
                </h3>
                <ul className="space-y-3.5">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help & Support */}
              <div>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/30 mb-5">
                  Help & Support
                </h3>
                <ul className="space-y-3.5">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
            <div className="flex items-center gap-3">
              <img
                src="/images/famco-logo.png"
                alt="Al-Futtaim FAMCO Used"
                className="h-8 w-auto brightness-0 invert opacity-50"
              />
            </div>
            <p className="text-[13px] text-white/25 tracking-tight">
              &copy; {new Date().getFullYear()} Al-Futtaim FAMCO. All rights reserved.
            </p>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
}
