import { Helmet } from 'react-helmet-async';
import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParallax } from '../hooks/useParallax';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'other';
  const [inquiryType, setInquiryType] = useState(initialType);
  const [submitted, setSubmitted] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  useParallax(bannerRef, bgRef);

  const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || 'https://formsubmit.co/vivin.b@velurynagnecy.com';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch(formEndpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(() => {
      setSubmitted(true);
    }).catch(error => {
      console.error(error);
      alert('There was an error submitting the form.');
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Helmet>
        <title>Contact | VELURYN AGNECY</title>
        <meta name="description" content="Get in touch with VELURYN AGNECY." />
      </Helmet>

      {/* Banner Section */}
      <div style={{ padding: '100px 2rem 0 2rem', maxWidth: '1400px', margin: '0 auto' }}>
         <div ref={bannerRef} style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            borderRadius: '16px',
            overflow: 'hidden',
            isolation: 'isolate'
         }}>
            {/* Parallax Background Layer */}
            <div 
              ref={bgRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 'calc(-50vw + 50%)',
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url(/images/contact-hero.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: -1,
                willChange: 'transform'
              }}
            />
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(23,23,23,0.2)', zIndex: -1 }}></div>
            
            {/* Outline vertical text */}
            <div style={{
              position: 'absolute',
              right: '40px',
              top: '50%',
              transform: 'translateY(-50%) rotate(180deg)',
              writingMode: 'vertical-rl',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.25)',
              fontFamily: 'var(--font-headlines)',
              fontSize: '8rem',
              fontWeight: 'normal',
              letterSpacing: '0.05em',
              pointerEvents: 'none',
              userSelect: 'none'
            }}>
              Connect
            </div>

            <h1 style={{ position: 'absolute', bottom: '40px', left: '40px', color: 'var(--color-white)', fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 400, margin: 0 }}>
              Connect
            </h1>
         </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '6rem 2rem', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '6rem',
        position: 'relative',
        backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '25% 100%' // Vertical grid lines
      }}>

        {/* Left Col */}
        <div style={{ flex: '1 1 400px', paddingRight: 'clamp(0rem, 4vw, 2rem)', position: 'relative', zIndex: 2 }}>
           <p style={{ fontFamily: 'var(--font-body)', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>| reach out</p>
           <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '2rem' }}>
             Start the conversation.
           </h2>
           <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#666', marginBottom: '4rem', lineHeight: 1.6, maxWidth: '440px' }}>
             Whether you're a brand looking for authentic UGC video pipelines or a creator wanting to join our roster, we're ready to get to work.
           </p>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem 2rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Email</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', margin: '0 0 0.5rem 0', color: '#333' }}>vivin.b@velurynagnecy.com</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Direct Line</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', margin: 0, color: '#333' }}>
                    <span style={{ opacity: 0.7 }}>Currently remote.</span>
                  </p>
                </div>
             </div>

             <div>
                <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.1rem', marginBottom: '1.25rem', fontWeight: 600 }}>Follow Us</h3>
                <div style={{ display: 'flex', gap: '1.25rem', color: '#333' }}>
                  <a href="https://instagram.com/velurynagnecy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'} aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://x.com/velurynagnecy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'} aria-label="X (Twitter)">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                  </a>
                  <a href="https://linkedin.com/company/veluryn-agnecy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'} aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="https://facebook.com/velurynagnecy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'} aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                </div>
             </div>
           </div>
        </div>

        {/* Right Col */}
        <div style={{ flex: '1 1 400px', position: 'relative', zIndex: 2 }}>
           <div style={{ backgroundColor: '#f5f5f5', borderRadius: '16px', padding: 'clamp(2rem, 5vw, 4rem)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button onClick={() => setInquiryType('brand')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: inquiryType === 'brand' ? '#222' : 'transparent', color: inquiryType === 'brand' ? '#fff' : '#666', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', transition: 'all 0.2s' }}>I'm a Brand</button>
                <button onClick={() => setInquiryType('creator')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: inquiryType === 'creator' ? '#222' : 'transparent', color: inquiryType === 'creator' ? '#fff' : '#666', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', transition: 'all 0.2s' }}>I'm a Creator</button>
                <button onClick={() => setInquiryType('other')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ddd', backgroundColor: inquiryType === 'other' ? '#222' : 'transparent', color: inquiryType === 'other' ? '#fff' : '#666', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', transition: 'all 0.2s' }}>Other</button>
             </div>

             {submitted ? (
               <div style={{ padding: '2rem', textAlign: 'center' }}>
                 <h4 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-burgundy)' }}>Received.</h4>
                 <p style={{ color: '#666', fontFamily: 'var(--font-body)' }}>Your message has been sent successfully. We will be in touch shortly.</p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                 <input type="hidden" name="_captcha" value="false" />
                 <input type="hidden" name="_subject" value={`New ${inquiryType} Inquiry - VELURYN AGNECY`} />
                 
                 <input type="text" name="name" placeholder="Full name *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                 <input type="email" name="email" placeholder="Email *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />

                 <select name="location" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)', color: '#555', cursor: 'pointer' }}>
                   <option value="" disabled selected>Location / Country *</option>
                   <option value="US">United States</option>
                   <option value="UK">United Kingdom</option>
                   <option value="CA">Canada</option>
                   <option value="AU">Australia</option>
                   <option value="Other">Other (International)</option>
                 </select>

                 {inquiryType === 'brand' && (
                   <>
                     <input type="text" name="app_type" placeholder="Brand Vertical / Niche *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                     <input type="text" name="campaign_size" placeholder="Estimated Campaign Size (e.g. 5 videos) *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                     <input type="text" name="budget" placeholder="Estimated Budget *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                   </>
                 )}

                 {inquiryType === 'creator' && (
                   <>
                     <input type="url" name="portfolio" placeholder="Portfolio / Instagram Link *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                     <input type="text" name="niche" placeholder="Content Niche / Style *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                     <input type="text" name="rate" placeholder="Rate Expectations *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                     <input type="text" name="availability" placeholder="Current Availability *" required style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }} />
                   </>
                 )}

                 <textarea name="message" rows={2} placeholder="Additional Details..." required={inquiryType === 'other'} style={{ border: 'none', borderBottom: '1px solid #ddd', padding: '0.5rem 0', backgroundColor: 'transparent', fontSize: '0.95rem', outline: 'none', resize: 'none', fontFamily: 'var(--font-body)' }}></textarea>
                 
                 <button type="submit" style={{ marginTop: '1rem', alignSelf: 'flex-start', backgroundColor: '#222', color: 'white', border: 'none', borderRadius: '30px', padding: '1rem 2rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#222'}>
                   <span style={{ fontSize: '1rem' }}>&#9656;</span> Submit Inquiry
                 </button>
               </form>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
