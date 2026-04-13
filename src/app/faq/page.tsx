"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What does \"FAMCO Approved\" mean?",
    answer: "FAMCO Approved means the equipment has undergone a rigorous 52-point inspection by our certified engineers, covering mechanical, hydraulic, electrical, and structural systems. Only machines that meet our quality standards receive the FAMCO Approved certification.",
  },
  {
    question: "Can I view the equipment before buying?",
    answer: "Yes. All equipment is available for in-person viewing at our facilities. Contact us to schedule a visit at your convenience. We're located at Dubai Investment Park, UAE.",
  },
  {
    question: "Do you offer financing options?",
    answer: "Yes, we work with financing partners to offer flexible payment plans. Contact our team to discuss financing options for any listed equipment.",
  },
  {
    question: "How do I sell my equipment through FAMCO?",
    answer: "Visit our Sell Equipment page and submit your equipment details. Our team will review your submission, arrange an inspection, and provide a fair market valuation within 24 hours.",
  },
  {
    question: "What regions do you serve?",
    answer: "We currently serve buyers and sellers across the UAE, Saudi Arabia, Qatar, and Bahrain. Equipment can be shipped across the region.",
  },
  {
    question: "Is there a warranty on purchased equipment?",
    answer: "Warranty coverage varies by equipment type and condition. Details are provided in the inspection report and discussed during the purchase process. Contact our team for specific warranty information.",
  },
  {
    question: "How does the reservation process work?",
    answer: "You can reserve any listed equipment with a deposit. This secures the machine while you finalize payment and logistics. Contact our team to initiate a reservation.",
  },
  {
    question: "What if I need equipment that isn't listed?",
    answer: "Contact us with your requirements. We have access to equipment not yet listed on the marketplace and can help source specific machines for you.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-black pr-4">{question}</span>
        <ChevronDown
          className={cn(
            "size-4 text-black/40 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[300px] pb-5" : "max-h-0"
        )}
      >
        <p className="text-[14px] text-black/55 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-[720px] px-6 sm:px-10">
        <AnimateIn>
          <h1 className="text-[clamp(28px,4vw,40px)] font-semibold text-black tracking-tighter leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-[15px] text-black/45 leading-relaxed">
            Everything you need to know about buying and selling equipment with FAMCO.
          </p>
        </AnimateIn>

        <AnimateIn delay={150}>
          <div className="mt-10">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
