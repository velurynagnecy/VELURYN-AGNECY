import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

export function PageLoader() {
  const { pathname } = useLocation()
  const isFirstMount = useRef(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false)
      return
    }

    const duration = isFirstMount.current ? 260 : 180
    isFirstMount.current = false
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#0A1112] text-[#F2F4F3]"
          aria-live="polite"
          aria-label="Loading page"
        >
          <div className="font-serif text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            Terrane
          </div>
          <div className="mt-4 h-[2px] w-32 overflow-hidden bg-white/15">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full w-full origin-left bg-[#1B5E63]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
