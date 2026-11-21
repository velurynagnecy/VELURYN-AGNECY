# VELURYN STUDIO - Flagship Website Design System & Conversion Spec

Architectural blueprint synthesized from NN/g, Baymard, CXL, Wynter, Deloitte Digital ("Milliseconds Make Millions"), GSAP + Lenis engineering docs, WCAG 2.2 AA standards, and Awwwards 2025-2026 teardowns. Read end-to-end before writing code.

---

## 1. Core Laws (Non-Negotiable)

1. **One Idea Per Scroll Frame:** Every section occupies its own visual chapter (`py-20 sm:py-28 lg:py-32` or `min-h-[82svh]`) with max **1 headline** (`6 - 10 words`), **1 supporting copy block** (`< 40 words`), and **1 primary focal visual or interactive element**. Never stack treatments + pricing + reviews + FAQ inside one crowded band.
2. **Strict Hero Formula (Above the Fold):** The Hero may contain **ONLY**:
   - Floating minimalist top nav bar (`<= 5` links + 1 CTA).
   - **Exact 2-line display H1** (`6 - 10 words`, ceiling `< 12`).
   - **Exact 2-line small subcopy paragraph** (`15 - 22 words`, `<= 150 chars`, answering *what · who · why* in `< 3s`).
   - **Exact 2 pill buttons** below the subcopy (80/20 visual weight split).
   - **1 signature visual composition** (curved 3D card fan OR kinetic depth frame OR full-bleed architectural shot). **NO forms, stat tickers, floating promo badges, or multi-card grids inside the hero.**
3. **Eliminate the False Floor:** Cap initial hero lockup framing at `82 - 90svh` (or bleed the signature visual fan/edge across the fold) so `10% - 20%` of the next visual cue peeks into the initial desktop viewport, preventing scroll abandonment.
4. **Lively Market-Leader Authority:** Show real engineering/clinical artifacts (surgical protocols, CNC specs, lab instrumentation, live UI fragments) rather than vague corporate adjectives. 98% of buyers report category websites sound identical unless proof is concrete.
5. **Typography & Copy Discipline:** **ZERO em dashes (`\u2014`) or en dashes (`\u2013`) anywhere** in code, copy, or WhatsApp messages. Use middle dots (`·`), colons, commas, or standard hyphens (`-`). Never use `Lorem ipsum`, `Logoipsum`, or placeholder `"Guest"` names.
6. **Verified Media Only:** Every `<img>` must return HTTP `200` with `naturalWidth > 0`. Portraits MUST use `object-cover object-top` (or `[object-position:50%_20%]`) so foreheads and hairlines never clip.

---

## 2. Universal 8-Frame Homepage Scroll Narrative

Every portfolio site follows this exact psychological trust progression from top to bottom:

| Frame | Role | Single Job on Screen |
| :--- | :--- | :--- |
| **01 · The Hook (Hero)** | Emotional + Value Lock | 2-line H1 + 2-line paragraph + 2 CTAs + 1 signature showcase frame. |
| **02 · Immediate Authority** | Contrast / Marquee Proof | 3 concrete signature offerings or architectural systems (no gray 30-logo soup). |
| **03 · Craft & Mechanism** | Why We Win | Transparent differentiation matrix + technical/clinical blueprint (how we build/treat). |
| **04 · Quantitative Proof Bento** | Verified Metrics | Asymmetric 12-col Bento (`60-20-20`) combining UI/material proof + tabular KPI numbers + voice quote. |
| **05 · Deep Dossier / Milestones** | Evidence Under Scrutiny | Filterable real case records / growth timeline / shell-to-handover slider with exact specs. |
| **06 · Interactive Qualifier** | The Conversion Engine | 2-to-3 step visual card selector (`>= 8%` CVR lift vs static forms) gating contact only on Step 3 + instant WhatsApp / PDF brief. |
| **07 · Objection-Killer FAQ** | Anxiety Resolution | `5 - 8` focused, collapsed-by-default questions answering cost, safety, downtime, and SLA. |
| **08 · Horizon Footer** | Monumental Close | Minimal `3 - 4` column directory melting into an Opnest-style horizon + giant translucent wordmark. |

---

## 3. Hero Specification (Exact Measurements)

