import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dailyJsonPath = path.join(rootDir, 'src', 'data', 'daily-releases.json');
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');

// Load local .env if present
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const todayIso = new Date().toISOString().slice(0, 10);
const todayFormatted = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

// Curated fallback bank so daily publishing succeeds 100% of the time even without LLM quota
const FALLBACK_BANK = [
  {
    tool: {
      id: 'veluryn-dkim-pulse',
      name: 'Veluryn DKIM-Pulse',
      category: 'Email Automation',
      engine: 'Rust · Tokio + Hickory-DNS',
      status: `Daily Drop · ${todayFormatted}`,
      summary: 'Real-time DNS, SPF, DKIM, and DMARC deliverability verifier and inbox placement monitor built in Rust for high-volume cold email infrastructure.',
      specs: [
        'Asynchronous DNS-over-HTTPS resolution across 500+ sending domains in under 120ms',
        'Automated blacklist check and TLS certificate expiration alerts via webhook',
        'Zero-dependency binary with JSONL output for CI/CD outreach pipelines',
      ],
      cliSnippet: 'dkim-pulse verify --domains domains.txt --out report.jsonl',
    },
    prompt: {
      id: 'flow-perfume-noir',
      title: 'Artisanal Perfume & Glass Refraction Prompts',
      tool: 'Google Flow',
      ratio: '9:16',
      category: `Daily Drop · ${todayFormatted}`,
      summary: 'Cinematic Google Flow prompt pack for luxury fragrance launches featuring caustic glass light refractions, slow-motion mist dispersion, and obsidian studio reflections.',
      samplePrompt:
        'Macro 100mm cinema lens shot of a heavy cut-crystal amber perfume flacon on wet black basalt stone, golden caustic light rays refracting through the liquid, ultra-fine atomized mist suspended in slow motion, moody chiaroscuro studio lighting, 9:16 vertical.',
      deliverables: ['20 caustic glass & mist Google Flow prompts', 'Refraction lighting tokens', 'Luxury fragrance pacing guide'],
    },
    article: {
      id: 'why-rust-powers-modern-marketing-infrastructure',
      title: 'Why We Build Our Marketing and Security Infrastructure in Rust',
      date: todayFormatted,
      tag: 'Engineering',
      excerpt: 'How memory-safe, single-binary Rust tools give modern agencies an unfair speed and reliability edge over bloated SaaS stacks.',
      body: [
        'Most marketing agencies run on a fragile patchwork of rented SaaS subscriptions, webhook glue, and slow scripting runtimes.',
        'When a campaign scales or an API endpoint gets hammered by traffic, those layers break, leak credentials, or rack up unpredictable cloud bills.',
        '## The Case for Rust in Agency Operations',
        'At **VELURYN AGNECY**, we took a different path. From our **ICA** cyber security division to our internal email automation and API gateways, we build core infrastructure in **Rust**.',
        'Rust compiles directly to native machine code with zero garbage-collection pauses. A service that requires gigabytes of RAM in Node or Python runs in a few megabytes in Rust.',
        '## Four Areas Where Rust Changes the Game',
        '1. **Email Automation**: High-throughput SMTP/API dispatch with deterministic rate pacing and zero dropped webhooks.',
        '2. **API Gateways**: Protecting upstream LLM keys (like Gemini and Groq) behind sliding-window IP rate limiters and strict CORS policies.',
        '3. **Cyber Security**: Memory-safe TLS auditing, header hardening, and bot mitigation with zero C/C++ buffer overflow risks.',
        '4. **ML Inference**: Running local ONNX and Candle models to score leads and classify UGC hooks in single-digit milliseconds.',
        '## Owning the Stack',
        'When you own the underlying tools—and combine them with human-directed **Google Flow** visuals—you stop paying the SaaS tax and start shipping faster than competitors.',
        '**VELURYN AGNECY**',
        '*Engineered in Rust. Directed by humans.*',
      ],
    },
  },
  {
    tool: {
      id: 'sentinel-webhook-firewall',
      name: 'Sentinel Webhook-Shield',
      category: 'Cyber Security',
      engine: 'Rust · Axum + Ring',
      status: `Daily Drop · ${todayFormatted}`,
      summary: 'Cryptographic webhook verifier and replay-attack firewall in Rust that validates Stripe, Razorpay, Shopify, and GitHub signatures at the edge.',
      specs: [
        'Constant-time HMAC-SHA256 and Ed25519 signature verification using Ring',
        'Sliding timestamp window blocks replay attacks and duplicate webhook deliveries',
        'Forwards verified payloads to internal microservices with sub-millisecond overhead',
      ],
      cliSnippet: 'sentinel-webhook --listen 0.0.0.0:4000 --replay-window 300s',
    },
    prompt: {
      id: 'flow-streetwear-lookbook',
      title: 'Urban Streetwear & Anamorphic Flash Prompts',
      tool: 'Google Flow',
      ratio: '9:16',
      category: `Daily Drop · ${todayFormatted}`,
      summary: 'High-energy Google Flow prompt pack for streetwear drops and sneaker campaigns using 35mm anamorphic lenses, kinetic whip-pans, and tungsten streetlamp reflections.',
      samplePrompt:
        'Handheld 35mm anamorphic tracking shot following a streetwear model in an oversized heavyweight charcoal hoodie walking through rain-slicked Tokyo neon alleys at night, directpaparazzi flash burst, crisp fabric weave detail, kinetic whip-pan transition, 9:16 vertical.',
      deliverables: ['25 streetwear & sneaker Google Flow prompts', 'Kinetic camera motion modifiers', 'Night neon color-grade tokens'],
    },
    article: {
      id: 'google-flow-prompt-engineering-for-vertical-ads',
      title: 'How to Write Google Flow Prompts That Actually Convert on Reels and TikTok',
      date: todayFormatted,
      tag: 'AI Studio',
      excerpt: 'Why generic AI video prompts fail in paid social—and how specifying lens focal length, lighting physics, and first-second motion transforms retention.',
      body: [
        'Most AI video prompts fail in paid social for a simple reason: they describe a **subject** instead of a **camera shot**.',
        'When a viewer scrolls Instagram Reels or TikTok, their brain decides in under 1.2 seconds whether a video looks like a cheap AI generation or a commercial worth watching.',
        '## Specify the Lens and Camera Physics First',
        'In **Google Flow**, starting your prompt with the focal length (`85mm macro`, `35mm handheld`, `24mm low-angle`) and camera motion (`slow dolly push-in`, `subtle handheld micro-shake`) anchors the perspective immediately.',
        '## Control Specular Highlights and Surface Texture',
        'Flat lighting screams synthetic video. Always pair your subject with a directional key light and a surface interaction—such as warm tungsten rim light catching silk threads, or morning window sunlight reflecting off a glass serum dropper.',
        '## Human Planning + AI Execution',
        'At **VELURYN STUDIO**, AI generates the pixels, but human art directors write the shot list, pacing, and hook structure. You can test our free sample prompts directly on our **Products** page.',
        '**VELURYN STUDIO**',
        '*Words say nothing when visuals are everything.*',
      ],
    },
  },
  {
    tool: {
      id: 'veluryn-hook-ranker',
      name: 'Veluryn HookRanker-RS',
      category: 'ML Tools',
      engine: 'Rust · ONNX + Tokenizers',
      status: `Daily Drop · ${todayFormatted}`,
      summary: 'Fast CLI and HTTP microservice in Rust that scores short-form ad scripts and UGC opening hooks for 3-second thumbstop probability before production.',
      specs: [
        'Tokenizes and scores 1,000+ ad script variations per second on a single CPU core',
        'Flags weak opening verbs, passive phrasing, and delayed value propositions',
        'Outputs ranked JSON tables ready for creative strategy teams',
      ],
      cliSnippet: 'hook-ranker eval --scripts campaign-hooks.csv --top 10',
    },
    prompt: {
      id: 'flow-coffee-beverage-macro',
      title: 'Specialty Coffee & Cold Brew Tabletop Prompts',
      tool: 'Google Flow',
      ratio: '9:16',
      category: `Daily Drop · ${todayFormatted}`,
      summary: 'Mouth-watering Google Flow tabletop prompts for beverage, cafe, and FMCG brands featuring slow-motion oat milk swirls, ice condensation, and morning café sunbeams.',
      samplePrompt:
        'Phantom Flex4K 240fps macro close-up of chilled espresso pouring over crystal-clear artisan ice cubes into swirled oat milk inside a ribbed glass, golden morning sunbeams cutting through café steam, condensation droplets rolling down glass, 9:16 vertical.',
      deliverables: ['25 beverage & liquid swirl Google Flow prompts', 'High-speed frame-rate tokens', 'Tabletop lighting recipes'],
    },
    article: {
      id: 'the-3-second-ugc-hook-architecture',
      title: 'The 3-Second Hook Architecture Behind High-Converting UGC Ads',
      date: todayFormatted,
      tag: 'Performance',
      excerpt: 'Follower counts do not sell products on paid social. Here is how we engineer the first three seconds of every creator and AI talent reel.',
      body: [
        'When brands waste money on creator campaigns, it is almost always because they paid for a follower count instead of a **hook architecture**.',
        'On Meta and TikTok paid ads, the algorithm does not care how famous the creator is. It cares whether viewers stop scrolling in the first three seconds and watch through the value proposition.',
        '## The Three Components of a Thumbstop Hook',
        '1. **Visual Pattern Interrupt**: Motion in the very first frame—whisking matcha, applying serum, or unboxing a tactile product close to the lens.',
        '2. **Direct Problem Callout**: A conversational opening line that names the exact friction the buyer feels.',
        '3. **Immediate Proof**: Showing the texture, result, or mechanism before asking for attention.',
        '## Combining Human Creators, AI Talent, and ML Scoring',
        'At **VELURYN AGNECY**, we test multiple hook variations across both our vetted creator roster and AI talent like **Maya Bennett**, backed by 50% deposit security and two included revision rounds.',
        '**VELURYN AGNECY**',
        '*Hooks, not followers.*',
      ],
    },
  },
];

