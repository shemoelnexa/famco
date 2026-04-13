import type { Metadata } from "next";
import { AnimateIn } from "@/components/ui/animate-in";

export const metadata: Metadata = {
  title: "Privacy Policy | FAMCO Used Equipment",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-[720px] px-6 sm:px-10">
        <AnimateIn>
          <h1 className="text-[clamp(28px,4vw,40px)] font-semibold text-black tracking-tighter leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-[15px] text-black/45 leading-relaxed">
            Last updated: April 2026
          </p>

          <div className="mt-10 space-y-8 text-[15px] text-black/60 leading-relaxed">
            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when using the FAMCO Used Equipment marketplace,
                including your name, email address, phone number, company details, and equipment enquiry information.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">2. How We Use Your Information</h2>
              <p>
                Your information is used to process equipment enquiries, facilitate transactions between buyers and
                sellers, send notifications about listings, and improve our marketplace services.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">3. Data Protection</h2>
              <p>
                We implement appropriate security measures to protect your personal data in accordance with
                UAE data protection regulations and Al-Futtaim Group data governance policies.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-semibold text-black mb-3">4. Contact Us</h2>
              <p>
                For questions about this privacy policy or your data, contact us at privacy@famco.ae
                or call 800 FAMCO (32626).
              </p>
            </section>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
