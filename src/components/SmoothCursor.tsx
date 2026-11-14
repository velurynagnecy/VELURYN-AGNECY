import { useEffect, useRef, useState } from 'react';

/**
 * Ultra-smooth trailing mouse cursor with luminous aura halo
 * using the transparent VELURYN emblem (Tlogo.png).
 */
export default function SmoothCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-enabled');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (target) {
        // Hide custom cursor inside chatbox dialog to ensure native caret and text selection
        if (target.closest('.chat')) {
          if (visible) setVisible(false);
          return;
        }

        if (!visible) setVisible(true);

        // Check if hovering clickable/interactive element
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setHovered(isInteractive);
      } else {
        if (!visible) setVisible(true);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp render loop with requestAnimationFrame
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      // 0.22 lerp factor provides fluid momentum with pinpoint responsiveness
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.22);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.22);

      if (cursorRef.current) {
        const x = currentPos.current.x;
        const y = currentPos.current.y;
        // Tip of the inverted V is at (50% X, 0% Y) -> translate(-50%, 0) aligns cursor tip precisely with mouse position
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease-out',
      }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{
          width: '30px',
          height: '26px',
          transformOrigin: '50% 0%',
          transform: `rotate(-45deg) scale(${clicked ? 0.9 : hovered ? 1.25 : 1})`,
        }}
      >
        <img
          src="/cursor-pointer.png?v=2"
          alt=""
          className={`w-full h-full object-contain pointer-events-none select-none transition-[filter] duration-200 ${
            hovered
              ? 'drop-shadow-[0_0_8px_rgba(255,213,4,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
              : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] drop-shadow-[0_1px_2px_rgba(6,19,64,0.55)]'
          }`}
          loading="eager"
          decoding="sync"
        />
      </div>
    </div>
  );
}
