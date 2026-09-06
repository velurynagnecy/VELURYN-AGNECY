import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
        <title>About | VELURYN AGNECY</title>
        <meta name="description" content="VELURYN AGNECY is a Marketing & Management Agency." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/About.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>About Us</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Marketing &amp; Management Agency.
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Brands, talent, content and culture.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 4rem 8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="fade-up" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 600 }}>The Story</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              VELURYN AGNECY started by solving a very specific problem: brands needed high performing video content, and creators needed a secure, reliable way to get paid for making it.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              We built a UGC pipeline to bridge that gap. But as our roster grew and our brand partners scaled, the work evolved. Today, VELURYN operates across two connected divisions: Marketing and Management.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
              We run influencer campaigns, produce branded content, and manage creative for performance brands. Concurrently, we represent a curated roster of creators and models, managing their commercial careers so they can focus on what they do best.
            </p>
          </div>

          <div className="fade-up" style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Our Mission</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              To build the infrastructure that powers modern marketing. We believe the best campaigns are creator-led, and the best creators deserve professional representation.
            </p>
          </div>

          {/* Founder's Note Section */}
          <div className="fade-up" style={{ marginBottom: '6rem', backgroundColor: 'var(--color-white)', padding: '3rem', borderRadius: '12px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <img 
                src="/images/CE.webp" 
                alt="Vivin Bharathi"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 600 }}>Founder's Note</h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, fontStyle: 'italic' }}>
                  "At VELURYN, we don't believe in generic marketing. We believe in content that connects, creators who care, and brands that understand the value of authenticity. We built this agency to strip away the inefficiency and deliver results for both the brands we service and the talent we represent."
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#000', marginTop: '1.5rem', fontWeight: 600 }}>
                  — Vivin Bharathi, Founder &amp; Chairman
                </p>
              </div>
            </div>
          </div>

          <div className="fade-up">
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>Frequently Asked Questions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Do you only do UGC?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                  No. UGC is one of our services. We also offer influencer marketing, content &amp; creative services, and talent management for creators and models.
                </p>
              </div>
              <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Where are you located?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                  We are a globally distributed, remote-first agency. This allows us to source talent internationally and operate across multiple time zones efficiently.
                </p>
              </div>
              <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>How do you select your creators?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                  Creators apply to join our roster and undergo a vetting process where we review their portfolio, on-camera presence, and past performance metrics. We only onboard talent that meets our quality standards.
                </p>
              </div>
              <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>Do you guarantee campaign performance?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                  While we cannot guarantee specific ROAS or CPA outcomes due to variables in media buying and product-market fit, we do guarantee the delivery of high-quality, brief-compliant creative that is engineered based on proven performance principles.
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>How are creators paid?</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#666', lineHeight: 1.6 }}>
                  We secure deposits upfront from brands. Creators are paid according to the terms of their specific campaign or management agreement, ensuring secure and reliable compensation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