- **Wrapper:** `min-h-[86svh] sm:min-h-[90svh]` (`svh`, never `100vh`, prevents iOS/Android address bar jumps). Reserve `pt-28 sm:pt-32` clearance below the fixed pill navbar.
- **Display Headline (`h1`):**
  - Size: `clamp(2.65rem, 2.2rem + 2.5vw, 4.75rem)` (`42px` mobile -> `76px` desktop).
  - Line-height: **`1.04 - 1.10`** · Letter-spacing: **`-0.04em`** · Max width: **`18ch - 20ch`** · `text-wrap: balance`.
  - Word count: **6 to 10 words** shaped to break cleanly across **2 lines**.
- **Hero Subcopy (`p`):**
  - Size: `clamp(1rem, 0.96rem + 0.35vw, 1.1875rem)` (`16px - 19px`).
  - Line-height: **`1.45 - 1.5`** · Weight: `400 - 500` · Max width: **`54ch`** (desktop wraps to **2 lines**, `15 - 22 words`).
- **Dual CTA Hierarchy (80/20 Weight Split):**
  - Gap: `gap-3 sm:gap-4`. Min tap height on mobile: **`48px`** (`py-3.5 px-6` or `min-h-[48px]`).
  - **Primary CTA (80% weight):** High-contrast solid fill pill (e.g., `#0D0D0D` text `#FFFFFF` on light, `#FFFFFF` / Electric Chartreuse `#C8F169` with `#0D0D0D` ink on atmospheric dark/sky), weight `600`, tracking `+0.01em`.
  - **Secondary CTA (20% weight):** Avoid low-contrast transparent ghost borders over photography (CXL warning). Use either a **solid neutral tinted pill** (`bg-white/90 text-[#0D0D0D]` or `bg-[#F5F5F4] text-[#0D0D0D] border border-black/[0.08]`) OR a **crisp high-contrast text-link with arrow/play icon**.
- **Signature Visual Archetypes (Pick 1 per Brand):**
  1. **Aeline Curved 3D Fan:** Centered 2-line copy over atmospheric bright daylight sky/mist backdrop (`min-h-[88svh]`), followed directly beneath the 2 buttons by a responsive 7-card 3D fanned showcase arc (`references/veluryn-main/src/components/ui/card-fan-carousel.tsx` geometry).
  2. **Tenista Kinetic Editorial:** Full-bleed high-resolution architectural/sensory scene with bold edge-to-edge kinetic display typography layered cleanly behind/with a focused viewport composition (`object-cover`) + crisp 2-line headline, 2-line subcopy, 2 buttons.
  3. **Minimal Split Architectural Showcase:** Balanced crisp gallery surface with 2-line hero copy on left / centered and one large architectural rounded viewport (`rounded-[28px]`, subtle `1px` hairline, zero extra floating badges).

---

## 4. Typography, Spacing, Grids & Curated Color Tokens

### 4.1 Fluid Type Scale (Tailwind v4 `@theme` + `index.html` Google Fonts)
Load only the exact fonts used per site (`Plus Jakarta Sans`, `Instrument Sans`, `Fraunces` or `Cormorant Garamond`, `JetBrains Mono`) with `<link rel="preconnect">` to `fonts.googleapis.com` and `fonts.gstatic.com`.

| Token | CSS Formula | Leading | Tracking | Rules |
| :--- | :--- | :--- | :--- | :--- |
| Display (`h1`) | `clamp(2.65rem, 2.2rem + 2.5vw, 4.75rem)` | `1.05` | `-0.04em` | `text-wrap: balance`, `<= 20ch` |
| Section (`h2`) | `clamp(1.95rem, 1.65rem + 1.5vw, 3.25rem)` | `1.12` | `-0.03em` | `text-wrap: balance`, `<= 28ch` |
| Card (`h3`) | `clamp(1.25rem, 1.15rem + 0.5vw, 1.75rem)` | `1.22` | `-0.02em` | `text-wrap: balance` |
| Body (`p`) | `clamp(1rem, 0.96rem + 0.18vw, 1.125rem)` | `1.55` | `0em` | `text-wrap: pretty`, `45ch - 65ch` |
| Mono Spec | `0.75rem` (`12px`) | `1.3` | `+0.08em` | Uppercase indices (`01 / ...`) + `tabular-nums` |

*Editorial Serif Guardrail:* If using **Cormorant Garamond** for editorial pull quotes or display accents, never render below **`20px`** (`24px+` preferred) so hairline strokes stay crisp. For **Fraunces**, set `'opsz' 72` on display headings and `'opsz' 14` on sub-20px labels.

