import { Globe, MapPin } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const regions = [
  { code: "AE", label: "United Arab Emirates", lanes: "Daily" },
  { code: "SA", label: "Saudi Arabia", lanes: "Daily" },
  { code: "OM", label: "Oman", lanes: "3× weekly" },
  { code: "QA", label: "Qatar", lanes: "3× weekly" },
  { code: "BH", label: "Bahrain", lanes: "2× weekly" },
  { code: "KW", label: "Kuwait", lanes: "2× weekly" },
  { code: "EG", label: "Egypt", lanes: "Weekly RoRo" },
  { code: "KE", label: "Kenya", lanes: "Container" },
  { code: "TZ", label: "Tanzania", lanes: "Container" },
  { code: "PK", label: "Pakistan", lanes: "Weekly RoRo" },
  { code: "IN", label: "India", lanes: "Container" },
  { code: "BD", label: "Bangladesh", lanes: "Container" },
];

export function ShippingCoverage() {
  return (
    <section className="bg-[#F5F5F5] py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,520px)] gap-12 items-start">
          <AnimateIn>
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-famco-blue mb-3 inline-flex items-center gap-2">
              <Globe className="size-3.5" />
              Coverage
            </div>
            <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold text-black tracking-tighter leading-[1.05]">
              12 countries, one logistics partner.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] text-black/55 leading-relaxed">
              FAMCO operates direct lanes across the Gulf and scheduled RoRo and container
              services to East Africa and South Asia. Tell us where the machine needs to go —
              we&apos;ll quote the cheapest viable route.
            </p>

            {/* Stylized coverage map (decorative SVG) */}
            <div className="mt-8 rounded-2xl bg-white border border-black/[0.06] p-6">
              <svg
                viewBox="0 0 400 200"
                className="w-full h-auto"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="hub" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0072BC" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#0072BC" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Lanes */}
                <g stroke="#0072BC" strokeWidth="0.7" strokeDasharray="2,3" opacity="0.55" fill="none">
                  <path d="M200 100 L 320 60" />
                  <path d="M200 100 L 340 110" />
                  <path d="M200 100 L 310 150" />
                  <path d="M200 100 L 230 40" />
                  <path d="M200 100 L 110 65" />
                  <path d="M200 100 L 85 130" />
                  <path d="M200 100 L 60 100" />
                </g>
                {/* Hub */}
                <circle cx="200" cy="100" r="36" fill="url(#hub)" />
                <circle cx="200" cy="100" r="6" fill="#0072BC" />
                <text x="208" y="98" fontSize="10" fontWeight="600" fill="#0A0A0A">
                  Jebel Ali Hub
                </text>
                {/* Spoke nodes */}
                {[
                  [320, 60, "Karachi"],
                  [340, 110, "Mumbai"],
                  [310, 150, "Dhaka"],
                  [230, 40, "Riyadh"],
                  [110, 65, "Cairo"],
                  [85, 130, "Mombasa"],
                  [60, 100, "Dar es Salaam"],
                ].map(([x, y, label]) => (
                  <g key={label as string}>
                    <circle cx={x as number} cy={y as number} r="3" fill="#0A0A0A" />
                    <text
                      x={(x as number) + 6}
                      y={(y as number) + 3}
                      fontSize="8"
                      fill="#0A0A0A"
                      opacity="0.6"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </AnimateIn>

          <AnimateIn delay={120}>
            <div className="rounded-2xl bg-white border border-black/[0.06] divide-y divide-black/[0.06]">
              {regions.map((r) => (
                <div
                  key={r.code}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-black/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="size-7 rounded-lg bg-famco-blue/10 text-famco-blue text-[11px] font-semibold flex items-center justify-center">
                      {r.code}
                    </span>
                    <span className="text-[14px] font-medium text-black">{r.label}</span>
                  </div>
                  <span className="text-[12px] text-black/45 inline-flex items-center gap-1">
                    <MapPin className="size-3" />
                    {r.lanes}
                  </span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
