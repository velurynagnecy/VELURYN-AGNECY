import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/site';
import { Button, PageHero, Reveal } from '../components/ui';
import { Form, type FieldDef } from '../components/Form';

type Kind = 'brand' | 'creator' | 'other';

const BASE: FieldDef[] = [
  { name: 'First Name', label: 'First name', required: true, half: true },
  { name: 'Last Name', label: 'Last name', required: true, half: true },
  { name: 'Email', label: 'Email', type: 'email', required: true },
];

const FIELDS: Record<Kind, FieldDef[]> = {
  brand: [
    ...BASE,
    { name: 'Company', label: 'Company', required: true, half: true },
    { name: 'Brand Vertical', label: 'Brand vertical', placeholder: 'e.g. Health, Fashion, Tech', half: true },
    { name: 'Message', label: 'Tell us about the campaign', type: 'textarea', required: true },
  ],
  creator: [
    ...BASE,
    { name: 'Portfolio', label: 'Portfolio link', type: 'url', required: true, placeholder: 'TikTok, IG, or portfolio', half: true },
    { name: 'Focus', label: 'Your focus', required: true, placeholder: 'e.g. UGC creator, model', half: true },
    { name: 'Message', label: 'Niche, rates and availability', type: 'textarea', required: true },
  ],
  other: [...BASE, { name: 'Message', label: 'Message', type: 'textarea', required: true }],
};

const LABEL: Record<Kind, string> = { brand: "I'm a brand", creator: "I'm talent", other: 'Something else' };

export default function Contact() {
  const [kind, setKind] = useState<Kind>(() => {
    const t = new URLSearchParams(window.location.search).get('type');
    return t === 'creator' || t === 'other' ? t : 'brand';
  });

  return (
    <>
      <Helmet>
        <title>Contact | VELURYN AGNECY</title>
        <meta
          name="description"
          content="Get in touch with VELURYN AGNECY for brand campaigns, talent representation, or general enquiries."
        />
      </Helmet>
      <PageHero
        eyebrow="Let's talk"
        lines={['Work with us']}
        lead="Whether you're a brand looking to start a campaign, or a creator or model interested in representation, we're ready to work."
        img="contact-hero.jpg"
      />

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="card" style={{ padding: '1.5rem' }}>
                <span className="kicker-clean">Email</span>
                <p style={{ margin: '0.4rem 0 0 0', fontWeight: 600 }}>
                  <a href={`mailto:${SITE.email}`} style={{ color: 'var(--ink)' }}>
                    {SITE.email}
                  </a>
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Replies typically within 24h</span>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <span className="kicker-clean">Direct Line</span>
                <p style={{ margin: '0.4rem 0 0 0', fontWeight: 600 }}>
                  <a href={SITE.phoneHref} style={{ color: 'var(--ink)' }}>
                    {SITE.phone}
                  </a>
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{SITE.phoneNote}</span>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <span className="kicker-clean">Operations</span>
                <p style={{ margin: '0.4rem 0 0 0', fontWeight: 600 }}>Global Remote</p>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                  {SITE.socials.slice(0, 4).map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color: 'var(--muted)' }}
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="contact-form" className="card form-container-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <div className="connect-tabs" role="tablist" style={{ margin: 0 }}>
                  {(Object.keys(LABEL) as Kind[]).map((k) => (
                    <button
                      key={k}
                      role="tab"
                      aria-selected={kind === k}
                      className={kind === k ? 'active' : ''}
                      onClick={() => setKind(k)}
                    >
                      {LABEL[k]}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>
                  Looking for AI production?{' '}
                  <Button to={SITE.studioPath} variant="ghost" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}>
                    VELURYN STUDIO ↗
                  </Button>
                </div>
              </div>

              <Form
                key={kind}
                subject={`New ${kind} enquiry: VELURYN AGNECY`}
                extra={{ 'Inquiry Type': kind }}
                fields={FIELDS[kind]}
                button="Send message"
                category={LABEL[kind]}
                note="Your details are used only to reply to you."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
