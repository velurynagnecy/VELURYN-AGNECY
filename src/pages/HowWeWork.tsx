import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import { StepperCard } from '../components/ui/StepperCards';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useParallax(heroRef, bgRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.step-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.steps-container',
          start: 'top 80%'
        }
      });
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

  const steps = [
    { num: '01', title: 'Strategy', desc: 'Understand the brand, audience, objectives and campaign requirements.' },
    { num: '02', title: 'Talent', desc: 'Identify the right creators, models and talent for the project.' },
    { num: '03', title: 'Creative', desc: 'Develop the content direction and campaign creative.' },
    { num: '04', title: 'Execute', desc: 'Manage partnerships, production and campaign delivery.' },
    { num: '05', title: 'Grow', desc: 'Analyze performance and build the next opportunity.' }
  ];

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
      <Helmet>
        <title>How We Work | VELURYN AGNECY</title>
        <meta name="description" content="Our transparent, secure 5-step process for managing campaigns and talent." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/How%20we%20work.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>Process</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Transparent, secure, and built for scale.
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Our process works the same whether it's an influencer campaign, UGC production, content creation or talent management.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ padding: '4rem 4rem 8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div className="steps-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '4rem' }}>
            {steps.map((step, idx) => (
              <div key={idx} className="step-card">
                <StepperCard 
                  num={step.num}
                  title={step.title}
                  description={step.desc}
                />
              </div>
            ))}
          </div>

          <div className="fade-up" style={{ marginTop: '6rem', textAlign: 'center' }}>
             <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 'normal' }}>Ready to get started?</h3>
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               <Link to="/contact?type=brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
                  I'm a Brand <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
               </Link>
               <Link to="/contact?type=creator" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'transparent', color: 'var(--color-black)', border: '1px solid #ddd', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-black)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#ddd'; }}>
                  I'm Talent <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
               </Link>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
}
