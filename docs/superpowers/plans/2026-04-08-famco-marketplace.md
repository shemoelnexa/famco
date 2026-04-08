# FAMCO Used Equipment Marketplace — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page marketing/marketplace website for Al-Futtaim FAMCO Used Equipment — Homepage, Listings, and Product Detail — using Next.js, Tailwind, and shadcn/ui with hardcoded mock data.

**Architecture:** Next.js App Router with file-based routing. Three routes: `/` (homepage), `/equipment` (listings with client-side filtering), `/equipment/[id]` (product detail). Shared layout with header/footer. All data from a single mock data file. Client components for interactivity (filters, gallery, search), server components where possible.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, Inter font via next/font

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout: Inter font, header, footer
│   ├── page.tsx                   # Homepage: assembles all home sections
│   ├── globals.css                # Tailwind directives + custom CSS vars
│   └── equipment/
│       ├── page.tsx               # Listings page: search, filters, grid
│       └── [id]/
│           └── page.tsx           # Product detail: gallery, info, tabs
├── components/
│   ├── ui/                        # shadcn/ui base components
│   ├── layout/
│   │   ├── header.tsx             # Sticky header with scroll behavior
│   │   └── footer.tsx             # Dark navy footer
│   ├── home/
│   │   ├── hero.tsx               # Hero with search bar
│   │   ├── category-browser.tsx   # 5 category cards
│   │   ├── featured-listings.tsx  # 6-card product grid
│   │   ├── approved-process.tsx   # 4-step timeline
│   │   ├── why-choose.tsx         # 4-column trust signals
│   │   ├── buyers-sellers.tsx     # Split value prop section
│   │   ├── stats-bar.tsx          # Full-width stat counters
│   │   └── cta-banner.tsx         # Gradient CTA
│   ├── equipment/
│   │   ├── product-card.tsx       # Reusable product card
│   │   ├── filter-sidebar.tsx     # Left sidebar with all filters
│   │   ├── search-bar.tsx         # Keyword + category search
│   │   ├── sort-dropdown.tsx      # Sort options
│   │   └── pagination.tsx         # Page navigation
│   └── product/
│       ├── image-gallery.tsx      # Main image + thumbnails
│       ├── info-panel.tsx         # Price, specs, CTAs
│       ├── content-tabs.tsx       # Overview/Specs/Inspection tabs
│       └── related-equipment.tsx  # Similar products scroll
├── data/
│   └── products.ts                # Mock data: 18 products
└── lib/
    ├── types.ts                   # Product, Category types
    └── utils.ts                   # formatPrice, cn helper
```

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/lib/utils.ts`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd "D:/Code Files/famco"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

When prompted, accept defaults. This creates the full Next.js + Tailwind + TypeScript scaffold.

- [ ] **Step 2: Install shadcn/ui**

```bash
npx shadcn@latest init -d
```

This sets up shadcn/ui with default config, creates `src/components/ui/` and `src/lib/utils.ts`.

- [ ] **Step 3: Install required shadcn components**

```bash
npx shadcn@latest add button card badge select checkbox input tabs separator sheet dropdown-menu
```

- [ ] **Step 4: Configure Inter font and brand colors**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FAMCO Used Equipment | Verified Used Industrial Machinery Marketplace",
  description:
    "The region's trusted marketplace for verified used construction equipment, trucks, buses, and industrial machinery. FAMCO Approved — inspected, certified, ready to work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

Update `src/app/globals.css` — add brand CSS custom properties after the existing Tailwind imports:

```css
@layer base {
  :root {
    --famco-blue: #0072BC;
    --famco-navy: #0A1628;
    --famco-teal: #00B4D8;
    --famco-bg: #F5F7FA;
    --famco-text: #1A1A2E;
    --famco-muted: #6B7280;
    --famco-green: #10B981;
  }
}
```

Add brand colors to `tailwind.config.ts` under `theme.extend.colors`:

```ts
famco: {
  blue: "#0072BC",
  navy: "#0A1628",
  teal: "#00B4D8",
  bg: "#F5F7FA",
  text: "#1A1A2E",
  muted: "#6B7280",
  green: "#10B981",
},
```

- [ ] **Step 5: Verify dev server runs**

```bash
npm run dev
```

Open `http://localhost:3000` — should see Next.js default page with no errors.

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind and shadcn/ui"
```

---

## Task 2: Types & Mock Data

**Files:**
- Create: `src/lib/types.ts`, `src/data/products.ts`
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Create TypeScript types**

Create `src/lib/types.ts`:

```ts
export type Category =
  | "Construction Equipment"
  | "Material Handling"
  | "Commercial Vehicles & Trucks"
  | "Buses"
  | "Industrial Machinery";

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: Category;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  hours: number;
  location: string;
  condition: "Excellent" | "Good" | "Fair";
  images: string[];
  description: string;
  specifications: Record<string, string>;
  inspectionDate: string;
  certified: boolean;
  featured: boolean;
}

export interface FilterState {
  categories: Category[];
  priceMin: number | null;
  priceMax: number | null;
  yearMin: number | null;
  yearMax: number | null;
  makes: string[];
  conditions: string[];
  locations: string[];
  search: string;
  sort: "newest" | "price-asc" | "price-desc" | "year-desc";
}

export const CATEGORIES: Category[] = [
  "Construction Equipment",
  "Material Handling",
  "Commercial Vehicles & Trucks",
  "Buses",
  "Industrial Machinery",
];

export const CATEGORY_SLUGS: Record<Category, string> = {
  "Construction Equipment": "construction-equipment",
  "Material Handling": "material-handling",
  "Commercial Vehicles & Trucks": "commercial-vehicles-trucks",
  "Buses": "buses",
  "Industrial Machinery": "industrial-machinery",
};

