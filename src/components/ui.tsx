import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

const imgPath = (name: string) => (name.startsWith('/') ? name : `/images/site/${name}`);

export const Arrow = ({ size = 14, dir = 'up-right' }: { size?: number; dir?: 'up-right' | 'right' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {dir === 'right' ? (
      <path d="M5 12h14M13 6l6 6-6 6" />
    ) : (
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    )}
  </svg>
);

export const IconSearch = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export const IconMegaphone = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 11l15-7v16L3 13v-2z" />
    <path d="M11.6 16.8L14 21h3l-2.4-4.2" />
    <path d="M21 10a4 4 0 0 1 0 4" />
  </svg>
);

export const IconVideo = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="15" height="16" rx="3" />
    <path d="M17 9l5-3v12l-5-3" />
    <circle cx="9.5" cy="12" r="2.5" />
  </svg>
);

export const IconPalette = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H17c3.3 0 5-2.2 5-5.5 0-4.7-4.5-9-10-9z" />
  </svg>
);

export const IconAnalytics = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 20V10" />
    <path d="M12 20V4" />
    <path d="M6 20v-6" />
    <circle cx="18" cy="7" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="6" cy="11" r="2" />
  </svg>
);

export const IconTarget = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const IconUsers = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconSparkle = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
  </svg>
);

export const IconKey = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="M11.5 11.5L22 1l1 1-1 3-2 1-1 2-2 1" />
  </svg>
);

