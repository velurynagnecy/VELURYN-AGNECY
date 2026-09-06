import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
        <meta name="description" content="Why we built VELURYN AGNECY, and why we focus on connecting brands with creators." />
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
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(/images/about-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>About Us</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Connecting brands with creators.
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            We bridge the gap between talented content creators and the performance marketing teams that need them.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '4rem 4rem 8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="fade-up" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 600 }}>The Story</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              VELURYN AGNECY was born out of a clear market gap: performance brands need massive volumes of authentic video content to fuel their paid acquisition engines, but managing hundreds of freelance creators is an operational nightmare.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
              We stepped in to act as the bridge. By building a vetted roster of UGC talent and managing the entire pipeline—from brief to final delivery—we allow growth teams to focus on media buying while we handle the creative logistics.
            </p>
          </div>

          <div className="fade-up" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Global Reach, Targeted Precision</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
              We operate internationally, connecting consumer brands with diverse creator talent across the globe. We hold particular expertise and focus in the US, UK, Canada, and Australia markets, ensuring your campaigns speak authentically to your core demographics while maintaining localized cultural relevance.
            </p>
          </div>

          <div className="fade-up" style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Our Mission</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              For brands, our mission is to eliminate the friction of creative testing. We provide a reliable, scalable pipeline of high converting assets. 
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
              For creators, our mission is to provide stability. We protect our talent with guaranteed deposits, transparent contracts, and a steady stream of incoming campaign briefs so they can focus on what they do best: creating.
            </p>
          </div>

          <div className="fade-up" style={{ marginBottom: '6rem' }}>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '2rem', fontWeight: 600 }}>Frequently Asked Questions</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Is "AGNECY" a typo?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  No it's intentional. VELURYN AGNECY is a stylized brand name; the spelling is deliberate, not an error.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  What happens if I'm not happy with a video?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  Every video includes one round of minor revisions (text overlay changes, pacing tweaks) at no extra cost. Larger changes or reshoots outside the original brief are quoted separately before we proceed.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Can I use the videos in paid ads, not just organic posts?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  Yes paid usage rights (whitelisting, spark ads, boosted posts) are available and scoped separately from organic usage. Let us know your intended use when you reach out.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Do you only work with US/UK/Canada/Australia brands?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  Those are our primary markets, but we work with brands internationally. Reach out regardless of where you're based.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  How does payment work?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  Campaigns start with an upfront deposit before production begins. You'll see a watermarked draft for approval before final payment, and the final, unwatermarked files are released once payment is complete.
                </p>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  What industries or niches do you work with?
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
                  We work with brands across categories we're not limited to any single industry or niche.
                </p>
              </div>
            </div>
          </div>

          <div className="fade-up" style={{ borderTop: '1px solid #ddd', paddingTop: '4rem', textAlign: 'center' }}>
            <Link to="/contact?type=brand" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
              Work with us <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
            </Link>
          </div>

          <div className="fade-up" style={{ marginTop: '8rem', paddingTop: '3rem', borderTop: '1px solid #eaeaea', opacity: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '800px', flexWrap: 'wrap' }}>
              <img src="/images/CE.webp" alt="Vivin Bharathi" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666', lineHeight: 1.8, margin: 0 }}>
                  "A note from the founder I started VELURYN AGNECY after seeing the same problem from both sides: brands burning time and budget chasing creators who flake or overcharge, and creators doing great work but never getting paid reliably or on time. Before this, I built a verification service to help brands and founders figure out who they could trust that experience shaped how I built this agency: a straightforward, accountable pipeline between brands and creators, built on trust from the start." <br /><br />
                  <strong>Vivin Bharathi, Founder and Chairman</strong>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
