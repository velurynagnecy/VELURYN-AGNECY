'use client'

import { useEffect, useState, type RefObject } from 'react'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  end: number,
  duration = 2000,
  enabled = true,
  decimals = 0
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let rafId = 0
    let startTime: number | null = null
    let observer: IntersectionObserver | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const raw = end * easeOutExpo(progress)
      setValue(decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.round(raw))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafId = requestAnimationFrame(animate)
          observer?.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => {
      observer?.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [ref, end, duration, enabled, decimals])

  return value
}
