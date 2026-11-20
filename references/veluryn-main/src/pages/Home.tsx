import { useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import { articles } from '../data/articles';
import SocialCards, { type CardItem as HeroCardItem } from '@/components/ui/card-fan-carousel';
import HoverRevealCards, { type CardItem as RevealCardItem } from '@/components/ui/cards';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { InteractiveAccordion, type AccordionServiceItem } from '@/components/ui/interactive-accordion';
import { PerformanceMatrix } from '@/components/ui/performance-matrix';
import {
  Arrow,
  Button,
  Media,
  Reveal,
  SectionHead,
} from '../components/ui';

const SERVICES_3D_CARDS = [
  {
    title: 'Influencer Marketing',
    subtitle: 'Strategic Creator Campaigns',
    imageUrl: '/images/site/influencer-marketing.jpg',
    actionText: 'Explore campaigns',
    href: '/services/influencer-marketing',
  },
  {
    title: 'UGC Campaigns',
    subtitle: 'Vetted Creator Native Ads',
    imageUrl: '/images/site/ugc-campaigns.jpg',
    actionText: 'Launch UGC',
    href: '/ugc-campaigns',
  },
  {
    title: 'Content & Creative',
    subtitle: 'High Production Storytelling',
    imageUrl: '/images/site/content-creative.jpg',
    actionText: 'View creative',
    href: '/services/content-creative',
  },
  {
    title: 'Performance Ads',
    subtitle: 'Paid Conversion & Analytics',
    imageUrl: '/images/site/performance-ads.jpg',
    actionText: 'Explore ads',
    href: '/services/performance-ads',
  },
];

const BENTO_3D_CARDS = [
  {
    title: 'Who We Are',
    subtitle: 'Creator Campaigns & Talent Management',
    imageUrl: '/images/site/about.jpg',
    actionText: 'Our story',
    href: '/about',
  },
  {
    title: 'Veluryn Studio',
    subtitle: 'AI Visuals & High-Impact Ads',
    imageUrl: '/images/site/bento-studio.jpg',
    actionText: 'Enter Studio',
    href: SITE.studioPath,
  },
  {
    title: 'Web & Digital Craft',
    subtitle: 'Web Design & Brand Systems',
    imageUrl: '/images/site/web-design.jpg',
    actionText: 'Explore design',
    href: '/services/web-design',
  },
];

const HERO_FAN_CARDS: HeroCardItem[] = [
  { imgUrl: '/images/cards/card-1.webp', alt: 'Short Form Ads', linkUrl: '/studio#short-ads' },
  { imgUrl: '/images/cards/card-2.webp', alt: 'AI Studio', linkUrl: '/studio' },
  { imgUrl: '/images/cards/card-3.webp', alt: 'Content & Creative', linkUrl: '/services/content-creative' },
  { imgUrl: '/images/cards/card-4.webp', alt: 'Flagship Campaigns', linkUrl: '/services' },
  { imgUrl: '/images/cards/card-5.webp', alt: 'Talent Roster', linkUrl: '/talent-management' },
  { imgUrl: '/images/cards/card-6.webp', alt: 'UGC Native Ads', linkUrl: '/ugc-campaigns' },
  { imgUrl: '/images/cards/card-7.webp', alt: 'Performance Media', linkUrl: '/services/performance-ads' },
];

const PHILOSOPHY_REVEAL_ITEMS: RevealCardItem[] = [
  {
    id: 1,
    title: 'Deep expertise',
    subtitle: 'Technologies & Ecosystems',
    imageUrl: '/images/philosophy/pillar-1.webp',
  },
  {
    id: 2,
    title: 'Collaborative approach',
    subtitle: 'Creator & Brand Co-Development',
    imageUrl: '/images/philosophy/pillar-2.webp',
  },
  {
    id: 3,
    title: 'Philosophy of evidence',
    subtitle: 'Data-Driven Conversion Testing',
    imageUrl: '/images/philosophy/pillar-3.webp',
  },
  {
    id: 4,
    title: 'The know-how',
    subtitle: 'Removing Production Bottlenecks',
    imageUrl: '/images/philosophy/pillar-4.webp',
  },
];

export default function Home() {
  const [activeCapabilityId, setActiveCapabilityId] = useState<string | null>('influencer');

  // Quick form state for "Let's Connect" section
  const [formType, setFormType] = useState<'brand' | 'creator' | 'other'>('brand');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function handleConnectSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_honey')) return;
    data.append('_subject', `New ${formType} connection from homepage: VELURYN AGNECY`);
    data.append('_captcha', 'false');
    data.append('_template', 'table');
    data.append('Inquiry Type', formType);

    setFormState('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFormState('ok');
    } catch {
      setFormState('err');
    }
  }

  const CAPABILITIES_ITEMS: AccordionServiceItem[] = [
    {
      id: 'influencer',
      number: '01',
      title: 'Influencer Marketing',
      desc: 'Strategic creator campaigns built around the right audience and talent. We manage sourcing, negotiation, and execution.',
      link: '/services/influencer-marketing',
      tag: 'High Reach',
    },
    {
      id: 'ugc',
      number: '02',
      title: 'UGC Campaigns',
      desc: 'Social first content produced through vetted creators. Guaranteed with 50% upfront deposits and watermark review.',
      link: '/ugc-campaigns',
      tag: 'Conversion',
    },
    {
      id: 'ai',
      number: '03',
      title: 'Content & Creative',
      desc: 'Short form, platform native content and high production brand storytelling built for modern attention.',
      link: '/services/content-creative',
      tag: 'Storytelling',
    },
    {
      id: 'performance',
      number: '04',
      title: 'Performance Ads',
      desc: 'Paid media on Meta, Google and TikTok where creative and targeting are planned together with direct numbers.',
      link: '/services/performance-ads',
      tag: 'Paid Media',
    },
    {
      id: 'talent',
      number: '05',
      title: 'Social Media Marketing',
      desc: 'Planning, posting, and community care across your owned channels with on brand consistency.',
      link: '/services/social-media-marketing',
      tag: 'Organic Growth',
    },
    {
      id: 'brand',
      number: '06',
      title: 'SEO & Web Design',
      desc: 'Search foundations that earn traffic paired with fast, clear websites engineered to turn visitors into enquiries.',
      link: '/services/web-design',
      tag: 'Search & Code',
    },
  ];

  return (
    <>
      <Helmet>
        <title>VELURYN AGNECY | Marketing &amp; Management Agency</title>
        <meta
          name="description"
          content="Marketing, content and talent management for brands that move culture. Influencer marketing, UGC, creative, social, ads, SEO, branding and web design."
        />
      </Helmet>

      {/* ==============================================================
          1. PALLET ROSS STYLE HERO WITH FULL-BLEED BG & CARD PLACEHOLDERS
      =============================================================== */}
      <section className="hero-masterpiece">
        {/* Full-Bleed Background Layer */}
        <div className="hero-masterpiece-bg" aria-hidden="true">
          <img
            src="/images/hero/hero-bg.webp"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="hero-bg-media-img"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="hero-masterpiece-overlay" />
        </div>

        <div className="wrap hero-masterpiece-inner">
          {/* Centered Headline */}
          <div className="hero-masterpiece-header">
            <Reveal>
              <h1 className="hero-masterpiece-title">
                Creator campaigns &amp; AI visuals <br className="hide-mobile" />
                built to <em>convert.</em>
              </h1>
            </Reveal>
          </div>

          {/* Fanned Cards Deck with GSAP CardFanCarousel */}
          <div className="hero-fan-container">
            <SocialCards cards={HERO_FAN_CARDS} />
          </div>

          {/* Centered Subtitle & CTA Actions */}
          <div className="hero-masterpiece-footer">
            <Reveal delay={0.25}>
              <p className="hero-masterpiece-sub">
                Marketing, content and talent management for brands that move culture. Influencer campaigns, UGC, and AI visuals built for modern attention.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="hero-masterpiece-actions">
                <Button to="/services" variant="primary">
                  Our services
                </Button>
                <Button to="/talent-management" variant="ghost">
                  Join our roster
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==============================================================
          2. SHOWCASE (Interactive 3D Bento Cards)
      =============================================================== */}
      <section className="sec-finovate">
        <div className="wrap">
          <div className="bento-grid-3">
            {BENTO_3D_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08} className="w-full flex justify-center">
                <div style={{ perspective: "1000px" }} className="w-full flex justify-center">
                  <InteractiveTravelCard
                    title={card.title}
                    subtitle={card.subtitle}
                    imageUrl={card.imageUrl}
                    actionText={card.actionText}
                    href={card.href}
                    className="h-[27rem] max-w-[24rem]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          3. SERVICES 4-COLUMN GRID (Interactive 3D Cards)
      =============================================================== */}
      <section className="sec-finovate sec-services-showcase">
        <div className="wrap">
          <SectionHead
            eyebrow="SERVICES"
            title="We Champion the Bold to Achieve the Extraordinary"
            center
          />

          <div className="services-showcase-grid">
            {SERVICES_3D_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08} className="w-full flex justify-center">
                <div style={{ perspective: "1000px" }} className="w-full flex justify-center">
                  <InteractiveTravelCard
                    title={card.title}
                    subtitle={card.subtitle}
                    imageUrl={card.imageUrl}
                    actionText={card.actionText}
                    href={card.href}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="services-showcase-cta">
            <Button to="/services" variant="primary">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ==============================================================
          4. PHILOSOPHY SECTION (HoverRevealCards from @/components/ui/cards)
      =============================================================== */}
      <section className="sec-philosophy-wrap">
        <div className="wrap forest-philosophy-inner">
          <div className="forest-philosophy-header">
            <Reveal>
              <span className="kicker-clean">OUR PHILOSOPHY</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="forest-philosophy-title">
                Strategic Interventions that Transform our Clients' Business Trajectory
              </h2>
            </Reveal>
          </div>

          <div className="w-full flex justify-center">
            <HoverRevealCards items={PHILOSOPHY_REVEAL_ITEMS} className="max-w-7xl p-0" />
          </div>
        </div>
      </section>

      {/* ==============================================================
          5. FAST-MOVING BRANDS BANNER
      =============================================================== */}
      <section className="sec-finovate sec-mid-banner">
        <div className="wrap">
          <div className="mid-banner-card">
            <div className="mid-banner-bg">
              <Media img="branding.jpg" label="Creative systems at work" parallax />
              <div className="mid-banner-overlay" />
            </div>
            <div className="mid-banner-content">
              <h2>Helping fast-moving brands scale with purpose.</h2>
              <p>
                From direct-response UGC to AI-crafted visuals, we build creative that commands attention and converts.
              </p>
              <Button to={SITE.studioPath} variant="white">
                Explore Studio Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          7. CAPABILITIES RADAR & ACCORDION + BENTO HIGHLIGHT
      =============================================================== */}
      <section className="sec-finovate sec-capabilities-wrap">
        <div className="wrap">
          <SectionHead
            eyebrow="CAPABILITIES &amp; VERTICALS"
            title="Our Experience Spans Every Creative &amp; Cultural Challenge"
          />

          <div className="capabilities-top-split">
            {/* Left: Next-Gen Animated Performance Matrix */}
            <Reveal className="w-full">
              <PerformanceMatrix
                activeId={activeCapabilityId}
                onSelectMetric={(id) => setActiveCapabilityId(id)}
              />
            </Reveal>

            {/* Right: 21st.dev Interactive Spring Accordion */}
            <Reveal delay={0.1} className="w-full">
              <InteractiveAccordion
                items={CAPABILITIES_ITEMS}
                activeId={activeCapabilityId}
                onItemChange={(id) => setActiveCapabilityId(id)}
              />
            </Reveal>
          </div>

          {/* Bottom Split Card: Quote & Highlight Bento */}
          <div className="capabilities-bottom-split">
            {/* Left: Founder's Quote */}
            <div className="quote-bento-card">
              <div className="quote-mark">“</div>
              <p className="quote-text">
                At VELURYN, we don&apos;t believe in generic marketing. We believe in content that connects, creators who care, and brands that understand the value of authenticity. We built this agency to strip away the inefficiency and deliver results for both the brands we service and the talent we represent.
              </p>
              <div className="quote-author">
                <b>Vivin Bharathi</b>
                <span>Founder &amp; Chairman, VELURYN AGNECY</span>
              </div>
            </div>

            {/* Right: Monochrome Highlight Bento */}
            <div className="highlight-bento-card">
              <h3>Creator Pipeline Generates Authentic Engagement Across Every Vertical</h3>
              <p>
                Vetted creators, 50% deposit security, watermark delivery, and guaranteed high-res release.
              </p>
              <div className="highlight-bento-stat">
                <b>100%</b>
                <span>Transparent Delivery Terms</span>
              </div>
              <Link to="/how-we-work" className="highlight-bento-btn">
                <span>Read Full Process</span>
                <Arrow size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          8. LATEST INSIGHTS / ARTICLES
      =============================================================== */}
      <section className="sec-finovate sec-insights-wrap">
        <div className="wrap">
          <SectionHead
            eyebrow="THOUGHT LEADERSHIP"
            title="Read Our Articles"
            subtitle="Discover the truth, no BS."
            center
          />

          <div className="insights-grid">
            {articles.slice(0, 2).map((a, idx) => (
              <Reveal key={a.id} delay={idx * 0.1} className="insight-card">
                <Link to={`/articles/${a.id}`} className="insight-card-inner">
                  <div className="insight-media">
                    <Media img={`article-${idx + 1}.jpg`} label={a.title} />
                  </div>
                  <div className="insight-info">
                    <div className="insight-meta">
                      <span className="insight-chip">{a.tag}</span>
                      <span className="insight-date">{a.date}</span>
                    </div>
                    <h4>{a.title}</h4>
                    <p>{a.excerpt}</p>
                    <div className="insight-link">
                      <span>Read article</span>
                      <span className="insight-arrow">
                        <Arrow size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="insights-cta">
            <Button to="/articles" variant="primary">
              View All Insights
            </Button>
          </div>
        </div>
      </section>

      {/* ==============================================================
          9. LET'S CONNECT FORM
      =============================================================== */}
      <section className="sec-finovate sec-connect-wrap">
        <div className="wrap">
          <div className="connect-split-container">
            {/* Left: Form */}
            <div className="connect-form-side">
              <span className="kicker-clean">GET IN TOUCH</span>
              <h2>Let's Connect</h2>
              <p className="connect-form-sub">
                Connect with our team to discuss campaign objectives, custom bundles, or talent representation.
              </p>

              {/* Segmented type switcher */}
              <div className="connect-tabs" role="tablist">
                <button
                  type="button"
                  className={formType === 'brand' ? 'active' : ''}
                  onClick={() => setFormType('brand')}
                >
                  I'm a brand
                </button>
                <button
                  type="button"
                  className={formType === 'creator' ? 'active' : ''}
                  onClick={() => setFormType('creator')}
                >
                  I'm talent
                </button>
                <button
                  type="button"
                  className={formType === 'other' ? 'active' : ''}
                  onClick={() => setFormType('other')}
                >
                  General inquiry
                </button>
              </div>

              <form className="connect-form" onSubmit={handleConnectSubmit}>
                <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="form-fields-row">
                  <div className="form-field">
                    <label htmlFor="c-fname">First name</label>
                    <input id="c-fname" name="First Name" type="text" required placeholder="Jane" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-lname">Last name</label>
                    <input id="c-lname" name="Last Name" type="text" required placeholder="Doe" />
                  </div>
                </div>

                <div className="form-fields-row">
                  <div className="form-field">
                    <label htmlFor="c-email">Email address</label>
                    <input id="c-email" name="Email" type="email" required placeholder="jane@company.com" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="c-brand">
                      {formType === 'brand' ? 'Company / Brand' : formType === 'creator' ? 'Portfolio / Handle' : 'Subject'}
                    </label>
                    <input
                      id="c-brand"
                      name={formType === 'brand' ? 'Company' : formType === 'creator' ? 'Portfolio' : 'Subject'}
                      type="text"
                      required
                      placeholder={formType === 'brand' ? 'Acme Inc' : formType === 'creator' ? '@handle or URL' : 'Partnership'}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="c-msg">Message</label>
                  <textarea
                    id="c-msg"
                    name="Message"
                    rows={4}
                    required
                    placeholder={
                      formType === 'brand'
                        ? 'Tell us about your campaign, goals, timeline and budget...'
                        : formType === 'creator'
                        ? 'Tell us about your niche, rates and availability...'
                        : 'How can we help you?'
                    }
                  />
                </div>

                <button type="submit" className="btn primary connect-submit-btn" disabled={formState === 'sending'}>
                  <span>{formState === 'sending' ? 'Sending...' : 'Schedule a Call / Submit'}</span>
                  <span className="dot">
                    <Arrow size={12} />
                  </span>
                </button>

                {formState === 'ok' && (
                  <div className="status ok" role="status">
                    ✓ Thank you. We have received your message and will respond promptly.
                  </div>
                )}
                {formState === 'err' && (
                  <div className="status err" role="alert">
                    Something went wrong. Please email us directly at {SITE.email}.
                  </div>
                )}
              </form>
            </div>

            {/* Right: Direct Access & Executive Contact Card */}
            <div className="connect-info-side">
              <div className="connect-direct-card">
                <div className="connect-direct-top">
                  <h3 className="connect-direct-title">Executive Communication</h3>
                  <p className="connect-direct-sub">
                    Direct channel for brands, creators, and partners. All inquiries are reviewed directly by our leadership team.
                  </p>
                </div>

                <div className="connect-direct-details">
                  <div className="connect-detail-block">
                    <span className="connect-detail-label">Direct Email</span>
                    <a href={`mailto:${SITE.email}`} className="connect-detail-val">
                      {SITE.email}
                    </a>
                  </div>

                  <div className="connect-detail-block">
                    <span className="connect-detail-label">Direct Line ({SITE.phoneNote})</span>
                    <a href={SITE.phoneHref} className="connect-detail-val">
                      {SITE.phone}
                    </a>
                  </div>

                  <div className="connect-detail-block">
                    <span className="connect-detail-label">Headquarters</span>
                    <span className="connect-detail-val">Global Remote</span>
                  </div>

                  <div className="connect-detail-block">
                    <span className="connect-detail-label">Response Time</span>
                    <span className="connect-detail-val">Within 24 Hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