### 4.2 Grid, Spacing & Concentric Surface Math
- **Base Scale:** Strict `8px` multiples (`8, 16, 24, 32, 48, 64, 80, 112, 144`).
- **Section Vertical Padding:** `py-20 sm:py-28` (`80px - 112px` standard) up to `py-28 sm:py-36` (`112px - 144px` flagship bands). Horizontal gutter: `px-5 sm:px-8 lg:px-14`. Max container: `max-w-[1360px] mx-auto` (editorial bands up to `1440px`).
- **Concentric Radius Law:** `Inner Radius = Outer Radius - Padding`.
  - Section card `rounded-[32px]` (`32px`) + `p-6` (`24px`) -> inner tile `rounded-[16px]` or `rounded-[12px]`.
  - Outer card `rounded-[24px]` (`24px`) + `p-4` (`16px`) -> inner image `rounded-[8px]` to `rounded-[12px]`.
  - **Gap Rule:** `Grid Gap (12px - 16px) <= Card Inner Padding (20px - 24px)`.
- **Asymmetric Bento Proportions (`12-col` CSS Grid):** Give **50% - 60%** area to 1 hero tile using **`lg:col-span-7` + `lg:col-span-5`**, **`lg:col-span-4` + `lg:col-span-8`**, or **`3 / 6 / 3`**. Mix live specs/UI tile + `tabular-nums` metric tile + editorial quote tile.
- **Hairline Borders:** Light canvas `border-black/[0.08]` (hover `0.24`); Dark canvas `border-white/[0.12]` (hover `0.28`). Interactive control outlines & focus rings MUST maintain `>= 3:1` contrast (WCAG 2.4.11 / 1.4.11).

### 4.3 Three Curated Palette Systems (Choose 1 Per Site, Plus Opnest Horizon Close)
1. **Aeline Luminous Sky & Precision (`01-solen-hair-clinic`, `03-luma-dental`):**
   - Hero Canvas: Crisp atmospheric daylight gradient (`#0B4FA8` -> `#3897E8` -> soft cloud mist `#DDF0FF`) transitioning onto Pure Alabaster `#FFFFFF` & Cool Mist `#F4F6F9`.
   - Ink: Deep Slate `#0F172A` (`17:1` on white) · Muted `#475569` (`7.0:1`) · Primary Pill `#0F172A` or Electric Chartreuse `#D9F954` with `#0F172A` ink (`14.5:1` AA/AAA).
2. **Tenista Daylight Limestone & Charcoal (`02-kora-interiors`, `04-crestline-homes`):**
   - Canvas: Warm Limestone `#F9F8F6` + Honed Travertine `#F2EFE9` alternating with Floating Rounded Obsidian `#0D0D0D` (`rounded-[28px] sm:rounded-[36px]`).
   - Ink: `#1E2124` on light · `#FBF9F5` on dark · Slate Sky accent `#3B525C` / Warm Cobalt `#0047AB`.
3. **Sova Warm Ivory & Botanical Acid (`05-sova-botanicals`):**
   - Canvas: Warm Ivory `#FAF9F6` + Mineral Stone `#F0EEE9` + Obsidian `#121212` panels.
   - Ink: `#121212` on light · `#FAF9F6` on dark · Acid Botanical `#C8F169` buttons/micro-chips with `#121212` ink.

---

## 5. Motion Library (GSAP + `@gsap/react` + Lenis)

Install `lenis` (NOT deprecated `@studio-freight/react-lenis`), `gsap`, `@gsap/react`.

### 5.1 Single-Clock Lenis Sync & StrictMode-Safe Setup
Run inside a root wrapper or `App.tsx`:
```ts
gsap.registerPlugin(useGSAP, ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true, fastScrollEnd: true });
```
- Sync Lenis inside `useEffect` via `gsap.ticker.add((t) => lenis.raf(t * 1000))`, call **`gsap.ticker.lagSmoothing(0)`**, and bind `lenis.on("scroll", ScrollTrigger.update)`.
- On `window` `load` (after web fonts/images paint), trigger `ScrollTrigger.refresh()`.
- Use **`useGSAP(() => { ... }, { scope })`** cleanly everywhere. NEVER animate from `{ opacity: 0 }` using bare `gsap.from()` in `useEffect` (React 19 StrictMode traps elements invisible); always use **`gsap.fromTo()`** with `clearProps: "opacity,transform"`.
- Wrap all scroll animations inside **`gsap.matchMedia()`**:
  - `"(prefers-reduced-motion: no-preference)"`: full choreography.
  - `"(prefers-reduced-motion: reduce)"`: `gsap.set(..., { opacity: 1, y: 0, x: 0, clearProps: "transform" })`.

