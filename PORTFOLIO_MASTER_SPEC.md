# VELURYN STUDIO — 5-Website Remote Agent Master Spec

Read this file **end-to-end** AND visually inspect every file inside `references/visual-refs/` before writing a single line of code.

---

## 0. Context & Visual References Included in This Repository

### Visual Design References (`references/visual-refs/`)
- `references/visual-refs/01-aeline-hero-bento.jpg`: Minimalist floating header + razor-sharp **2-line headline**, **2-line subcopy**, **2 pill buttons**, and an atmospheric **curved 3D fan showcase** below, transitioning cleanly into whitespace-rich editorial proof + modular Bento stats grid.
- `references/visual-refs/02-tenista-editorial-kinetic.jpg`: Oversized architectural editorial kinetic hero + clean off-white canvas with kinetic depth / overlapping tilted focus frame + crisp facility cards.
- `references/visual-refs/03-opnest-horizon-footer.jpg`: Clean multi-column footer transitioning seamlessly into an atmospheric sunlit horizon with giant semi-transparent brand wordmark bleeding across the landscape.

### Codebase Pattern References (`references/`)
- `references/veluryn-main/`: Interactive **curved 3D card fan carousel** (`src/components/ui/card-fan-carousel.tsx`), **hover reveal stack**, **3D card tilt**, **interactive accordion**, Lenis + GSAP motion conventions (`pages/Home.tsx`, `src/index.css`, `package.json`).
- `references/atelier-vastu/`: Multi-band rounded Swiss/Bauhaus section rhythm, Indian high-ticket INR project/budget estimator logic, typography discipline (`Plus Jakarta Sans` + `JetBrains Mono` / editorial serif).
- `references/terrane-luxury-build/`: Architectural luxury portfolio layout, high-contrast scrims, case-study card structure.

Reuse and elevate the strongest interactive primitives from these three codebases (such as adapting the **3D Card Fan** in `veluryn-main/src/components/ui/card-fan-carousel.tsx` into pure clean Tailwind/GSAP sections) inside fresh, standalone Vite + React 19 + TypeScript + Tailwind v4 projects under `portfolios/`. **NEVER edit or break `references/`.**

---

## 1. Non-Negotiable Visual, Hierarchy & UX Rules (Strict Enforcement)

1. **The Strict Hero Rule:**
   The Hero frame (`min-h-screen` / above-the-fold `100svh`) may contain **ONLY**:
   - Floating minimalist top navigation pill/bar (`<= 5` links + 1 right CTA).
   - **Exact 2-line display headline** (crisp, scannable, tight leading `~1.04`, `-0.04em` tracking).
   - **Exact 2-line small paragraph** right below the headline (concise, plain English value proposition — `<= 18 words`, styled with `max-w-lg text-sm sm:text-base`).
   - **Exact 2 pill buttons** right below the paragraph (1 primary high-contrast CTA + 1 secondary quiet button).
   - **One signature visual composition** below or integrated cleanly behind the hero copy (e.g., an Aeline-inspired curved interactive showcase fan OR a Tenista-inspired full-bleed atmospheric frame) — **NO forms, NO multi-card grids, NO stat ribbons inside the Hero viewport.**
2. **One Information Per Frame Rule:**
   - Every scroll frame (`min-h-[82vh]` to `min-h-screen` or cleanly padded `py-24 sm:py-32` viewport band) presents **ONE single message, ONE clear focal interactive element, and generous breathing room**.
   - Never cram treatments + pricing + reviews + FAQ into the same visual viewport. Let the visitor understand in 1 second why this brand is the #1 leader in its niche as they scroll down.
3. **Lively, Real-Company Authenticity (Zero "Template" Feel):**
   - Zero `Lorem ipsum`, zero `Logoipsum`, zero fake `"Guest"` placeholders, zero dead `#` buttons.
   - Real, domain-authentic copy tailored to each company (real clinical/architectural/product workflows, real Indian/US pricing & timelines, real interactive estimators that produce real actionable WhatsApp/project briefs).
   - Smooth **Lenis** + **GSAP ScrollTrigger** motion (`prefers-reduced-motion` guarded), interactive card fans/carousels, interactive 3-step triage/estimator funnels, smooth FAQ accordions, and opaque mobile drawers (`Escape` key + body scroll lock).
4. **Monumental Opnest-Style Atmospheric Horizon Footer (`03-opnest-horizon-footer.jpg`):**
   - Clean architectural footer top row (brand pitch + 3–4 clean link columns) fading smoothly into a **full-bleed natural/atmospheric horizon backdrop** with the studio/company name rendered in giant bold translucent typography behind the horizon ridge.
   - Include clean subtle agency credit above/alongside the legal line: `Crafted by VELURYN STUDIO · VELURYN AGNECY · velurynagnecy.com`
5. **Typography & Copy Discipline:**
   - **ZERO em dashes (`—`) or en dashes (`–`) anywhere** in copy, filenames, or JS strings. Use middle dots (`·`), colons, commas, or standard hyphens (`-`).
   - Zero garbled symbols, zero text overflowing containers (`overflow-x: clip`), `>= 44px` tap targets on mobile (`390x844`).
6. **Verified Imagery Only (`naturalWidth > 0`):**
   - Every `<img>` MUST load cleanly with zero 404s, zero watermarks, zero distorted aspect ratios (`object-cover object-top` on portraits so foreheads/hair are never cropped).
   - Prefer clean verified photography URLs (`images.unsplash.com` / `images.pexels.com` checked to return HTTP 200 and non-empty image bytes via Node/curl during build QA) or crisp generated/local SVG/canvas textures paired with verified photography.

---

## 2. The 5 Standalone Websites to Build Under `portfolios/`

