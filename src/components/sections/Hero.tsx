'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Marquee } from '@/components/ui/Marquee'

const WORDS = [
  { text: 'We', italic: false, grad: false },
  { text: "Don't", italic: false, grad: false },
  { text: 'Overpromise.', italic: true, grad: true },
  { text: 'We', italic: false, grad: false },
  { text: 'Overdeliver.', italic: false, grad: false },
]

const STATS = [
  { value: '150+', label: 'Campaigns' },
  { value: '40+', label: 'Global Clients' },
  { value: '7', label: 'Disciplines' },
]

export function Hero() {
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setReady(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-charcoal"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 image-cover rounded-none overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src="/assets/hero-bg.jpeg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="section-bg-image scale-110"
            style={{ opacity: 0.45 }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(160deg, rgba(26,28,36,0.92) 0%, rgba(26,28,36,0.55) 60%, rgba(26,28,36,0.9) 100%)',
          }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
      </div>

      {/* Drifting ambient text */}
      <motion.span
        className="ambient-text left-[-3%] top-[30%] -translate-y-1/2 hidden xl:block"
        aria-hidden
        animate={{ x: [-20, 20] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        VELURYN
      </motion.span>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-silver-dim/30 to-transparent z-20" />

      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-10">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="hidden xl:flex col-span-1 flex-col items-center justify-end gap-3 pb-2">
              <div className="w-px h-20 bg-gradient-to-b from-transparent to-silver-dim/50" />
              <span className="vertical-label">Est. 2024 · Asia</span>
            </div>

            <div className="col-span-12 xl:col-span-7">
              <RevealBlock delay={0} className="flex items-center gap-4 mb-10 xl:hidden">
                <div className="h-px w-10 bg-silver-dim/60" />
                <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
                  Full-Service Global Digital Agency
                </span>
              </RevealBlock>

              <h1
                className="text-platinum"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(5rem, 13vw, 11rem)',
                  fontWeight: 300,
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  perspective: '800px',
                }}
              >
                {WORDS.map((w, i) => (
                  <motion.span
                    key={i}
                    className={`inline-block mr-[0.18em] ${w.grad ? 'text-gradient italic' : 'text-platinum'} ${w.italic && !w.grad ? 'italic' : ''}`}
                    initial={ready ? { opacity: 0, y: 60, rotateX: 20 } : false}
                    animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 60,
                      damping: 20,
                      delay: ready ? 0.3 + i * 0.08 : 0,
                    }}
                    style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
                  >
                    {w.text}
                  </motion.span>
                ))}
              </h1>

              <div className="bleed-full h-px bg-gradient-to-r from-transparent via-silver-dim/20 to-transparent my-10" />

              <motion.p
                className="font-body text-base text-silver-dim leading-relaxed max-w-lg mb-10"
                initial={ready ? { opacity: 0, y: 24 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: ready ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                Radical transparency. Precision execution. Two verticals —
                one uncompromising standard of excellence.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={ready ? { opacity: 0, y: 24 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: ready ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/va-mgmt"
                  className="rounded-pill inline-flex items-center justify-center font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-charcoal bg-platinum px-8 py-4 hover:bg-silver transition-colors"
                >
                  VA Mgmt
                </Link>
                <Link
                  href="/vasd"
                  className="rounded-pill inline-flex items-center justify-center font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-silver-dim border border-silver-dim/30 px-8 py-4 hover:border-silver hover:text-platinum transition-all"
                >
                  VASD
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="hidden xl:flex col-span-4 gap-10 pb-2 pl-12 items-stretch"
              initial={ready ? { opacity: 0, x: 40 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: ready ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-px bg-silver-dim/20 shrink-0"
                initial={ready ? { height: 0 } : false}
                animate={{ height: '100%' }}
                transition={{ duration: 1.2, delay: ready ? 0.4 : 0, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="flex flex-col gap-10 flex-1">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontWeight: 300,
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        color: '#E8E8F0',
                      }}
                    >
                      {s.value}
                    </p>
                    <p className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-silver-dim mt-2">
                      {s.label}
                    </p>
                  </div>
                ))}
                <div className="mt-4">
                  <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim mb-2">
                    Operating From
                  </p>
                  <p className="font-body text-sm text-silver">Asia — Worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Marquee />
      </div>
    </section>
  )
}

function RevealBlock({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
