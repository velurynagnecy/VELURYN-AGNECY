'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Briefcase } from 'lucide-react'
import { Marquee } from '@/components/ui/Marquee'

const WORDS = [
  { text: 'We', italic: false, grad: false },
  { text: "Don't", italic: false, grad: false },
  { text: 'Overpromise.', italic: true, grad: true },
  { text: 'We', italic: false, grad: false },
  { text: 'Overdeliver.', italic: false, grad: false },
]

export function Hero() {
  const [ready, setReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => { setReady(true) }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden bg-charcoal"
      style={{ minHeight: '85vh' }}
    >
      {/* Subtle background image — low opacity, no parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/hero-bg.jpeg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
          style={{ opacity: 0.18 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(26,28,36,0.6) 0%, rgba(26,28,36,0.85) 60%, rgba(26,28,36,1) 100%)',
          }}
        />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(200,200,220,0.06)] z-20" />

      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-12">

          {/* Category label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={ready ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-px w-8 bg-steel-blue" />
            <span className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-steel-blue font-medium">
              Business Intelligence & Digital Services
            </span>
          </motion.div>

          {/* Hero headline — Cormorant Garamond ONLY here */}
          <h1
            className="text-platinum mb-8"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
            }}
          >
            {WORDS.map((w, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.16em] ${w.grad ? 'text-gradient italic' : 'text-platinum'} ${w.italic && !w.grad ? 'italic' : ''}`}
                initial={ready ? { opacity: 0, y: 40 } : false}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: ready ? 0.25 + i * 0.07 : 0, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                {w.text}
              </motion.span>
            ))}
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-[rgba(200,200,220,0.07)] mb-10" />

          {/* Two-column bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <motion.div
              initial={ready ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ready ? 0.55 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-base text-silver-dim leading-relaxed max-w-md mb-8">
                Radical transparency. Precision execution. Two verticals operating under one uncompromising standard.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/va-mgmt"
                  className="inline-flex items-center justify-center gap-2 font-body text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-charcoal bg-platinum px-6 py-3 hover:bg-silver transition-colors"
                  style={{ borderRadius: '3px' }}
                >
                  <Briefcase size={13} />
                  VA Mgmt
                </Link>
                <Link
                  href="/vasd"
                  className="inline-flex items-center justify-center gap-2 font-body text-[0.7rem] tracking-[0.18em] uppercase font-medium text-silver-dim border border-[rgba(200,200,220,0.15)] px-6 py-3 hover:border-[rgba(200,200,220,0.3)] hover:text-platinum transition-all"
                  style={{ borderRadius: '3px' }}
                >
                  <Shield size={13} />
                  VASD
                </Link>
              </div>
            </motion.div>

            {/* Right — quick facts table */}
            <motion.div
              className="hidden lg:block"
              initial={ready ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ready ? 0.65 : 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border border-[rgba(200,200,220,0.07)]" style={{ borderRadius: '4px' }}>
                {[
                  { label: 'Organisation Type', value: 'Business Intelligence & Digital Services' },
                  { label: 'Operating Model', value: 'Remote-First — Asia to Worldwide' },
                  { label: 'Core Verticals', value: 'VA Mgmt · VASD Trust Infrastructure' },
                  { label: 'Founding Principle', value: 'Trust First. Everything Follows.' },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-start gap-6 px-5 py-3.5 ${i < arr.length - 1 ? 'border-b border-[rgba(200,200,220,0.06)]' : ''}`}
                  >
                    <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim w-32 shrink-0 pt-0.5 font-medium">{item.label}</p>
                    <p className="font-body text-xs text-silver leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <Marquee />
      </div>
    </section>
  )
}
