# FAMCO Used Equipment Marketplace — Design Spec

## Overview

A modern, marketplace-style website for Al-Futtaim FAMCO Used — the region's first verified used industrial equipment platform. Three pages: Homepage (informational), Listings (browse/search/filter), and Product Detail (full equipment info).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (copied into project, fully customizable)
- **Data**: Hardcoded mock data (15-20 products across 5 categories)
- **Language**: TypeScript

## Brand & Design System

| Token | Value |
|-------|-------|
| Primary Blue | `#0072BC` |
| Navy (headers/footer) | `#0A1628` |
| Accent Teal | `#00B4D8` |
| Background Light | `#F5F7FA` |
| White | `#FFFFFF` |
| Text Dark | `#1A1A2E` |
| Text Muted | `#6B7280` |
| Success Green | `#10B981` |
| Card Radius | `12px` |
| Button Radius | `8px` |
| Font | Inter — bold headings, regular body |
| Shadows | Subtle layered (`0 2px 8px rgba(0,0,0,0.08)`) |

### Design Direction

Modern & Marketplace — bright, airy, card-heavy layout with vibrant blue accents and smooth micro-interactions. Elevated above reference sites (Makana, BAS World) in design quality while maintaining industrial credibility through the FAMCO Approved trust system.

## Data Model

```ts
interface Product {
  id: string;
  title: string;
  slug: string;
  category: Category;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string; // "AED"
  hours: number;
  location: string; // "Dubai, UAE" | "Riyadh, KSA" | etc.
  condition: "Excellent" | "Good" | "Fair";
  images: string[]; // placeholder URLs
  description: string;
  specifications: Record<string, string>;
  inspectionDate: string;
  certified: boolean; // FAMCO Approved
  featured: boolean;
}

type Category =
  | "Construction Equipment"
  | "Material Handling"
  | "Commercial Vehicles & Trucks"
  | "Buses"
  | "Industrial Machinery";
```

## Pages

### 1. Homepage (`/`)

**Sticky Header**
- Logo (left), nav links: Home, Equipment, About, Contact
- Search icon, "Browse Equipment" CTA button (right)
- Transparent on hero, solid white on scroll

**Hero Section**
- Headline: "The Region's Trusted Marketplace for Verified Used Equipment"
- Subtext: "Browse FAMCO Approved machines — inspected, certified, and ready to work."
- Prominent search bar: category dropdown + keyword input + search button
- Background: gradient overlay on equipment imagery

**Category Browser**
- 5 visual cards in a row (responsive grid)
- Each: category icon/image, name, equipment count
- Hover: lift + blue border accent
- Click navigates to `/equipment?category=<slug>`

**Featured Listings**
- Section title: "Featured Equipment"
- Grid of 6 product cards (3x2 desktop)
- Card: image (with FAMCO Approved badge overlay), title, year | hours | location, price, "View Details" link
- "View All Equipment" link at bottom

**FAMCO Approved Process**
- Section title: "The FAMCO Approved Standard"
- 4-step horizontal timeline with connecting line:
  1. Submit — Seller submits equipment
  2. Inspect — Full technical inspection by FAMCO experts
  3. Refurbish — Service, maintenance, cosmetic improvements
  4. Certified — FAMCO Approved badge issued, listed on platform
- Each step: icon, title, short description

**Why Choose FAMCO**
- 4-column grid:
  - Verified Equipment — Every machine inspected and certified
  - Transparent Reports — Full inspection reports available
  - Al-Futtaim Backed — 45+ years of trust and expertise
  - Regional Coverage — UAE, KSA, Qatar, Bahrain

**For Buyers / For Sellers**
- Two-column split layout
- Buyers side: value props (verified machines, transparent reports, confidence in quality, financing options) + "Browse Equipment" CTA
- Sellers side: value props (higher resale value, professional refurbishment, wider buyer base) + "Submit Your Equipment" CTA

