import { Link } from 'react-router-dom';

export default function Header() {
  return (
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
      </ul>

      <Link className="nav-cta" to="/contact">Contact</Link>
    </nav>
  );
}
