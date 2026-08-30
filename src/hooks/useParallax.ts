import { useEffect } from 'react';

export function useParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  bgRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    let rafId: number;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateParallax = () => {
      if (!containerRef.current || !bgRef.current) return;
      if (mediaQuery.matches) {
        bgRef.current.style.transform = 'translate3d(0, 0, 0)';
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        bgRef.current.style.transform = `translate3d(0, px, 0)`;
      }
      rafId = requestAnimationFrame(updateParallax);
    };
    rafId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(rafId);
  }, [containerRef, bgRef]);
}
