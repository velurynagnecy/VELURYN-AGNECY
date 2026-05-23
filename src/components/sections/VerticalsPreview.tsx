'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { useRevealInView } from '@/hooks/useRevealInView'
import { sectionHeadingStyle } from '@/lib/typography'

const verticals = [
  {
    href: '/va-mgmt',
    label: 'Service Vertical 01',
    tag: 'VA Mgmt',
    title: 'Veluryn Agnecy\nManagement',
    desc: 'Influencer marketing with discipline — talent scouting, campaign strategy, and performance reporting without inflated numbers.',
    image: '/assets/va-mgmt-editorial.jpg',
    accentClass: 'bg-platinum',
    accentColor: '#E8E8F0',
    cta: 'Explore VA Mgmt',
  },
  {
    href: '/vasd',
    label: 'Service Vertical 02',
    tag: 'VASD',
    title: 'Veluryn Agnecy\nService Digital',
    desc: 'Enterprise email infrastructure — intelligent filtering, threat protection, and inbox management at scale.',
    image: '/assets/vasd-fiber.jpg',
    accentClass: 'bg-steel-blue',
    accentColor: '#4A6580',
    cta: 'Explore VASD',
  },
]

function VerticalCard({ children, index }: { children: React.ReactNode; index: number }) {
  const { ref, show } = useRevealInView({ margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ y: 80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
        delay: index * 0.15,
      }}
    >
      {children}
    </motion.div>
  )
}

export function VerticalsPreview() {
  return (
    <section id="verticals" className="relative bg-charcoal-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
        <Reveal className="flex items-center gap-4 mb-10">
          <div className="h-px w-12 bg-silver-dim" />
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
            Our Verticals
          </span>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-light text-platinum" style={sectionHeadingStyle}>
            Two disciplines.
            <span className="block italic text-gradient">One standard.</span>
          </h2>
          <p className="font-body text-sm text-silver-dim max-w-xs leading-relaxed">
            Everything we do falls under one of two verticals. Each is built on the same foundation — radical transparency.
          </p>
        </Reveal>
      </div>

      <div className="bleed-full grid grid-cols-1 lg:grid-cols-2 border-t border-silver-dim/8 gap-4 lg:gap-0 px-4 lg:px-0">
        {verticals.map((v, i) => (
          <VerticalCard key={v.href} index={i}>
            <Link
              href={v.href}
              className="group relative flex flex-col overflow-hidden block rounded-panel"
              style={{ minHeight: '680px', borderRadius: '28px' }}
            >
              <div className="absolute inset-0 image-cover rounded-panel overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="50vw"
                    className="section-bg-image"
                    style={{ opacity: 0.45 }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-[1]"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 0.85 }}
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(26,28,36,0.2) 0%, rgba(26,28,36,0.88) 70%, rgba(26,28,36,0.96) 100%)',
                  }}
                />
              </div>

              <span
                className="absolute top-8 right-8 font-display text-platinum z-[2] pointer-events-none select-none"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 9rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  opacity: 0.06,
                  letterSpacing: '-0.05em',
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10 mt-auto p-10 md:p-14 flex flex-col gap-5">
                <motion.div
                  className={`h-0.5 ${v.accentClass}`}
                  initial={{ width: 0 }}
                  whileHover={{ width: 80 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
                  {v.label}
                </p>
                <h3
                  className="font-display font-light text-platinum whitespace-pre-line"
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {v.title}
                </h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed max-w-sm">{v.desc}</p>

                <span
                  className="inline-flex items-center gap-2 font-body text-[0.7rem] tracking-[0.22em] uppercase mt-2 relative"
                  style={{ color: v.accentColor }}
                >
                  {v.cta}
                  <motion.span
                    className="inline-flex items-center"
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <ArrowRight size={13} />
                  </motion.span>
                  <ArrowRight
                    size={13}
                    className="absolute left-5 opacity-0 group-hover:opacity-30 transition-opacity"
                  />
                </span>
              </div>
            </Link>
          </VerticalCard>
        ))}
      </div>
    </section>
  )
}
