import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { BentoFeatureCard } from '../components/ui/BentoCards';
import { BentoInfoCard } from '../components/ui/BentoInfoCard';

gsap.registerPlugin(ScrollTrigger);

export default function CreatorPipeline() {
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
        <title>Creator Pipeline | VELURYN AGNECY</title>
        <meta name="description" content="Join our vetted UGC creator roster and connect with top performance brands." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(/images/creator-pipeline-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>For Creators</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Get paid to create native video content for brands.
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            We broker deals between talented UGC creators and direct response brands. Stop pitching brands endlessly join our roster and let the campaigns come to you.
          </p>
        </div>
      </section>

      {/* What We Look For Section */}
      <section style={{ padding: '8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '4rem', fontWeight: 'normal' }}>Who We're Looking For</h2>
          
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <BentoFeatureCard 
              title="The Niches"
              description="We primarily serve performance brands in E-Commerce, Tech, Health, and Lifestyle. If you know how to hook an audience in these verticals, we want you."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>}
              delay={0}
            />
            <BentoFeatureCard 
              title="The Metrics"
              description="We don't care about your follower count. We care about your ability to create high converting, direct response style content that feels native to TikTok and Reels."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>}
              delay={0.1}
            />
            <BentoFeatureCard 
              title="The Style"
              description="Authentic, raw, and engaging. You should be comfortable on camera, skilled at voiceovers, and understand current short-form trends."
              icon={<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section style={{ padding: '8rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
          
          <BentoInfoCard title="What You Get">
            <p style={{ marginBottom: '1.5rem' }}>
              We protect our creators. When you get matched for a campaign, our payment terms are structured to guarantee your compensation:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.75rem' }}><strong>Deposit Security:</strong> We collect a deposit from the brand before you ever press record.</li>
              <li style={{ marginBottom: '0.75rem' }}><strong>Watermark Protection:</strong> You deliver a watermarked draft. The brand cannot use the video until the final invoice is paid.</li>
              <li><strong>Reliable Payouts:</strong> Once the brand pays the final invoice, you receive your remaining balance immediately.</li>
            </ul>
          </BentoInfoCard>

          <BentoInfoCard title="Ready to work?" dark={true}>
             <p style={{ marginBottom: '2.5rem' }}>
               Tell us about your niche, rates, and availability. We review portfolios on a rolling basis.
             </p>
             
             <Link to="/contact?type=creator" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-white)', color: 'var(--color-black)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s', fontWeight: 600 }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}>
                Apply to the Roster <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
             </Link>
          </BentoInfoCard>

        </div>
      </section>
    </div>
  );
}
