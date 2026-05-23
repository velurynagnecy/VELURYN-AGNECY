'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const prevPath = useRef(pathname)

  const isRouteChange = prevPath.current !== pathname

  useEffect(() => {
    prevPath.current = pathname
  }, [pathname])

  if (reduced) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={isRouteChange ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-0"
    >
      {children}
    </motion.div>
  )
}
