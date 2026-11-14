/**
 * Cloudflare Pages Function: POST /api/chat
 *
 * SENTINEL-API Integration:
 * - When SENTINEL_GATEWAY_URL and SENTINEL_WEB_APP_TOKEN are set, requests route
 *   through your secure Rust SENTINEL-API gateway. The real GROQ_API_KEY stays hidden
 *   behind the gateway server with rate limiting, strict allowlists, and audit logs.
 * - Otherwise falls back to direct Groq API using GROQ_API_KEY.
 *
 * Optional: GROQ_MODEL (default llama-3.3-70b-versatile).
 */
import { CHAT_PROMPT } from './prompt';

type Msg = { role: 'user' | 'assistant'; content: string };
type Env = {
  // Google Gemini Configuration (Recommended)
  GEMINI_API_KEY?: string;
  GEMINI_MODEL?: string; // defaults to 'gemini-3-flash-preview'

  // Sentinel Gateway Configuration (Preferred)
  SENTINEL_GATEWAY_URL?: string; // e.g. "https://sentinel.velurynagnecy.com/proxy" or "http://127.0.0.1:8080/proxy"
  SENTINEL_WEB_APP_TOKEN?: string; // App token allowed in policy.toml

  // Direct Groq Configuration (Fallback)
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const isMsg = (m: unknown): m is Msg => {
  if (!m || typeof m !== 'object') return false;
  const { role, content } = m as Record<string, unknown>;
  return (role === 'user' || role === 'assistant') && typeof content === 'string' && content.trim().length > 0;
};

function edgeFallbackReply(query: string): string {
  const q = query.trim().toLowerCase();
  if (/service|what do you do|capability|capabilities|offer|marketing/.test(q)) {
    return 'VELURYN AGNECY provides 6 core growth services:\n\n1. Influencer Marketing (creator matching, contracting, campaign execution)\n2. UGC Campaigns (vetted creators, 50% upfront deposit security, watermark review drafts)\n3. Content & Creative (art direction, ad copywriting, visual identity)\n4. Performance Paid Ads (Meta, TikTok, and Google media buying)\n5. Social Media Marketing (organic growth, community, and strategy)\n6. SEO & Web Design (conversion-focused web experiences and search discovery)\n\nWe also produce AI commercial video ads and posters through VELURYN STUDIO.';
  }
  if (/ugc|watermark|deposit|creator pipeline/.test(q)) {
    return 'Our UGC pipeline connects brands with vetted creators across E-Commerce, Tech, Fashion, and Lifestyle. We operate with a 50% upfront deposit to secure the creator and deliver watermarked review drafts, so you only pay the remainder upon approval.';
  }
  if (/ai talent|virtual|maya/.test(q)) {
    return 'We develop and represent hyper-realistic AI talent, including Maya Bennett (@maya.benett2002), available for UGC product showcases, beauty and lifestyle routines, and paid social campaigns.';
  }
  if (/talent|model|roster|creator|join|apply|representation/.test(q)) {
    return 'We represent high-caliber creators, models, and AI talent, managing commercial contracts, brand partnerships, and career growth. Creators can apply directly on our Creator Pipeline page.';
  }
  if (/price|pricing|cost|rate|quote|package|retainer|how much/.test(q)) {
    return 'Pricing is tailored to your campaign scope, deliverable volume, and usage rights. Production starts with a 50% deposit, with the remaining 50% invoiced after you approve watermarked drafts. Contact vivin.b@velurynagnecy.com for a custom quote.';
  }
  if (/contract|brief|hire|book|start|work with|proposal|get started/.test(q)) {
    return 'To submit a contract or project brief, use the live contract compose form on our Contact page, or email director Vivin B directly at vivin.b@velurynagnecy.com. We review every brief and respond within 24 hours.';
  }
  if (/studio|ai ad|video|poster|flow/.test(q)) {
    return 'VELURYN STUDIO produces AI commercial video ads (short-form vertical ads and creator-style UGC) and campaign posters with human art direction using Google Flow. Explore our reel on the Studio page.';
  }
  if (/ica|cyber|security|vasd|rust/.test(q)) {
    return 'Our International Contract Agency (ICA) division provides private cyber security engineering, threat modeling, and secure software infrastructure built in Rust at ica.velurynagnecy.com.';
  }
  if (/contact|email|phone|reach|call|location|where/.test(q)) {
    return 'You can reach our leadership directly:\n- Email: vivin.b@velurynagnecy.com\n- Phone: +91 96775 33281 (India)\n- Operations: Global Remote';
  }
  return 'I am VELURYN Assistant. Ask me about our marketing services, Maya Bennett UGC campaigns, creator roster, VELURYN STUDIO AI ads, or how to submit a brief!';
}

export async function onRequestPost(ctx: { request: Request; env: Env }) {
  // Prevent cross-origin abuse
  const fetchSite = ctx.request.headers.get('sec-fetch-site');
  if (fetchSite === 'cross-site') {
    return json({ error: 'Cross-origin requests not allowed.' }, 403);
  }

  let body: { messages?: unknown } | null = null;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ error: 'Bad request.' }, 400);
  }
  const raw = body?.messages;
  if (!Array.isArray(raw)) return json({ error: 'Bad request.' }, 400);

  const messages = raw
    .filter(isMsg)
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') return json({ error: 'Bad request.' }, 400);

  const lastUserText = messages[messages.length - 1].content;

  const useSentinel = Boolean(ctx.env.SENTINEL_GATEWAY_URL && ctx.env.SENTINEL_WEB_APP_TOKEN);
  const useGemini = Boolean(ctx.env.GEMINI_API_KEY);
  const useGroq = Boolean(ctx.env.GROQ_API_KEY);

  if (!useSentinel && !useGemini && !useGroq) {
    return json({ reply: edgeFallbackReply(lastUserText), source: 'edge-concierge' });
  }

  let targetUrl = '';
  let authHeader = '';
  let defaultModel = '';

  if (useSentinel) {
    targetUrl = `${ctx.env.SENTINEL_GATEWAY_URL!.replace(/\/+$/, '')}/openai/v1/chat/completions`;
    authHeader = `Bearer ${ctx.env.SENTINEL_WEB_APP_TOKEN}`;
    defaultModel = ctx.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  } else if (useGemini) {
    targetUrl = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
    authHeader = `Bearer ${ctx.env.GEMINI_API_KEY}`;
    defaultModel = ctx.env.GEMINI_MODEL || 'gemini-3-flash-preview';
  } else {
    targetUrl = 'https://api.groq.com/openai/v1/chat/completions';
    authHeader = `Bearer ${ctx.env.GROQ_API_KEY}`;
    defaultModel = ctx.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let res = await fetch(targetUrl, {
      method: 'POST',
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: defaultModel,
        messages: [{ role: 'system', content: CHAT_PROMPT }, ...messages],
        temperature: 0.5,
        max_tokens: 1200,
      }),
      signal: controller.signal,
    });

    if (!res.ok && useGemini && defaultModel !== 'gemini-3.1-flash-lite') {
      res = await fetch(targetUrl, {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemini-3.1-flash-lite',
          messages: [{ role: 'system', content: CHAT_PROMPT }, ...messages],
          temperature: 0.5,
          max_tokens: 450,
        }),
        signal: controller.signal,
      });
    }

    if (res.ok) {
      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const reply = data.choices?.[0]?.message?.content;
      if (typeof reply === 'string' && reply.trim()) {
        return json({ reply: reply.trim(), source: 'llm' });
      }
    }
    return json({ reply: edgeFallbackReply(lastUserText), source: 'edge-concierge' });
  } catch {
    return json({ reply: edgeFallbackReply(lastUserText), source: 'edge-concierge' });
  } finally {
    clearTimeout(timer);
  }
}
