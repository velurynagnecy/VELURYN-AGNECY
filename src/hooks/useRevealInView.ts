'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

export function useRevealInView(options?: UseInViewOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: '-40px 0px',
    ...options,
  })
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setRevealed(true), 1500)
    return () => clearTimeout(fallback)
  }, [])

  return { ref, show: isInView || revealed }
}