### 5.2 Named Motion Presets
| Preset | Trigger & Target | Parameters | Guardrail |
| :--- | :--- | :--- | :--- |
| **`hero-parallax`** | Scrub across hero frame | Container `overflow-hidden`; media pre-scaled `scale(1.22)`; tween `yPercent: 0 -> 18`, **`ease: "none"`**, `scrub: true` | Never let image edges pull inside frame |
| **`card-fan-arc`** | Curved 7-card showcase | `perspective: 1200px`; `transform-style: preserve-3d`; `transformOrigin: "50% 130%"`; `d = i - (n-1)/2`; desktop `x: d*128, rotationZ: d*14, rotationY: d*-3, y: d*d*7, z: -abs(d)*38, scale: 1 - abs(d)*0.025`; mobile `<768px` scaled `x: d*44, rotationZ: d*8` | Hover/tap center-brings card smoothly (`duration: 0.45, ease: "power3.out"`) |
| **`frame-reveal`** | `ScrollTrigger` `top 84%`, **`once: true`** | `fromTo({ y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.72, ease: "power3.out", stagger: 0.08, clearProps: "opacity,transform" })` | Never re-hides content on upward scroll |
| **`kinetic-band`** | Large horizontal editorial word | Scrub `xPercent: -6 -> 6`, **`ease: "none"`**, `scrub: 1` inside `overflow-x-clip` wrapper | Pure transform, zero horizontal scrollbar |
| **`pinned-step`** | Max `<= 3` beats if pinned | `pin: true, anticipatePin: 1, scrub: 1` inside `min-h-[100dvh]` | Clean up via `useGSAP` so no orphan spacers remain |

---

## 6. Core UI Component Patterns

1. **Floating Pill Navigation (`Navbar`):**
   - `fixed top-4 inset-x-0 z-40 px-4`, pill `max-w-5xl mx-auto h-14 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_30px_rgba(13,13,13,0.08)]`.
   - Brand mark + dot left, `4 - 5` links center, 1 high-contrast CTA pill right.
   - Mobile (`< md`): `44x44px` menu trigger opening a `fixed inset-0 z-50 bg-[#0D0D0D]` opaque full-screen drawer with `Escape` key handler, focus restoration, `data-lenis-prevent`, and `lenis.stop()/start()` lock.
2. **Modals & Lightboxes:**
   - Render via native `<dialog>.showModal()` or `createPortal(..., document.body)` with `z-50`.
   - Top-right Close `×` button MUST be at least `44x44px` (`w-11 h-11`), sit at `relative z-20`, call `e.stopPropagation()`, and mark child `<X className="pointer-events-none" />`. Escape closes & restores focus.
3. **Interactive Multi-Step Qualifier Frame:**
   - Render Step Pills (`01 / 02 / 03`) and **Compact Mobile Telemetry Strip** (`lg:hidden`) ABOVE the interactive white card on `< lg` screens so interactive buttons never sit `500px+` down on mobile. Keep full `Live Telemetry` panel on `lg:col-span-5`.
   - Step 1 & 2 use visual 1-tap cards (`>= 48px` height, `aria-pressed`). Step 3 shows calculated outputs BEFORE gating Name + Validated Phone/Email + Send CTA.
   - Any upstream edit OR failed validation resets `submitted = false` so stale previews never show.
4. **India WhatsApp `wa.me` & Conditional Mobile Sticky Bar:**
   - Format strictly: `https://wa.me/91XXXXXXXXXX?text=...` (no `+` or spaces in number, demo placeholder clearly labeled in UI preview as `Clinic Concierge Desk` rather than spamming `Guest`).
   - Hide fixed bottom sticky bar at `scrollY = 0` (`IntersectionObserver` watching hero CTA button leaving top of viewport), `min-h-[48px]` primary action, and `pb-[env(safe-area-inset-bottom,12px)]` plus matching footer `mb-24 md:mb-6` clearance.
