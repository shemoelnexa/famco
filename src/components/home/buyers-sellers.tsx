import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  BadgeCheck,
  DollarSign,
  TrendingUp,
  Wrench,
  Users,
  Award,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const buyerProps = [
  { icon: ShieldCheck, text: "Verified and certified machines" },
  { icon: FileText, text: "Transparent inspection reports" },
  { icon: BadgeCheck, text: "Confidence in quality and condition" },
  { icon: DollarSign, text: "Financing options available" },
];

const sellerProps = [
  { icon: TrendingUp, text: "Higher resale value" },
  { icon: Wrench, text: "Professional refurbishment" },
  { icon: Users, text: "Wider buyer base across the region" },
  { icon: Award, text: "FAMCO Approved certification" },
];

export function BuyersSellers() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <AnimateIn>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 hover-focus-group">
            {/* For Buyers */}
            <div className="rounded-2xl bg-white border border-black/[0.06] p-9 transition-all duration-500 cursor-default hover:shadow-lg hover:-translate-y-1">
              <h3 className="text-[24px] font-semibold text-black tracking-tighter">
                For Buyers
              </h3>
              <p className="mt-2 text-[15px] text-black/45">
                Find the right machine with complete confidence.
              </p>
              <ul className="mt-6 space-y-3.5">
                {buyerProps.map((prop) => (
                  <li key={prop.text} className="flex items-center gap-3">
                    <prop.icon className="size-5 text-black/50" />
                    <span className="text-[14px] text-black/60">{prop.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/equipment"
                  className="btn-primary btn-shimmer inline-flex items-center justify-center rounded-full bg-black text-white h-11 px-6 text-[14px] font-medium transition-colors hover:bg-black/85"
                >
                  Browse Equipment
                </Link>
              </div>
            </div>

            {/* For Sellers */}
            <div className="rounded-2xl bg-white border border-black/[0.06] p-9 transition-all duration-500 cursor-default hover:shadow-lg hover:-translate-y-1">
              <h3 className="text-[24px] font-semibold text-black tracking-tighter">
                For Sellers
              </h3>
              <p className="mt-2 text-[15px] text-black/45">
                Maximize the value of your used equipment.
              </p>
              <ul className="mt-6 space-y-3.5">
                {sellerProps.map((prop) => (
                  <li key={prop.text} className="flex items-center gap-3">
                    <prop.icon className="size-5 text-black/50" />
                    <span className="text-[14px] text-black/60">{prop.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="#"
                  className="btn-outline inline-flex items-center justify-center rounded-full border border-black/20 text-black h-11 px-6 text-[14px] font-medium transition-colors hover:bg-black hover:text-white"
                >
                  Submit Your Equipment
                </Link>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
