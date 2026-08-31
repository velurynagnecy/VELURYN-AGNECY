import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

import { useParallax } from '../hooks/useParallax';
import { CardHoverReveal, CardHoverRevealMain, CardHoverRevealTitle, CardHoverRevealContent } from '../components/ui/HoverRevealCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useParallax(heroRef, bgRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.from('.content h1, .hero-subhead, .actions', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Split section animations
      gsap.from('.split-box', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-container',
          start: 'top 80%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', overflowX: 'hidden' }}>
      <Helmet>
        <title>VELURYN AGNECY | Connecting Apps with Creators</title>
        <meta name="description" content="An international UGC creator brokerage focused on the US, UK, Canada, and Australia. We connect talented creators with consumer mobile app brands for high-performing video campaigns." />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} className="hero" style={{ overflow: 'hidden', isolation: 'isolate' }}>
        
        {/* Parallax / Fixed Background for iOS Safari compatibility */}
        <div 
          ref={bgRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 75%), url(/images/home-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        
        <div className="color-grade"></div>
        
        <svg className="field" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M1300,60 C 950,140 620,260 300,420" strokeWidth="2" opacity="0.5" fill="none" stroke="currentColor"></path>
          <path d="M1300,140 C 980,210 660,330 340,480" strokeWidth="2" opacity="0.35" fill="none" stroke="currentColor"></path>
          <path d="M1300,220 C 1000,280 700,390 400,540" strokeWidth="2.4" opacity="0.55" fill="none" stroke="currentColor"></path>
          <path d="M1300,300 C 1020,350 740,440 460,590" strokeWidth="2" opacity="0.3" fill="none" stroke="currentColor"></path>
          <path d="M1300,380 C 1040,420 780,490 520,630" strokeWidth="2.8" opacity="0.6" fill="none" stroke="currentColor"></path>
          <path d="M1300,460 C 1060,490 820,540 580,660" strokeWidth="2" opacity="0.28" fill="none" stroke="currentColor"></path>
          <path d="M1300,540 C 1080,560 860,590 640,690" strokeWidth="2" opacity="0.4" fill="none" stroke="currentColor"></path>
          <path d="M1300,-20 C 900,90 520,230 180,380" strokeWidth="2" opacity="0.22" fill="none" stroke="currentColor"></path>
        </svg>

        <svg className="grain" aria-hidden="true">
          <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"></feTurbulence></filter>
          <rect width="100%" height="100%" filter="url(#n)"></rect>
        </svg>

        <div className="vignette"></div>
        <div className="text-protection"></div>

        <div className="content">
          <h1>An Agnetic Shot that Really Draws.</h1>
          <p className="hero-subhead">
            UGC video pipelines for mobile apps — built on conversion, not follower count.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" to="/ugc-campaigns">Brands <span aria-hidden="true">&rarr;</span></Link>
            <Link className="btn btn-secondary" to="/creator-pipeline">Join <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </div>

        <div className="scroll">
          <span>SCROLL</span>
          <div className="stem"></div>
        </div>

      </section>

      {/* Split Intent Section */}
      <section className="split-container" style={{ padding: '8rem 4rem', backgroundColor: '#fff', color: '#000' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          <CardHoverReveal className="split-box" style={{ height: '600px', width: '100%' }}>
            <CardHoverRevealMain>
              <img
                src="/images/brands.jpg"
                alt="For Brands"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
            </CardHoverRevealMain>

            <CardHoverRevealTitle>
              <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '3rem', color: '#fff', fontWeight: 'normal', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>For Brands</h2>
            </CardHoverRevealTitle>

            <CardHoverRevealContent>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                  Stop hunting for unreliable freelancers. We curate high-performing creators tailored to your app vertical and manage the entire workflow. You get watermarked drafts, unlimited usage rights, and a steady stream of converting assets.
                </p>
                <Link to="/ugc-campaigns" className="btn btn-primary" style={{ display: 'inline-flex', width: 'fit-content' }}>
                  View Campaigns <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </CardHoverRevealContent>
          </CardHoverReveal>

          <CardHoverReveal className="split-box" style={{ height: '600px', width: '100%' }}>
            <CardHoverRevealMain>
              <img
                src="/images/creators.jpg"
                alt="For Creators"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
            </CardHoverRevealMain>

            <CardHoverRevealTitle>
              <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '3rem', color: '#fff', fontWeight: 'normal', margin: 0, textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>For Creators</h2>
            </CardHoverRevealTitle>

            <CardHoverRevealContent>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                  Tired of chasing payments and pitching brands? Join our roster. We connect you with top-tier mobile apps, secure your deposits upfront, and protect your content with our watermark-release workflow. You create. We handle the business.
                </p>
                <Link to="/creator-pipeline" className="btn btn-primary" style={{ display: 'inline-flex', width: 'fit-content', background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)', boxShadow: '0 8px 24px rgba(16,185,129,0.28)' }}>
                  Apply to Roster <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </CardHoverRevealContent>
          </CardHoverReveal>

        </div>
      </section>

      {/* Proof / Placeholder Section */}
      <section style={{ padding: '8rem 4rem', backgroundColor: 'var(--color-black)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'normal', color: '#fff' }}>Proven Performance</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: '#888', lineHeight: 1.6 }}>
            Our creators are currently fueling user acquisition for fast-growing apps across Fintech, Dating, and Productivity. 
            <br/><br/>
            <span style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '1rem' }}>[Case studies and performance metrics will be published here as campaign data matures.]</span>
          </p>
        </div>
      </section>

    </div>
  );
}
