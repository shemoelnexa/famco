"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function ShippingQuoteForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    machine: "",
    pickup: "",
    delivery: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setData({
        name: "",
        email: "",
        phone: "",
        company: "",
        machine: "",
        pickup: "",
        delivery: "",
        notes: "",
      });
    }, 4000);
  };

  return (
    <section id="quote" className="bg-[#F5F5F5] py-20 sm:py-24">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10 lg:px-12">
        <AnimateIn>
          <div className="rounded-3xl bg-white border border-black/[0.06] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]">
              <div className="bg-[#0A0A0A] text-white p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3">
                    Get a quote
                  </div>
                  <h2 className="text-[clamp(24px,2.4vw,32px)] font-semibold tracking-tighter leading-[1.05]">
                    24-hour quote, no obligation.
                  </h2>
                  <p className="mt-4 text-[14px] text-white/55 leading-relaxed">
                    Tell us what&apos;s moving and where it needs to go. Our logistics desk responds
                    within one business day.
                  </p>
                </div>
                <ul className="mt-8 space-y-2.5 text-[13px] text-white/55">
                  <li>· GCC and international coverage</li>
                  <li>· Customs clearance included</li>
                  <li>· Live tracking + condition reports</li>
                  <li>· Insurance options on request</li>
                </ul>
              </div>

              <form onSubmit={onSubmit} className="p-8 sm:p-10 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field name="name" label="Your name" value={data.name} onChange={onChange} required />
                  <Field name="company" label="Company" value={data.company} onChange={onChange} />
                  <Field name="email" type="email" label="Email" value={data.email} onChange={onChange} required />
                  <Field name="phone" label="Phone" value={data.phone} onChange={onChange} />
                </div>
                <Field name="machine" label="Machine type / model" value={data.machine} onChange={onChange} required />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field name="pickup" label="Pickup location" value={data.pickup} onChange={onChange} required />
                  <Field name="delivery" label="Delivery location" value={data.delivery} onChange={onChange} required />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-black/55 mb-1.5">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={data.notes}
                    onChange={onChange}
                    rows={3}
                    className="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-[14px] text-black bg-white focus:border-famco-blue focus:outline-none transition-colors resize-none"
                    placeholder="Dimensions, weight, special handling..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="btn-blue btn-shimmer w-full inline-flex items-center justify-center gap-2 rounded-full bg-famco-blue text-white h-12 px-7 text-[14px] font-semibold transition-all duration-300 disabled:opacity-70"
                >
                  {submitted ? (
                    "Quote request sent — we'll be in touch within 24h"
                  ) : (
                    <>
                      <Send className="size-4" />
                      Request quote
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-black/55 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-black/10 px-3.5 h-11 text-[14px] text-black bg-white focus:border-famco-blue focus:outline-none transition-colors"
      />
    </div>
  );
}
