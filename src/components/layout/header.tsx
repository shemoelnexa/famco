"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Buy Equipment", href: "/equipment" },
  { label: "Sell Equipment", href: "/sell" },
  { label: "Inspections", href: "/inspections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setVisible(true), 100);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // On homepage: transparent when at top, solid when scrolled
  // On other pages: always solid
  const showSolid = !isHome || scrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
      }}
    >
      <div
        className={`transition-all duration-400 ${
          showSolid
            ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-black/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/images/famco-logo.png"
                alt="Al-Futtaim FAMCO Used"
                className={`h-9 w-auto transition-all duration-400 ${
                  showSolid ? "" : "brightness-0 invert"
                }`}
              />
            </Link>

            {/* Centered Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
                      showSolid
                        ? isActive
                          ? "text-black"
                          : "text-black/50 hover:text-black"
                        : isActive
                          ? "text-white"
                          : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full transition-colors duration-300 ${
                          showSolid ? "bg-black" : "bg-white"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden items-center gap-4 lg:flex relative z-10">
              <Link
                href="/equipment"
                className="btn-blue btn-shimmer rounded-full bg-famco-blue text-white h-10 px-6 text-[14px] font-medium inline-flex items-center transition-all duration-300"
              >
                Browse Equipment
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden relative z-10">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <button
                      className={`inline-flex items-center justify-center size-10 rounded-lg transition-colors ${
                        showSolid
                          ? "text-black hover:bg-black/[0.04]"
                          : "text-white hover:bg-white/10"
                      }`}
                    />
                  }
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-[#141414] border-white/10">
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
                      href="/equipment"
                      onClick={() => setMobileOpen(false)}
                      className="mt-4 w-full rounded-full bg-famco-blue text-white h-11 px-6 text-[14px] font-medium inline-flex items-center justify-center"
                    >
                      Browse Equipment
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
