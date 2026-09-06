import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { StepperCard } from '../components/ui/StepperCards';
import { BentoInfoCard } from '../components/ui/BentoInfoCard';

gsap.registerPlugin(ScrollTrigger);

export default function InfluencerMarketing() {
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
        <title>Influencer Marketing | VELURYN AGNECY</title>
        <meta name="description" content="Strategic creator campaigns built around the right audience and talent." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/Influencer Marketing.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>Marketing Services</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Influencer Marketing
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Strategic creator campaigns built around the right audience and talent.
          </p>
        </div>
      </section>

      {/* Workflow Section */}
      <section style={{ padding: '8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '4rem', fontWeight: 'normal' }}>How We Execute</h2>
          
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <StepperCard 
              num="01"
              title="Strategy"
              description="Understand your brand, audience, and campaign objectives before we identify any talent."
            />
            <StepperCard 
              num="02"
              title="Discovery"
              description="Source and vet the right creators for your vertical, ensuring authentic alignment with your brand."
            />
            <StepperCard 
              num="03"
              title="Negotiation"
              description="Secure talent, align on deliverables, and negotiate terms and usage rights on your behalf."
            />
            <StepperCard 
              num="04"
              title="Production"
              description="Manage the creative process from brief to delivery, ensuring content hits performance goals."
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          <BentoInfoCard title="What This Includes">
            <p style={{ marginBottom: '1.5rem' }}>
              We handle the end-to-end influencer pipeline so your team doesn't have to:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem' }}><strong>Influencer Strategy:</strong> Aligning creators with your business goals.</li>
              <li style={{ marginBottom: '0.75rem' }}><strong>Creator Sourcing &amp; Selection:</strong> Vetting talent for authentic audience overlap.</li>
              <li style={{ marginBottom: '0.75rem' }}><strong>Campaign Management:</strong> Handling briefs, timelines, and deliverables.</li>
              <li><strong>Reporting:</strong> Analyzing campaign performance and ROI.</li>
            </ul>
          </BentoInfoCard>

          <BentoInfoCard title="Start a Campaign" dark={true}>
             <p style={{ marginBottom: '2.5rem' }}>
               Ready to scale your brand through targeted influencer partnerships? Reach out to discuss your objectives and budget.
             </p>
             
             <Link to="/contact?type=brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-white)', color: 'var(--color-black)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s', fontWeight: 600 }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}>
                Get in Touch <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
             </Link>
          </BentoInfoCard>

        </div>
      </section>
    </div>
  );
}
