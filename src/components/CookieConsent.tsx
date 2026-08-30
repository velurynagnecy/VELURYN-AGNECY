import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };
  
  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 99999, // Ensure it is above everything
      maxWidth: '400px',
      backgroundColor: 'var(--color-black)',
      color: 'var(--color-white)',
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
      fontFamily: 'var(--font-body)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      margin: '0 2rem' // fallback margin for smaller screens if right/bottom goes off
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.25rem', margin: 0 }}>We use cookies</h3>
        <button onClick={() => setIsVisible(false)} aria-label="Close" style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <p style={{ margin: 0, fontSize: '0.95rem', color: '#ccc', lineHeight: 1.5 }}>
        We use cookies to improve your experience and analyze site traffic. By continuing to use our site, you agree to our use of cookies as outlined in our <Link to="/privacy" onClick={() => setIsVisible(false)} style={{ color: '#fff', textDecoration: 'underline' }}>Privacy Policy</Link>.
      </p>
      
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button 
          onClick={handleAccept}
          style={{
            flex: 1,
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
            border: 'none',
            padding: '0.75rem 1rem',
            borderRadius: '30px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#eee'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-white)'}
        >
          Accept All
        </button>
        <button 
          onClick={handleDecline}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            color: 'var(--color-white)',
            border: '1px solid #444',
            padding: '0.75rem 1rem',
            borderRadius: '30px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#222'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
