'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Users, TrendingUp, Target, Globe, BarChart2, Star } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { useRevealInView } from '@/hooks/useRevealInView'
import { sectionHeadingStyle, subHeadingStyle } from '@/lib/typography'

const services = [
  { n: '01', icon: Users, title: 'Talent Scouting', desc: 'We identify and vet influencers who align with your brand values, not just follower counts.' },
  { n: '02', icon: Target, title: 'Campaign Strategy', desc: 'Custom campaign architecture from brief to delivery. No templates. Every client is different.' },
  { n: '03', icon: TrendingUp, title: 'Performance Tracking', desc: 'Real-time analytics dashboards. ROI reporting. Zero vanity metrics.' },
  { n: '04', icon: Globe, title: 'Global Reach', desc: 'Influencer networks built for regional nuance and cultural fit — wherever your audience is.' },
  { n: '05', icon: BarChart2, title: 'Content Amplification', desc: 'Paid + organic amplification strategies to maximise campaign longevity.' },
  { n: '06', icon: Star, title: 'Brand Safety Audit', desc: 'Every influencer is audited for authenticity, brand safety, and audience quality.' },
]

function CharReveal({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const { ref, show } = useRevealInView()

  return (
    <motion.h2
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h2>
  )
}

export function VAMgmt() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%'])

  const { scrollYProgress: stripProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  })
  const stripImgY = useTransform(stripProgress, [0, 1], ['10%', '-20%'])

  return (
    <section id="va-mgmt" className="relative overflow-hidden bg-charcoal-2">
      <div ref={heroRef} className="bleed-full relative h-[55vh] md:h-[65vh] image-cover rounded-none overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/assets/va-mgmt-bg.jpeg"
            alt="VA Mgmt"
            fill
            sizes="100vw"
            priority
            className="section-bg-image scale-110"
            style={{ opacity: 0.5 }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(34,36,46,0.2) 0%, rgba(34,36,46,0.95) 100%)',
          }}
        />

        <div className="absolute inset-0 z-[2] flex items-end">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12 md:pb-16">
            <Reveal className="flex items-center gap-4 mb-6">
              <div className="w-px h-10 bg-platinum" />
              <div>
                <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-0.5">
                  Service Vertical 01
                </p>
                <p className="font-body text-[0.65rem] tracking-widest uppercase text-platinum">VA Mgmt</p>
              </div>
            </Reveal>
            <CharReveal
              text="Veluryn Agnecy Management"
              className="font-display font-light text-platinum"
              style={sectionHeadingStyle}
            />
          </div>
        </div>

        <span className="ambient-text left-[-2%] top-1/2 -translate-y-1/2 hidden xl:block text-platinum/5" aria-hidden>
          VA MGMT
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <Reveal>
            <blockquote className="font-display font-light italic text-platinum" style={subHeadingStyle}>
              &ldquo;We don&apos;t just connect brands with creators. We engineer moments that move markets.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 pt-2">
            <p className="font-body text-base text-silver-dim leading-relaxed">
              Influencer marketing done with discipline. We connect brands with authentic voices and manage every touchpoint — from scouting to final reporting. No shortcuts. No inflated numbers.
            </p>
            <p className="font-body text-sm text-silver-dim leading-relaxed">
              Every campaign begins with a rigorous brief and ends with a transparent performance report. What happens in between is where Veluryn Agnecy Management earns its name.
            </p>
            <Link
              href="#contact"
              className="rounded-pill inline-flex self-start font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-charcoal bg-platinum px-7 py-3.5 hover:bg-silver transition-colors mt-2"
            >
              Start a Campaign
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ n, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <motion.div
                className="service-card bg-charcoal-2 p-8 md:p-10 rounded-card"
                whileHover={{
                  y: -8,
                  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <span
                  className="font-display text-platinum block mb-4 pointer-events-none select-none"
                  style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1, opacity: 0.08, letterSpacing: '-0.04em' }}
                  aria-hidden
                >
                  {n}
                </span>
                <motion.div whileHover={{ scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Icon size={18} className="service-icon text-silver-dim mb-5" strokeWidth={1.5} />
                </motion.div>
                <h3 className="font-body text-xs tracking-[0.15em] uppercase text-platinum mb-3">{title}</h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed">{desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      <div
        ref={stripRef}
        className="max-w-7xl mx-auto px-6 pb-20"
      >
        <div
          className="relative h-72 md:h-[500px] overflow-hidden rounded-[24px]"
          style={{ borderRadius: '24px' }}
        >
          <motion.div className="absolute inset-0 scale-110" style={{ y: stripImgY }}>
            <Image
              src="/assets/va-mgmt-editorial.jpg"
              alt="VA Mgmt editorial"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="section-bg-image"
              style={{ opacity: 0.5 }}
            />
          </motion.div>
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(to bottom, rgba(34,36,46,0.5) 0%, rgba(34,36,46,0.4) 50%, rgba(34,36,46,0.7) 100%)',
            }}
          />
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-8">
            <Reveal>
              <p
                className="font-display font-light italic text-platinum text-center"
                style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  maxWidth: '900px',
                }}
              >
                &ldquo;The right voice, to the right audience, at the right moment.&rdquo;
              </p>
            </Reveal>
          </div>
        </div>
      </div>


    </section>
  )
}
