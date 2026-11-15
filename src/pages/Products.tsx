import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { DEVELOPER_PRODUCTS, SITE, VISUAL_PRODUCTS, type DeveloperProduct } from '../data/site';
import { Arrow, Button, ContactBand, Media, PageHero, Reveal, SectionHead } from '../components/ui';

type Track = 'all' | 'developers' | 'visuals';
type DevCategory = 'All' | DeveloperProduct['category'];

const DEV_CATEGORIES: DevCategory[] = ['All', 'Email Automation', 'API Tool', 'Cyber Security', 'ML Tools'];

export default function Products({ initialTrack }: { initialTrack?: Track }) {
  const { pathname } = useLocation();
  const activeTrack: Track =
    initialTrack ||
    (pathname.endsWith('/developers') ? 'developers' : pathname.endsWith('/visuals') ? 'visuals' : 'all');

  const [devFilter, setDevFilter] = useState<DevCategory>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDevTools =
    devFilter === 'All' ? DEVELOPER_PRODUCTS : DEVELOPER_PRODUCTS.filter((p) => p.category === devFilter);

  function copyText(id: string, text: string) {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  }

  return (
    <>
      <Helmet>
        <title>Products | Rust Developer Tools &amp; Google Flow Prompts | VELURYN AGNECY</title>
        <meta
          name="description"
          content="Explore VELURYN products: high-performance developer tools built in Rust (email automation, API gateways, cyber security, ML inference) and Google Flow visual prompt packs."
        />
      </Helmet>

      <PageHero
        eyebrow="Products"
        lines={
          activeTrack === 'developers'
            ? ['Developer tools,', 'built in Rust']
            : activeTrack === 'visuals'
              ? ['Visual prompts,', 'made for Google Flow']
              : ['Tools for developers.', 'Prompts for visuals.']
        }
        lead="Two product lines engineered by VELURYN: memory-safe Rust infrastructure for developers and production-tested Google Flow prompt systems for visual creators."
        img="services-hero.jpg"
      >
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Button to="/products" variant={activeTrack === 'all' ? 'primary' : 'ghost'}>
            All Products
          </Button>
          <Button to="/products/developers" variant={activeTrack === 'developers' ? 'primary' : 'ghost'}>
            For Developers (Rust)
          </Button>
          <Button to="/products/visuals" variant={activeTrack === 'visuals' ? 'primary' : 'ghost'}>
            For Visuals (Google Flow)
          </Button>
        </div>
      </PageHero>

      {/* Two-Division Overview Cards when on /products */}
      {activeTrack === 'all' && (
        <section className="sec">
          <div className="wrap">
            <SectionHead
              eyebrow="Two Divisions"
              title={
                <>
                  Built for <em>builders</em> and <em>creatives.</em>
                </>
              }
              subtitle="Choose a product track below or scroll to explore all releases."
            />
            <div className="grid-2">
              <Reveal>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="kicker-clean" style={{ margin: 0 }}>01 · For Developers</span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          color: 'var(--ink)',
                        }}
                      >
                        Built in Rust
                      </span>
                    </div>
                    <h3 className="h-lg" style={{ margin: '0 0 0.6rem' }}>
                      Email Automation, API Gateways, Cyber Security &amp; ML Tools
                    </h3>
                    <p style={{ color: 'var(--muted)' }}>
                      Single-binary, memory-safe developer tools engineered in Rust for high-throughput outreach, zero-trust API key protection, threat scanning, and low-latency ML inference.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button to="/products/developers" variant="primary">
                      Explore Developer Tools
                    </Button>
                    <a href="#developers" className="btn ghost">
                      <span>Jump to Rust tools</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="kicker-clean" style={{ margin: 0 }}>02 · For Visuals</span>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '999px',
                          background: 'var(--lime)',
                          color: '#061340',
                        }}
                      >
                        Made for Google Flow
                      </span>
                    </div>
                    <h3 className="h-lg" style={{ margin: '0 0 0.6rem' }}>
                      Commercial Video &amp; UGC Prompt Systems
                    </h3>
                    <p style={{ color: 'var(--muted)' }}>
                      Production-tested Google Flow prompt packs crafted by VELURYN STUDIO directors for vertical luxury commercials, hyper-real UGC routines, bridal lookbooks, and tabletop product ads.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button to="/products/visuals" variant="primary">
                      Explore Visual Prompts
                    </Button>
                    <a href="#visuals" className="btn ghost">
                      <span>Try free sample prompts</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Track 1: For Developers (Rust Tools) */}
      {(activeTrack === 'all' || activeTrack === 'developers') && (
        <section className={`sec ${activeTrack === 'all' ? 'tint' : ''}`} id="developers">
          <div className="wrap">
            <SectionHead
              eyebrow="01 · For Developers"
              title={
                <>
                  Systems &amp; tools engineered in <em>Rust.</em>
                </>
              }
              subtitle="Zero garbage collection, sub-millisecond latency, and single-binary deployment across Email Automation, API Tooling, Cyber Security, and Machine Learning."
            />

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {DEV_CATEGORIES.map((cat) => {
                const active = devFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setDevFilter(cat)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: '1px solid var(--line)',
                      background: active ? 'var(--ink)' : 'var(--surface)',
                      color: active ? 'var(--bg)' : 'var(--ink)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="grid-2">
              {filteredDevTools.map((tool, i) => (
                <Reveal key={tool.id} delay={i * 0.06}>
                  <div
                    className="card"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.25rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        <span className="kicker-clean" style={{ margin: 0 }}>{tool.category}</span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.65rem',
                            borderRadius: '999px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            color: 'var(--ink)',
                          }}
                        >
                          {tool.engine}
                        </span>
                      </div>

                      <h3 className="h-lg" style={{ margin: '0 0 0.5rem' }}>{tool.name}</h3>
                      <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>{tool.summary}</p>

                      <ul style={{ display: 'grid', gap: '0.55rem', margin: '0 0 1.25rem', padding: 0, listStyle: 'none' }}>
                        {tool.specs.map((spec) => (
                          <li
                            key={spec}
                            style={{
                              borderTop: '1px solid var(--line)',
                              paddingTop: '0.55rem',
                              color: 'var(--ink)',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.6rem',
                              fontSize: '0.9rem',
                            }}
                          >
                            <span
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: 'var(--lime)',
                                marginTop: '0.45rem',
                                flexShrink: 0,
                              }}
                            />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Terminal CLI Preview */}
                      <div
                        style={{
                          background: '#0b101b',
                          color: '#e2e8f0',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                          fontSize: '0.8rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '0.75rem',
                          overflowX: 'auto',
                        }}
                      >
                        <code style={{ whiteSpace: 'nowrap' }}>$ {tool.cliSnippet}</code>
                        <button
                          type="button"
                          onClick={() => copyText(tool.id, tool.cliSnippet)}
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.18)',
                            borderRadius: '6px',
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          {copiedId === tool.id ? 'Copied' : 'Copy CLI'}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>Status: {tool.status}</span>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {tool.category === 'Cyber Security' && (
                          <a href={SITE.icaUrl} target="_blank" rel="noopener noreferrer" className="btn ghost" style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}>
                            <span>ICA Division ↗</span>
                          </a>
                        )}
                        <Link
                          to={`/contact?type=other&product=${encodeURIComponent(tool.name)}`}
                          className="btn primary"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                        >
                          <span>Request Access</span>
                          <span className="dot" aria-hidden="true">
                            <Arrow size={11} />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Track 2: For Visuals (Google Flow Prompts) */}
      {(activeTrack === 'all' || activeTrack === 'visuals') && (
        <section className="sec" id="visuals">
          <div className="wrap">
            <SectionHead
              eyebrow="02 · For Visuals"
              title={
                <>
                  Prompt systems made for <em>Google Flow.</em>
                </>
              }
              subtitle="Copy a free studio sample prompt below to test in Google Flow immediately, or book the full prompt pack and custom AI production with VELURYN STUDIO."
            />

            <div className="grid-2">
              {VISUAL_PRODUCTS.map((pack, i) => (
                <Reveal key={pack.id} delay={i * 0.06}>
                  <div
                    className="card"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.25rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                        <span className="kicker-clean" style={{ margin: 0 }}>{pack.category}</span>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.22rem 0.65rem',
                            borderRadius: '999px',
                            background: 'var(--lime)',
                            color: '#061340',
                          }}
                        >
                          {pack.tool} · {pack.ratio}
                        </span>
                      </div>

                      <h3 className="h-lg" style={{ margin: '0 0 0.5rem' }}>{pack.title}</h3>
                      <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>{pack.summary}</p>

                      {/* Sample Visual Output Showcase */}
                      {pack.img && (
                        <div
                          style={{
                            position: 'relative',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            marginBottom: '1rem',
                            border: '1px solid var(--line)',
                          }}
                        >
                          <Media img={pack.img} label={`${pack.title} sample output`} aspectRatio="16 / 10" />
                          <span
                            style={{
                              position: 'absolute',
                              bottom: '0.65rem',
                              left: '0.65rem',
                              background: 'rgba(6, 19, 64, 0.82)',
                              backdropFilter: 'blur(8px)',
                              color: '#ffffff',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '0.25rem 0.65rem',
                              borderRadius: '999px',
                              border: '1px solid rgba(255, 213, 4, 0.35)',
                            }}
                          >
                            Sample Output · {pack.tool}
                          </span>
                        </div>
                      )}

                      {/* Copyable Sample Google Flow Prompt Box */}
                      <div
                        style={{
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: '12px',
                          padding: '1rem',
                          marginBottom: '1.1rem',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)' }}>
                            Sample Google Flow Prompt
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText(pack.id, pack.samplePrompt)}
                            style={{
                              background: 'var(--ink)',
                              color: 'var(--bg)',
                              border: 'none',
                              borderRadius: '999px',
                              padding: '0.28rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            {copiedId === pack.id ? 'Copied Prompt!' : 'Copy Prompt'}
                          </button>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '0.86rem',
                            lineHeight: 1.55,
                            color: 'var(--ink)',
                            fontStyle: 'italic',
                          }}
                        >
                          &ldquo;{pack.samplePrompt}&rdquo;
                        </p>
                      </div>

                      <ul style={{ display: 'grid', gap: '0.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
                        {pack.deliverables.map((item) => (
                          <li
                            key={item}
                            style={{
                              borderTop: '1px solid var(--line)',
                              paddingTop: '0.5rem',
                              color: 'var(--ink)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.6rem',
                              fontSize: '0.88rem',
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
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
                      <Link to="/studio" style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--ink)', textDecoration: 'underline' }}>
                        See Studio output ↗
                      </Link>
                      <Link
                        to={`/contact?type=brand&product=${encodeURIComponent(pack.title)}`}
                        className="btn primary"
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
                      >
                        <span>Get Full Pack</span>
                        <span className="dot" aria-hidden="true">
                          <Arrow size={11} />
                        </span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactBand title="Want custom Rust tooling or Google Flow visual production?" />
    </>
  );
}
