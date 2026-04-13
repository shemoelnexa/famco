import type { Metadata } from "next";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "Terms & Conditions | FAMCO Used Equipment",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-[720px] px-6 sm:px-10">
        <AnimateIn>
          <h1 className="text-[clamp(28px,4vw,40px)] font-semibold text-black tracking-tighter leading-[1.1]">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-[15px] text-black/45 leading-relaxed">
            Last updated: April 2026
          </p>

          <div className="mt-10 space-y-8 text-[15px] text-black/60 leading-relaxed">
            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the FAMCO Used Equipment marketplace, you agree to be bound by these
                terms and conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">2. Equipment Listings</h2>
              <p>
                All equipment listed on this marketplace has been inspected and verified by FAMCO engineers.
                While we strive for accuracy, specifications and condition reports are provided as guidelines.
                Buyers are encouraged to arrange in-person viewings before purchase.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">3. Pricing & Payment</h2>
              <p>
                All prices are listed in the currency displayed and are subject to change. Deposits are
                non-refundable unless otherwise stated. Full payment terms will be provided upon enquiry.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">4. Limitation of Liability</h2>
              <p>
                FAMCO Used Equipment acts as a marketplace facilitator. While all equipment is inspected,
                FAMCO&apos;s liability is limited to the scope outlined in the inspection report and certification.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">5. Governing Law</h2>
              <p>
                These terms are governed by the laws of the United Arab Emirates. Any disputes shall
                be resolved in the courts of Dubai, UAE.
              </p>
            </section>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
