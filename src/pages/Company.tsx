import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FAQ, PRICING_PER_PROJECT, PRICING_RETAINERS, PRICING_TERMS, SHORT_ADS, SITE, STEPS, STUDIO_POSTERS, UGC_ADS } from '../data/site';
import { Button, ContactBand, Media, PageHero, Reveal, SectionHead } from '../components/ui';
import { Form } from '../components/Form';
import VideoCard from '../components/VideoCard';

export function About() {
  return (
    <>
      <Helmet>
        <title>About | VELURYN AGNECY</title>
        <meta name="description" content="Marketing & Management Agency. Brands, talent, content and culture." />
      </Helmet>
      <PageHero eyebrow="About" lines={['Brands, talent,', 'content and culture']} lead="Marketing & Management Agency." img="about-hero.jpg" />

      <section className="sec">
        <div className="wrap split top">
          <Reveal>
            <span className="kicker-clean">Our story</span>
            <p className="lead">
              <b>VELURYN AGNECY started by solving a very specific problem:</b> brands needed high performing video content, and creators needed a secure, reliable way to get paid for making it.
            </p>
            <p className="lead">We built a UGC pipeline to bridge that gap. But as our roster grew and our brand partners scaled, the work evolved. Today, VELURYN operates across two connected divisions: Marketing and Management.</p>
            <p className="lead">We run influencer campaigns, produce branded content, and manage creative for performance brands. Concurrently, we represent a curated roster of creators and models, managing their commercial careers so they can focus on what they do best.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Media img="about.jpg" label="" parallax />
          </Reveal>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <SectionHead eyebrow="Our mission" title={<>The infrastructure behind modern <em>marketing.</em></>} />
          <Reveal>
            <p className="lead">To build the infrastructure that powers modern marketing. We believe the best campaigns are creator-led, and the best creators deserve professional representation.</p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="The family" title={<>One agency, <em>three</em> names.</>} />
          <div className="steps">
            <Reveal className="step">
              <span className="n">01</span>
              <h3>VELURYN AGNECY</h3>
              <p>Marketing and talent management. This site.</p>
            </Reveal>
            <Reveal className="step" delay={0.08}>
              <span className="n">02</span>
              <h3>VELURYN STUDIO</h3>
              <p>AI ads and UGC creative: short form, long form, UGC ads and posters. <Link to={SITE.studioPath} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Open the Studio</Link></p>
            </Reveal>
            <Reveal className="step" delay={0.16}>
              <span className="n">03</span>
              <h3>ICA</h3>
              <p>International Contract Agency: private cyber security work, done in Rust. VASD, our earlier offering, has been advanced into ICA. <a href={SITE.icaUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>ica.velurynagnecy.com</a></p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap split">
          <Reveal>
            <div className="founder-portrait-frame">
              <Media img="founder.jpg" label="Vivin Bharathi, Founder & Chairman" aspectRatio="4 / 5" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="kicker-clean">Founder&apos;s note</span>
            <p className="h-lg">
              &ldquo;At VELURYN, we don&apos;t believe in generic marketing. We believe in content that connects, creators who care, and brands that understand the value of authenticity. We built this agency to strip away the inefficiency and deliver results for both the brands we service and the talent we represent.&rdquo;
            </p>
            <p className="lead">Vivin Bharathi, Founder &amp; Chairman</p>
          </Reveal>
        </div>
      </section>

      <FaqBlock />
      <ContactBand />
    </>
  );
}

function FaqBlock() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow="FAQ" title={<>Frequently asked <em>questions.</em></>} />
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqPage() {
  return (
    <>
      <Helmet>
        <title>FAQ | VELURYN AGNECY</title>
        <meta name="description" content="Answers about how VELURYN AGNECY works, how creators and brands are paid, and what is included." />
      </Helmet>
      <PageHero eyebrow="FAQ" lines={['Questions,', 'answered']} img="faq-hero.jpg" compact />
      <FaqBlock />
      <ContactBand title="Still have a question?" />
    </>
  );
}

export function HowWeWork() {
  return (
    <>
      <Helmet>
        <title>How We Work | VELURYN AGNECY</title>
        <meta name="description" content="Our transparent, secure 5-step process for managing campaigns and talent." />
      </Helmet>
      <PageHero eyebrow="Process" lines={['Transparent, secure,', 'built for scale']} lead="Our process works the same whether it's an influencer campaign, UGC production, content creation or talent management." img="process-hero.jpg" />
      <section className="sec">
        <div className="wrap">
          <div className="steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.h} delay={i * 0.05} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.h}</h3>
                <p>{s.t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

export function Team() {
  const divisions = [
    {
      name: 'Vivin Bharathi',
      role: 'Founder & Chairman',
      desc: 'Directs agency strategy, brand partnerships, and talent representation across VELURYN AGNECY, VELURYN STUDIO, and ICA.',
      img: 'team-vivin.jpg',
    },
    {
      name: 'Creative & AI Studio Team',
      role: 'Scripting, Direction & AI Production',
      desc: 'Concept writers, art directors, and Google Flow specialists producing vertical video ads and campaign visuals.',
      img: 'team-2.jpg',
    },
    {
      name: 'Creator & Talent Network',
      role: 'Vetted UGC Creators & Commercial Models',
      desc: 'A global roster of vetted on-camera creators and models matched to brand briefs across E-Commerce, Tech, and Lifestyle.',
      img: 'team-3.jpg',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Team | VELURYN AGNECY</title>
        <meta name="description" content="The people and creative network behind VELURYN AGNECY." />
      </Helmet>
      <PageHero eyebrow="Team" lines={['The people', 'behind it']} lead="Founder-led direction backed by a global network of creators, art directors, and production specialists." img="team-hero.jpg" />
      <section className="sec">
        <div className="wrap">
          <div className="grid-3">
            {divisions.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                  <Media img={member.img} label={member.name} aspectRatio="4 / 5" />
                  <div style={{ padding: '1.5rem' }}>
                    <h3>{member.name}</h3>
                    <p style={{ fontWeight: 600, color: 'var(--brand-blue)', marginBottom: '0.5rem' }}>{member.role}</p>
                    <p style={{ fontSize: '0.92rem' }}>{member.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBand title="Want to join the roster?" />
    </>
  );
}

export function Work() {
  return (
    <>
      <Helmet>
        <title>Work | VELURYN AGNECY</title>
        <meta name="description" content="Selected video campaigns, Maya Bennett UGC creatives, and campaign posters produced through VELURYN AGNECY and VELURYN STUDIO." />
      </Helmet>
      <PageHero eyebrow="Work" lines={['Selected campaigns', 'and creative']} lead="Playable vertical video campaigns, Maya Bennett UGC reels, and static campaign visuals produced by VELURYN." img="work-hero.jpg" />

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="UGC Campaigns" title={<>Maya Bennett <em>UGC reels.</em></>} />
          <div className="vgrid three">
            {UGC_ADS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <VideoCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <SectionHead eyebrow="Short Form Ads" title={<>Vertical <em>commercials.</em></>} />
          <div className="vgrid two">
            {SHORT_ADS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.08}>
                <VideoCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Static Creative" title={<>Campaign <em>posters.</em></>} />
          <div className="posters-grid">
            {STUDIO_POSTERS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Media img={p.img} label={p.title} className="poster" aspectRatio={p.ratio} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lead" style={{ marginTop: '3rem' }}>
              Want custom AI video ads, creator UGC, or campaign posters for your brand? Explore{' '}
              <Link to={SITE.studioPath} style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
                VELURYN STUDIO
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

export function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | VELURYN AGNECY</title>
        <meta
          name="description"
          content="Transparent per-project rates and monthly retainers in INR and USD for short-form ads, long-form ads, UGC videos, and campaign posters."
        />
      </Helmet>
      <PageHero
        eyebrow="Pricing"
        lines={['Transparent rates,', 'per project or retainer']}
        lead="Clear pricing in INR (₹) and USD ($) for short form ads, long form ads, UGC campaigns, and posters."
        img="pricing-hero.jpg"
      >
        <Button to="/contact?type=brand" variant="primary">
          Book a campaign
        </Button>
        <Button to="/studio" variant="ghost">
          Explore Studio
        </Button>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="Per project"
            title={<>On-demand <em>production rates.</em></>}
            subtitle="Order individual deliverables or bundled packs in INR or USD."
          />
          <div className="steps">
            {PRICING_PER_PROJECT.map((row, i) => (
              <Reveal key={row.item} className="step" delay={i * 0.04}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{row.item}</h3>
                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)' }}>
                  {row.inr} <span style={{ color: 'var(--muted)', fontWeight: 500 }}>/</span> {row.usd}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <SectionHead
            eyebrow="Monthly retainers"
            title={<>Consistent creative <em>at scale.</em></>}
            subtitle="Dedicated monthly output for brands running always-on social and performance campaigns."
          />
          <div className="grid-3">
            {PRICING_RETAINERS.map((plan, i) => (
              <Reveal key={plan.tier} delay={i * 0.08}>
                <div
                  className="card"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: plan.featured ? '2px solid var(--brand-blue)' : undefined,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="kicker-clean" style={{ margin: 0 }}>{plan.tier}</span>
                      {plan.featured && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '999px',
                            background: 'var(--lime)',
                            color: '#061340',
                          }}
                        >
                          Most Popular
                        </span>
                      )}
                    </div>
                    <h3 className="h-lg" style={{ margin: '0.25rem 0 0.2rem' }}>
                      {plan.inr} <span style={{ color: 'var(--muted)', fontWeight: 500 }}>/</span> {plan.usd}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Per month</p>

                    <ul style={{ display: 'grid', gap: '0.65rem', margin: '1rem 0 1.75rem', padding: 0, listStyle: 'none' }}>
                      {plan.deliverables.map((d) => (
                        <li
                          key={d}
                          style={{
                            borderTop: '1px solid var(--line)',
                            paddingTop: '0.65rem',
                            color: 'var(--ink)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            fontSize: '0.94rem',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--lime)',
                              flexShrink: 0,
                            }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button to={`/contact?type=brand&plan=${plan.tier.toLowerCase()}`} variant={plan.featured ? 'primary' : 'ghost'}>
                    Select {plan.tier}
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Terms for both currencies" title={<>Clear terms from <em>day one.</em></>} />
          <div className="steps">
            {PRICING_TERMS.map((term, i) => (
              <Reveal key={term.title} className="step" delay={i * 0.05}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{term.title}</h3>
                <p>{term.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="note" style={{ marginTop: '1.5rem' }}>
              Full terms are in our <Link to="/terms" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Terms of Service</Link>.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <Button to="/contact?type=brand">Start a project</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function Careers() {
  return (
    <>
      <Helmet>
        <title>Careers | VELURYN AGNECY</title>
        <meta name="description" content="Work with VELURYN AGNECY, or join the creator and model roster." />
      </Helmet>
      <PageHero eyebrow="Careers" lines={['Work with', 'VELURYN']} lead="Tell us how you would like to help build the agency. Creators and models can also apply to the roster." img="careers-hero.jpg" />
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="card mb-8" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="kicker-clean">Join the team</span>
                  <h2 className="h-lg" style={{ marginTop: '0.3rem' }}>
                    Send us your details.
                  </h2>
                  <p className="lead" style={{ margin: 0 }}>
                    We read every message. For creator and model representation, use the roster application.
                  </p>
                </div>
                <Button to="/creator-pipeline" variant="ghost">
                  Join the roster ↗
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="careers-form" className="card form-container-card">
              <Form
                subject="Careers enquiry: VELURYN AGNECY"
                button="Send application"
                category="Careers"
                fields={[
                  { name: 'First Name', label: 'First name', required: true, half: true },
                  { name: 'Last Name', label: 'Last name', required: true, half: true },
                  { name: 'Email', label: 'Email', type: 'email', required: true, half: true },
                  { name: 'Area of interest', label: 'Area of interest', placeholder: 'e.g. Design, Account Management, Cyber Security', required: true, half: true },
                  { name: 'Link', label: 'Portfolio or LinkedIn', type: 'url' },
                  { name: 'Message', label: 'Message', type: 'textarea', required: true },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