5. **Accessible Medical/Service FAQ (`5 - 8` items):**
   - Closed icon `bg-[#F5F5F4] border-black/[0.08] text-[#0D0D0D]`; Expanded icon MUST toggle background cleanly (`rotate-45 bg-[#0D0D0D] border-[#0D0D0D] text-white`) without keeping `bg-[#F5F5F4]`.
6. **Opnest Atmospheric Horizon Footer:**
   - Top block (`border-t` subtle hairlines, `grid-cols-1 md:grid-cols-12`, brand column + 3 clean link columns, `lh 1.5`, explicit focus outlines).
   - Transition seamlessly into `min-h-[55vh] sm:min-h-[65vh]` full-bleed atmospheric horizon image with a bottom-up directional scrim (`rgba(11,11,14,0.92) -> 0.50 -> 0.15`) OR daylight ridge contrast + monumental translucent brand wordmark (`clamp(4.5rem, 19vw, 18rem)`, weight `900`, `tracking-[-0.05em]`, `leading-[0.78]`, `mix-blend-mode: overlay` / soft white fill sitting behind the foreground contour) + legal line and **`Crafted by VELURYN STUDIO · VELURYN AGNECY · velurynagnecy.com`**.

---

## 7. Per-Niche Blueprints (All 5 Portfolio Websites)

### Site 01 · `portfolios/01-solen-hair-clinic` - Solen Medical (`veluryn-solen-hair`)
- **Niche & Geography:** Hair Transplant & Follicular Restoration · Chennai, Bengaluru, Coimbatore (India).
- **Hero Style (Aeline Luminous Daylight + 7-Card Arc Fan):** 2-line H1 (*"Natural Hairlines. / Engineered by Surgeons."*), 2-line subcopy explaining MD-led Sapphire FUE, DHI & 2-day high-density care across South India, 2 buttons (`Free Graft Check` + `Explore Procedures`), curved 7-card showcase fan below.
- **Dedicated Frames (1 Idea Each):**
  1. Hero + 7-Card Procedure Fan -> 2. Surgeon vs Technician Protocol Split (`0.8 mm` sapphire blades, `4C` HypoThermosol ischemia protection, 2-day `4,000+` graft staging) -> 3. Treatments Bento (`Sapphire FUE`, `Bio-DHI`, `Beard & Brow`, `GFC + Exosomes` + spec modal) -> 4. Interactive 3-Step Graft & 0% EMI Calculator (Norwood 2-6 visual cards -> Protocol & City -> Live graft count, INR `₹45k - ₹2.5L`, `0%` EMI slider + WhatsApp triage) -> 5. Anonymized 12-Month Clinical Timeline Cases (Month 1/4/8/12 interactive tabs, responsive featured split when filtered to 1) -> 6. Medical FAQ (5 items) -> 7. Opnest Horizon Footer (`SOLEN`).
- **Compliance (NMC Guidelines):** No `"100% guaranteed"`, no `"painless"`, no `"No. 1 best surgeon"`. Frame comfort via buffered local nerve-block anesthesia, display MD/MCh credentials + NMC/SMR registration IDs.

### Site 02 · `portfolios/02-kora-interiors` - Kora Spatial (`veluryn-kora-interiors`)
- **Niche & Geography:** Turnkey Luxury Interiors & German-CNC Modular Architecture · Chennai, Bengaluru, Hyderabad (India).
- **Hero Style (Tenista Kinetic Editorial Architectural Frame):** Sunlit coastal limestone residence photograph, bold 2-line headline (*"Architectural Calm. / Delivered to Precision."*), 2-line subcopy (`Bespoke residences engineered in-house with +-0.1mm CNC joinery and honest turnkey timelines.`), 2 buttons (`Estimate Feasibility` + `Selected Residences`).
- **Dedicated Frames:**
  1. Hero -> 2. Studio Architecture vs Mass Portals (dismantling Livspace/HomeLane token traps & subcontracting) -> 3. Captive CNC & Materiality Bento (`+-0.1mm` CNC nesting, `PUR 150C` edge banding, `IS:710 BWP` marine ply for Chennai vs `>850 kg/m3` HDHMR, tactile Travertine/Teak/Brass tiles) -> 4. Shell-to-Handover 4-Stage Timeline (`12 - 16` weeks Hybrid CNC + Bespoke) -> 5. 3-Step Usable Carpet Area & Finish Tier Qualifier (`1,500 - 10,000+ sq ft` slider, explicit Carpet Area label, `₹2,500 / ₹4,200 / ₹6,200+ per sq ft`, City Factor `Chennai / Bengaluru / Hyderabad` -> `₹50L - ₹3Cr+` bracket + WhatsApp brief) -> 6. Residence Case Studies (filterable Villas / Penthouses / Coastal) -> 7. FAQ -> 8. Opnest Horizon Footer (`KORA`).

