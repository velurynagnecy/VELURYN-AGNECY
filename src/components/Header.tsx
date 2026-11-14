import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE } from '../data/site';
import { Arrow, LogoMark } from './ui';

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/studio', label: 'Studio' },
  { to: '/work', label: 'Work' },
  { to: '/talent-management', label: 'Talent' },
  { to: '/ai-talent', label: 'AI Talent' },
  { to: '/about', label: 'About' },
  { to: '/articles', label: 'Articles' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [isOnHero, setIsOnHero] = useState(
    () => pathname !== '/' && typeof window !== 'undefined' && window.scrollY < 400
  );
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open);
    return () => document.documentElement.classList.remove('lenis-stopped');
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const checkHero = () => {
      const hero = document.querySelector('.page-hero[data-hero-dark], [data-hero-dark]');
      if (!hero) {
        setIsOnHero(false);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // True while the bottom of the hero is still below the navbar height (~80px)
      setIsOnHero(rect.bottom > 80);
    };

    checkHero();
    window.addEventListener('scroll', checkHero, { passive: true });
    window.addEventListener('resize', checkHero, { passive: true });

    const timer = setTimeout(checkHero, 80);
    return () => {
      window.removeEventListener('scroll', checkHero);
      window.removeEventListener('resize', checkHero);
      clearTimeout(timer);
    };
  }, [pathname]);

  const isHeroMode = isOnHero && !open && pathname !== '/';
  const isSeamlessTop = pathname === '/' && !isScrolled && !open;

  return (
    <>
      <header
        className={`nav-container ${isHeroMode ? 'is-hero' : ''} ${isSeamlessTop ? 'is-seamless-top' : ''} ${
          open ? 'menu-open' : ''
        }`}
      >
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="VELURYN AGNECY home">
            <span className="brand-mark rounded-full overflow-hidden" aria-hidden="true">
              <LogoMark size={28} className="rounded-full" />
            </span>
            <span className="brand-text">
              VELURYN <span className="brand-sub">AGNECY</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                <span>{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav-right">
            <Link className="btn primary nav-cta" to={SITE.studioPath}>
              <span>{SITE.studioCta}</span>
              <span className="dot" aria-hidden="true">
                <Arrow size={12} />
              </span>
            </Link>

            <button
              className="burger"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="sheet-links">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} tabIndex={open ? 0 : -1}>
              <span>{l.label}</span>
              <span className="sheet-arrow">↗</span>
            </Link>
          ))}
        </div>
        <div className="sheet-footer">
          <Link className="btn primary" to={SITE.studioPath} tabIndex={open ? 0 : -1} style={{ width: '100%', justifyContent: 'center' }}>
            <span>{SITE.studioCta}</span>
            <span className="dot">
              <Arrow size={12} />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
