'use client'

import { useRef, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
} from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'

function StatCell({
  end,
  suffix,
  label,
  sub,
  decimals = 0,
}: {
  end: number
  suffix: string
  label: string
  sub: string
  decimals?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, end, {
      duration: 2.5,
      ease: 'easeOut',
    })
    return controls.stop
  }, [isInView, end, count])

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col justify-center px-8 md:px-16 py-16 md:py-24 border-r border-silver-dim/10 last:border-r-0 overflow-hidden rounded-card md:rounded-none"
      whileHover={{
        scale: 1.02,
        backgroundColor: 'rgba(34, 36, 46, 1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{ borderRadius: '20px' }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center font-display text-platinum pointer-events-none select-none opacity-[0.025]"
        style={{
          fontSize: 'clamp(8rem, 18vw, 20rem)',
          fontWeight: 300,
          letterSpacing: '-0.06em',
        }}
        aria-hidden
      >
        {end}
        {suffix}
      </span>

      <motion.p
        className="font-display font-light text-platinum stat-number leading-none relative z-10"
        style={{
          fontSize: 'clamp(3.5rem, 9vw, 8rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
        }}
      >
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.p>

      <motion.div
        className="h-px bg-silver-dim/40 my-5 relative z-10"
        initial={{ width: 8 }}
        whileHover={{ width: 32 }}
        transition={{ duration: 0.4 }}
      />

      <p
        className="font-body uppercase text-silver relative z-10"
        style={{ letterSpacing: '0.18em', fontSize: '0.65rem' }}
      >
        {label}
      </p>
      <p className="font-body text-xs text-silver-dim mt-2 relative z-10">{sub}</p>
    </motion.div>
  )
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <section ref={sectionRef} className="relative bg-charcoal overflow-hidden">
      <motion.span
        className="ambient-text left-[-2%] top-1/2 hidden lg:block"
        style={{ fontSize: 'clamp(7rem, 18vw, 22rem)', opacity: 0.03, y: watermarkY }}
        aria-hidden
      >
        NUMBERS
      </motion.span>

      <div className="bleed-full grid grid-cols-2 lg:grid-cols-4 border-t border-b border-silver-dim/10 relative z-10">
        <StatCell end={150} suffix="+" label="Campaigns Executed" sub="Across VA Mgmt verticals" />
        <StatCell end={40} suffix="+" label="Global Clients" sub="From Asia to worldwide" />
        <StatCell end={99.9} suffix="%" label="VASD Uptime SLA" sub="Enterprise reliability" decimals={1} />
        <StatCell end={7} suffix="" label="Core Disciplines" sub="One roof, full coverage" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Reveal>
          <p
            className="font-display font-light italic text-silver text-center"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              letterSpacing: '-0.01em',
              opacity: 0.7,
            }}
          >
            &ldquo;We would rather lose a client than mislead one.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
