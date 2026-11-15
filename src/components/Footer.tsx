import { Link } from 'react-router-dom';
import { SERVICES, SITE } from '../data/site';
import { LogoMark } from './ui';
import { HalftoneWordmarkCanvas } from './ui/halftone-wordmark-footer';

function SocialIcon({ label, size = 15 }: { label: string; size?: number }) {
  if (label === 'X') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (label === 'Instagram') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (label === 'Pinterest') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.99-.1-2.52.02-3.61l.73-3.1s-.19-.37-.19-.92c0-.86.5-1.5 1.13-1.5.53 0 .79.4.79.88 0 .54-.34 1.34-.52 2.08-.15.63.31 1.14.93 1.14 1.12 0 1.98-1.18 1.98-2.88 0-1.5-.08-2.56-2.62-2.56-2.88 0-3.56 2.16-3.56 3.42 0 .87.33 1.8.75 2.31.08.1.1.19.07.35l-.28 1.13c-.04.18-.15.22-.34.13-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.23 6.37-5.32 6.37-1.04 0-2.02-.54-2.35-1.18l-.64 2.45c-.23.89-.86 2-1.28 2.7A12 12 0 1 0 12 0z" />
      </svg>
    );
  }
  if (label === 'LinkedIn') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
    </svg>
  );
}

