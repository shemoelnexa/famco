import { ShieldCheck, Award, ClipboardCheck, Globe } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "FAMCO Approved" },
  { icon: ClipboardCheck, label: "52-Point Inspected" },
  { icon: Award, label: "45+ Years Trusted" },
  { icon: Globe, label: "4 Countries" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-black/[0.06] bg-white">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="flex items-center justify-between py-4 overflow-x-auto no-scrollbar gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2 shrink-0">
              <item.icon className="size-4 text-famco-blue" />
              <span className="text-[13px] font-medium text-black/50 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
