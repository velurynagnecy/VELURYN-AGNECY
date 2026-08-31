import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: '2rem'
    }}>
      
      {/* Massive Top Background Text */}
      <div style={{
        width: '100%',
        textAlign: 'center',
        paddingTop: '2rem',
        userSelect: 'none'
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-headlines)', 
          fontSize: 'clamp(3rem, 18vw, 25rem)', 
          margin: 0, 
          lineHeight: 0.8,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(180deg, #333333 0%, #000000 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent'
        }}>
          VELURYN
        </h2>
      </div>

      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', 
        gap: '4rem', 
        padding: '0 4rem',
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        
        {/* Left Column (Brand info) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            VELURYN AGNECY<br/>
            Connecting apps with creators.<br/>
            Global Remote
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', opacity: 0.7, alignItems: 'center', marginTop: '1rem' }}>
            <a href="https://instagram.com/velurynagnecy" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://x.com/velurynagnecy" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
            </a>
            <a href="https://linkedin.com/company/veluryn-agnecy" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="https://facebook.com/velurynagnecy" target="_blank" rel="noopener noreferrer" className="nav-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Services</h4>
          <Link to="/ugc-campaigns" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>UGC Campaigns</Link>
          <Link to="/creator-pipeline" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Creator Pipeline</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Resources</h4>
          <Link to="/how-we-work" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>How We Work</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Company</h4>
          <Link to="/about" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>About</Link>
          <Link to="/contact" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Contact</Link>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 500, fontFamily: 'var(--font-body)' }}>Legal</h4>
          <Link to="/privacy" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Privacy Policy</Link>
          <Link to="/terms" className="nav-link" style={{ color: '#888', fontSize: '0.85rem', textDecoration: 'none', fontFamily: 'var(--font-body)' }}>Terms of Service</Link>
        </div>
      </div>

      {/* Footer Bottom / Legal Note */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid #222',
        maxWidth: '1400px', 
        margin: '4rem auto 0 auto',
        padding: '2rem 4rem 0 4rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        color: '#555',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-body)'
      }}>
        <div>&copy; {new Date().getFullYear()} VELURYN AGNECY. All rights reserved.</div>
        <div>Some imagery may be licensed stock photography used for illustrative purposes only.</div>
      </div>
    </footer>
  );
}