export const MAKES = ["Volvo", "CAT", "Komatsu", "Doosan", "Linde", "Yanmar", "SDLG"];
export const LOCATIONS = ["UAE", "KSA", "Qatar", "Bahrain"];
export const CONDITIONS: Product["condition"][] = ["Excellent", "Good", "Fair"];
```

- [ ] **Step 2: Add formatPrice utility**

Add to `src/lib/utils.ts` (keep existing `cn` function from shadcn):

```ts
export function formatPrice(price: number, currency: string = "AED"): string {
  return `${currency} ${price.toLocaleString("en-US")}`;
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
```

- [ ] **Step 3: Create mock product data**

Create `src/data/products.ts` with 18 products. Use `https://images.unsplash.com` placeholder URLs for equipment images. Full file:

```ts
import { Product } from "@/lib/types";

export const products: Product[] = [
  // Construction Equipment (5)
  {
    id: "1",
    title: "Volvo EC220E Excavator",
    slug: "volvo-ec220e-excavator",
    category: "Construction Equipment",
    make: "Volvo",
    model: "EC220E",
    year: 2021,
    price: 485000,
    currency: "AED",
    hours: 3200,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1621922688758-8d99328e70bd?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    ],
    description: "Well-maintained Volvo EC220E hydraulic excavator with low hours. Full FAMCO inspection completed. Ideal for medium to large construction projects. Features advanced hydraulic system, comfortable operator cab, and excellent fuel efficiency.",
    specifications: {
      "Operating Weight": "22,200 kg",
      "Engine": "Volvo D6J Tier 4 Final",
      "Max Dig Depth": "6,700 mm",
      "Bucket Capacity": "1.2 m³",
      "Hydraulic System": "Volvo Positive Control",
      "Travel Speed": "5.5 km/h",
    },
    inspectionDate: "2025-12-15",
    certified: true,
    featured: true,
  },
  {
    id: "2",
    title: "CAT 320 Next Gen Excavator",
    slug: "cat-320-next-gen-excavator",
    category: "Construction Equipment",
    make: "CAT",
    model: "320 Next Gen",
    year: 2022,
    price: 620000,
    currency: "AED",
    hours: 1800,
    location: "Riyadh, KSA",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1621922688758-8d99328e70bd?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=500&fit=crop",
    ],
    description: "Low-hour CAT 320 Next Gen with advanced technology features. Equipped with grade control ready technology, enhanced visibility, and reduced fuel consumption. Perfect for earthmoving and construction applications.",
    specifications: {
      "Operating Weight": "22,500 kg",
      "Engine": "Cat C4.4 ACERT",
      "Max Dig Depth": "6,720 mm",
      "Bucket Capacity": "1.19 m³",
      "Hydraulic System": "Electrohydraulic",
      "Travel Speed": "5.5 km/h",
    },
    inspectionDate: "2026-01-10",
    certified: true,
    featured: true,
  },
  {
    id: "3",
    title: "Komatsu PC200-8 Excavator",
    slug: "komatsu-pc200-8-excavator",
    category: "Construction Equipment",
    make: "Komatsu",
    model: "PC200-8",
    year: 2020,
    price: 380000,
    currency: "AED",
    hours: 4500,
    location: "Doha, Qatar",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=500&fit=crop",
    ],
    description: "Reliable Komatsu PC200-8 with proven performance in demanding conditions. Features KOMTRAX monitoring system, spacious cab, and efficient Komatsu SAA6D107E engine. Recently serviced and FAMCO Approved.",
    specifications: {
      "Operating Weight": "20,300 kg",
      "Engine": "Komatsu SAA6D107E-3",
      "Max Dig Depth": "6,495 mm",
      "Bucket Capacity": "0.91 m³",
      "Hydraulic System": "CLSS",
      "Travel Speed": "5.5 km/h",
    },
    inspectionDate: "2025-11-20",
    certified: true,
    featured: false,
  },
  {
    id: "4",
    title: "SDLG L956F Wheel Loader",
    slug: "sdlg-l956f-wheel-loader",
    category: "Construction Equipment",
    make: "SDLG",
    model: "L956F",
    year: 2021,
    price: 195000,
    currency: "AED",
    hours: 3800,
    location: "Dubai, UAE",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    ],
    description: "Cost-effective SDLG L956F wheel loader suitable for loading, material handling, and light construction work. FAMCO inspected and approved with all maintenance records available.",
    specifications: {
      "Operating Weight": "17,000 kg",
      "Engine": "Deutz TCD2013 L06 2V",
      "Bucket Capacity": "3.0 m³",
      "Rated Load": "5,000 kg",
      "Travel Speed": "38 km/h",
      "Breakout Force": "170 kN",
    },
    inspectionDate: "2026-02-01",
    certified: true,
    featured: false,
  },
  {
    id: "5",
    title: "Doosan DX225LC-5 Excavator",
    slug: "doosan-dx225lc-5-excavator",
    category: "Construction Equipment",
    make: "Doosan",
    model: "DX225LC-5",
    year: 2019,
    price: 310000,
    currency: "AED",
    hours: 5200,
    location: "Manama, Bahrain",
    condition: "Fair",
    images: [
      "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1621922688758-8d99328e70bd?w=800&h=500&fit=crop",
    ],
    description: "Doosan DX225LC-5 excavator in fair condition. Suitable for construction and mining applications. Full refurbishment completed by FAMCO service team including engine service, hydraulic checks, and bodywork.",
    specifications: {
      "Operating Weight": "22,900 kg",
      "Engine": "Doosan DL06P",
      "Max Dig Depth": "6,585 mm",
      "Bucket Capacity": "1.07 m³",
      "Hydraulic System": "EPOS",
      "Travel Speed": "5.5 km/h",
    },
    inspectionDate: "2025-10-05",
    certified: true,
    featured: false,
  },

  // Material Handling (3)
  {
    id: "6",
    title: "Linde H50D Forklift",
    slug: "linde-h50d-forklift",
    category: "Material Handling",
    make: "Linde",
    model: "H50D",
    year: 2022,
    price: 125000,
    currency: "AED",
    hours: 1500,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop",
    ],
    description: "Premium Linde H50D diesel forklift with hydrostatic drive. Low hours, excellent condition. Ideal for warehouse and logistics operations. Features ergonomic operator station and excellent visibility.",
    specifications: {
      "Lift Capacity": "5,000 kg",
      "Lift Height": "6,000 mm",
      "Engine": "Linde Diesel",
      "Drive Type": "Hydrostatic",
      "Fork Length": "1,200 mm",
      "Turning Radius": "2,850 mm",
    },
    inspectionDate: "2026-01-20",
    certified: true,
    featured: true,
  },
  {
    id: "7",
    title: "CAT DP25N Forklift",
    slug: "cat-dp25n-forklift",
    category: "Material Handling",
    make: "CAT",
    model: "DP25N",
    year: 2020,
    price: 75000,
    currency: "AED",
    hours: 3200,
    location: "Jeddah, KSA",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    ],
    description: "Dependable CAT DP25N diesel forklift for general warehouse operations. Well-maintained with full service history. FAMCO Approved with all safety features operational.",
    specifications: {
      "Lift Capacity": "2,500 kg",
      "Lift Height": "4,700 mm",
      "Engine": "Cat C2.4",
      "Drive Type": "Torque Converter",
      "Fork Length": "1,070 mm",
      "Turning Radius": "2,250 mm",
    },
    inspectionDate: "2025-12-01",
    certified: true,
    featured: false,
  },
  {
    id: "8",
    title: "Linde E30 Electric Forklift",
    slug: "linde-e30-electric-forklift",
    category: "Material Handling",
    make: "Linde",
    model: "E30",
    year: 2023,
    price: 145000,
    currency: "AED",
    hours: 800,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=500&fit=crop",
    ],
    description: "Near-new Linde E30 electric forklift with minimal hours. Zero emissions, low noise operation. Perfect for indoor warehouse environments. Includes battery and charger.",
    specifications: {
      "Lift Capacity": "3,000 kg",
      "Lift Height": "5,500 mm",
      "Power": "80V Electric",
      "Drive Type": "AC Motor",
      "Fork Length": "1,150 mm",
      "Battery": "80V / 620Ah",
    },
    inspectionDate: "2026-03-01",
    certified: true,
    featured: true,
  },

  // Commercial Vehicles & Trucks (5)
  {
    id: "9",
    title: "Volvo FH 460 Truck Tractor",
    slug: "volvo-fh-460-truck-tractor",
    category: "Commercial Vehicles & Trucks",
    make: "Volvo",
    model: "FH 460",
    year: 2022,
    price: 320000,
    currency: "AED",
    hours: 0,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586191582056-e41ece1e3c28?w=800&h=500&fit=crop",
    ],
    description: "Flagship Volvo FH 460 truck tractor in excellent condition. Ideal for long-haul transport. Features I-Shift automated transmission, Volvo Dynamic Steering, and premium driver comfort package. FAMCO refurbished and certified.",
    specifications: {
      "Engine": "Volvo D13K 460hp",
      "Transmission": "I-Shift 12-speed",
      "GVW": "52,000 kg",
      "Cab Type": "Globetrotter XL",
      "Mileage": "185,000 km",
      "Axle Config": "4x2",
    },
    inspectionDate: "2026-02-15",
    certified: true,
    featured: true,
  },
  {
    id: "10",
    title: "Volvo FM 380 Rigid Truck",
    slug: "volvo-fm-380-rigid-truck",
    category: "Commercial Vehicles & Trucks",
    make: "Volvo",
    model: "FM 380",
    year: 2021,
    price: 245000,
    currency: "AED",
    hours: 0,
    location: "Riyadh, KSA",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1586191582056-e41ece1e3c28?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
    ],
    description: "Versatile Volvo FM 380 rigid truck suitable for distribution and construction logistics. RTA-ready for UAE operations. Complete FAMCO service and inspection performed.",
    specifications: {
      "Engine": "Volvo D11K 380hp",
      "Transmission": "I-Shift 12-speed",
      "GVW": "26,000 kg",
      "Cab Type": "Day Cab",
      "Mileage": "220,000 km",
      "Axle Config": "6x4",
    },
    inspectionDate: "2025-11-10",
    certified: true,
    featured: false,
  },
  {
    id: "11",
    title: "Volvo FMX 440 Tipper Truck",
    slug: "volvo-fmx-440-tipper-truck",
    category: "Commercial Vehicles & Trucks",
    make: "Volvo",
    model: "FMX 440",
    year: 2020,
    price: 285000,
    currency: "AED",
    hours: 0,
    location: "Doha, Qatar",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586191582056-e41ece1e3c28?w=800&h=500&fit=crop",
    ],
    description: "Heavy-duty Volvo FMX 440 tipper truck built for harsh construction environments. Features reinforced chassis, heavy-duty suspension, and robust tipping mechanism. FAMCO approved for immediate deployment.",
    specifications: {
      "Engine": "Volvo D13K 440hp",
      "Transmission": "I-Shift 12-speed AT",
      "GVW": "33,000 kg",
      "Cab Type": "Short Cab",
      "Mileage": "165,000 km",
      "Axle Config": "8x4",
    },
    inspectionDate: "2025-12-20",
    certified: true,
    featured: false,
  },
  {
    id: "12",
    title: "Volvo FE 280 Distribution Truck",
    slug: "volvo-fe-280-distribution-truck",
    category: "Commercial Vehicles & Trucks",
    make: "Volvo",
    model: "FE 280",
    year: 2023,
    price: 195000,
    currency: "AED",
    hours: 0,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1586191582056-e41ece1e3c28?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
    ],
    description: "Urban-friendly Volvo FE 280 distribution truck with excellent maneuverability. Low mileage, recently certified by FAMCO. Perfect for last-mile delivery and urban distribution.",
    specifications: {
      "Engine": "Volvo D8K 280hp",
      "Transmission": "I-Sync 12-speed",
      "GVW": "16,000 kg",
      "Cab Type": "Low Entry Cab",
      "Mileage": "45,000 km",
      "Axle Config": "4x2",
    },
    inspectionDate: "2026-03-10",
    certified: true,
    featured: false,
  },
  {
    id: "13",
    title: "Volvo FH 540 Heavy Hauler",
    slug: "volvo-fh-540-heavy-hauler",
    category: "Commercial Vehicles & Trucks",
    make: "Volvo",
    model: "FH 540",
    year: 2022,
    price: 410000,
    currency: "AED",
    hours: 0,
    location: "Dammam, KSA",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1586191582056-e41ece1e3c28?w=800&h=500&fit=crop",
    ],
    description: "Top-of-the-line Volvo FH 540 for heavy haulage operations. Maximum power and torque for the most demanding transport tasks. Full FAMCO premium inspection and refurbishment package.",
    specifications: {
      "Engine": "Volvo D13K 540hp",
      "Transmission": "I-Shift Dual Clutch",
      "GVW": "70,000 kg",
      "Cab Type": "Globetrotter XL",
      "Mileage": "120,000 km",
      "Axle Config": "6x4",
    },
    inspectionDate: "2026-01-25",
    certified: true,
    featured: true,
  },

  // Buses (2)
  {
    id: "14",
    title: "Volvo B8R Intercity Coach",
    slug: "volvo-b8r-intercity-coach",
    category: "Buses",
    make: "Volvo",
    model: "B8R",
    year: 2021,
    price: 520000,
    currency: "AED",
    hours: 0,
    location: "Abu Dhabi, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
    ],
    description: "Premium Volvo B8R intercity coach with 49-seat configuration. Features climate control, entertainment system, and premium seating. Ideal for tourist operators and intercity transport companies.",
    specifications: {
      "Engine": "Volvo D8K 350hp",
      "Seating": "49 passengers",
      "Length": "12.2 m",
      "Transmission": "Volvo I-Shift",
      "Mileage": "95,000 km",
      "Features": "A/C, Entertainment, Reclining Seats",
    },
    inspectionDate: "2026-02-05",
    certified: true,
    featured: false,
  },
  {
    id: "15",
    title: "Volvo B7R City Bus",
    slug: "volvo-b7r-city-bus",
    category: "Buses",
    make: "Volvo",
    model: "B7R",
    year: 2019,
    price: 280000,
    currency: "AED",
    hours: 0,
    location: "Dubai, UAE",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=500&fit=crop",
    ],
    description: "Reliable Volvo B7R city bus configured for urban transit. Wheelchair accessible, low-floor entry. Fully refurbished by FAMCO with new interior fittings and exterior paint.",
    specifications: {
      "Engine": "Volvo D7E 290hp",
      "Seating": "40 passengers",
      "Length": "12.0 m",
      "Transmission": "ZF Automatic",
      "Mileage": "210,000 km",
      "Features": "A/C, Low Floor, Wheelchair Ramp",
    },
    inspectionDate: "2025-10-15",
    certified: true,
    featured: false,
  },

  // Industrial Machinery (3)
  {
    id: "16",
    title: "Yanmar ViO55-6B Mini Excavator",
    slug: "yanmar-vio55-6b-mini-excavator",
    category: "Industrial Machinery",
    make: "Yanmar",
    model: "ViO55-6B",
    year: 2022,
    price: 155000,
    currency: "AED",
    hours: 1200,
    location: "Dubai, UAE",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=800&h=500&fit=crop",
    ],
    description: "Compact Yanmar ViO55-6B mini excavator with zero tail swing. Perfect for confined spaces and urban construction. Very low hours, practically new condition.",
    specifications: {
      "Operating Weight": "5,570 kg",
      "Engine": "Yanmar 4TNV88C",
      "Max Dig Depth": "3,690 mm",
      "Bucket Capacity": "0.16 m³",
      "Tail Swing": "Zero",
      "Travel Speed": "4.6 km/h",
    },
    inspectionDate: "2026-03-05",
    certified: true,
    featured: false,
  },
  {
    id: "17",
    title: "Doosan DA30-5 Articulated Dump Truck",
    slug: "doosan-da30-5-articulated-dump-truck",
    category: "Industrial Machinery",
    make: "Doosan",
    model: "DA30-5",
    year: 2020,
    price: 650000,
    currency: "AED",
    hours: 4800,
    location: "Riyadh, KSA",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
    ],
    description: "High-capacity Doosan DA30-5 articulated dump truck for mining and large construction projects. Features all-wheel drive, excellent ground clearance, and advanced stability control.",
    specifications: {
      "Payload": "28,000 kg",
      "Engine": "Scania DC9 340hp",
      "Heaped Capacity": "17.5 m³",
      "Transmission": "ZF 8-speed",
      "Travel Speed": "55 km/h",
      "Turning Radius": "8.0 m",
    },
    inspectionDate: "2025-11-30",
    certified: true,
    featured: false,
  },
  {
    id: "18",
    title: "Komatsu D65EX-18 Bulldozer",
    slug: "komatsu-d65ex-18-bulldozer",
    category: "Industrial Machinery",
    make: "Komatsu",
    model: "D65EX-18",
    year: 2021,
    price: 850000,
    currency: "AED",
    hours: 2900,
    location: "Doha, Qatar",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=500&fit=crop",
    ],
    description: "Premium Komatsu D65EX-18 bulldozer with SIGMADOZER blade. Exceptional pushing performance and fuel efficiency. Features KOMTRAX telematics, auto-idle shutdown, and lock-up torque converter.",
    specifications: {
      "Operating Weight": "21,510 kg",
      "Engine": "Komatsu SAA6D114E-6 205hp",
      "Blade Type": "SIGMADOZER",
      "Blade Capacity": "6.4 m³",
      "Track Width": "560 mm",
      "Travel Speed": "11.0 km/h",
    },
    inspectionDate: "2026-01-05",
    certified: true,
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/types.ts src/data/products.ts src/lib/utils.ts
git commit -m "feat: add product types, mock data, and utility helpers"
```

---

## Task 3: Header & Footer Layout

**Files:**
- Create: `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create Header component**

Create `src/components/layout/header.tsx` — a client component with scroll-aware behavior (transparent on top → solid white on scroll). Contains logo, nav links, and "Browse Equipment" CTA button. Mobile hamburger menu using shadcn Sheet.

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-famco-blue">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-bold leading-tight transition-colors ${
                    scrolled ? "text-famco-navy" : "text-white"
                  }`}
                >
                  Al-Futtaim
                </span>
                <span
                  className={`text-xs leading-tight transition-colors ${
                    scrolled ? "text-famco-blue" : "text-blue-200"
                  }`}
                >
                  FAMCO Used
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-famco-teal ${
                  scrolled ? "text-famco-text" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/equipment">
              <Button className="bg-famco-blue hover:bg-famco-blue/90 text-white rounded-lg px-6">
                Browse Equipment
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? "text-famco-navy" : "text-white"}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <nav className="mt-8 flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-famco-text hover:text-famco-blue"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/equipment" onClick={() => setMobileOpen(false)}>
                    <Button className="mt-4 w-full bg-famco-blue text-white">
                      Browse Equipment
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/layout/footer.tsx`:

```tsx
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Equipment", href: "/equipment" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-famco-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-famco-blue">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight">Al-Futtaim</span>
                <span className="text-xs leading-tight text-blue-300">FAMCO Used</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              The region&apos;s trusted marketplace for verified used industrial
              equipment. Powered by Al-Futtaim.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-famco-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4 text-famco-teal" />
                800 FAMCO (32626)
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-famco-teal" />
                famco@alfuttaim.ae
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-famco-teal" />
                Dubai Investment Park, Dubai, UAE
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-famco-teal hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Al-Futtaim FAMCO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update root layout to include Header and Footer**