### Site 03 · `portfolios/03-luma-dental` - Luma Dental Atelier (`veluryn-luma-dental`)
- **Niche & Geography:** Dental Implants, All-on-4 Full Arch & Digital Smile Design · Chennai, Hyderabad, Bengaluru (India).
- **Hero Style (Aeline Pure White + Cobalt Mist + 3D Clinical Suite/Smile Fan):** Crisp surgical light/clinical precision palette, 2-line H1 (*"Guided Precision. / Restored in One Visit."*), 2-line subcopy detailing MDS-led 3D CBCT dental implants, zirconia full-arch bridges, and trial mock-ups, 2 buttons (`Calculate Implant EMI` + `View Suites & Lab`).
- **Dedicated Frames:**
  1. Hero + Card Fan -> 2. 7-Step European Class-B CSSD Sterilization & In-House CAD/CAM Lab Bento (`Straumann`, `Nobel Biocare`, `Osstem`, `Ivoclar`) -> 3. Three Core Modalities (`Single Zirconia Implant`, `All-on-4 Full Arch`, `Digital Smile Design + Aligners`) -> 4. Digital "Trial Smile" 3-Step Process (`CBCT Scan -> Digital Mock-up -> Reversible Test Drive Before Prep`) -> 5. 3-Step Implant/Smile & 0% EMI Estimator (`₹25k` single -> `₹3.5L+` Zirconia All-on-4, interactive `6 / 12 / 24 mo` EMI slider + `"Share OPG on WhatsApp"` CTA) -> 6. Accredited Clinicians (MDS + State Dental Council Reg. Nos.) + FAQ -> 7. Opnest Horizon Footer (`LUMA`).
- **Compliance (NDC Advisory M-2672):** NO promotional face before-after sliders, NO `"painless"` or `"India's best"`. Visualize sterile labs, 3D CBCT geometry, and implant components cleanly.

### Site 04 · `portfolios/04-crestline-homes` - Crestline Custom Homes (`veluryn-crestline-homes`)
- **Niche & Geography:** Custom Architectural Residences & Infinity Edge Estates · Austin, Naples, Scottsdale (United States).
- **Hero Style (Tenista Full-Bleed Twilight Residence):** Deep architectural photography, 2-line H1 (*"Architectural Permanence. / Built Without Overruns."*), 2-line subcopy (*"Fixed-price engineering lock and zero-edge pool construction across Austin, Naples, and Scottsdale."*), 2 buttons (`Commission Dossier` + `Selected Estates`).
- **Dedicated Frames:**
  1. Hero -> 2. Selected Residences Monograph Grid (crediting Partnering Architect + Landscape Architect + structural stone/glazing systems on clickable Dossier Drawer) -> 3. Weeks 12-16 Pre-Construction Engineering Lock (`Site & Geotech -> BIM Clash Lock -> Allowance Freeze -> Fixed-Price Contract`) -> 4. Concurrent Infinity Edge & Hydraulic Engineering Bento (`+-1.5mm / 1/16"` laser-leveled weir tolerance, structural surge basins, HVHZ / hillside piling) -> 5. `1-2-10` Structural Warranty & Estate Care Strip -> 6. 3-Step Regional Envelope Estimator (`Austin $450-$1000+/sf`, `Naples $550-$2500+/sf`, `Scottsdale $550-$1300+/sf` + Infinity Pool tiers -> `$1.5M - $8M+` Dossier unlock, no cheap discount framing) -> 7. FAQ -> 8. Opnest Horizon Footer (`CRESTLINE`).

