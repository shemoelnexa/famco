import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const contactCards = [
  {
    title: "Call Us",
    description: "+971 4 213 6000",
    subtitle: "Mon–Sat, 8 AM – 6 PM GST",
    icon: Phone,
    href: "tel:+97142136000",
  },
  {
    title: "Email Us",
    description: "used@famco.ae",
    subtitle: "We respond within 24 hours",
    icon: Mail,
    href: "mailto:used@famco.ae",
  },
  {
    title: "WhatsApp",
    description: "+971 50 123 4567",
    subtitle: "Quick inquiries & quotes",
    icon: MessageCircle,
    href: "https://wa.me/971501234567",
  },
  {
    title: "Visit Us",
    description: "Al-Futtaim FAMCO, Dubai",
    subtitle: "Dubai Investment Park, UAE",
    icon: MapPin,
    href: "#map",
  },
];

const workingHours = [
  { day: "Saturday – Thursday", hours: "8:00 AM – 6:00 PM" },
  { day: "Friday", hours: "Closed" },
];

export function ContactInfo() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(32px,5vw,48px)] font-semibold text-black tracking-tighter leading-[1.05]">
              Get in Touch
            </h2>
            <p className="mt-4 text-[16px] text-black/45 tracking-tight">
              Reach out through any channel — we&apos;re here to assist with equipment inquiries,
              valuations, and sales.
            </p>
          </div>
        </AnimateIn>

        {/* Contact cards */}
        <AnimateIn delay={200}>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 hover-focus-group">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group rounded-2xl bg-[#F0F0F0] border border-black/[0.04] p-7 transition-all duration-500 cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:bg-famco-blue hover:border-famco-blue"
              >
                <card.icon className="size-6 text-black transition-colors duration-300 group-hover:text-white" />
                <h3 className="mt-5 text-[17px] font-semibold text-black tracking-tight transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-[14px] text-black/70 transition-colors duration-300 group-hover:text-white/90">
                  {card.description}
                </p>
                <p className="mt-1 text-[13px] text-black/40 transition-colors duration-300 group-hover:text-white/55">
                  {card.subtitle}
                </p>
              </a>
            ))}
          </div>
        </AnimateIn>

        {/* Working hours */}
        <AnimateIn delay={350}>
          <div className="mt-12 rounded-2xl border border-black/[0.06] bg-[#F0F0F0] p-7 sm:p-8 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <Clock className="size-5 text-black/60" />
              <h3 className="text-[17px] font-semibold text-black tracking-tight">
                Working Hours
              </h3>
            </div>
            <div className="space-y-3">
              {workingHours.map((item) => (
                <div key={item.day} className="flex items-center justify-between">
                  <span className="text-[14px] text-black/55">{item.day}</span>
                  <span className={`text-[14px] font-medium ${item.hours === "Closed" ? "text-red-500" : "text-black"}`}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
