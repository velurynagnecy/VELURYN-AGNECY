'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    })

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onLenisScroll = () => {
      window.dispatchEvent(new Event('scroll'))
    }
    lenis.on('scroll', onLenisScroll)

    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href*="#"]')
      if (!target || !(target instanceof HTMLAnchorElement)) return

      const href = target.getAttribute('href')
      if (!href || !href.includes('#')) return

      const hash = href.slice(href.indexOf('#'))
      if (!hash || hash === '#') return

      const isSamePage =
        href.startsWith('#') ||
        href.startsWith(window.location.pathname + '#')

      if (!isSamePage) return

      const el = document.querySelector(hash)
      if (!el) return

      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -88, duration: 1.2 })
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
