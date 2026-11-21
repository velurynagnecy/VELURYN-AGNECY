# New Chat Build & Deployment Prompt

Open a **New Conversation** in Antigravity with Workspace set to `D:\app files\VASD-VELURYN AGNECY`, copy everything inside the code block below, paste it as your first message, and use `/goal` if you want it to run continuously until all 5 sites are deployed.

> **Security reminder:** Do NOT paste your Vercel token into any file or commit. Paste it directly in chat when the new agent is ready to run `npx vercel deploy` (or include it only inside your chat prompt, never inside repo files).

---

```text
Work inside `D:\app files\VASD-VELURYN AGNECY\veluryn-portfolios-remote` (stay strictly on branch `portfolios-remote`; NEVER modify `main` or `source`, and NEVER write any tokens or passwords into files).

Step 1 - Mandatory Discovery (Read Before Coding):
1. Read `WEBSITE_DESIGN_SYSTEM.md` and `PORTFOLIO_MASTER_SPEC.md` completely.
2. Visually inspect all 3 reference screenshots inside `references/visual-refs/` (`01-aeline-hero-bento.jpg`, `02-tenista-editorial-kinetic.jpg`, `03-opnest-horizon-footer.jpg`) using `read_file`.
3. Inspect the core code patterns we already built in:
   - `references/veluryn-main/src/components/ui/card-fan-carousel.tsx` (curved 3D card fan pattern)
   - `references/atelier-vastu/src/components/home/` (Swiss/DARION rounded band rhythm & estimator patterns)
   - `references/terrane-luxury-build/src/components/` (architectural case dossiers & scope estimator)

Step 2 - Build All 5 Standalone Websites One by One:
Create 5 self-contained Vite + React 19 + TypeScript + Tailwind CSS v4 (`@tailwindcss/vite`) + GSAP (`gsap` + `@gsap/react`) + Lenis (`lenis`) + `lucide-react` apps:
1. `portfolios/01-solen-hair-clinic` -> Solen Medical (Vercel name: `veluryn-solen-hair`)
2. `portfolios/02-kora-interiors` -> Kora Spatial (Vercel name: `veluryn-kora-interiors`)
3. `portfolios/03-luma-dental` -> Luma Dental Atelier (Vercel name: `veluryn-luma-dental`)
4. `portfolios/04-crestline-homes` -> Crestline Custom Homes (Vercel name: `veluryn-crestline-homes`)
5. `portfolios/05-sova-botanicals` -> Sova Botanicals (Vercel name: `veluryn-sova-botanicals`)

Every single site MUST strictly pass all rules in `WEBSITE_DESIGN_SYSTEM.md`:
- Hierarchical Hero: minimal floating header, ONLY a 2-line display H1, ONLY a 2-line small paragraph below it, ONLY 2 CTA pills below that, paired with 1 signature visual (Aeline-style curved 3D card fan OR Tenista-style kinetic full-bleed frame), with `10-20%` next-frame bottom peek to eliminate false floors. ZERO forms, metrics bars, or extra badges inside the hero.
- One Information Per Viewport Frame: crisp spacious visual pacing where scrolling tells a persuasive story proving the company is the category leader.
- Lively Real-Company Engineering: GSAP + `@gsap/react` (`useGSAP`, `fromTo`, `gsap.matchMedia`, `gsap.ticker` synced with `lenis` + `lagSmoothing(0)`), asymmetric 12-col Bento frames, filterable dossiers/timelines, working 2-to-3 step calculators/qualifiers (contact gated last, no fake `"Guest"` defaults), clean `×` modals, mobile bottom sticky bar hidden at `scrollY = 0` (`IntersectionObserver`), and an Opnest-style atmospheric horizon wordmark footer crediting `VELURYN STUDIO · VELURYN AGNECY · velurynagnecy.com`.
- Zero em dashes (`\u2014`) or en dashes (`\u2013`), verified HTTP 200 images (`naturalWidth > 0`, `object-top` on portraits).

Step 3 - Verify & Visual QA Each Site Before Deploying:
For each of the 5 sites:
1. Write & run a small Node assertion script testing all calculator/estimator edge cases + scanning source files for zero em/en dashes and zero placeholders.
2. Verify every external image URL returns HTTP 200 and an image content-type (never blindly trust guessed stock URLs).
3. Run `npm run build` (`tsc -b && vite build`) and confirm exit code 0.
4. Run local preview (`npx vite preview --host 127.0.0.1 --port 417x`) and inspect via the `browser` subagent across BOTH Desktop (`1440x900`) and Mobile (`390x844`): confirm zero console errors, zero horizontal overflow, 2-line H1 + 2-line paragraph + 2 CTAs above fold, all images crisp (`naturalWidth > 0`), all modals/tabs/FAQs/estimators working cleanly, then stop the preview task before moving on.

Step 4 - Deploy All 5 to Vercel & Sync `portfolios-remote`:
1. Deploy each verified `dist/` folder with:
   `npx vercel deploy dist --prod --yes --name <vercel-name> --token "<ASK ME FOR TOKEN OR USE TOKEN PASSED BELOW>"`
2. Verify each live `https://*.vercel.app` URL returns HTTP 200.
3. Update `DEPLOYMENTS.md` at the root of `veluryn-portfolios-remote` with all 5 live URLs, verification checks, and screenshots/QA notes.
4. Scan the repo for zero secrets (`vcp_`, `ghp_`, `.env`), commit cleanly to `portfolios-remote`, and push to `origin portfolios-remote`. Do not touch `main`.

Ask me for my Vercel token when ready to deploy (or check if I pasted it right below this prompt).
```
