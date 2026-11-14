import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SERVICES, SITE, type Service } from '../data/site';
import { InteractiveTravelCard } from '@/components/ui/3d-card';
import { Arrow, Button, ContactBand, Media, PageHero, Reveal, SectionHead } from '../components/ui';

const SERVICE_3D_METADATA: Record<string, { image: string; action: string; sub: string }> = {
  'influencer-marketing': {
    image: '/images/site/influencer-marketing.jpg',
    action: 'Explore campaigns',
    sub: 'Talent & Reach Strategy',
  },
  'ugc-campaigns': {
    image: '/images/site/ugc-campaigns.jpg',
    action: 'Launch UGC',
    sub: 'Vetted Creator Production',
  },
  'content-creative': {
    image: '/images/site/content-creative.jpg',
    action: 'View creative',
    sub: 'Platform-Native Storytelling',
  },
  'performance-ads': {
    image: '/images/site/performance-ads.jpg',
    action: 'Explore ads',
    sub: 'Paid Media Conversion',
  },
  'social-media-marketing': {
    image: '/images/site/social-media.jpg',
    action: 'Explore social',
    sub: 'Social Growth Strategy',
  },
  'branding-design': {
    image: '/images/site/branding.jpg',
    action: 'Explore branding',
    sub: 'Identity & Systems',
  },
  'seo': {
    image: '/images/site/seo.jpg',
    action: 'Explore search',
    sub: 'Technical & Organic SEO',
  },
  'web-design': {
    image: '/images/site/web-design.jpg',
    action: 'Explore web',
    sub: 'High-Converting Web',
  },
};

export function ServicesHub() {
  return (
    <>
      <Helmet>
        <title>Services | VELURYN AGNECY</title>
        <meta name="description" content="Marketing services built around creators, content and culture." />
      </Helmet>
      <PageHero
        eyebrow="What we do"
        lines={['Marketing services', 'built for culture']}
        lead="We help brands scale through high performing creator content, targeted influencer campaigns, and AI-driven creative."
        img="services-hero.jpg"
      />

      {/* Finovate 4-Column Showcase (Interactive 3D Cards) */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="CORE OFFERINGS"
            title="We Champion the Bold to Achieve the Extraordinary"
          />

          <div className="services-showcase-grid" style={{ marginTop: '2.5rem' }}>
            {SERVICES.slice(0, 4).map((s, i) => {
              const meta = SERVICE_3D_METADATA[s.slug] || {
                image: '',
                action: 'Explore',
                sub: s.short,
              };
              return (
                <Reveal key={s.slug} delay={i * 0.08} className="w-full flex justify-center">
                  <div style={{ perspective: '1000px' }} className="w-full flex justify-center">
                    <InteractiveTravelCard
                      title={s.title}
                      subtitle={meta.sub}
                      imageUrl={meta.image}
                      actionText={meta.action}
                      href={s.path}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Full Service Catalog */}
      <section className="sec tint">
        <div className="wrap">
          <SectionHead
            eyebrow="FULL SPECTRUM"
            title="Complete Agency Capabilities"
            subtitle="Select a practice below to inspect deliverables, production pipeline, and usage rights."
          />
          <div>
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.03}>
                <Link to={s.path} className="svc">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                  </div>
                  <span className="go">
                    <Arrow size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={SERVICES.length * 0.03}>
              <Link to={SITE.studioPath} className="svc">
                <span className="n">{String(SERVICES.length + 1).padStart(2, '0')}</span>
                <div>
                  <h3>AI Visuals &amp; UGC Ads</h3>
                  <p>Short form ads, long form ads, UGC ads and posters, made at VELURYN STUDIO. {SITE.studioCta}</p>
                </div>
                <span className="go">
                  <Arrow size={14} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactBand title="Ready to launch a campaign?" />
    </>
  );
}

function Detail({ s }: { s: Service }) {
  const idx = SERVICES.findIndex((x) => x.slug === s.slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      <Helmet>
        <title>{s.title} | VELURYN AGNECY</title>
        <meta name="description" content={s.short} />
      </Helmet>
      <PageHero
        eyebrow="Services"
        lines={s.title.split(' & ').length > 1 ? [s.title.split(' & ')[0] + ' &', s.title.split(' & ')[1]] : [s.title]}
        lead={s.lead}
        img={`hero-${s.img}`}
      >
        <Button to="/contact?type=brand" variant="primary">
          {s.cta}
        </Button>
        <Button to="/services" variant="ghost">
          All services
        </Button>
      </PageHero>

      <section className="sec">
        <div className="wrap split top">
          <Reveal>
            <span className="kicker-clean">{s.pointsTitle}</span>
            <div className="points">
              {s.points.map((p) => (
                <div className="point" key={p.h}>
                  <b>{p.h}</b>
                  <span>{p.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Media img={s.img} label={s.title} parallax />
          </Reveal>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title={s.stepsTitle} />
          <div className="steps">
            {s.steps.map((st, i) => (
              <Reveal key={st.h} delay={i * 0.05} className="step">
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{st.h}</h3>
                <p>{st.t}</p>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="lead" style={{ marginTop: '2.5rem' }}>
              {s.closing}
            </p>
            <div style={{ display: 'flex', gap: '.85rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Button to="/contact?type=brand" variant="primary">
                {s.cta}
              </Button>
              <Button to={next.path} variant="ghost">
                Next: {next.title}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </>
  );
}

/** One component serves every service route. */
export default function ServicePage({ slug }: { slug?: string }) {
  const params = useParams();
  const key = slug ?? params.slug;
  const s = SERVICES.find((x) => x.slug === key);
  if (!s) return <Navigate to="/services" replace />;
  return <Detail s={s} />;
}
