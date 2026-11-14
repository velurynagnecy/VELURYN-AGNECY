# VELURYN AGNECY: Production Deployment & Hosting Guide

Complete guide for pushing this project to GitHub and deploying on **Cloudflare Pages** with serverless AI chat functions and search engine optimization.

---

## 1. Git & GitHub Repository Setup

From the project root (`veluryn-agnecy-main-site (1)`):

```bash
# 1. Initialize git repository (if not already initialized)
git init -b main

# 2. Stage all project files (.gitignore automatically protects .env and node_modules)
git add .

# 3. Create initial production commit
git commit -m "feat: production release ready for Cloudflare Pages"

# 4. Link your GitHub remote repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push to GitHub
git push -u origin main
```

> [!IMPORTANT]
> The included `.gitignore` keeps `.env` safe. Never commit API keys to GitHub.

---

## 2. Cloudflare Pages Deployment

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Compute (Workers) > Workers & Pages > Create application > Pages > Connect to Git**.
3. Select your GitHub repository.
4. Set the build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave empty if repo root is the site folder)
5. Under **Environment variables**, click **Add variable** and set:
   - `GEMINI_API_KEY` = your Gemini API key (from [Google AI Studio](https://aistudio.google.com/app/apikey))
   - `GEMINI_MODEL` = `gemini-3-flash-preview`
   - `NODE_VERSION` = `20`
6. Click **Save and Deploy**.

---

## 3. Serverless AI Assistant (`/api/chat`)

Your Yedsen Assistant chat uses Cloudflare Pages Functions located in `/functions/api/chat.ts`.
- When deployed, Cloudflare automatically compiles this function into an edge endpoint.
- It reads `GEMINI_API_KEY` securely from Cloudflare environment variables, keeping your key hidden from the browser.
- Fallback logic is built in: if `gemini-3-flash-preview` is ever rate-limited, it automatically routes through `gemini-3.1-flash-lite`.

---

## 4. Custom Domain Setup

1. In your Cloudflare Pages project, go to **Custom domains > Set up a custom domain**.
2. Enter `velurynagnecy.com` (and `www.velurynagnecy.com`).
3. Cloudflare will automatically provision SSL certificates and edge DNS records.

---

## 5. SEO & Performance Optimizations Included

- **Edge Caching**: `public/_headers` configures immutable 1-year browser and edge cache for all hashed CSS/JS/fonts in `/assets/*`.
- **SPA Routing**: `public/_redirects` maps `/* -> /index.html 200` for client-side routing on hard refreshes.
- **Code Splitting**: Rollup vendor chunks (`vendor-react`, `vendor-motion`, `vendor-icons`) reduce initial bundle load by >70%.
- **Search Metadata**: Full OpenGraph, Twitter Cards, canonical links, and `robots.txt` are configured.
- **Structured Data**: `index.html` includes Schema.org `ProfessionalService` JSON-LD for rich snippets in Google Search.
- **Sitemap**: `public/sitemap.xml` indexes all 24 site routes. Submit `https://velurynagnecy.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
