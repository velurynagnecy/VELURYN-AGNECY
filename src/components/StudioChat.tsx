import { useEffect, useRef, useState } from 'react';

type Msg = {
  role: 'user' | 'assistant';
  content: string;
};

const GREETING: Msg = {
  role: 'assistant',
  content:
    'Hi, I am VELURYN Assistant, the AI assistant for VELURYN AGNECY. Ask me anything about our marketing services, creator talent, UGC campaigns, or AI studio work.',
};

const SUGGEST = [
  'What services do you offer?',
  'How do UGC campaigns work?',
  'Tell me about pricing & retainers',
  'How do I submit a project contract or brief?',
  'Tell me about your talent management',
];

function getClientFallbackReply(text: string): string {
  const q = text.toLowerCase().trim();

  // 1. Services & Core Capabilities
  if (
    q.includes('service') ||
    q.includes('what do you do') ||
    q.includes('what can you do') ||
    q.includes('capability') ||
    q.includes('capabilities') ||
    q.includes('offer')
  ) {
    return 'VELURYN AGNECY provides 6 core growth services:\n\n1. Influencer Marketing (creator matching, contracting, campaign execution)\n2. UGC Campaigns (vetted creators, 50% upfront deposit security, watermark review drafts)\n3. Content & Creative (art direction, ad copywriting, visual identity)\n4. Performance Paid Ads (Meta, TikTok, and Google media buying)\n5. Social Media Marketing (organic growth, community, and strategy)\n6. SEO & Web Design (conversion-focused web experiences and search discovery)\n\nWe also produce AI commercial video ads and posters through VELURYN STUDIO.';
  }

  // 2. UGC Campaigns & Creator Pipeline
  if (q.includes('ugc') || q.includes('watermark') || q.includes('creator pipeline')) {
    return 'Our UGC pipeline connects brands with vetted creators across E-Commerce, Tech, Fashion, and Lifestyle. We operate with a 50% upfront deposit to secure the creator and deliver watermarked review drafts, so you only pay the remainder upon approval.';
  }

  // 3. Talent Management & Roster
  if (
    q.includes('talent') ||
    q.includes('model') ||
    q.includes('roster') ||
    q.includes('creator') ||
    q.includes('join') ||
    q.includes('apply')
  ) {
    return 'We represent high-caliber creators, models, and digital talent, managing commercial contracts, brand partnerships, and career growth. We prioritize hook rates, camera presence, and direct-response performance over follower counts. Creators can apply directly on our Creator Pipeline page.';
  }

  // 4. Pricing, Retainers & Costs
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('cost') ||
    q.includes('rate') ||
    q.includes('retainer') ||
    q.includes('package') ||
    q.includes('how much') ||
    q.includes('fee')
  ) {
    return 'Per Project Rates:\n• Short form ad (15-30s): ₹6,000 / $130 (Pack of 5: ₹25,000 / $550)\n• Long form ad (60-90s): ₹30,000 to ₹45,000 / $450 to $900\n• UGC ad (20-30s): ₹4,000 / $70 (Pack of 3: ₹10,000 / $180)\n• Poster: ₹800 / $20 (Pack of 10: ₹6,500 / $150)\n\nMonthly Retainers:\n• Starter: ₹30,000 / $450 (4 short ads, 2 UGC videos, 8 posters)\n• Growth: ₹65,000 / $950 (8 short ads, 1 long ad, 4 UGC videos, 16 posters)\n• Scale: ₹1,20,000 / $1,800 (15 short ads, 2 long ads, 8 UGC videos, 30 posters, priority turnaround)\n\nTerms: 50% advance, 50% on delivery. 2 revision rounds included (extra rounds at 20%). Raw footage and unlimited usage rights are paid add-ons.';
  }

  // 5. Contracts, Briefs & Booking
  if (
    q.includes('contract') ||
    q.includes('brief') ||
    q.includes('hire') ||
    q.includes('book') ||
    q.includes('proposal') ||
    q.includes('get started')
  ) {
    return 'To submit a contract or project brief, you can use the live contract compose form on our Contact page, or email director Vivin B directly at vivin.b@velurynagnecy.com. We review every brief and respond within 24 hours.';
  }

  // 6. Studio & AI Video Production
  if (
    q.includes('studio') ||
    q.includes('video') ||
    q.includes('poster') ||
    q.includes('ai ads') ||
    q.includes('flow')
  ) {
    return 'VELURYN STUDIO produces cutting-edge AI commercial video ads (short-form and long-form) and graphic posters with human art direction using Google Flow. You can check out our studio gallery and submit a brief on the Studio page.';
  }

  // 7. AI Talent / Virtual Influencers
  if (q.includes('ai talent') || q.includes('virtual') || q.includes('maya')) {
    return 'We develop and represent hyper-realistic AI talent, such as Maya Benett, available for brand campaigns, virtual product modeling, and commercial licensing.';
  }

  // 8. Cyber Security (ICA Division)
  if (q.includes('ica') || q.includes('cyber') || q.includes('security') || q.includes('rust')) {
    return 'Our International Contract Agency (ICA) division provides private cyber security engineering, threat modeling, and secure software development built in Rust. Learn more at ica.velurynagnecy.com.';
  }

  // 9. Contact Details
  if (
    q.includes('contact') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('address') ||
    q.includes('location')
  ) {
    return 'You can contact our leadership directly:\n- Email: vivin.b@velurynagnecy.com\n- Phone: +91 96775 33281 (India)\n- Operations: Global Remote';
  }

  // 10. About & Leadership
  if (
    q.includes('about') ||
    q.includes('who are you') ||
    q.includes('who is') ||
    q.includes('founder') ||
    q.includes('team') ||
    q.includes('vivin')
  ) {
    return 'VELURYN AGNECY is an independent marketing and talent management agency founded by Vivin B, bridging direct-response performance marketing with modern creator culture and AI studio production.';
  }

  // Default Fallback
  return 'I am VELURYN Assistant, your guide to VELURYN AGNECY. Feel free to ask about our marketing services, creator roster, UGC campaigns, studio productions, or pricing!';
}