### Site 05 · `portfolios/05-sova-botanicals` - Sova Botanicals (`veluryn-sova-botanicals`)
- **Niche & Geography:** D2C Clinical Skincare & Hand-Compounded Extrait de Parfum House · Global + India Direct (`INR ₹` / `USD $`).
- **Hero Style (Aeline Editorial Ivory + Botanical Acid Accent `#C8F169` + 7-Card Sculptural Packshot Fan):** 2-line H1 (*"Clinical Actives. / Bottled in Raw Resin."*), 2-line subcopy (*"Dermatologist-tested barrier formulations and IFRA-certified extraits shipped fresh with zero retail markups."*), 2 buttons (`Build 2-Step Ritual` + `Explore Formulations`) + whisper header `INR ₹ / USD $` toggle.
- **Dedicated Frames:**
  1. Hero + Bottle/Texture Card Fan -> 2. Press & Batch Authenticity Strip (*Vogue, Bazaar*, IFRA & Lab Batch Traceability) -> 3. Hero Formulations Matrix (30ml/50ml/100ml radio pills + Top/Heart/Base olfactory notes or Active % + inline Add-to-Bag) -> 4. "Science of Proof" Clutter-Free Bento (`+42% 24h hydration corneometer n=42`, `94% consumer smoothness agreement n=50`, cleanly separating clinical instrumental data from survey panels) -> 5. Interactive 2-Step Routine / Scent Discovery Builder (Step 1 Concern or Scent Mood -> Step 2 Modular 2-Step Pair + `"100% Discovery Credit Toward Full Bottle"` + GST-inclusive `INR` vs DDP `USD` shipping calculator) -> 6. Slide-Out Modular Cart Drawer -> 7. FAQ -> 8. Opnest Horizon Footer (`SOVA`).

---

## 8. Mandatory Automated QA & Deployment Thresholds

Before declaring ANY site done:
- [ ] **Type & Build Gate:** `npm run build` (`tsc -b && vite build`) exits `0`. Zero em/en dashes (`\u2014`, `\u2013`) in HTML/TS/TSX/CSS.
- [ ] **Estimator Math Self-Check:** Node assert script covers every permutation of zones/tiers/currencies and verifies output math + clean formatted brief URLs.
- [ ] **Live Media Audit:** Every `<img src>` returns HTTP `200`, non-empty bytes, `complete && naturalWidth > 0`, and portrait faces have full forehead clearance (`object-top`).
- [ ] **Browser Desktop (`1440x900`) Check:** Hero fits cleanly above the fold (`H1 <= 2` lines, `p <= 2` lines, `2` buttons, single showcase, zero overlapping badges), `0` console errors, `0` horizontal overflow (`scrollWidth <= innerWidth`), interactive modal `×`, tabs, FAQ `×`, and Horizon Footer contrast (`>= 4.5:1`) all pass.
- [ ] **Browser Mobile (`390x844`) Check:** `0` horizontal overflow, hamburger drawer opens opaque `#0D0D0D` & closes on `Escape`/`×`, sticky bar stays HIDDEN at `scrollY = 0` and appears only past Hero CTA without hiding footer, interactive tap buttons `>= 44px`.
- [ ] **Core Web Vitals Discipline:** Above-the-fold hero image has `fetchpriority="high" loading="eager"` and explicit `aspect-[...]` / dimensions (`LCP < 2.5s`, `CLS < 0.05`).

---

## 9. Anti-Patterns Strictly Banned

1. **Purple/Indigo SaaS Slop:** Glowing dark slate-950 aurora blobs and gradient CTA buttons -> **NEVER.**
2. **"Cardocalypse" Grids:** 3 or 4 identical cards with top circular icon, bold 3-word title, and 2-line gray blurb -> **NEVER.**
3. **Crowded Heroes:** Putting stats bars, booking forms, review stars, or 4 pills inside the hero frame -> **NEVER.**
4. **Sticky Bar at `scrollY = 0`:** Fixed bottom bar slicing through Hero CTAs/metrics on mobile initial load -> **NEVER.**
5. **Broken CSS Specificity in State Toggles:** Appending dark active Tailwind class without removing the conflicting light background utility (`bg-[#F5F5F4]` + `bg-[#0D0D0D]`) -> **ALWAYS use clean ternary class toggles.**
6. **Stale Submission Previews / `"Guest"` Leaks:** Showing `"WhatsApp Preview"` after inputs were cleared or invalidated, or pre-filling `"Name: Guest"` in general CTA buttons -> **ALWAYS reset `submitted` on upstream changes.**
7. **Half-Head Portraits:** Default `object-cover` cropping hairlines on top -> **ALWAYS use `object-top` or `[object-position:50%_20%]`.**
8. **Static Image-Only Filler:** Sites where nothing responds cleanly to scroll, hover, modal inspection, timeline milestones, or interactive calculations -> **EVERY site must feel alive and real.**
