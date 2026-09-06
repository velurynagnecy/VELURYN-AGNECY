import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { BentoInfoCard } from '../components/ui/BentoInfoCard';

gsap.registerPlugin(ScrollTrigger);

export default function TalentManagement() {
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
        <title>Talent Management | VELURYN AGNECY</title>
        <meta name="description" content="Representation and commercial management for creators and models." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/Ai%20creator.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>Management</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Talent Management
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Representation and commercial management for creators and models.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          <BentoInfoCard title="Creator Management">
            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              We help creators turn their audience into a sustainable business.
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
              <li style={{ marginBottom: '0.75rem' }}>Brand Partnerships &amp; Influencer Campaigns</li>
              <li style={{ marginBottom: '0.75rem' }}>Talent Representation &amp; Negotiation</li>
              <li style={{ marginBottom: '0.75rem' }}>Campaign Opportunities (UGC &amp; Sponsored)</li>
              <li>Commercial Growth Strategy</li>
            </ul>
          </BentoInfoCard>

          <BentoInfoCard title="Model Management">
             <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
               We represent models for commercial, fashion, and lifestyle work.
             </p>
             <ul style={{ paddingLeft: '1.5rem', color: '#555' }}>
              <li style={{ marginBottom: '0.75rem' }}>Brand Campaigns &amp; Editorials</li>
              <li style={{ marginBottom: '0.75rem' }}>Commercial Opportunities</li>
              <li style={{ marginBottom: '0.75rem' }}>Casting Opportunities</li>
              <li>Career Development &amp; Representation</li>
            </ul>
          </BentoInfoCard>

        </div>
        
        <div className="fade-up" style={{ marginTop: '6rem', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '4rem', borderRadius: '16px' }}>
             <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'normal' }}>Work with VELURYN</h3>
             <p style={{ fontFamily: 'var(--font-body)', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                We are actively scouting creators and models to join our roster. Let us handle the business so you can focus on the creative.
             </p>
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               <Link to="/contact?type=creator" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
                  Apply for Representation <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
               </Link>
             </div>
        </div>

      </section>
    </div>
  );
}
