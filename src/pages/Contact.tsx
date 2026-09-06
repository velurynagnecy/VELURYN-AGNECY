import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

export default function Contact() {
  const [formType, setFormType] = useState<'brand' | 'creator' | 'other'>('brand');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read URL parameters to set initial state if we linked here via ?type=brand etc
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get('type');
    if (typeParam === 'brand' || typeParam === 'creator' || typeParam === 'other') {
      setFormType(typeParam);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // The form action handles the actual submission to FormSubmit.co
    // We just simulate the UI state change here if we wanted to intercept,
    // but standard form submission will redirect to their success page.
    // To keep the user on site, we can let the native form submit happen.
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <Helmet>
        <title>Contact | VELURYN AGNECY</title>
        <meta name="description" content="Get in touch with VELURYN AGNECY for brand campaigns, talent representation, or general inquiries." />
      </Helmet>

      {/* Hero Section */}
      <section style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', paddingTop: '160px', paddingBottom: '120px', paddingLeft: '4rem', paddingRight: '4rem', color: '#fff' }}>
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url("/images/Contract.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>Let's Talk</p>
          <h1 style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Work with us.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Whether you're a brand looking to start a campaign, or a creator or model interested in representation, we're ready to work.
          </p>
        </div>
      </section>

      {/* Banner */}
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '1rem', textAlign: 'center', fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
        Currently accepting Q4 campaign briefs.
      </div>

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '6rem 2rem', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '6rem',
        position: 'relative',
        backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '25% 100%'
      }}>

        {/* Left Col */}
        <div style={{ flex: '1 1 400px', paddingRight: 'clamp(0rem, 4vw, 2rem)', position: 'relative', zIndex: 2 }}>
           <p style={{ fontFamily: 'var(--font-body)', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>| reach out</p>
           <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '2rem' }}>
             Start the conversation.
           </h2>
           <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#666', marginBottom: '4rem', lineHeight: 1.6, maxWidth: '440px' }}>
             Whether you're a brand looking to start a campaign, or a creator or model interested in representation, we're ready to work.
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
           </div>
        </div>

        {/* Right Col: Form */}
        <div style={{ flex: '1.5 1 500px', position: 'relative', zIndex: 2 }}>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setFormType('brand')}
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '30px', 
                fontFamily: 'var(--font-body)', 
                fontSize: '1rem',
                cursor: 'pointer',
                border: '1px solid',
                backgroundColor: formType === 'brand' ? 'var(--color-black)' : 'transparent',
                color: formType === 'brand' ? 'var(--color-white)' : 'var(--color-black)',
                borderColor: formType === 'brand' ? 'var(--color-black)' : '#ddd',
                transition: 'all 0.2s'
              }}
            >
              I'm a Brand
            </button>
            <button 
              onClick={() => setFormType('creator')}
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '30px', 
                fontFamily: 'var(--font-body)', 
                fontSize: '1rem',
                cursor: 'pointer',
                border: '1px solid',
                backgroundColor: formType === 'creator' ? 'var(--color-black)' : 'transparent',
                color: formType === 'creator' ? 'var(--color-white)' : 'var(--color-black)',
                borderColor: formType === 'creator' ? 'var(--color-black)' : '#ddd',
                transition: 'all 0.2s'
              }}
            >
              I'm Talent
            </button>
            <button 
              onClick={() => setFormType('other')}
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '30px', 
                fontFamily: 'var(--font-body)', 
                fontSize: '1rem',
                cursor: 'pointer',
                border: '1px solid',
                backgroundColor: formType === 'other' ? 'var(--color-black)' : 'transparent',
                color: formType === 'other' ? 'var(--color-white)' : 'var(--color-black)',
                borderColor: formType === 'other' ? 'var(--color-black)' : '#ddd',
                transition: 'all 0.2s'
              }}
            >
              Other
            </button>
          </div>

          <form 
            action="https://formsubmit.co/vivin.b@velurynagnecy.com" 
            method="POST" 
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value={`New ${formType} inquiry - VELURYN AGNECY`} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="Inquiry Type" value={formType} />
            <input type="hidden" name="_next" value="https://velurynagnecy.com" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>First Name</label>
                <input type="text" name="First Name" required style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Last Name</label>
                <input type="text" name="Last Name" required style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Email Address</label>
              <input type="email" name="Email" required style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
            </div>

            {formType === 'brand' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Company Name</label>
                  <input type="text" name="Company" required style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Brand Vertical / Niche</label>
                  <input type="text" name="Brand Vertical" placeholder="e.g. Health, Fashion, Tech" style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
              </>
            )}

            {formType === 'creator' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Portfolio / Social Link</label>
                  <input type="url" name="Portfolio" required placeholder="TikTok, IG, or Portfolio link" style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Primary Focus</label>
                  <input type="text" name="Focus" placeholder="e.g. UGC Creator, Fashion Model, Tech Reviewer" required style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent' }} />
                </div>
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Message</label>
              <textarea name="Message" required rows={4} style={{ border: 'none', borderBottom: '1px solid #ccc', padding: '0.5rem 0', fontFamily: 'var(--font-body)', fontSize: '1rem', outline: 'none', backgroundColor: 'transparent', resize: 'vertical' }}></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ 
                marginTop: '1rem',
                backgroundColor: 'var(--color-black)', 
                color: 'var(--color-white)', 
                padding: '1rem 2rem', 
                border: 'none', 
                borderRadius: '30px', 
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                cursor: isSubmitting ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: 'fit-content',
                transition: 'background-color 0.2s',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'} <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
