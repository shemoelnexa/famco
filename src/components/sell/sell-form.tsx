"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const categories = [
  "Construction Equipment",
  "Material Handling",
  "Commercial Vehicles & Trucks",
  "Buses",
  "Industrial Machinery",
  "Other",
];

const conditions = ["Excellent", "Good", "Fair", "Needs Repair"];

export function SellForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    category: "",
    make: "",
    model: "",
    year: "",
    hours: "",
    condition: "",
    location: "",
    askingPrice: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClass =
    "w-full h-12 rounded-xl border border-black/[0.08] bg-white px-4 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all";

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[900px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Submit Your Equipment
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              Provide your equipment details and our team will get back to you
              within 24 hours with a valuation.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            {/* Section: Contact Details */}
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-black/40 mb-4">
                Your Details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name *" className={inputClass} />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email Address *" className={inputClass} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className={inputClass} />
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className={inputClass} />
              </div>
            </div>

            {/* Section: Equipment Details */}
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-black/40 mb-4">
                Equipment Details
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <select name="category" required value={formData.category} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  <option value="">Equipment Category *</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <select name="condition" required value={formData.condition} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  <option value="">Condition *</option>
                  {conditions.map((cond) => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                <input type="text" name="make" required value={formData.make} onChange={handleChange} placeholder="Make (e.g. Volvo) *" className={inputClass} />
                <input type="text" name="model" required value={formData.model} onChange={handleChange} placeholder="Model (e.g. EC210D) *" className={inputClass} />
                <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year of Manufacture" className={inputClass} />
                <input type="text" name="hours" value={formData.hours} onChange={handleChange} placeholder="Operating Hours / Mileage" className={inputClass} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Equipment Location" className={inputClass} />
                <input type="text" name="askingPrice" value={formData.askingPrice} onChange={handleChange} placeholder="Asking Price (AED)" className={inputClass} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-black/40 mb-4">
                Additional Information
              </h3>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the equipment condition, service history, any attachments, or other details..."
                className="w-full rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-[14px] text-black placeholder:text-black/30 outline-none focus:border-famco-blue focus:ring-1 focus:ring-famco-blue/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-famco-blue text-white h-12 px-8 text-[15px] font-medium inline-flex items-center gap-2 transition-all duration-200 hover:bg-famco-blue/90"
            >
              Submit Equipment
              <Send className="size-4" />
            </button>
          </form>
        </AnimateIn>
      </div>
    </section>
  );
}