export default function StudioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when chat is opened
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 90);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Lock mobile body scroll while chat modal is open on narrow screens
  useEffect(() => {
    if (!open) return;
    if (typeof window !== 'undefined' && window.innerWidth <= 640) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open]);

  useEffect(() => {
    if (messages.length > 1 || busy) {
      end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const next: Msg[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setBusy(true);

    let replyText = '';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== GREETING) }),
        signal: controller.signal,
      });
      if (res.ok) {
        const data = (await res.json()) as { reply?: string };
        if (data.reply && data.reply !== 'Unavailable') {
          replyText = data.reply;
        }
      }
    } catch {
      // Local dev fallback or network unavailable
    } finally {
      clearTimeout(timeoutId);
    }

    if (!replyText) {
      replyText = getClientFallbackReply(content);
    }

    setMessages([...next, { role: 'assistant', content: replyText }]);
    setBusy(false);
  }

  return (
    <>
      {open && (
        <div
          className="chat"
          role="dialog"
          aria-label="Chat with VELURYN Assistant"
          data-lenis-prevent="true"
        >
          <div className="chat-head">
            <div className="chat-head-info">
              <span className="chat-head-mark" aria-hidden="true">
                <span className="chat-head-v" />
              </span>
              <div className="chat-head-titles">
                <b>VELURYN Assistant</b>
                <span>VELURYN AGNECY AI</span>
              </div>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close VELURYN Assistant"
            >
              ×
            </button>
          </div>

          <div
            className="chat-body"
            aria-live="polite"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{m.content}</div>
              </div>
            ))}
            {busy && <div className="bubble assistant">…</div>}
            {messages.length === 1 && !busy && (
              <div className="suggest">
                {SUGGEST.map((s) => (
                  <button key={s} onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>

          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask VELURYN Assistant anything..."
              aria-label="Your message"
              maxLength={800}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="sentences"
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {!open && (
        <button
          type="button"
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Open VELURYN Assistant"
        >
          <span className="chat-fab-dot" aria-hidden="true">
            <span className="chat-fab-v" />
          </span>
          <span>VELURYN Assistant</span>
        </button>
      )}
    </>
  );
}
