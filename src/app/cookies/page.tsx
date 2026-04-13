import type { Metadata } from "next";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "Cookie Policy | FAMCO Used Equipment",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-[720px] px-6 sm:px-10">
        <AnimateIn>
          <h1 className="text-[clamp(28px,4vw,40px)] font-semibold text-black tracking-tighter leading-[1.1]">
            Cookie Policy
          </h1>
          <p className="mt-4 text-[15px] text-black/45 leading-relaxed">
            Last updated: April 2026
          </p>

          <div className="mt-10 space-y-8 text-[15px] text-black/60 leading-relaxed">
            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">What Are Cookies</h2>
              <p>
                Cookies are small text files stored on your device when you visit our website.
                They help us improve your browsing experience and understand how our marketplace is used.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">How We Use Cookies</h2>
              <p>
                We use essential cookies for site functionality, analytics cookies to understand usage patterns,
                and preference cookies to remember your settings such as filters and search preferences.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">Managing Cookies</h2>
              <p>
                You can manage cookie preferences through your browser settings. Note that disabling
                certain cookies may affect the functionality of the marketplace.
              </p>
            </section>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
