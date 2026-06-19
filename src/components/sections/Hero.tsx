'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Briefcase } from 'lucide-react'

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
      {/* Institutional Dark Background — completely flat, no images */}
      <div className="absolute inset-0 bg-[#111827]" />

      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-16">

          {/* Category label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={ready ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="h-px w-8 bg-[#60A5FA]" />
            <span className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-[#60A5FA] font-semibold">
              Business Intelligence & Digital Operations
            </span>
          </motion.div>

          {/* Hero headline — Cormorant Garamond ONLY here */}
          <h1
            className="text-white mb-10"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            <motion.span
              initial={ready ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block"
            >
              Trust verified.
            </motion.span>
            <motion.span
              initial={ready ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block text-gray-400"
            >
              Intelligence deployed.
            </motion.span>
          </h1>

          {/* Divider */}
          <div className="w-full h-px bg-gray-800 mb-12" />

          {/* Two-column bottom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={ready ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-body text-base text-gray-400 leading-relaxed max-w-lg mb-8 font-light">
                Veluryn Agnecy provides institutional-grade digital management and trust infrastructure for enterprise clients, founders, and investors worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/va-mgmt"
                  className="inline-flex items-center justify-center gap-2 font-body text-[0.7rem] tracking-[0.1em] uppercase font-semibold text-gray-900 bg-white px-8 py-3.5 hover:bg-gray-100 transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  <Briefcase size={14} />
                  Digital Management
                </Link>
                <Link
                  href="/vasd"
                  className="inline-flex items-center justify-center gap-2 font-body text-[0.7rem] tracking-[0.1em] uppercase font-semibold text-white border border-gray-600 px-8 py-3.5 hover:bg-gray-800 transition-all"
                  style={{ borderRadius: '2px' }}
                >
                  <Shield size={14} />
                  Trust Infrastructure
                </Link>
              </div>
            </motion.div>

            {/* Right — quick facts table */}
            <motion.div
              className="hidden lg:block"
              initial={ready ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="border border-gray-800 bg-[#1F2937]" style={{ borderRadius: '2px' }}>
                {[
                  { label: 'Classification', value: 'Private Intelligence & Services Agency' },
                  { label: 'Coverage Area', value: 'Global Operations (Asia HQ)' },
                  { label: 'Core Capabilities', value: 'Entity Verification, Digital Management' },
                  { label: 'Operational Standard', value: 'Evidence-Based Reporting' },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-start gap-6 px-6 py-4 ${i < arr.length - 1 ? 'border-b border-gray-800' : ''}`}
                  >
                    <p className="font-body text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 w-36 shrink-0 pt-0.5 font-semibold">{item.label}</p>
                    <p className="font-body text-sm font-medium text-gray-200">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