async function generateWithGemini(existingIds) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') return null;

  const categories = ['Email Automation', 'API Tool', 'Cyber Security', 'ML Tools'];
  const targetCategory = categories[existingIds.length % categories.length];

  const prompt = `Generate today's daily content release for VELURYN AGNECY (date: ${todayFormatted}).
Return ONLY valid JSON matching this exact structure (no markdown fences, no extra text):
{
  "tool": {
    "id": "unique-kebab-id-${todayIso}",
    "name": "Veluryn <Name>",
    "category": "${targetCategory}",
    "engine": "Rust · <Crates used>",
    "status": "Daily Drop · ${todayFormatted}",
    "summary": "1-2 sentence description of a developer tool built in Rust for ${targetCategory}.",
    "specs": ["Spec 1", "Spec 2", "Spec 3"],
    "cliSnippet": "cargo-or-binary-cli-command --flags"
  },
  "prompt": {
    "id": "flow-prompt-${todayIso}",
    "title": "<Commercial Niche> Google Flow Prompts",
    "tool": "Google Flow",
    "ratio": "9:16",
    "category": "Daily Drop · ${todayFormatted}",
    "summary": "1-2 sentence description of this Google Flow visual prompt pack.",
    "samplePrompt": "Detailed 35-55 word cinematic Google Flow video generation prompt with lens, lighting, camera movement, and 9:16 vertical aspect ratio.",
    "deliverables": ["Deliverable 1", "Deliverable 2", "Deliverable 3"]
  },
  "article": {
    "id": "seo-article-slug-${todayIso}",
    "title": "Compelling Thought-Leadership Title on Rust Engineering, Google Flow AI Visuals, or Creator Marketing",
    "date": "${todayFormatted}",
    "tag": "Engineering",
    "excerpt": "1-2 sentence compelling summary.",
    "body": [
      "Opening paragraph...",
      "Second paragraph...",
      "## Section Heading 1",
      "Paragraph...",
      "Paragraph...",
      "## Section Heading 2",
      "Paragraph...",
      "Closing paragraph..."
    ]
  }
}`;

  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1400,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content?.trim() || '';
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

