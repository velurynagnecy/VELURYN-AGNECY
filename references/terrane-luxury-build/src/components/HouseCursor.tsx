import { useEffect, useRef, useState } from 'react'

export function HouseCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [interactive, setInteractive] = useState(false)

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let targetX = -100
    let targetY = -100
    let curX = -100
    let curY = -100
    let rafId = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setVisible(true)
      const hit = (e.target as HTMLElement | null)?.closest('a, button, input, select, textarea, [role="slider"]')
      setInteractive(Boolean(hit))
    }

    const onLeave = () => setVisible(false)

    const tick = () => {
      curX += (targetX - curX) * 0.16
      curY += (targetY - curY) * 0.16
      if (ref.current) {
        ref.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -25%)`
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#0A1112"
        stroke="#F2F4F3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`drop-shadow-[0_2px_6px_rgba(0,0,0,0.28)] transition-transform duration-150 ${
          interactive ? 'scale-125' : 'scale-100'
        }`}
      >
        <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    </div>
  )
}
