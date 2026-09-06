import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="nav-hero">
        <Link className="brand" to="/" aria-label="VELURYN AGNECY home">
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '4px' }}>
            <img src="/images/logo-transparent.png" alt="Veluryn V" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(2.5)' }} />
          </div>
          <span style={{ fontSize: '1.15rem' }}>AGNECY</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/ugc-campaigns">UGC Campaigns</Link></li>
          <li><Link to="/creator-pipeline">Creator Pipeline</Link></li>
          <li><Link to="/how-we-work">How We Work</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link className="nav-cta" to="/contact">Contact</Link>
          
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}>
        <Link to="/ugc-campaigns">UGC Campaigns</Link>
        <Link to="/creator-pipeline">Creator Pipeline</Link>
        <Link to="/how-we-work">How We Work</Link>
        <Link to="/about">About</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/contact" style={{ marginTop: '1rem', padding: '1rem 2rem', backgroundColor: 'var(--color-white)', color: 'var(--color-black)', borderRadius: '99px' }}>Contact Us</Link>
      </div>
    </>
  );
}
