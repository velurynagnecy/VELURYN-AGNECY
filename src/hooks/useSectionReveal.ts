'use client'
import { useEffect, RefObject } from 'react'

export function useSectionReveal(ref: RefObject<HTMLElement>, threshold = 0.08) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll('[data-reveal], [data-reveal-left], [data-reveal-scale]')
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('revealed'), i * 110)
          })
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold])
}
