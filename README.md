# Veluryn Agnecy — Official Website

Built with Next.js 14 + Tailwind CSS. Steel grey corporate design system.

## Setup in Cursor

```bash
# 1. Open this folder in Cursor
# 2. Install dependencies
npm install

# 3. Drop all your assets into /public/assets/
#    Required files:
#    - logo.png             (your V lightning bolt — transparent bg)
#    - hero-bg.jpg
#    - va-mgmt-bg.jpg
#    - vasd-bg.jpg
#    - about-spotlight.jpg
#    - va-mgmt-editorial.jpg
#    - vasd-fiber.jpg
#    - stats-bg.jpg
#    - noise-overlay.png
#    - grid-texture.png

# 4. Run dev server
npm run dev

# 5. Open http://localhost:3000
```

## Structure

```
src/
├── app/
│   ├── layout.tsx      — Root layout + fonts + metadata
│   ├── globals.css     — Design system + utilities
│   └── page.tsx        — Homepage (assembles all sections)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx  — Sticky nav, scroll-aware
│   │   └── Footer.tsx  — Full footer with socials + sub-brands
│   ├── sections/
│   │   ├── Hero.tsx       — Full viewport hero
│   │   ├── Manifesto.tsx  — Philosophy / About
│   │   ├── VAMgmt.tsx     — VA Mgmt vertical
│   │   ├── VASD.tsx       — VASD vertical
│   │   ├── Services.tsx   — Full services table
│   │   ├── Stats.tsx      — Numbers section
│   │   └── Contact.tsx    — Contact form + info
│   └── ui/
│       └── Button.tsx  — Reusable button component
├── lib/
│   └── utils.ts        — cn() helper
└── hooks/
    └── useReveal.ts    — Scroll reveal hook

public/
└── assets/             — Drop ALL your generated images here
```

## Design Tokens

| Token         | Value     | Usage                     |
|---------------|-----------|---------------------------|
| charcoal      | #1A1C24   | Page background           |
| charcoal-2    | #22242E   | Card/section backgrounds  |
| charcoal-3    | #2A2D38   | Hover states              |
| platinum      | #E8E8F0   | Primary text + CTAs       |
| silver        | #C4C4D4   | Secondary text            |
| silver-dim    | #8A8AA0   | Muted text                |
| steel-blue    | #4A6580   | VASD accent               |

## Contact Form

The form currently uses a local state handler.
To make it functional, connect to one of these free services:

- **Formspree** (formspree.io) — easiest, free tier
- **EmailJS** — no backend, free tier
- **Resend** — developer-focused, free tier

## Deploy

```bash
# Push to GitHub, then connect repo to Cloudflare Pages
# Cloudflare detects Next.js automatically — zero config
npm run build  # test build locally first
```

## Brand

- **Veluryn Agnecy** — "AGNECY" is intentional brand spelling
- **VA Mgmt** = Veluryn Agnecy Management (Influencer Marketing)
- **VASD** = Veluryn Agnecy Service Digital (Email Filtering)
- All socials: @velurynagnecy
- CEO: Vivin Bharathi