Each folder must be a completely self-contained **Vite + React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`) + GSAP + Lenis + lucide-react** SPA with its own `package.json`, `npm run build` verification, estimator unit assertion script, and Vercel production deployment:

1. **`portfolios/01-solen-hair-clinic` — Solen Medical (`veluryn-solen-hair`)**
   - **Niche:** Luxury Hair Transplant & Follicular Restoration Super Speciality (Chennai · Bengaluru · Coimbatore · India).
   - **Hero Style:** **Aeline / Architectural Clarity** — Cool serene sky-limestone daylight palette + crisp floating nav, 2-line H1, 2-line subcopy, 2 buttons, plus curved interactive **7-card Clinical & Outcome Fan** showcasing real procedures & regrowth milestones.
   - **Interactive Core Frame:** 3-Step Hair Restoration & INR Graft Estimator (`Sapphire FUE / Bio-DHI / Beard / GFC`) -> live graft count, session days, `0%` EMI & formatted WhatsApp brief preview.

2. **`portfolios/02-kora-interiors` — Kora Spatial (`veluryn-kora-interiors`)**
   - **Niche:** Luxury Turnkey Interiors & German-CNC Modular Architecture (Chennai · Bengaluru · Hyderabad · India).
   - **Hero Style:** **Tenista Kinetic Editorial** — Sunlit architectural stone/timber full-bleed hero frame with oversized typography behind/around a focal sunlit living space, 2-line headline, 2-line paragraph, 2 buttons.
   - **Interactive Core Frame:** 3-Step Home Scope & INR Budget Qualifier (`2 BHK / 3 BHK / Duplex / Villa` + `Essential / Signature / Rare` finish toggle + interactive carpet-area slider) -> 45-day modular timeline & WhatsApp brief.

3. **`portfolios/03-luma-dental` — Luma Dental Atelier (`veluryn-luma-dental`)**
   - **Niche:** Full-Mouth Dental Implants, Digital Smile Design & Cosmetic Dentistry (Chennai · Hyderabad · Bengaluru · India).
   - **Hero Style:** **Aeline Pure Luminous White & Cobalt Mist** — Clean minimalist white/alabaster aesthetic with curved 3D smile & prosthetic showcase fan, 2-line headline, 2-line subcopy, 2 buttons.
   - **Interactive Core Frame:** 3-Step Implant & Smile Assessment Calculator (`Single Ceramic Implant / All-on-4 Full Arch / Porcelain Veneers / Invisible Aligners`) -> indicative INR range, 0% EMI breakdown, visit count, & WhatsApp consultation brief.

4. **`portfolios/04-crestline-homes` — Crestline Custom Homes (`veluryn-crestline-homes`)**
   - **Niche:** Custom Luxury Architectural Residences, Outdoor Living & Infinity Pools (Austin · Naples · Scottsdale · United States).
   - **Hero Style:** **Tenista Bold Motion & Depth** — Full-bleed twilight/sunlit courtyard pavilion photography with crisp 2-line headline, 2-line subcopy, 2 buttons, followed by single-focus full-viewport signature residence frames and kinetic Bento engineering metrics (`16-Week Architectural Lock`, `$1.5M - $8M+ Builds`).
   - **Interactive Core Frame:** 3-Step Residence & Infinity Pool Scope Estimator (Sq. Ft., Architectural Package, Lot Stage -> USD range & consultation brief).

5. **`portfolios/05-sova-botanicals` — Sova Botanicals (`veluryn-sova-botanicals`)**
   - **Niche:** High-Convert D2C Clinical Skincare & Extrait de Parfum House (Global · Direct-to-Consumer Flagship).
   - **Hero Style:** **Aeline Elevated Editorial + Vibrant Botanical Accent** — Warm ivory `#FAFAF8` + obsidian `#0D0D0D` + electric chartreuse/botanical green `#C8F169` micro-accents, curved interactive 3D product & ritual card fan, 2-line headline, 2-line subcopy, 2 buttons.
   - **Interactive Core Frame:** 2-Step Skin/Scent Ritual Builder + Live Formulation Pack Bag & Instant Routine Summary (`Barrier Serum · UV Veil · Extrait Duo` -> INR/USD currency switch & ritual summary).

---

## 3. Automated Build, Verification & Deployment Workflow

For **EACH** of the 5 folders (`01-solen-hair-clinic` .. `05-sova-botanicals`):
1. Install dependencies: `npm install`.
2. Write clean modular components under `src/components/`, `src/data/`, and `src/lib/`.
3. Verify zero em/en dashes (`\u2014`, `\u2013`), run a small Node assert test for interactive estimator/calculator math, verify every remote image URL returns `HTTP 200` and `image/*` content-type.
4. Run `npm run build` (`tsc -b && vite build`) and confirm exit code `0`.
5. Run a live headless browser smoke check (Playwright/Puppeteer if available in cloud VM, or preview server + full DOM/computed layout check across `1440x900` and `390x844`): confirm zero console errors, zero broken images (`naturalWidth > 0`), zero horizontal overflow, hero has 2-line H1 + 2-line p + 2 CTAs cleanly spaced.
6. Deploy `dist` to Vercel production:
   ```bash
   npx vercel deploy dist --prod --yes --name <vercel-project-name> --token "$VERCEL_TOKEN"
   ```
   Confirm the returned `https://*.vercel.app` URL responds with `HTTP 200`.

## 4. Final Reporting & GitHub Sync
1. Record all 5 live production Vercel URLs, build checks, image check status, and desktop/mobile QA results in `DEPLOYMENTS.md` at the repository root.
2. Commit and push all 5 projects + `DEPLOYMENTS.md` back to the **`portfolios-remote`** branch (`git push origin portfolios-remote`). Never force-push or modify `main` unless explicitly requested.