**Stats Bar**
- Full-width, blue background
- 4 counters: 500+ Equipment Sold | 45+ Years Experience | 4 Countries | 100% Verified

**CTA Banner**
- Full-width gradient (navy to blue)
- "Ready to Find Your Next Machine?" + "Browse Equipment" button

**Footer**
- Dark navy background
- Logo, nav links, contact info (800 FAMCO 32626, famco@alfuttaim.ae)
- Social icons: Facebook, Instagram, LinkedIn, YouTube
- Locations: Dubai DIP, Umm Ramool
- Copyright: Al-Futtaim FAMCO

### 2. Listings Page (`/equipment`)

**Top Bar**
- Breadcrumb: Home > Equipment
- Result count: "Showing X of Y equipment"
- Sort dropdown: Newest, Price Low-High, Price High-Low, Year Newest

**Search Bar**
- Full-width below top bar
- Keyword input + category dropdown + search button

**Sidebar Filters** (left, 280px wide)
- Category: checkboxes for 5 categories
- Price Range: min/max inputs
- Year Range: min/max inputs
- Make/Brand: checkboxes (Volvo, CAT, Komatsu, Doosan, Linde, etc.)
- Condition: checkboxes (Excellent, Good, Fair)
- Location: checkboxes (UAE, KSA, Qatar, Bahrain)
- "Clear All Filters" link at bottom
- Mobile: filters collapse into slide-out drawer triggered by "Filters" button

**Product Grid**
- 3 columns desktop, 2 tablet, 1 mobile
- Card: product image (16:10 ratio) with FAMCO Approved badge, title, key specs row (year, hours, location), price (AED formatted), "View Details" button
- Hover: subtle lift shadow
- Empty state: "No equipment found matching your filters" with clear filters link

**Pagination**
- Bottom of grid
- Previous / page numbers / Next

### 3. Product Detail Page (`/equipment/[id]`)

**Breadcrumb**: Home > Equipment > [Category] > [Product Title]

**Image Gallery**
- Large main image (16:10)
- Thumbnail strip below (click to swap main image)

**Info Panel** (right side on desktop, below images on mobile)
- Title (large, bold)
- Price (large, blue, AED formatted)
- FAMCO Approved badge (prominent)
- Key specs table: Year, Hours, Make, Model, Category, Location, Condition
- CTA buttons: "Enquire Now" (primary), "Add to Wishlist" (secondary), phone number

**Content Tabs**
- Overview: equipment description paragraph
- Specifications: full spec table (key-value pairs)
- Inspection Report: certification date, condition grade, inspection summary, FAMCO Approved seal

**Related Equipment**
- "Similar Equipment" section
- Horizontal scroll of 4 product cards from same category

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|------------|-------|-------|
| Mobile | < 768px | Single column, hamburger nav, filter drawer |
| Tablet | 768-1024px | 2-col grid, condensed sidebar |
| Desktop | > 1024px | Full layout, 3-col grid, visible sidebar |

## Mock Data Spec

- 18 products total across 5 categories
- Categories: Construction (5), Material Handling (3), Trucks (5), Buses (2), Industrial (3)
- Brands: Volvo, CAT, Komatsu, Doosan, Linde, Yanmar, SDLG
- Locations: distributed across UAE, KSA, Qatar, Bahrain
- Prices: range from 25,000 AED to 850,000 AED
- Years: 2018-2024
- Mix of conditions and featured status
- Placeholder images from public equipment image sources

## Interactions

- Header: transparent → solid on scroll (homepage only)
- Cards: hover lift with shadow transition (200ms ease)
- Filters: instant client-side filtering via React state
- Search: filters product list on submit
- Image gallery: click thumbnails to swap main image
- Scroll animations: subtle fade-in on section enter (intersection observer)
- Mobile nav: hamburger → slide-out menu
- Mobile filters: slide-out drawer from left
