import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { Arrow, Button, ContactBand, Media, PageHero, Reveal } from '../components/ui';

export function Articles() {
  return (
    <>
      <Helmet>
        <title>Articles | VELURYN AGNECY</title>
        <meta name="description" content="Thinking on culture, creators and marketing from VELURYN AGNECY." />
      </Helmet>
      <PageHero
        eyebrow="Articles &amp; Thought Leadership"
        lines={['Thinking on', 'culture and craft']}
        lead="Analysis, theory and commentary on social media psychology, the creator economy, and artificial intelligence in modern business."
        img="articles-hero.jpg"
      />

      <section className="sec">
        <div className="wrap">
          <div className="insights-grid">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={(i % 2) * 0.08} className="insight-card">
                <Link to={`/articles/${a.id}`} className="insight-card-inner">
                  <div className="insight-media">
                    <Media img={`article-${i + 1}.jpg`} label={a.title} />
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
        </div>
      </section>

      <ContactBand title="Want to collaborate or discuss an idea?" />
    </>
  );
}

const inline = (t: string) => ({
  __html: t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>'),
});

export function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const a = articles.find((x) => x.id === slug);
  if (!a) return <Navigate to="/articles" replace />;

  return (
    <>
      <Helmet>
        <title>{a.title} | VELURYN AGNECY</title>
        <meta name="description" content={a.excerpt} />
      </Helmet>
      <PageHero
        eyebrow={`${a.tag} · ${a.date}`}
        lines={[a.title]}
        lead={a.excerpt}
        img="articles-hero.jpg"
      >
        <div style={{ marginTop: '0.8rem' }}>
          <Button to="/articles" variant="ghost">
            ← Back to all articles
          </Button>
        </div>
      </PageHero>
      <article className="article" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <div className="wrap" style={{ maxWidth: '54rem' }}>
          <div className="prose" style={{ paddingTop: '1rem' }}>
            {a.body.map((p, i) =>
              p.startsWith('## ') ? (
                <h2 key={i} style={{ marginTop: '2.5rem', marginBottom: '0.8rem', color: 'var(--ink)' }}>
                  {p.replace(/^##\s+/, '')}
                </h2>
              ) : p.startsWith('#') ? (
                <h3 key={i} style={{ marginTop: '2.2rem', marginBottom: '0.75rem', color: 'var(--ink)' }}>
                  {p.replace(/^#+\s+/, '')}
                </h3>
              ) : (
                <p key={i} dangerouslySetInnerHTML={inline(p)} style={{ marginBottom: '1.25rem' }} />
              ),
            )}
          </div>

          <div
            style={{
              marginTop: '3.5rem',
              padding: '2.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <b style={{ display: 'block', fontSize: '1.2rem', color: 'var(--ink)' }}>
                Partner with VELURYN AGNECY
              </b>
              <span style={{ color: 'var(--muted)', fontSize: '0.94rem' }}>
                Marketing, content and talent management for brands that move culture.
              </span>
            </div>
            <Button to="/contact" variant="primary">
              Work with us
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
