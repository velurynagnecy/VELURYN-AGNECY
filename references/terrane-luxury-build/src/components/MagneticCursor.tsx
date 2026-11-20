import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setLabel('')
  }, [pathname])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let targetX = -100
    let targetY = -100
    let curX = -100
    let curY = -100
    let rafId = 0

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      setVisible(true)
      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]')
      setLabel(target?.getAttribute('data-cursor') || '')
    }

    const onLeave = () => setVisible(false)

    const tick = () => {
      curX += (targetX - curX) * 0.2
      curY += (targetY - curY) * 0.2
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`
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
      ref={ringRef}
      className={`pointer-events-none fixed top-0 left-0 z-[70] hidden items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-200 md:flex ${
        label
          ? 'h-20 w-20 border-[#FF4D15] bg-[#0A0A0A]/85 backdrop-blur-sm'
          : 'h-5 w-5 border-[#FF4D15]/75 bg-transparent'
      }`}
    >
      {label && (
        <span className="font-mono text-[9px] tracking-[0.16em] text-white uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
