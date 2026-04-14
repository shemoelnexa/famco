# Makana-Parity 3D & Hero Redesign — Design Spec

**Date:** 2026-04-14
**Author:** Shemoel + Claude
**Target presentation:** Wednesday client review (MD + President)
**Status:** Draft — pending user review

---

## 1. Goals

Win the FAMCO pitch by closing the perceived gap with `https://www.makana.com/en`. Specifically:

1. Deliver the **"wow"** factor the Managing Director and President are looking for.
2. Add **3D interactivity** to (a) the hero region, (b) every product card, and (c) every product detail page.
3. Convert the hero from a single static panel into a **multi-slide carousel** that surfaces the **three business pillars**: Auctions, Direct Sales (Buy/Sell), Shipping & Logistics.
4. Replace the "brand new truck" hero photo with imagery that reads as **authentic used equipment**.
5. Enrich the header so it no longer reads as "too simple" relative to Makana.
6. Preserve everything the client already approved: **Inspections section, About Us, infographics**.
7. Maintain the **Scandinavian/European** look — clean, minimal, sexy movement. No clutter, no neon.

This spec is a **proposal/demo build**. Production-grade asset sourcing (FAMCO's own real machine photography, true 3D scans) is out of scope for Wednesday and will be handled in a follow-up phase if FAMCO awards the contract.

---

## 2. Technology Choices

### 2.1 True 3D viewer — `@google/model-viewer`
- **Why:** drop-in web component (`<model-viewer>`), one HTML tag, drag-rotate-zoom-AR built in, ~70 KB gzipped, no React boilerplate, robust on mobile.
- **Used in:** product detail page hero viewer, decorative hero element.
- Loaded as a client-only dynamic import to avoid SSR issues with Next.js 16.

### 2.2 Decorative scene — `@react-three/fiber` + `@react-three/drei`
- **Why:** finer control needed for hero ambient/floating truck with lighting + auto-rotate. `model-viewer` is great for stand-alone product viewers but R3F gives us a styled scene.
- **Used in:** hero slide 1 background ornament (slow-orbiting truck silhouette behind copy).

### 2.3 Fake 360° (image-sequence) — custom lightweight component
- **Why:** Makana's product cards are not true 3D — they're 24–36-frame turntable PNG sequences cycled by a scrub control. We replicate this exactly.
- **Used in:** every product card thumbnail (frame 0 visible, drag-to-rotate on hover/touch), and the product detail gallery's "3D" tab.
- Implementation: pre-render 24 frames per unique model from the GLB on a turntable (Blender headless or `model-viewer` snapshot), serve as WebP, swap `<img src>` based on pointer X delta.

### 2.4 Hero carousel — Embla Carousel React
- **Why:** small (~10 KB), framework-agnostic, accessible, smooth swipe + autoplay, integrates with Next.js out of the box.

---

## 3. Asset Plan

### 3.1 Source & licensing
- **Source:** Sketchfab CC0 / CC-BY models tagged `truck`, `excavator`, `loader`, `dump-truck`. Backup: Poly Pizza, Quaternius CC0 vehicles pack.
- **Constraint:** trucks and construction vehicles **only** — no cars, no fantasy assets.
- **Format:** `.glb` (binary glTF), Draco-compressed, target ≤ 4 MB each.
- **Count:** **6 unique models** to cover the marketplace variety:
  1. Articulated dump truck
  2. Tracked excavator
  3. Wheel loader
  4. Tipping trailer truck (matches existing Gorica listing)
  5. Tractor head / prime mover (matches existing Volvo FH420 listing)
  6. Backhoe loader

Cards beyond 6 reuse models, mapped by category. Any card without a category match falls back to model #5 (prime mover).

### 3.2 Pre-rendered turntable frames
- For each of the 6 GLBs: render **24 frames** at 800×600 WebP, ~25–40 KB each.
- Stored at `public/3d/frames/<model-slug>/00.webp` … `23.webp`.
- Total weight per model: ~700 KB. Lazy-loaded; first frame eager, rest on hover/intersection.

### 3.3 Hero photography (used-look replacements)
- Replace `/images/hero-construction.jpg` with imagery that reads as **used / working machinery** — real-world dust, weathered paint, job-site context. For the demo we'll source 3 high-quality stock shots (Unsplash/Pexels) — one per slide.
- Final FAMCO-shot photography is a phase-2 deliverable.

---

## 4. Section-by-Section Design

### 4.1 Header (`src/components/layout/header.tsx`)

Current: logo + 5 flat links + 1 CTA. Reads as "too simple."

**New structure (top to bottom):**
1. **Utility bar** (40 px, `bg-black/95`, white text, hidden when scrolled past hero):
   - Phone number (left), location (Dubai, UAE), language switcher (EN | AR), Sign In link (right).
2. **Main nav** (72 px, current behavior preserved — transparent on home top, solid on scroll):
   - Logo (left).
   - Nav links centered, with **mega-menu on "Buy Equipment"** showing: 4 category tiles (Trucks, Excavators, Loaders, Trailers) + a featured listing preview card on the right.
   - Right cluster: **secondary outline CTA "Sell Equipment"** + primary filled CTA "Browse Equipment".
3. **No 3D widget inside the header itself.** All 3D lives in the hero region directly below the nav (confirmed by user 2026-04-14).
4. **Header is now always solid white, full-bleed across all pages.** The current "transparent on home top, solid on scroll" behavior is removed. White background spans the full viewport width edge-to-edge; inner content stays inside the existing `max-w-[1400px]` container for readability. This guarantees the FAMCO blue logo is correctly colored on every page including the home hero.
5. **Hero spacing:** because the header is no longer transparent over the hero, the hero `<section>` gets `pt-[112px]` (72 nav + 40 utility bar) so the carousel content isn't covered.

**Logo blue audit:** sweep every page (`/`, `/equipment`, `/equipment/[id]`, `/sell`, `/inspections`, `/about`, `/contact`, `/auctions`, `/shipping`, `/faq`, legal pages) plus `header.tsx`, `footer.tsx`, all CTAs and icon usages. Confirm `text-famco-blue` / `bg-famco-blue` is applied wherever the design calls for it. With the header always white, the inverted-white logo variant is no longer needed and is removed.

### 4.2 Hero (`src/components/home/hero.tsx`)

Convert from single panel to **3-slide carousel** (Embla, autoplay 6s, swipe + dots + arrow controls).

**Slide 1 — Direct Sales (Buy/Sell):**
- Background: full-bleed used-equipment photo, dark gradient overlay.
- **Decorative R3F floating truck** anchored to the right third of the slide, slow auto-rotate, subtle parallax on scroll.
- Headline: "Buy & sell verified used equipment."
- Subhead, search bar, three action cards — keep current copy.

**Slide 2 — Auctions:**
- Background: auction-yard photo (rows of machines).
- Headline: "Live & timed auctions, every week."
- Sub: "Bid on inspected, certified machinery from across the region."
- CTA: "View auctions" (links to `/auctions` — see §5 routing).

**Slide 3 — Shipping & Logistics:**
- Background: heavy-haul truck / port-side container shot.
- Headline: "Ship your equipment anywhere."
- Sub: "FAMCO's logistics network moves machines across the GCC and beyond."
- CTA: "Request a quote" (links to `/contact?topic=shipping`).

Carousel pauses on hover/focus, respects `prefers-reduced-motion` (no autoplay, no R3F auto-rotate).

### 4.3 Three-Pillars callout section (NEW)

Positioned immediately below the hero, before existing `<TrustStrip />`. Three large cards in a row, each with:
- Compact `model-viewer` (200 px tall, auto-rotate, pointer-events disabled — purely decorative).
- Label (Auctions / Direct Sales / Shipping).
- 1-sentence description.
- Text link "Learn more →".

This is the section that mirrors Makana's "3D-asset-driven pillar showcase."

### 4.4 Product card (`src/components/equipment/product-card.tsx`)

Current: static `<img>` thumbnail.

**New thumbnail behavior:**
- Default state: shows frame 0 of the model's turntable (.webp). Looks like a clean studio shot.
- Hover (desktop) / first-touch (mobile): drag horizontally to scrub frames 0–23. Subtle "drag to rotate" badge appears on hover.
- Releasing the pointer keeps the current frame.
- Subsequent images in the card's image strip remain the existing static photos — unchanged.

Implementation: new `<Frame360 modelSlug={...} />` component replacing the current `<img>` for the lead thumbnail only. Falls back to a static image if WebP frames fail to load.

### 4.5 Product detail page (`src/app/equipment/[id]/page.tsx`, `image-gallery.tsx`)

Add a **"3D View"** tab as the **first tab** in the existing image gallery. Two modes:
- **3D tab (default):** full `<model-viewer>` with drag-rotate-zoom, AR button (mobile), camera-orbit auto-rotate that pauses on interaction.
- **Photos tab:** existing static gallery, unchanged.

Map each listing to one of the 6 model slugs by category (function `getModelSlugFor(listing)`).

### 4.6 Sections to leave untouched
- `<TrustStrip />`
- All `inspections/*` components
- All `about/*` components
- Stats bar, infographics
- Footer (other than logo color audit)

---

## 5. New pages — full mockups with interactive 3D

Both new pages get **full design treatment with interactive 3D objects**, not "coming soon" stubs (confirmed by user 2026-04-14). They need to feel as polished as the rest of the site for the demo.

### 5.1 `/auctions`
- Hero band: bold headline + sub + CTA + a featured `<model-viewer>` of an auction-block machine (excavator), drag-rotate enabled.
- "How auctions work" three-step infographic strip (matches existing infographic style the client already approved).
- Live auctions grid: 3–4 mock auction cards, each using `<Frame360>` thumbnails, with bid count / time-remaining / current bid / "Place bid" CTA.
- Past results strip (4 small cards) for social proof.
- Closing CTA banner.

### 5.2 `/shipping`
- Hero band: headline + sub + CTA + featured `<model-viewer>` of a heavy-haul prime mover.
- Service pillars row: 3 cards (GCC delivery / International freight / Yard-to-site) with small `<model-viewer>` ornaments.
- Coverage map section (static SVG of the GCC + Africa with route lines — no real geo data required, decorative).
- Process timeline (4 steps: quote → pickup → transit → delivery).
- Quote-request form (re-uses the existing `<ContactForm>` component with topic pre-filled to "shipping").

Both pages reuse the existing layout shell, typography, and motion conventions.

---

## 6. Performance & accessibility

- All 3D assets lazy-loaded (`loading="lazy"` on `model-viewer`, `IntersectionObserver` for R3F scene and for `Frame360` non-zero frames).
- Total cold-load weight increase target: **≤ 1.5 MB on the home page** (one R3F scene + 3 model-viewer instances, all deferred until in viewport).
- `prefers-reduced-motion` honored everywhere: disables auto-rotate, disables carousel autoplay, freezes `Frame360` to frame 0 (still draggable).
- All interactive 3D controls keyboard-reachable; `model-viewer` provides this natively. `Frame360` exposes `aria-label="Drag to rotate"` and supports left/right arrow keys.
- All decorative WebGL canvases get `aria-hidden="true"`.

---

## 7. Out of scope (explicitly)

- Sourcing real FAMCO machine photography or true 3D scans (phase 2).
- Building a real auctions backend or shipping quote engine.
- Mobile AR viewer beyond what `model-viewer` gives for free.
- Authentication / Sign In flow (utility bar link is visual only).
- Internationalization beyond an EN | AR toggle in the utility bar (no actual translations yet).

---

## 8. Risks

| Risk | Mitigation |
|---|---|
| WebGL crash on low-end devices | Feature-detect WebGL; fall back to static image + `Frame360` only. |
| Demo-day asset weight | Hard budget: ≤ 1.5 MB extra on home; enforce via Lighthouse run before pitch. |
| Stock GLB quality varies | Hand-pick 6 models, verify visually, normalize materials in Blender if needed. |
| Mobile drag-to-rotate vs page scroll conflict | `Frame360` only intercepts horizontal pointer movement above a 10 px threshold; vertical movement scrolls page. |
| Embla autoplay distracts from CTA | 6s dwell + pause on hover + pause on focus. |

---

## 9. User decisions log (2026-04-14)

1. ✅ **3D placement** — 3D is in the hero region, not in the header.
2. ✅ **Auctions / Shipping** — full interactive mockups with 3D objects, not stubs.
3. ✅ **Logo blue audit** — full sweep across all pages. Header is now **always solid white, full-bleed**, transparent-on-home behavior removed.

---

## 10. Timeline (Wednesday is the deadline)

Day 1 (today): asset sourcing (6 GLBs + 24 turntable frames each), `Frame360` component, hero carousel skeleton, header rebuild (white + full-bleed + utility bar + mega-menu + secondary CTA).
Day 2: three-pillars section, product card 360° integration, product detail 3D tab, full `/auctions` page, full `/shipping` page, logo blue audit across all pages.
Day 3 (Wed AM): polish pass, Lighthouse, motion QA, demo dry-run.

If we slip, the cuttable items in priority order are: (1) `/shipping` coverage map (replace with photo), (2) hero R3F decorative truck (drop to a `model-viewer` instance instead), (3) `/auctions` past-results strip.
