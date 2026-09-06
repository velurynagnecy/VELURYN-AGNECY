import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { BentoFeatureCard } from '../components/ui/BentoCards';
import { BentoInfoCard } from '../components/ui/BentoInfoCard';

gsap.registerPlugin(ScrollTrigger);

export default function ContentCreative() {
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
        <title>Content &amp; Creative | VELURYN AGNECY</title>
        <meta name="description" content="Creator led and branded content built for attention." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/editorial1.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>Marketing Services</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Content &amp; Creative
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Creator led and branded content built for attention.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ padding: '8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <BentoFeatureCard 
              title="Short Form Content"
              description="Platform native content designed specifically for TikTok, Reels, and YouTube Shorts algorithms."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}
              delay={0}
            />
            <BentoFeatureCard 
              title="Creative Direction"
              description="Concept development, scripting, and visual direction to ensure content aligns with brand strategy."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>}
              delay={0.1}
            />
            <BentoFeatureCard 
              title="Campaign Assets"
              description="Comprehensive content packages built for multi-platform marketing campaigns and paid acquisition."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          <BentoInfoCard title="Beyond UGC">
            <p style={{ marginBottom: '1.5rem' }}>
              While UGC is highly effective for conversion, modern brands need a diverse mix of creative assets. We provide full-spectrum creative support:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem' }}><strong>Branded Content:</strong> Polished brand storytelling that elevates your aesthetic.</li>
              <li style={{ marginBottom: '0.75rem' }}><strong>Social Creative:</strong> Trend-driven assets designed for shareability and organic reach.</li>
              <li><strong>Creator-Led Productions:</strong> Leveraging top talent to anchor high-production value campaigns.</li>
            </ul>
          </BentoInfoCard>

          <BentoInfoCard title="Brief Us" dark={true}>
             <p style={{ marginBottom: '2.5rem' }}>
               Tell us about your creative requirements and we'll build a tailored content solution for your brand.
             </p>
             
             <Link to="/contact?type=brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-white)', color: 'var(--color-black)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s', fontWeight: 600 }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}>
                Start a Project <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
             </Link>
          </BentoInfoCard>

        </div>
      </section>
    </div>
  );
}
