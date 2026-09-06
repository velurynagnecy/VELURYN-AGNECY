import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

gsap.registerPlugin(ScrollTrigger);

interface Article {
  id: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  body: string[];
}

const articles: Article[] = [];

export default function Articles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useParallax(heroRef, bgRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-up', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fade-up',
          start: 'top 85%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
      <Helmet>
        <title>Articles | VELURYN AGNECY</title>
        <meta name="description" content="Perspectives on marketing, talent, content and culture from VELURYN AGNECY." />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', paddingTop: '160px', paddingBottom: '120px', paddingLeft: '4rem', paddingRight: '4rem', color: '#fff' }}>
        <div 
          ref={bgRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(/images/about-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>From the Agnecy</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Articles
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Our perspective on marketing, talent, content and the way we work.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section style={{ padding: '4rem 4rem 8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {articles.length === 0 ? (
            <div className="fade-up" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#888', lineHeight: 1.8 }}>
                New articles are on the way. Check back soon.
              </p>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s', marginTop: '2rem' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
                Get in touch <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="fade-up" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                  <div style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', color: '#888' }}>{article.tag}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#aaa' }}>{article.date}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.3 }}>
                      {article.title}
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {article.excerpt}
                    </p>
                    {article.body.map((paragraph, idx) => (
                      <p key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
