"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const equipmentTypes = [
  "Construction Equipment",
  "Material Handling",
  "Trucks & Vehicles",
  "Buses",
  "Industrial Machinery",
  "Other",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    equipmentType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section id="map" className="bg-[#F0F0F0] py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left — info + map */}
          <AnimateIn direction="left">
            <div className="lg:sticky lg:top-32">
              <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-black/40">
                Send a Message
              </p>
              <h2 className="mt-4 text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.1]">
                Tell Us What You Need
              </h2>
              <p className="mt-4 max-w-sm text-[15px] text-black/45 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours with
                personalized recommendations and pricing.
              </p>

              {/* Map placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-black/[0.06] h-[240px] bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.168!2d55.143!3d25.044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDAyJzM4LjQiTiA1NcKwMDgnMzQuOCJF!5e0!3m2!1sen!2sae!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FAMCO Location"
                />
              </div>
            </div>
          </AnimateIn>

          {/* Right — form */}
          <AnimateIn direction="right" delay={150}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-[13px] font-medium text-black/60 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[13px] font-medium text-black/60 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone + Company row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-[13px] font-medium text-black/60 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-[13px] font-medium text-black/60 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all"
                  />
                </div>
              </div>

              {/* Equipment type */}
              <div>
                <label htmlFor="equipmentType" className="block text-[13px] font-medium text-black/60 mb-2">
                  Equipment Interest
                </label>
                <select
                  id="equipmentType"
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all appearance-none"
                >
                  <option value="">Select equipment type</option>
                  {equipmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[13px] font-medium text-black/60 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements — specific equipment, quantity, budget, or any questions..."
                  className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-blue btn-shimmer rounded-full bg-famco-blue text-white h-12 px-8 text-[15px] font-medium inline-flex items-center gap-2 transition-all duration-300"
              >
                Send Message
                <Send className="size-4" />
              </button>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