function FooterLandscape() {
  return (
    <div className="footer-landscape-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 1600 340"
        className="footer-landscape-svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fafafa" stopOpacity="0" />
            <stop offset="45%" stopColor="#0B5FFF" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#0a1e5e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#061340" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f296e" />
            <stop offset="100%" stopColor="#08163d" />
          </linearGradient>
          <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b2158" />
            <stop offset="100%" stopColor="#050e26" />
          </linearGradient>
        </defs>

        {/* Sky gradient background */}
        <rect x="0" y="0" width="1600" height="340" fill="url(#skyGrad)" />

        {/* Distant Mountains */}
        <path
          d="M0,230 L120,195 L260,215 L410,165 L560,195 L720,140 L800,105 L880,140 L1040,195 L1190,165 L1340,215 L1480,195 L1600,230 L1600,340 L0,340 Z"
          fill="url(#mtnFar)"
          opacity="0.9"
        />

        {/* Birds in flight */}
        <path d="M890,135 Q896,131 902,135 Q908,131 914,135" fill="none" stroke="#adc5f5" strokeWidth="1.5" />
        <path d="M918,125 Q923,122 928,125 Q933,122 938,125" fill="none" stroke="#adc5f5" strokeWidth="1.5" />
        <path d="M905,118 Q909,115 913,118 Q917,115 921,118" fill="none" stroke="#FFD504" strokeWidth="1.2" />

        {/* Mid-ground Mountains */}
        <path
          d="M0,260 L180,210 L340,240 L520,185 L700,225 L800,190 L900,225 L1080,185 L1260,240 L1420,210 L1600,260 L1600,340 L0,340 Z"
          fill="url(#mtnMid)"
        />

        {/* Fire Watchtower / Agency Beacon (Radiant Bright Yellow Beacon) */}
        <g transform="translate(760, 110)">
          <polygon points="40,0 15,22 65,22" fill="#08163d" />
          <rect x="22" y="22" width="36" height="24" fill="#0b2158" />
          {/* Beacon windows glowing with brand yellow */}
          <rect x="26" y="25" width="8" height="10" fill="#FFD504" />
          <rect x="36" y="25" width="8" height="10" fill="#FFD504" />
          <rect x="46" y="25" width="8" height="10" fill="#FFD504" />
          <rect x="16" y="46" width="48" height="4" fill="#08163d" />
          <line x1="16" y1="42" x2="64" y2="42" stroke="#FFD504" strokeWidth="1.5" />
          <line x1="22" y1="50" x2="14" y2="150" stroke="#0a1e5e" strokeWidth="2.5" />
          <line x1="58" y1="50" x2="66" y2="150" stroke="#0a1e5e" strokeWidth="2.5" />
          <line x1="20" y1="75" x2="60" y2="75" stroke="#0a1e5e" strokeWidth="1.5" />
          <line x1="18" y1="105" x2="62" y2="105" stroke="#0a1e5e" strokeWidth="1.5" />
          <line x1="16" y1="130" x2="64" y2="130" stroke="#0a1e5e" strokeWidth="1.5" />
          <line x1="22" y1="50" x2="60" y2="75" stroke="#07153b" strokeWidth="1" />
          <line x1="58" y1="50" x2="20" y2="75" stroke="#07153b" strokeWidth="1" />
          <line x1="20" y1="75" x2="62" y2="105" stroke="#07153b" strokeWidth="1" />
          <line x1="60" y1="75" x2="18" y2="105" stroke="#07153b" strokeWidth="1" />
          <path d="M64,52 Q180,95 320,165" fill="none" stroke="rgba(255, 213, 4, 0.4)" strokeWidth="1" />
          <path d="M16,52 Q-100,95 -220,165" fill="none" stroke="rgba(255, 213, 4, 0.4)" strokeWidth="1" />
        </g>

        {/* Foreground Pine Forest Silhouettes */}
        <path
          d="M0,340 L0,270 L15,245 L25,270 L40,235 L55,270 L70,240 L85,265 L105,225 L125,265 L145,235 L165,270 L185,245 L205,275 L225,230 L245,270 L270,225 L295,270 L320,240 L345,265 L370,220 L395,265 L420,235 L445,270 L470,230 L495,265 L525,215 L555,265 L585,230 L615,270 L645,225 L675,265 L705,235 L735,270 L760,240 L785,265 L815,240 L840,265 L865,235 L895,270 L925,225 L955,265 L985,230 L1015,270 L1045,215 L1075,265 L1105,230 L1135,270 L1160,235 L1185,265 L1210,220 L1235,265 L1260,240 L1285,270 L1310,225 L1335,270 L1360,230 L1385,265 L1415,245 L1445,270 L1470,235 L1495,265 L1525,225 L1555,265 L1585,240 L1600,255 L1600,340 Z"
          fill="#061340"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer-landscape-container">
      {/* Full-bleed scenic landscape artwork header */}
      <FooterLandscape />

      {/* Main Footer Body with all original columns & rows */}
      <div className="footer-bleed-dark">
        <div className="wrap footer-main-inner">
          <div className="f-grid">
            {/* Column 1: Brand & Unexposed Contacts & Clean Socials */}
            <div className="f-brand">
              <Link to="/" className="brand footer-brand" aria-label="VELURYN AGNECY home">
                <span className="brand-mark rounded-full overflow-hidden" aria-hidden="true">
                  <LogoMark size={28} className="rounded-full" />
                </span>
                <span className="brand-text">
                  VELURYN <span className="brand-sub">AGNECY</span>
                </span>
              </Link>
              <p className="f-tagline">Marketing &amp; Management Agency. Global remote.</p>

              <div className="f-contacts">
                <p>
                  <a href={`mailto:${SITE.email}`} className="f-link-highlight">
                    Email Veluryn ↗
                  </a>
                </p>
                <p>
                  <a href={SITE.phoneHref} className="f-link-highlight">
                    Call Veluryn ↗
                  </a>{' '}
                  <span className="f-note">({SITE.phoneNote})</span>
                </p>
              </div>

              {/* Clean socials: Logo + name only, no round pill border */}
              <div className="f-connect" aria-label="Connect with us">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f-social-link-clean"
                  >
                    <SocialIcon label={s.label} size={15} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Services (All original rows) */}
            <div>
              <h4>Services</h4>
              <ul>
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link to={s.path}>{s.title}</Link>
                  </li>
                ))}
                <li>
                  <Link to={SITE.studioPath}>VELURYN STUDIO</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Talent (All original rows) */}
            <div>
              <h4>Talent</h4>
              <ul>
                <li>
                  <Link to="/talent-management">Talent Management</Link>
                </li>
                <li>
                  <Link to="/ai-talent">AI Talent</Link>
                </li>
                <li>
                  <Link to="/creator-pipeline">Creator Pipeline</Link>
                </li>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Company (All original rows) */}
            <div>
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/team">Team</Link>
                </li>
                <li>
                  <Link to="/work">Work</Link>
                </li>
                <li>
                  <Link to="/how-we-work">How We Work</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/articles">Articles</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Products & Cyber Security */}
            <div>
              <h4>Products</h4>
              <ul>
                <li>
                  <Link to="/products">All Products</Link>
                </li>
                <li>
                  <Link to="/products/developers">Developer Tools (Rust)</Link>
                </li>
                <li>
                  <Link to="/products/visuals">Visual Prompts (Google Flow)</Link>
                </li>
                <li>
                  <a href={SITE.icaUrl} target="_blank" rel="noopener noreferrer">
                    ICA Division ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 6: Legal */}
            <div>
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Halftone Interactive Wordmark Canvas (Parting dots on springs, warming to brand yellow on hover, click shock ring) */}
          <div className="footer-halftone-wordmark-wrap" aria-label="VELURYN Halftone Interactive Wordmark">
            <HalftoneWordmarkCanvas
              wordmark="veluryn"
              preset="veluryn"
              palette={{
                background: "#061340",
                ink: "#ffffff",
                warm: "#FFD504",
              }}
              dotGap={6}
              radius={85}
              crop={0.16}
              grain={0.35}
              interactive={true}
              fontFamily='"Inter", "Helvetica Neue", Arial, sans-serif'
              fontWeight={900}
              height="clamp(160px, 24vw, 320px)"
            />
          </div>

          {/* Bottom Colophon */}
          <div className="f-base">
            <div className="f-copy">
              <span>&copy; {new Date().getFullYear()} VELURYN AGNECY. All rights reserved.</span>
              <span className="f-disclaimer">
                Some imagery may be licensed stock photography used for illustrative purposes only.
              </span>
            </div>

            <button onClick={scrollToTop} className="f-back-top" aria-label="Back to top">
              <span>Back to top</span>
              <span className="f-top-icon">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
