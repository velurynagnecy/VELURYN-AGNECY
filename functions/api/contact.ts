/**
 * Cloudflare Pages Function: POST /api/contact
 * Proxies to the standalone VELURYN Rust backend when RUST_BACKEND_URL is set,
 * or validates honeypot & forwards directly to FormSubmit at the edge.
 */

type Env = {
  RUST_BACKEND_URL?: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export async function onRequestPost(ctx: { request: Request; env: Env }) {
  let payload: Record<string, unknown> | null = null;
  try {
    payload = (await ctx.request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400);
  }

  if (!payload || typeof payload !== 'object') {
    return json({ error: 'Invalid request payload.' }, 400);
  }

  // Honeypot spam filter
  if (typeof payload._honey === 'string' && payload._honey.trim().length > 0) {
    return json({ ok: true });
  }

  // If standalone Rust backend URL is configured, forward there for JSONL logging + delivery
  if (ctx.env.RUST_BACKEND_URL) {
    try {
      const target = `${ctx.env.RUST_BACKEND_URL.replace(/\/+$/, '')}/api/contact`;
      const rustRes = await fetch(target, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': ctx.request.headers.get('cf-connecting-ip') || '',
        },
        body: JSON.stringify(payload),
      });
      if (rustRes.ok) {
        return json(await rustRes.json());
      }
    } catch {
      // Fall through to direct FormSubmit edge delivery
    }
  }

  try {
    const res = await fetch('https://formsubmit.co/ajax/velurynandco@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return json({ error: 'Upstream form delivery error.' }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ error: 'Network error while submitting brief.' }, 502);
  }
}
