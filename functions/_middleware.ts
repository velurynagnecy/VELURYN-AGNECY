/**
 * Cloudflare Pages Edge Middleware
 * Mirrors the VELURYN Rust backend's security headers, CORS allowlist,
 * cross-site abuse protection, and per-IP sliding-window rate limiting.
 */

const ALLOWED_ORIGINS = new Set([
  'https://velurynagnecy.com',
  'https://www.velurynagnecy.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3001',
  'http://127.0.0.1:3001',
]);

// Per-isolate sliding window buckets (IP -> timestamps[])
const rateBuckets = new Map<string, number[]>();

function checkRateLimit(key: string, maxReqs: number, windowMs: number): { allowed: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const timestamps = (rateBuckets.get(key) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxReqs) {
    const oldest = timestamps[0] || now;
    const retryAfter = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    rateBuckets.set(key, timestamps);
    return { allowed: false, remaining: 0, retryAfter };
  }
  timestamps.push(now);
  rateBuckets.set(key, timestamps);
  return { allowed: true, remaining: Math.max(0, maxReqs - timestamps.length), retryAfter: 0 };
}

function applySecurityHeaders(headers: Headers, origin: string | null, isApi: boolean) {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Powered-By', 'VELURYN-Rust-Edge');

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    headers.set('Vary', 'Origin');
  }

  if (isApi) {
    headers.set('Cache-Control', 'no-store');
  }
}

export async function onRequest(ctx: { request: Request; next: () => Promise<Response> }) {
  const { request } = ctx;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();
  const origin = request.headers.get('origin');
  const isApi = path.startsWith('/api/');

  // 1. Handle CORS preflight
  if (method === 'OPTIONS') {
    const headers = new Headers();
    applySecurityHeaders(headers, origin, isApi);
    return new Response(null, { status: 204, headers });
  }

  // 2. Block Cross-Site POST/PUT/DELETE abuse
  if (method !== 'GET' && method !== 'HEAD') {
    const fetchSite = request.headers.get('sec-fetch-site');
    if (fetchSite && fetchSite.toLowerCase() === 'cross-site') {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      applySecurityHeaders(headers, origin, true);
      return new Response(JSON.stringify({ error: 'Cross-origin requests are not allowed.' }), {
        status: 403,
        headers,
      });
    }
  }

  // 3. Per-IP Rate Limiting on API routes
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1';

  const [scope, maxReqs] = path.startsWith('/api/chat')
    ? ['chat', 20]
    : path.startsWith('/api/contact')
      ? ['contact', 10]
      : isApi
        ? ['api', 60]
        : ['static', 300];

  const { allowed, remaining, retryAfter } = checkRateLimit(`${scope}:${clientIp}`, maxReqs, 60_000);
  if (!allowed) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Retry-After': String(retryAfter),
      'X-RateLimit-Limit': String(maxReqs),
      'X-RateLimit-Remaining': '0',
    });
    applySecurityHeaders(headers, origin, true);
    return new Response(
      JSON.stringify({
        error: 'Too many requests from this IP. Please wait a moment and try again.',
        retry_after_seconds: retryAfter,
      }),
      { status: 429, headers }
    );
  }

  const res = await ctx.next();
  const nextHeaders = new Headers(res.headers);
  nextHeaders.set('X-RateLimit-Limit', String(maxReqs));
  nextHeaders.set('X-RateLimit-Remaining', String(remaining));
  applySecurityHeaders(nextHeaders, origin, isApi);

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: nextHeaders,
  });
}
