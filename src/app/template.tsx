'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMounted } from '@/hooks/useMounted'

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const mounted = useMounted()

  if (reduced || !mounted) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
