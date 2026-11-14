import { lazy, Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import { StudioBand } from './ui';

const StudioChat = lazy(() => import('./StudioChat'));
const SmoothCursor = lazy(() => import('./SmoothCursor'));

export default function Layout() {
  const { pathname } = useLocation();
  const canonical = `https://velurynagnecy.com${pathname === '/' ? '' : pathname}`;

  // Smooth scroll (Lenis) and light parallax on desktop devices only.
  // Mobile/touch devices use native hardware-accelerated scrolling for zero main-thread lag.
  useEffect(() => {
    const skipSmoothScroll = window.matchMedia(
      '(prefers-reduced-motion: reduce), (max-width: 768px), (pointer: coarse)'
    ).matches;
    if (skipSmoothScroll) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const parallax = () => {
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('.media[data-parallax] img').forEach((img) => {
        const parent = img.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = `translate3d(0, ${(-p * 6).toFixed(2)}%, 0)`;
      });
    };
    lenis.on('scroll', parallax);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Reveal on scroll. Re-scan after each route change.
  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );
    const scan = () => {
      const vh = window.innerHeight || 900;
      document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.98 && rect.bottom > 0) {
          el.classList.add('in');
        } else {
          io.observe(el);
        }
      });
    };
    scan();
    const t = setTimeout(scan, 220);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <Header />
      <main>
        <Outlet />
      </main>
      <StudioBand />
      <Footer />
      <CookieConsent />
      <Suspense fallback={null}>
        <StudioChat />
        <SmoothCursor />
      </Suspense>
    </>
  );
}
