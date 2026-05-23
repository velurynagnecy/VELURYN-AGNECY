'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.12, margin: '-40px 0px' })
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setRevealed(true), 1400)
    return () => clearTimeout(fallback)
  }, [])

  const show = isInView || revealed

  const initial = {
    up: { opacity: 0, y: 48 },
    left: { opacity: 0, x: -48 },
    right: { opacity: 0, x: 48 },
    scale: { opacity: 0, scale: 0.92 },
  }[direction]

  const animate = {
    up: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    scale: { opacity: 1, scale: 1 },
  }[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={show ? animate : initial}
      transition={{
        duration: 1.0,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
