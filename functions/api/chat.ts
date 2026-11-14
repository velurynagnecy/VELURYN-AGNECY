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

export async function onRequestPost(ctx: { request: Request; env: Env }) {
  // Prevent cross-origin abuse
  const fetchSite = ctx.request.headers.get('sec-fetch-site');
  if (fetchSite === 'cross-site') {
    return json({ error: 'Cross-origin requests not allowed.' }, 403);
  }

  const useSentinel = Boolean(ctx.env.SENTINEL_GATEWAY_URL && ctx.env.SENTINEL_WEB_APP_TOKEN);
  const useGemini = Boolean(ctx.env.GEMINI_API_KEY);
  const useGroq = Boolean(ctx.env.GROQ_API_KEY);

  if (!useSentinel && !useGemini && !useGroq) {
    return json({ error: 'The chat is not switched on yet. Please email us instead.' }, 503);
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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(targetUrl, {
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

    if (res.status === 429) {
      return json({ error: 'Too many messages sent. Please slow down and try again shortly.' }, 429);
    }
    if (!res.ok) {
      return json({ error: 'The assistant is unavailable right now. Please email us.' }, 502);
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) {
      return json({ error: 'The assistant is unavailable right now. Please email us.' }, 502);
    }
    return json({ reply: reply.trim() });
  } catch {
    return json({ error: 'The assistant is unavailable right now. Please email us.' }, 502);
  } finally {
    clearTimeout(timer);
  }
}