export const LogoMark = ({
  size = 28,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <img
    src="/logo.png"
    alt="VELURYN"
    width={size}
    height={size}
    decoding="async"
    className={`logo-mark-img rounded-full aspect-square object-cover inline-block shrink-0 overflow-hidden ${className}`}
    style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%' }}
  />
);

/** Image with a styled monochrome grey/charcoal fallback mesh until the real file exists. */
export function Media({
  img,
  label,
  className = '',
  parallax = false,
  aspectRatio,
  priority = false,
}: {
  img: string;
  label?: string;
  className?: string;
  parallax?: boolean;
  aspectRatio?: string;
  priority?: boolean;
}) {
  const [src, setSrc] = useState(() => imgPath(img));
  const [state, setState] = useState<'ok' | 'fail'>('ok');
  const [triedAlt, setTriedAlt] = useState(false);

  useEffect(() => {
    setSrc(imgPath(img));
    setState('ok');
    setTriedAlt(false);
  }, [img]);

  const handleError = () => {
    if (!triedAlt) {
      setTriedAlt(true);
      if (src.endsWith('.jpg') || src.endsWith('.jpeg')) {
        setSrc(src.replace(/\.jpe?g$/i, '.png'));
        return;
      }
      if (src.endsWith('.png')) {
        setSrc(src.replace(/\.png$/i, '.jpeg'));
        return;
      }
    }
    setState('fail');
  };

  const cls = `media ${state === 'ok' ? 'loaded' : 'ph'} ${className}`;

  return (
    <div
      className={cls}
      data-parallax={parallax ? '' : undefined}
      role="img"
      aria-label={label ?? ''}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {state !== 'fail' && (
        <img
          src={src}
          alt={label ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={handleError}
        />
      )}
      {state === 'fail' && (
        <div className="media-placeholder-art" aria-hidden="true">
          <div className="art-glow" />
          <div className="art-badge">
            <LogoMark size={16} />
            <span>VELURYN</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag className={`reveal ${className}`} style={{ ['--d' as string]: `${delay}s`, ...style }}>
      {children}
    </Tag>
  );
}

export function Button({
  to,
  href,
  children,
  variant = 'primary',
  external = false,
  dot = true,
  className = '',
  style,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark' | 'white';
  external?: boolean;
  dot?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const inner = (
    <>
      <span>{children}</span>
      {dot && (
        <span className="dot" aria-hidden="true">
          <Arrow size={12} />
        </span>
      )}
    </>
  );

  const fullCls = `btn ${variant} ${className}`.trim();

  if (href) {
    return (
      <a className={fullCls} href={href} style={style} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={fullCls} to={to ?? '/'} style={style}>
      {inner}
    </Link>
  );
}

/** Full-bleed page opener used on every inner page, perfectly matching the homepage hero (.hero-finovate). */
export function PageHero({
  eyebrow: _eyebrow,
  badge,
  lines,
  lead,
  img = 'home-hero.jpg',
  compact = false,
  children,
}: {
  eyebrow?: string;
  badge?: ReactNode;
  lines: string[];
  lead?: string;
  img?: string;
  compact?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`hero-finovate page-hero${compact ? ' compact' : ''}`} data-hero-dark>
      <div className="hero-finovate-frame">
        <div className="hero-finovate-bg">
          {img && <Media img={img} label="" parallax priority />}
          <div className="hero-finovate-overlay" />
        </div>
        <div className="wrap hero-finovate-inner">
          <div className="hero-finovate-content">
            <Reveal>
              {badge && <div className="page-hero-badge mb-3">{badge}</div>}
              <h1 className="hero-finovate-title">
                {lines.map((l, i) => (
                  <span key={i} style={{ display: 'block' }}>
                    {l}
                  </span>
                ))}
              </h1>
            </Reveal>
            {lead && (
              <Reveal delay={0.08}>
                <p className="hero-finovate-sub">{lead}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.16}>
                <div className="hero-finovate-actions">{children}</div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`sec-head ${center ? 'centered' : ''}`}>
      <Reveal className="sec-head-info">
        {eyebrow && <span className="kicker-clean">{eyebrow}</span>}
        <h2 className="h-xl">{title}</h2>
        {subtitle && <p className="sec-head-sub">{subtitle}</p>}
      </Reveal>
      {children && <Reveal delay={0.1} className="sec-head-actions">{children}</Reveal>}
    </div>
  );
}

/** SVG Radar chart component with monochrome white & grey styling */
export function FinovateRadarChart() {
  const points = [
    { label: 'UGC Content', x: 230, y: 88, lx: 230, ly: 52, align: 'middle' },
    { label: 'Influencer', x: 317, y: 140, lx: 338, ly: 144, align: 'start' },
    { label: 'AI Visuals', x: 315, y: 240, lx: 338, ly: 245, align: 'start' },
    { label: 'Performance Ads', x: 230, y: 286, lx: 230, ly: 332, align: 'middle' },
    { label: 'Talent Network', x: 142, y: 240, lx: 122, ly: 245, align: 'end' },
    { label: 'Brand & Creative', x: 143, y: 140, lx: 122, ly: 144, align: 'end' },
  ];

  return (
    <div className="radar-container" aria-label="Capabilities radar chart">
      <svg viewBox="0 0 460 360" className="radar-svg">
        {/* Background rings */}
        <polygon
          points="230,80 325.3,135 325.3,245 230,300 134.7,245 134.7,135"
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="1"
        />
        <polygon
          points="230,107.5 301.4,148.8 301.4,231.2 230,272.5 158.6,231.2 158.6,148.8"
          fill="none"
          stroke="rgba(0, 0, 0, 0.06)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <polygon
          points="230,135 277.6,162.5 277.6,217.5 230,245 182.4,217.5 182.4,162.5"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="1"
        />
        <polygon
          points="230,162.5 253.8,176.2 253.8,203.8 230,217.5 206.2,203.8 206.2,176.2"
          fill="none"
          stroke="rgba(0, 0, 0, 0.04)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Axis Spokes */}
        <line x1="230" y1="190" x2="230" y2="80" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />
        <line x1="230" y1="190" x2="325.3" y2="135" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />
        <line x1="230" y1="190" x2="325.3" y2="245" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />
        <line x1="230" y1="190" x2="230" y2="300" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />
        <line x1="230" y1="190" x2="134.7" y2="245" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />
        <line x1="230" y1="190" x2="134.7" y2="135" stroke="rgba(0, 0, 0, 0.08)" strokeDasharray="3 3" />

        {/* Filled Data Polygon */}
        <polygon
          points="230,88 317,140 315,240 230,286 142,240 143,140"
          fill="rgba(11, 95, 255, 0.12)"
          stroke="#0B5FFF"
          strokeWidth="2.5"
        />

        {/* Vertices */}
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="5" fill="#FFD504" stroke="#0B5FFF" strokeWidth="2" />
        ))}

        {/* Axis Labels */}
        {points.map((p) => (
          <text
            key={`lbl-${p.label}`}
            x={p.lx}
            y={p.ly}
            textAnchor={p.align as any}
            fill="#07153b"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

/** "Need AI visuals?" band. Shown above the footer on every page. */
export function StudioBand() {
  return (
    <section className="sec-band-wrap">
      <div className="wrap">
        <Reveal className="cta-forest-band">
          <div className="cta-forest-content">
            <span className="kicker-clean text-[#FFD504]">VELURYN STUDIO</span>
            <h2>{SITE.studioCta}</h2>
            <p>Our AI ads and UGC studio makes short form ads, long form ads, UGC ads and posters. Visuals by AI, planning by humans.</p>
            <Button to={SITE.studioPath} variant="white">
              See VELURYN STUDIO
            </Button>
          </div>
          <div className="cta-forest-decoration" aria-hidden="true">
            <div className="cta-studio-logo-badge flex items-center justify-center p-4 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
              <img
                src="/studio-logo.png"
                alt="VELURYN STUDIO"
                loading="lazy"
                decoding="async"
                className="w-52 max-w-full h-auto object-contain drop-shadow-[0_4px_16px_rgba(255,213,4,0.35)]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactBand({ title = 'Ready to get started?' }: { title?: string }) {
  return (
    <section className="sec-contact-band">
      <div className="wrap">
        <Reveal className="contact-box-band">
          <span className="kicker-clean">GET STARTED</span>
          <h2 className="h-xl" style={{ margin: '0.6rem auto 1.2rem', maxWidth: '18ch' }}>
            {title}
          </h2>
          <p className="contact-band-sub">
            Whether you are a brand looking to scale campaigns or a creator looking for representation, we are ready to partner.
          </p>
          <div className="contact-band-actions">
            <Button to="/contact?type=brand" variant="primary">
              I'm a brand
            </Button>
            <Button to="/contact?type=creator" variant="ghost">
              I'm talent
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
