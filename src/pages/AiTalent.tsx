import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AI_TALENT, UGC_ADS } from '../data/site';
import { Arrow, Button, ContactBand, Media, PageHero, Reveal, SectionHead } from '../components/ui';
import VideoCard from '../components/VideoCard';

export function AiTalentList() {
  return (
    <>
      <Helmet>
        <title>AI Talent | VELURYN AGNECY</title>
        <meta name="description" content="The AI talent of VELURYN AGNECY." />
      </Helmet>
      <PageHero eyebrow="Talent" lines={['AI', 'talent']} lead="The AI talent we work with, ready for your next campaign." img="ai-talent-hero.jpg" />
      <section className="sec">
        <div className="wrap">
          <div className="grid-3">
            {AI_TALENT.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08}>
                <Link to={`/ai-talent/${t.slug}`} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <Media img={t.img} label={t.name} className="portrait" />
                  <div style={{ padding: '1.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>{t.name}</h3>
                    <Arrow />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBand title="Want to book AI talent?" />
    </>
  );
}

export function AiTalentProfile() {
  const { slug } = useParams();
  const t = AI_TALENT.find((x) => x.slug === slug);
  if (!t) return <Navigate to="/ai-talent" replace />;
  return (
    <>
      <Helmet>
        <title>{t.name} | AI Talent | VELURYN AGNECY</title>
        <meta name="description" content={`${t.name}, AI talent at VELURYN AGNECY.`} />
      </Helmet>
      <PageHero
        eyebrow="AI Talent"
        lines={[t.name]}
        lead="Exclusive AI creator profile. Available for high-impact UGC concepts, beauty and lifestyle product showcases, and paid social campaigns."
        img={t.img}
      >
        <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
          <Button to="/contact?type=brand">Book {t.name.split(' ')[0]}</Button>
          <Button href="https://www.instagram.com/maya.benett2002/" external variant="ghost">
            Instagram @maya.benett2002
          </Button>
          <Button to="/ai-talent" variant="ghost">
            All AI talent
          </Button>
        </div>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <SectionHead
            eyebrow="Portfolio Reels"
            title={<>Featured UGC by <em>{t.name}.</em></>}
          />
          <div className="vgrid three">
            {UGC_ADS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <VideoCard item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactBand title={`Collaborate with ${t.name.split(' ')[0]}`} />
    </>
  );
}
