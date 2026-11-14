import { Helmet } from 'react-helmet-async';
import { Button, ContactBand, Media, PageHero, Reveal, SectionHead } from '../components/ui';

const CREATORS = [
  'Brand Partnerships & Influencer Campaigns',
  'Talent Representation & Negotiation',
  'Campaign Opportunities (UGC & Sponsored)',
  'Commercial Growth Strategy',
];
const MODELS = [
  'Brand Campaigns & Editorials',
  'Commercial Opportunities',
  'Casting Opportunities',
  'Career Development & Representation',
];

export function TalentManagement() {
  return (
    <>
      <Helmet>
        <title>Talent Management | VELURYN AGNECY</title>
        <meta name="description" content="Representation and commercial management for creators and models." />
      </Helmet>
      <PageHero
        eyebrow="Talent Management"
        lines={['Talent', 'management']}
        lead="Representation and commercial management for creators and models. You create. We handle the business."
        img="talent-hero.jpg"
      >
        <Button to="/contact?type=creator" variant="primary">
          Apply for representation
        </Button>
        <Button to="/creator-pipeline" variant="ghost">
          Creator pipeline
        </Button>
      </PageHero>

      <section className="sec">
        <div className="wrap grid-2">
          {[
            {
              t: 'Creator management',
              p: 'We help creators turn their audience into a sustainable business.',
              l: CREATORS,
              img: 'creators.jpg',
            },
            {
              t: 'Model management',
              p: 'We represent models for commercial, fashion, and lifestyle work.',
              l: MODELS,
              img: 'models.jpg',
            },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 0.1}>
              <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%' }}>
                <Media img={b.img} label={b.t} aspectRatio="16/10" />
                <div style={{ padding: '2rem', display: 'grid', gap: '1rem' }}>
                  <h3 className="h-lg" style={{ margin: 0 }}>
                    {b.t}
                  </h3>
                  <p>{b.p}</p>
                  <ul style={{ display: 'grid', gap: '.65rem', marginTop: '0.5rem' }}>
                    {b.l.map((x) => (
                      <li
                        key={x}
                        style={{
                          borderTop: '1px solid var(--line)',
                          paddingTop: '.75rem',
                          color: 'var(--ink)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
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
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal>
            <span className="kicker-clean">Work with VELURYN</span>
            <h2 className="h-xl" style={{ margin: '0.5rem auto 1.2rem', maxWidth: '18ch' }}>
              Let us handle the business.
            </h2>
            <p className="lead" style={{ margin: '0 auto 2rem' }}>
              We are actively scouting creators and models to join our roster. Let us handle the business so you can focus on the creative.
            </p>
            <Button to="/contact?type=creator" variant="primary">
              Apply for representation
            </Button>
          </Reveal>
        </div>
      </section>

      <ContactBand title="Ready to partner with brands?" />
    </>
  );
}

export function CreatorPipeline() {
  return (
    <>
      <Helmet>
        <title>Creator Pipeline | VELURYN AGNECY</title>
        <meta
          name="description"
          content="Join the VELURYN AGNECY talent network. Secure deposits, watermark protection and reliable payouts for creators."
        />
      </Helmet>
      <PageHero
        eyebrow="Creators"
        lines={['Join our', 'talent network']}
        lead="We identify, vet and connect relevant talent with brands and campaigns. Join our roster and let the opportunities come to you."
        img="creator-hero.jpg"
      >
        <Button to="/contact?type=creator" variant="primary">
          Join the roster
        </Button>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Who we're looking for" title={<>Hooks, not <em>followers.</em></>} />
          <div className="grid-3">
            {[
              [
                'The Niches',
                "We serve brands across E-Commerce, Tech, Health, Fashion, and Lifestyle. Whether you're a creator who hooks an audience or a model for lifestyle shoots, we want you.",
              ],
              [
                'The Metrics',
                "We don't care about your follower count. We care about your ability to create high converting, direct response style content that feels native to TikTok and Reels.",
              ],
              [
                'The Style',
                'Authentic, raw, and engaging. You should be comfortable on camera, skilled at voiceovers, and understand current short-form trends.',
              ],
            ].map(([h, t], i) => (
              <Reveal key={h} delay={i * 0.08}>
                <div className="card fill" style={{ height: '100%' }}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{h}</h3>
                  <p>{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec tint">
        <div className="wrap split top">
          <Reveal>
            <span className="kicker-clean">What you get</span>
            <p className="lead">
              We protect our creators. When you get matched for a campaign, our payment terms are structured to guarantee your compensation.
            </p>
            <div className="points">
              {[
                ['Deposit Security', 'We collect a deposit from the brand before you ever press record.'],
                ['Watermark Protection', 'You deliver a watermarked draft. The brand cannot use the video until the final invoice is paid.'],
                ['Reliable Payouts', 'Once the brand pays the final invoice, you receive your remaining balance immediately.'],
              ].map(([h, t]) => (
                <div className="point" key={h}>
                  <b>{h}</b>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Media img="models.jpg" label="Creator protection" parallax />
          </Reveal>
        </div>
      </section>

      <ContactBand title="Ready to join the creator roster?" />
    </>
  );
}
