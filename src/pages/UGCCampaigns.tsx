import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { StepperCard } from '../components/ui/StepperCards';
import { BentoInfoCard } from '../components/ui/BentoInfoCard';

gsap.registerPlugin(ScrollTrigger);

export default function UGCCampaigns() {
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
        <title>UGC Campaigns | VELURYN AGNECY</title>
        <meta name="description" content="Authentic UGC video packages for consumer mobile apps." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(/images/ugc-campaigns-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>For Brands</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            UGC Campaigns tailored for mobile growth.
        </h1>
        <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
          We bundle vetted creators into high-volume video packages, managing the entire pipeline from brief to final delivery. Stop hunting for creators &mdash; start scaling your acquisition.
        </p>
        </div>
      </section>

      {/* Workflow Section */}
      <section style={{ padding: '8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '4rem', fontWeight: 'normal' }}>The Pipeline</h2>
          
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <StepperCard 
              num="01"
              title="Brief & Match"
              description="You submit your campaign goals and app verticals. We tap our roster and match you with the perfect creators for your niche."
            />
            <StepperCard 
              num="02"
              title="Watermarked Drafts"
              description="Creators script and film the content. We deliver watermarked drafts to you for review and approval."
            />
            <StepperCard 
              num="03"
              title="Invoice & Release"
              description="Once approved, we issue the final invoice. Upon payment, the watermark is removed and high-res files are released to you."
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          <BentoInfoCard title="Usage Rights">
            <p style={{ marginBottom: '1.5rem' }}>
              We understand apps need content for performance marketing. That's why we structure usage rights clearly from the start:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem' }}><strong>Organic Rights:</strong> Standard inclusion for posting on your owned social channels.</li>
              <li><strong>Paid / Whitelisting:</strong> Priced separately to allow scaling across paid acquisition channels (Meta, TikTok, etc.) with explicit creator permission.</li>
            </ul>
          </BentoInfoCard>

          <BentoInfoCard title="Custom Packages" dark={true}>
             <p style={{ marginBottom: '2.5rem' }}>
               Every app is different. We custom-build bundles (e.g., 2 creators &times; 3 videos) based on your exact volume needs, target audience, and required usage rights. 
               Reach out for a custom quote tailored to your next campaign.
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