async function main() {
  const store = JSON.parse(fs.readFileSync(dailyJsonPath, 'utf8'));
  const existingIds = [
    ...store.developerProducts.map((x) => x.id),
    ...store.visualPrompts.map((x) => x.id),
    ...store.articles.map((x) => x.id),
  ];

  let bundle = await generateWithGemini(existingIds);

  if (!bundle || !bundle.tool?.id || !bundle.prompt?.id || !bundle.article?.id) {
    const idx = store.developerProducts.length % FALLBACK_BANK.length;
    const candidate = structuredClone(FALLBACK_BANK[idx]);
    const suffix = store.developerProducts.length >= FALLBACK_BANK.length ? `-${todayIso}` : '';
    candidate.tool.id += suffix;
    candidate.prompt.id += suffix;
    candidate.article.id += suffix;
    bundle = candidate;
  }

  // Self-check validation before writing
  assert.ok(bundle.tool.id && bundle.tool.name && bundle.tool.cliSnippet, 'Invalid developer tool payload');
  assert.ok(bundle.prompt.id && bundle.prompt.title && bundle.prompt.samplePrompt, 'Invalid Google Flow prompt payload');
  assert.ok(bundle.article.id && bundle.article.title && Array.isArray(bundle.article.body), 'Invalid article payload');

  // Prepend if not already present
  if (!store.developerProducts.some((x) => x.id === bundle.tool.id)) {
    store.developerProducts.unshift(bundle.tool);
  }
  if (!store.visualPrompts.some((x) => x.id === bundle.prompt.id)) {
    store.visualPrompts.unshift(bundle.prompt);
  }
  if (!store.articles.some((x) => x.id === bundle.article.id)) {
    store.articles.unshift(bundle.article);
  }
  store.lastPublishedDate = todayIso;

  fs.writeFileSync(dailyJsonPath, JSON.stringify(store, null, 2) + '\n', 'utf8');

  // Update sitemap.xml with the new article URL if not already listed
  const articleUrl = `https://velurynagnecy.com/articles/${bundle.article.id}`;
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemapXml.includes(articleUrl)) {
    const entry = `  <url>\n    <loc>${articleUrl}</loc>\n    <lastmod>${todayIso}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n</urlset>`;
    fs.writeFileSync(sitemapPath, sitemapXml.replace('</urlset>', entry), 'utf8');
  }

  console.log(`[daily-publish] Published for ${todayIso}:`);
  console.log(`  - Rust Tool: ${bundle.tool.name} (${bundle.tool.category})`);
  console.log(`  - Google Flow Prompt: ${bundle.prompt.title}`);
  console.log(`  - Article: ${bundle.article.title} (/articles/${bundle.article.id})`);
}

main();
