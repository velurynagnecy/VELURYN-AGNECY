import { Helmet } from 'react-helmet-async';
import { SHORT_ADS, SITE, STUDIO, STUDIO_POSTERS, STUDIO_SERVICES, UGC_ADS } from '../data/site';
import { Arrow, Button, Media, PageHero, Reveal, SectionHead } from '../components/ui';
import { Form } from '../components/Form';
import VideoCard from '../components/VideoCard';

const FORMAT_META = [
  { ratio: '9:16', tag: 'Vertical Ads', href: '#short-ads', icon: 'vertical' },
  { ratio: '9:16', tag: 'Creator Native', href: '#ugc-ads', icon: 'ugc' },
  { ratio: '4:5', tag: 'Static Canvas', href: '#posters', icon: 'poster' },
];

export default function Studio() {
  return (
    <>
      <Helmet>
        <title>VELURYN STUDIO | AI ads and UGC | VELURYN AGNECY</title>
        <meta
          name="description"
          content="VELURYN STUDIO makes AI generated short form ads, long form ads, UGC ads and posters. Visuals by AI, planning by humans."
        />
      </Helmet>
      <PageHero
        badge={
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-[#FFD504]/30 shadow-lg">
            <img
              src="/studio-logo.png"
              alt="VELURYN STUDIO"
              className="h-7 w-auto object-contain drop-shadow-[0_2px_8px_rgba(255,213,4,0.4)]"
            />
          </div>
        }
        eyebrow="VELURYN STUDIO"
        lines={['Words say nothing', 'when visuals', 'are everything']}
        lead={STUDIO.intro}
        img="studio-hero.jpg"
      >
        <Button href="#work" variant="primary">
          Explore reel
        </Button>
        <Button to="/contact?type=brand" variant="ghost">
          Book studio
        </Button>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="What we make" title={<>Three formats, <em>one look.</em></>} />
          <div className="studio-formats-grid">
            {STUDIO_SERVICES.map((s, i) => {
              const meta = FORMAT_META[i] || FORMAT_META[0];
              return (
                <Reveal key={s.id} delay={i * 0.06}>
                  <a href={meta.href} className="format-card" aria-label={`Jump to ${s.title} reel`}>
                    <div className="format-card-top">
                      <span className="format-num">{String(i + 1).padStart(2, '0')}</span>
                      <div className="format-ratio-pill">
                        <span className={`format-ratio-shape ${meta.icon}`} aria-hidden="true" />
                        <span>{meta.ratio}</span>
                      </div>
                    </div>

                    <div className="format-card-content">
                      <span className="format-card-tag">{meta.tag}</span>
                      <h3 className="format-card-title">{s.title}</h3>
                      <p className="format-card-text">{s.text}</p>
                    </div>

                    <div className="format-card-footer">
                      <span className="format-stat-label">{s.stat}</span>
                      <span className="format-jump-link">
                        <span>View</span>
                        <Arrow size={12} dir="right" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap split top">
          <Reveal>
            <span className="kicker-clean">How it is made</span>
            <h2 className="h-xl">Humans plan it. AI brings it to life.</h2>
            <div className="points" style={{ marginTop: '1.5rem' }}>
              <div className="point">
                <b>Planned by humans</b>
                <span>Every concept, script and shot list is written by a person who thinks about your brand and your audience first.</span>
              </div>
              <div className="point">
                <b>Made with {STUDIO.tool}</b>
                <span>The visuals are generated with AI, so an idea becomes a finished video without a film crew or a studio booking.</span>
              </div>
              <div className="point">
                <b>Tamil and English</b>
                <span>Short form, long form, UGC and posters.</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Media img="studio-about.jpg" label="Studio production process" parallax />
          </Reveal>
        </div>
      </section>

      <section className="sec" id="short-ads">
        <span id="work" className="sr-only" />
        <div className="wrap">
          <SectionHead eyebrow="Short form ads" title={<>Built for the <em>first second.</em></>} />
          <div className="vgrid two">
            {SHORT_ADS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <VideoCard item={a} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint" id="ugc-ads">
        <div className="wrap">
          <SectionHead eyebrow="UGC & AI ads" title={<>Maya Bennett <em>UGC reels.</em></>} />
          <div className="vgrid three">
            {UGC_ADS.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.06}>
                <VideoCard item={a} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="posters">
        <div className="wrap">
          <SectionHead eyebrow="Posters" title={<>Campaign <em>posters.</em></>} />
          <div className="posters-grid">
            {STUDIO_POSTERS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Media img={p.img} label={p.title} className="poster" aspectRatio={p.ratio} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="card" style={{ padding: '1.5rem' }}>
                <div className="mb-3">
                  <img
                    src="/studio-logo.png"
                    alt="VELURYN STUDIO"
                    className="h-6 w-auto object-contain drop-shadow-sm"
                  />
                </div>
                <span className="kicker-clean">Book the studio</span>
                <p style={{ margin: '0.3rem 0 0 0', fontWeight: 600 }}>Direct Production Inquiries</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Discovery call within 24 hours</span>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <span className="kicker-clean">Direct Contact</span>
                <p style={{ margin: '0.4rem 0 0 0', fontWeight: 600 }}>
                  <a href={`mailto:${SITE.email}`} style={{ color: 'var(--ink)' }}>
                    {SITE.email}
                  </a>
                </p>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem' }}>
                  <a href={SITE.phoneHref} style={{ color: 'var(--muted)' }}>
                    {SITE.phone} ({SITE.phoneNote})
                  </a>
                </p>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <span className="kicker-clean">Commercial Pricing</span>
                <p style={{ margin: '0.3rem 0 0.8rem 0', fontSize: '0.86rem', color: 'var(--muted)' }}>
                  Transparent tiers for short-form, long-form, posters, and UGC.
                </p>
                <Button to="/pricing" variant="ghost" style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}>
                  How pricing works ↗
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div id="studio-form" className="card form-container-card">
              <div style={{ marginBottom: '1.75rem' }}>
                <span className="kicker-clean">Studio Request</span>
                <h2 className="h-lg" style={{ marginTop: '0.3rem' }}>
                  Tell us what you want made.
                </h2>
                <p className="lead" style={{ margin: 0 }}>
                  Fill out your campaign requirements below to preview your formal studio brief before sending.
                </p>
              </div>

              <Form
                subject="Studio enquiry: VELURYN STUDIO"
                extra={{ 'Inquiry Type': 'studio' }}
                button="Send to the studio"
                category="Studio Booking"
                fields={[
                  { name: 'Name', label: 'Name', required: true, half: true },
                  { name: 'Email', label: 'Email', type: 'email', required: true, half: true },
                  { name: 'Brand', label: 'Brand', required: true, half: true },
                  { name: 'Format', label: 'Format needed', placeholder: 'e.g. Short-form vertical ads, UGC ads, Campaign posters', required: true, half: true },
                  { name: 'Message', label: 'Tell us about the project', type: 'textarea', required: true },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
