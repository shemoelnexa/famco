import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactCta } from "@/components/contact/contact-cta";

export const metadata: Metadata = {
  title: "Contact Us | FAMCO Used Equipment",
  description:
    "Get in touch with FAMCO for inquiries about used equipment, trucks, and industrial machinery. Visit our showroom in Dubai or reach us by phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCta />
    </>
  );
}
