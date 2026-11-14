import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function devChatPlugin() {
  return {
    name: 'dev-chat-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url || !req.url.startsWith('/api/')) return next();

        // Try forwarding to the local VELURYN Rust backend on 127.0.0.1:3001 first
        let rawBody = '';
        if (req.method === 'POST') {
          rawBody = await new Promise<string>((resolve) => {
            let b = '';
            req.on('data', (c: any) => { b += c; });
            req.on('end', () => resolve(b));
          });
        }

        try {
          const rustRes = await fetch(`http://127.0.0.1:3001${req.url}`, {
            method: req.method || 'GET',
            headers: {
              'Content-Type': req.headers['content-type'] || 'application/json',
              ...(req.headers['sec-fetch-site'] ? { 'Sec-Fetch-Site': String(req.headers['sec-fetch-site']) } : {}),
            },
            body: req.method === 'POST' ? rawBody : undefined,
            signal: AbortSignal.timeout(6500),
          });

          if (rustRes.ok || !req.url.startsWith('/api/chat')) {
            res.statusCode = rustRes.status;
            const allowedHeaders = new Set([
              'content-type',
              'cache-control',
              'x-powered-by',
              'x-ratelimit-limit',
              'x-ratelimit-remaining',
              'retry-after',
              'x-content-type-options',
              'x-frame-options',
              'referrer-policy',
            ]);
            rustRes.headers.forEach((v, k) => {
              if (allowedHeaders.has(k.toLowerCase())) {
                res.setHeader(k, v);
              }
            });
            const text = await rustRes.text();
            return res.end(text);
          }
        } catch {
          // Rust backend is not running or timed out; fall back to built-in dev handler for /api/chat
        }

        if (!req.url.startsWith('/api/chat') || req.method !== 'POST') return next();

        const env = loadEnv(server.config.mode, process.cwd(), '');
        const geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        const groqKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

        if (!geminiKey && !groqKey) {
          res.statusCode = 503;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not set in .env file.' }));
        }

        const body = rawBody;
        {
          try {
            const parsed = JSON.parse(body || '{}');
            const messages = parsed.messages || [];

            const isGemini = Boolean(geminiKey);
            const targetUrl = isGemini
              ? 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
              : 'https://api.groq.com/openai/v1/chat/completions';
            const authHeader = `Bearer ${isGemini ? geminiKey : groqKey}`;
            const model = isGemini
              ? (env.GEMINI_MODEL || 'gemini-3-flash-preview')
              : (env.GROQ_MODEL || 'llama-3.3-70b-versatile');

            const systemPrompt = `You are VELURYN Assistant, the AI assistant for VELURYN AGNECY and VELURYN STUDIO.
About VELURYN AGNECY: An independent marketing and talent management agency for culture brands.
Core services: Influencer Marketing, UGC Campaigns, Content & Creative, Performance Paid Ads, Social Media Marketing, and SEO & Web Design.
Talent division: Represents creators, models, and AI talent, managing commercial contracts, career growth, and sponsorships.
VELURYN STUDIO division: Produces AI-generated video ads and posters using Google Flow.
Cyber Security: ICA (International Contract Agency) private security in Rust (ica.velurynagnecy.com).
Contact: vivin.b@velurynagnecy.com | Phone: +91 96775 33281 (India).
Rules: Keep answers concise (2-4 sentences).`;

            let response = await fetch(targetUrl, {
              method: 'POST',
              headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model,
                messages: [{ role: 'system', content: systemPrompt }, ...messages],
                temperature: 0.5,
                max_tokens: 1200,
              }),
            });

            // Automatic resilient fallback if selected Gemini model returns 404 or 503
            if (!response.ok && isGemini && model !== 'gemini-3.1-flash-lite') {
              console.warn(`[dev-chat] Model ${model} returned ${response.status}. Retrying with gemini-3.1-flash-lite...`);
              response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                  'Authorization': authHeader,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  model: 'gemini-3.1-flash-lite',
                  messages: [{ role: 'system', content: systemPrompt }, ...messages],
                  temperature: 0.5,
                  max_tokens: 450,
                }),
              });
            }

            const data: any = await response.json();
            const reply = data.choices?.[0]?.message?.content || data.error?.message;

            res.statusCode = response.ok ? 200 : response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ reply: reply || 'Unavailable' }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devChatPlugin()],
  server: {
    watch: {
      ignored: ['**/dist/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-helmet-async')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
          }
        },
      },
    },
  },
})