Modify `src/app/layout.tsx` — add Header and Footer imports and wrap `{children}` between them:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FAMCO Used Equipment | Verified Used Industrial Machinery Marketplace",
  description:
    "The region's trusted marketplace for verified used construction equipment, trucks, buses, and industrial machinery. FAMCO Approved — inspected, certified, ready to work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Add lucide-react dependency**

```bash
npm install lucide-react
```

(May already be installed by shadcn — check first, skip if present.)

- [ ] **Step 5: Verify header and footer render**

```bash
npm run dev
```

Check `http://localhost:3000` — header should show with transparent background (on default page), footer at bottom. Mobile hamburger at narrow widths.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add responsive header with scroll behavior and footer"
```

---

## Task 4: Homepage — Hero + Category Browser + Featured Listings

**Files:**
- Create: `src/components/home/hero.tsx`, `src/components/home/category-browser.tsx`, `src/components/home/featured-listings.tsx`, `src/components/equipment/product-card.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero section**

Create `src/components/home/hero.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/types";
import type { Category } from "@/lib/types";

export function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    router.push(`/equipment?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-famco-navy lg:min-h-[700px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-famco-navy via-famco-navy/95 to-famco-blue/30" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-15" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-famco-blue/20 px-4 py-2 text-sm text-blue-300">
          <span className="inline-block h-2 w-2 rounded-full bg-famco-teal" />
          FAMCO Approved Marketplace
        </div>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          The Region&apos;s Trusted Marketplace for{" "}
          <span className="text-famco-teal">Verified Used Equipment</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Browse FAMCO Approved machines — inspected, certified, and ready to
          work. Backed by Al-Futtaim&apos;s 45+ years of expertise.
        </p>

        {/* Search Bar */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-sm sm:flex-row">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 border-0 bg-white text-famco-text sm:w-[220px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={CATEGORY_SLUGS[cat]}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Input
              placeholder="Search equipment, brand, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-12 border-0 bg-white pl-4 pr-4 text-famco-text"
            />
          </div>

          <Button
            onClick={handleSearch}
            className="h-12 bg-famco-blue px-8 text-white hover:bg-famco-blue/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Quick stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
          <span>500+ Equipment Listed</span>
          <span className="hidden sm:inline">•</span>
          <span>100% Verified</span>
          <span className="hidden sm:inline">•</span>
          <span>4 Countries</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Category Browser**

Create `src/components/home/category-browser.tsx`:

```tsx
import Link from "next/link";
import { getCategoryCounts } from "@/data/products";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/types";
import {
  HardHat,
  Forklift,
  Truck,
  Bus,
  Factory,
} from "lucide-react";
import type { Category } from "@/lib/types";

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  "Construction Equipment": HardHat,
  "Material Handling": Forklift,
  "Commercial Vehicles & Trucks": Truck,
  "Buses": Bus,
  "Industrial Machinery": Factory,
};

const CATEGORY_IMAGES: Record<Category, string> = {
  "Construction Equipment":
    "https://images.unsplash.com/photo-1580901368919-7738efb0f228?w=400&h=250&fit=crop",
  "Material Handling":
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop",
  "Commercial Vehicles & Trucks":
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop",
  "Buses":
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=250&fit=crop",
  "Industrial Machinery":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
};

export function CategoryBrowser() {
  const counts = getCategoryCounts();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-famco-text sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-3 text-lg text-famco-muted">
            Find the right equipment for your business needs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            return (
              <Link
                key={cat}
                href={`/equipment?category=${CATEGORY_SLUGS[cat]}`}
                className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-famco-blue/30 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[cat]}
                    alt={cat}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-famco-navy/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-famco-text">{cat}</h3>
                  <p className="mt-1 text-sm text-famco-muted">
                    {counts[cat] || 0} listings
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create reusable ProductCard**

Create `src/components/equipment/product-card.tsx`:

```tsx
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/equipment/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.certified && (
          <Badge className="absolute left-3 top-3 gap-1 bg-famco-blue text-white">
            <ShieldCheck className="h-3 w-3" />
            FAMCO Approved
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute right-3 top-3 bg-white/90 text-famco-text"
        >
          {product.condition}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-famco-text group-hover:text-famco-blue transition-colors">
          {product.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-famco-muted">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {product.year}
          </span>
          {product.hours > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {product.hours.toLocaleString()} hrs
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {product.location}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-famco-blue">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-sm font-medium text-famco-teal opacity-0 transition-opacity group-hover:opacity-100">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create Featured Listings section**

Create `src/components/home/featured-listings.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/equipment/product-card";
import { getFeaturedProducts } from "@/data/products";
import { ArrowRight } from "lucide-react";

export function FeaturedListings() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-famco-bg py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-famco-text sm:text-4xl">
              Featured Equipment
            </h2>
            <p className="mt-3 text-lg text-famco-muted">
              Hand-picked verified machines ready for immediate deployment
            </p>
          </div>
          <Link href="/equipment" className="hidden sm:block">
            <Button variant="outline" className="gap-2 border-famco-blue text-famco-blue hover:bg-famco-blue hover:text-white">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/equipment">
            <Button variant="outline" className="gap-2 border-famco-blue text-famco-blue">
              View All Equipment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Update homepage to use these sections**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/hero";
import { CategoryBrowser } from "@/components/home/category-browser";
import { FeaturedListings } from "@/components/home/featured-listings";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBrowser />
      <FeaturedListings />
    </>
  );
}
```

- [ ] **Step 6: Verify homepage renders**

```bash
npm run dev
```

Check `http://localhost:3000` — Hero with search, categories grid, featured products with cards. Test mobile responsiveness.

- [ ] **Step 7: Commit**

```bash
git add src/components/home/hero.tsx src/components/home/category-browser.tsx src/components/home/featured-listings.tsx src/components/equipment/product-card.tsx src/app/page.tsx
git commit -m "feat: add homepage hero, category browser, and featured listings"
```

---

## Task 5: Homepage — Remaining Sections

**Files:**
- Create: `src/components/home/approved-process.tsx`, `src/components/home/why-choose.tsx`, `src/components/home/buyers-sellers.tsx`, `src/components/home/stats-bar.tsx`, `src/components/home/cta-banner.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create FAMCO Approved Process section**

Create `src/components/home/approved-process.tsx`:

```tsx
import { ClipboardCheck, SearchCheck, Wrench, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Submit",
    description: "Seller submits their equipment to FAMCO for evaluation and approval.",
  },
  {
    icon: SearchCheck,
    title: "Inspect",
    description: "Full technical inspection by certified FAMCO engineers and experts.",
  },
  {
    icon: Wrench,
    title: "Refurbish",
    description: "Professional service, maintenance, and cosmetic improvements as needed.",
  },
  {
    icon: ShieldCheck,
    title: "Certified",
    description: "FAMCO Approved certification issued. Equipment listed on the marketplace.",
  },
];

export function ApprovedProcess() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-famco-blue/10 px-4 py-2 text-sm font-medium text-famco-blue">
            <ShieldCheck className="h-4 w-4" />
            The FAMCO Approved Standard
          </div>
          <h2 className="text-3xl font-bold text-famco-text sm:text-4xl">
            Every Machine. Verified. Certified.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-famco-muted">
            Our rigorous 4-step approval process ensures every piece of
            equipment meets the highest standards of quality and reliability.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-famco-blue/20 via-famco-blue to-famco-teal lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-famco-blue to-famco-teal text-white shadow-lg">
                  <step.icon className="h-10 w-10" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-famco-navy text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-famco-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-famco-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Why Choose FAMCO section**

Create `src/components/home/why-choose.tsx`:

```tsx
import { ShieldCheck, FileText, Building2, Globe } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Verified Equipment",
    description: "Every machine undergoes thorough technical inspection and certification before listing.",
  },
  {
    icon: FileText,
    title: "Transparent Reports",
    description: "Full inspection reports, condition grading, and service history available for every listing.",
  },
  {
    icon: Building2,
    title: "Al-Futtaim Backed",
    description: "45+ years of trust, technical expertise, and operational excellence across the region.",
  },
  {
    icon: Globe,
    title: "Regional Coverage",
    description: "Serving buyers and sellers across UAE, Saudi Arabia, Qatar, and Bahrain.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-famco-bg py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-famco-text sm:text-4xl">
            Why Choose FAMCO
          </h2>
          <p className="mt-3 text-lg text-famco-muted">
            The trusted name in used industrial equipment
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-famco-blue/10 text-famco-blue">
                <reason.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-famco-text">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-famco-muted">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Buyers/Sellers section**

Create `src/components/home/buyers-sellers.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  ThumbsUp,
  Banknote,
  TrendingUp,
  Wrench,
  Users,
  ArrowRight,
} from "lucide-react";

const BUYER_PROPS = [
  { icon: ShieldCheck, text: "Verified & certified machines" },
  { icon: FileText, text: "Transparent inspection reports" },
  { icon: ThumbsUp, text: "Confidence in equipment quality" },
  { icon: Banknote, text: "Flexible financing options" },
];

const SELLER_PROPS = [
  { icon: TrendingUp, text: "Higher resale value" },
  { icon: Wrench, text: "Professional refurbishment" },
  { icon: Users, text: "Access to regional buyer base" },
  { icon: ShieldCheck, text: "FAMCO Approved certification" },
];

export function BuyersSellers() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Buyers */}
          <div className="rounded-2xl bg-gradient-to-br from-famco-blue/5 to-famco-teal/5 p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-famco-text">For Buyers</h3>
            <p className="mt-2 text-famco-muted">
              Find your next machine with confidence
            </p>
            <ul className="mt-6 space-y-4">
              {BUYER_PROPS.map((prop) => (
                <li key={prop.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-famco-blue/10">
                    <prop.icon className="h-4 w-4 text-famco-blue" />
                  </div>
                  <span className="text-sm font-medium text-famco-text">
                    {prop.text}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/equipment" className="mt-8 inline-block">
              <Button className="gap-2 bg-famco-blue text-white hover:bg-famco-blue/90">
                Browse Equipment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Sellers */}
          <div className="rounded-2xl bg-gradient-to-br from-famco-navy/5 to-famco-blue/5 p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-famco-text">For Sellers</h3>
            <p className="mt-2 text-famco-muted">
              Maximize the value of your used equipment
            </p>
            <ul className="mt-6 space-y-4">
              {SELLER_PROPS.map((prop) => (
                <li key={prop.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-famco-navy/10">
                    <prop.icon className="h-4 w-4 text-famco-navy" />
                  </div>
                  <span className="text-sm font-medium text-famco-text">
                    {prop.text}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="mt-8 gap-2 border-famco-navy text-famco-navy hover:bg-famco-navy hover:text-white"
            >
              Submit Your Equipment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Stats Bar**

Create `src/components/home/stats-bar.tsx`:

```tsx
const STATS = [
  { value: "500+", label: "Equipment Sold" },
  { value: "45+", label: "Years Experience" },
  { value: "4", label: "Countries Served" },
  { value: "100%", label: "Verified Machines" },
];

export function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-famco-blue to-famco-teal py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-white sm:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-blue-100">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create CTA Banner**

Create `src/components/home/cta-banner.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="bg-famco-navy py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Find Your Next Machine?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
          Browse our full inventory of FAMCO Approved equipment — verified,
          certified, and ready for immediate deployment.
        </p>
        <Link href="/equipment" className="mt-8 inline-block">
          <Button
            size="lg"
            className="gap-2 bg-famco-teal px-8 text-white hover:bg-famco-teal/90"
          >
            Browse All Equipment
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Update homepage with all sections**

Replace `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/home/hero";
import { CategoryBrowser } from "@/components/home/category-browser";
import { FeaturedListings } from "@/components/home/featured-listings";
import { ApprovedProcess } from "@/components/home/approved-process";
import { WhyChoose } from "@/components/home/why-choose";
import { BuyersSellers } from "@/components/home/buyers-sellers";
import { StatsBar } from "@/components/home/stats-bar";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBrowser />
      <FeaturedListings />
      <ApprovedProcess />
      <WhyChoose />
      <BuyersSellers />
      <StatsBar />
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 7: Verify full homepage**

```bash
npm run dev
```

Scroll through all sections at `http://localhost:3000`. Check mobile layout. All 8 sections should render.

- [ ] **Step 8: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: complete homepage with all sections"
```

---

## Task 6: Equipment Listings Page

**Files:**
- Create: `src/app/equipment/page.tsx`, `src/components/equipment/filter-sidebar.tsx`, `src/components/equipment/search-bar.tsx`, `src/components/equipment/sort-dropdown.tsx`, `src/components/equipment/pagination.tsx`

- [ ] **Step 1: Create Search Bar component**

Create `src/components/equipment/search-bar.tsx`:

```tsx
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/types";

interface SearchBarProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: () => void;
}

export function SearchBar({
  search,
  category,
  onSearchChange,
  onCategoryChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="h-11 sm:w-[200px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={CATEGORY_SLUGS[cat]}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1">
        <Input
          placeholder="Search equipment, brand, model..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          className="h-11 pr-4"
        />
      </div>

      <Button onClick={onSubmit} className="h-11 bg-famco-blue text-white hover:bg-famco-blue/90">
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Create Filter Sidebar**

Create `src/components/equipment/filter-sidebar.tsx`:

```tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, MAKES, LOCATIONS, CONDITIONS } from "@/lib/types";
import type { FilterState, Category } from "@/lib/types";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function FilterSidebar({ filters, onFilterChange, onClear }: FilterSidebarProps) {
  const toggleArrayFilter = <K extends keyof FilterState>(
    key: K,
    value: string
  ) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [key]: updated });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.makes.length > 0 ||
    filters.conditions.length > 0 ||
    filters.locations.length > 0 ||
    filters.priceMin !== null ||
    filters.priceMax !== null ||
    filters.yearMin !== null ||
    filters.yearMax !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-famco-text">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-sm text-famco-blue hover:underline"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>

      <Separator />

      {/* Category */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.categories.includes(cat)}
                onCheckedChange={() => toggleArrayFilter("categories", cat)}
              />
              <span className="text-sm text-famco-text">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Price Range (AED)</h4>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceMin: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceMax: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9"
          />
        </div>
      </div>

      <Separator />

      {/* Year Range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Year</h4>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="From"
            value={filters.yearMin ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                yearMin: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9"
          />
          <Input
            type="number"
            placeholder="To"
            value={filters.yearMax ?? ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                yearMax: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="h-9"
          />
        </div>
      </div>

      <Separator />

      {/* Make */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Make / Brand</h4>
        <div className="space-y-2">
          {MAKES.map((make) => (
            <label key={make} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.makes.includes(make)}
                onCheckedChange={() => toggleArrayFilter("makes", make)}
              />
              <span className="text-sm text-famco-text">{make}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Condition */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Condition</h4>
        <div className="space-y-2">
          {CONDITIONS.map((condition) => (
            <label key={condition} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.conditions.includes(condition)}
                onCheckedChange={() => toggleArrayFilter("conditions", condition)}
              />
              <span className="text-sm text-famco-text">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div>
        <h4 className="mb-3 text-sm font-semibold text-famco-text">Location</h4>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <label key={loc} className="flex cursor-pointer items-center gap-2">
              <Checkbox
                checked={filters.locations.includes(loc)}
                onCheckedChange={() => toggleArrayFilter("locations", loc)}
              />
              <span className="text-sm text-famco-text">{loc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Sort Dropdown**

Create `src/components/equipment/sort-dropdown.tsx`:

```tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterState } from "@/lib/types";

interface SortDropdownProps {
  value: FilterState["sort"];
  onChange: (value: FilterState["sort"]) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange as (value: string) => void}>
      <SelectTrigger className="h-9 w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="year-desc">Year: Newest</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

- [ ] **Step 4: Create Pagination**

Create `src/components/equipment/pagination.tsx`:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          className={`h-9 w-9 ${
            page === currentPage ? "bg-famco-blue text-white" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

- [ ] **Step 5: Create Listings page**

Create `src/app/equipment/page.tsx`:

```tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { ProductCard } from "@/components/equipment/product-card";
import { FilterSidebar } from "@/components/equipment/filter-sidebar";
import { SearchBar } from "@/components/equipment/search-bar";
import { SortDropdown } from "@/components/equipment/sort-dropdown";
import { Pagination } from "@/components/equipment/pagination";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS } from "@/lib/types";
import type { FilterState, Product } from "@/lib/types";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: null,
  priceMax: null,
  yearMin: null,
  yearMax: null,
  makes: [],
  conditions: [],
  locations: [],
  search: "",
  sort: "newest",
};

function applyFilters(items: Product[], filters: FilterState): Product[] {
  let result = [...items];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.make.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.makes.length > 0) {
    result = result.filter((p) => filters.makes.includes(p.make));
  }

  if (filters.conditions.length > 0) {
    result = result.filter((p) => filters.conditions.includes(p.condition));
  }

  if (filters.locations.length > 0) {
    result = result.filter((p) =>
      filters.locations.some((loc) => p.location.includes(loc))
    );
  }

  if (filters.priceMin !== null) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== null) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }

  if (filters.yearMin !== null) {
    result = result.filter((p) => p.year >= filters.yearMin!);
  }
  if (filters.yearMax !== null) {
    result = result.filter((p) => p.year <= filters.yearMax!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      result.sort((a, b) => b.year - a.year);
      break;
    case "newest":
    default:
      result.sort((a, b) => Number(b.id) - Number(a.id));
      break;
  }

  return result;
}

export default function EquipmentPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const initial = { ...DEFAULT_FILTERS };
    const categorySlug = searchParams.get("category");
    const searchQuery = searchParams.get("search");

    if (categorySlug && categorySlug !== "all") {
      const matchedCategory = CATEGORIES.find(
        (c) => CATEGORY_SLUGS[c] === categorySlug
      );
      if (matchedCategory) {
        initial.categories = [matchedCategory];
      }
    }
    if (searchQuery) {
      initial.search = searchQuery;
    }
    return initial;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => applyFilters(products, filters), [filters]);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-famco-bg pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-famco-muted">
          <Link href="/" className="hover:text-famco-blue">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-famco-text">Equipment</span>
        </nav>

        {/* Search Bar */}
        <SearchBar
          search={filters.search}
          category={
            filters.categories.length === 1
              ? CATEGORY_SLUGS[filters.categories[0]]
              : "all"
          }
          onSearchChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
          onCategoryChange={(value) => {
            if (value === "all") {
              setFilters((prev) => ({ ...prev, categories: [] }));
            } else {
              const matched = CATEGORIES.find(
                (c) => CATEGORY_SLUGS[c] === value
              );
              if (matched) {
                setFilters((prev) => ({ ...prev, categories: [matched] }));
              }
            }
          }}
          onSubmit={() => setCurrentPage(1)}
        />

        {/* Top bar */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-famco-muted">
            Showing{" "}
            <span className="font-medium text-famco-text">
              {filtered.length}
            </span>{" "}
            equipment
          </p>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <div className="lg:hidden">
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <div className="mt-6">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={(f) => {
                        setFilters(f);
                        setMobileFiltersOpen(false);
                      }}
                      onClear={() => {
                        clearFilters();
                        setMobileFiltersOpen(false);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <SortDropdown
              value={filters.sort}
              onChange={(sort) => setFilters((prev) => ({ ...prev, sort }))}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="mt-6 flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-28 rounded-xl bg-white p-6 shadow-sm">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center">
                <p className="text-lg font-medium text-famco-text">
                  No equipment found matching your filters
                </p>
                <p className="mt-2 text-sm text-famco-muted">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4 text-famco-blue"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify listings page**

```bash
npm run dev
```

Navigate to `http://localhost:3000/equipment`. Check: search works, filters work (checkboxes, price/year range), sort works, pagination works, mobile drawer works. Try navigating from homepage category cards and hero search.

- [ ] **Step 7: Commit**

```bash
git add src/app/equipment/ src/components/equipment/
git commit -m "feat: add equipment listings page with search, filters, and pagination"
```

---

## Task 7: Product Detail Page

**Files:**
- Create: `src/app/equipment/[id]/page.tsx`, `src/components/product/image-gallery.tsx`, `src/components/product/info-panel.tsx`, `src/components/product/content-tabs.tsx`, `src/components/product/related-equipment.tsx`

- [ ] **Step 1: Create Image Gallery**

Create `src/components/product/image-gallery.tsx`:

```tsx
"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      {/* Main Image */}
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <img
          src={images[activeIndex]}
          alt={alt}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-lg border-2 transition-all ${
                index === activeIndex
                  ? "border-famco-blue shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${alt} - ${index + 1}`}
                className="h-16 w-24 object-cover sm:h-20 sm:w-28"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create Info Panel**

Create `src/components/product/info-panel.tsx`:

```tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Phone,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Gauge,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function InfoPanel({ product }: { product: Product }) {
  const specs = [
    { icon: Calendar, label: "Year", value: product.year.toString() },
    ...(product.hours > 0
      ? [{ icon: Clock, label: "Hours", value: `${product.hours.toLocaleString()} hrs` }]
      : [{ icon: Clock, label: "Mileage", value: product.specifications["Mileage"] || "N/A" }]),
    { icon: MapPin, label: "Location", value: product.location },
    { icon: Gauge, label: "Condition", value: product.condition },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Title & Price */}
      <h1 className="text-2xl font-bold text-famco-text lg:text-3xl">
        {product.title}
      </h1>

      <div className="mt-3 flex items-center gap-3">
        {product.certified && (
          <Badge className="gap-1 bg-famco-blue text-white">
            <ShieldCheck className="h-3 w-3" />
            FAMCO Approved
          </Badge>
        )}
        <Badge variant="secondary">{product.condition}</Badge>
        <Badge variant="outline">{product.category}</Badge>
      </div>

      <div className="mt-4 text-3xl font-bold text-famco-blue">
        {formatPrice(product.price, product.currency)}
      </div>

      <Separator className="my-6" />

      {/* Key Specs */}
      <div className="grid grid-cols-2 gap-4">
        {specs.map((spec) => (
          <div key={spec.label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-famco-bg">
              <spec.icon className="h-5 w-5 text-famco-blue" />
            </div>
            <div>
              <p className="text-xs text-famco-muted">{spec.label}</p>
              <p className="text-sm font-semibold text-famco-text">
                {spec.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Make & Model */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-famco-muted">Make</span>
          <p className="font-semibold text-famco-text">{product.make}</p>
        </div>
        <div>
          <span className="text-famco-muted">Model</span>
          <p className="font-semibold text-famco-text">{product.model}</p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* CTAs */}
      <div className="space-y-3">
        <Button className="w-full bg-famco-blue text-white hover:bg-famco-blue/90" size="lg">
          Enquire Now
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2">
            <Heart className="h-4 w-4" />
            Save
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Phone className="h-4 w-4" />
            800 32626
          </Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Content Tabs**

Create `src/components/product/content-tabs.tsx`:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";

export function ContentTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="overview" className="rounded-xl bg-white p-6 shadow-sm">
      <TabsList className="mb-6 w-full justify-start bg-famco-bg">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="inspection">Inspection Report</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <p className="leading-relaxed text-famco-text">{product.description}</p>
      </TabsContent>

      <TabsContent value="specifications">
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full">
            <tbody>
              {Object.entries(product.specifications).map(
                ([key, value], index) => (
                  <tr
                    key={key}
                    className={index % 2 === 0 ? "bg-famco-bg/50" : "bg-white"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-famco-muted">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-famco-text">
                      {value}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </TabsContent>

      <TabsContent value="inspection">
        <div className="rounded-lg border border-famco-blue/20 bg-famco-blue/5 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-famco-blue text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-famco-text">
                FAMCO Approved Certification
              </h4>
              <p className="text-sm text-famco-muted">
                Inspection Date: {product.inspectionDate}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-famco-muted">Condition Grade</p>
              <p className="mt-1 text-lg font-bold text-famco-text">
                {product.condition}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-famco-muted">Certification Status</p>
              <p className="mt-1 text-lg font-bold text-famco-green">
                {product.certified ? "Certified" : "Pending"}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-famco-muted">Inspection Summary</p>
              <p className="mt-1 text-lg font-bold text-famco-text">Passed</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-famco-muted">
            This equipment has been thoroughly inspected by certified FAMCO
            engineers. All mechanical, hydraulic, electrical, and structural
            components have been evaluated. Refurbishment and servicing has been
            completed where required. This machine meets the FAMCO Approved
            standard for quality and reliability.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

- [ ] **Step 4: Create Related Equipment**

Create `src/components/product/related-equipment.tsx`:

```tsx
import { ProductCard } from "@/components/equipment/product-card";
import { getProductsByCategory } from "@/data/products";
import type { Product } from "@/lib/types";

interface RelatedEquipmentProps {
  currentProduct: Product;
}

export function RelatedEquipment({ currentProduct }: RelatedEquipmentProps) {
  const related = getProductsByCategory(currentProduct.category)
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-famco-text">
        Similar Equipment
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create Product Detail page**

Create `src/app/equipment/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, products } from "@/data/products";
import { ImageGallery } from "@/components/product/image-gallery";
import { InfoPanel } from "@/components/product/info-panel";
import { ContentTabs } from "@/components/product/content-tabs";
import { RelatedEquipment } from "@/components/product/related-equipment";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-famco-bg pt-24">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-famco-muted">
          <Link href="/" className="hover:text-famco-blue">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/equipment" className="hover:text-famco-blue">
            Equipment
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/equipment?category=${product.category}`}
            className="hover:text-famco-blue"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-famco-text">{product.title}</span>
        </nav>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ImageGallery images={product.images} alt={product.title} />
          </div>
          <div className="lg:col-span-2">
            <InfoPanel product={product} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <ContentTabs product={product} />
        </div>

        {/* Related */}
        <RelatedEquipment currentProduct={product} />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Verify product detail page**

```bash
npm run dev
```

Navigate to `http://localhost:3000/equipment/1`. Check: image gallery with thumbnail switching, info panel with price/specs/CTAs, tabs switching (Overview, Specifications, Inspection), related products at bottom. Test mobile layout. Test navigation from listings page product cards.

- [ ] **Step 7: Commit**

```bash
git add src/app/equipment/[id]/ src/components/product/
git commit -m "feat: add product detail page with gallery, info panel, tabs, and related equipment"
```

---

## Task 8: Polish & Final Verification

**Files:**
- Modify: `src/app/globals.css`, various components as needed

- [ ] **Step 1: Add smooth scroll and global styles**

Add to `src/app/globals.css`:

```css
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar for horizontal scroll containers */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

- [ ] **Step 2: Add Next.js image domains config**

Update `next.config.ts` to allow Unsplash images:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 3: Run full build to check for errors**

```bash
npm run build
```

Expected: successful build with no errors. Fix any TypeScript or build errors that appear.

- [ ] **Step 4: Final visual verification**

```bash
npm run dev
```

Walk through the full user journey:
1. Homepage → all 8 sections visible, hero search works
2. Click category card → navigates to listings with correct filter
3. Use hero search → navigates to listings with search term
4. Listings → filters work, sort works, pagination works, mobile drawer works
5. Click product card → product detail page loads with correct data
6. Image gallery → thumbnails switch main image
7. Tabs → all 3 tabs display correct content
8. Related equipment → shows products from same category
9. Footer/header → visible on all pages, mobile nav works

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add global styles and image config, complete FAMCO marketplace"
```
