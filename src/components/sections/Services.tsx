'use client'

import Link from 'next/link'
import { Megaphone, Mail, PenTool, Share2, Shield, Newspaper, UserCheck, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { useRevealInView } from '@/hooks/useRevealInView'
import { sectionHeadingStyle } from '@/lib/typography'

const services = [
  { n: '01', icon: Megaphone, title: 'Marketing & Advertising', arm: 'VA Mgmt', armColor: '#E8E8F0', desc: 'Full-funnel marketing campaigns — paid, organic, and influencer-led.' },
  { n: '02', icon: Mail, title: 'Email Filtering & Protection', arm: 'VASD', armColor: '#4A6580', desc: 'AI-powered email filtering, threat detection, and inbox management for individuals and enterprises.' },
  { n: '03', icon: PenTool, title: 'Branding & Identity', arm: 'VA Mgmt', armColor: '#E8E8F0', desc: 'Brand systems that last. Strategy, identity, and guidelines.' },
  { n: '04', icon: Share2, title: 'Social Media Management', arm: 'VA Mgmt', armColor: '#E8E8F0', desc: 'Content, community, and consistency across every platform.' },
  { n: '05', icon: Shield, title: 'Inbox Security & Compliance', arm: 'VASD', armColor: '#4A6580', desc: 'End-to-end encryption, phishing protection, and compliance across GDPR, HIPAA, and SOC2.' },
  { n: '06', icon: Newspaper, title: 'PR & Communications', arm: 'VA Mgmt', armColor: '#E8E8F0', desc: 'Media relations, press strategy, and crisis communications.' },
  { n: '07', icon: UserCheck, title: 'Influencer Marketing', arm: 'VA Mgmt', armColor: '#E8E8F0', desc: 'End-to-end influencer campaign management with audited talent.' },
]

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Services() {
  const { ref: rowsRef, show: rowsShow } = useRevealInView({ margin: '-40px 0px' })

  return (
    <section id="services" className="relative bg-charcoal overflow-hidden">
      <span className="ambient-text right-[-4%] top-20 hidden lg:block" aria-hidden>
        WORK
      </span>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <Reveal className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-silver-dim" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
                What We Do
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-platinum" style={sectionHeadingStyle}>
                Full-Service.
                <span className="block italic">No Compromises.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:text-right">
            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-sm lg:ml-auto mb-6">
              Seven disciplines. Two verticals. One standard: excellence or nothing.
            </p>
            <div className="flex items-center gap-6 lg:justify-end">
              <span className="flex items-center gap-2 font-body text-[0.65rem] tracking-widest uppercase text-silver">
                <span className="w-6 h-px bg-platinum inline-block" /> VA Mgmt
              </span>
              <span className="flex items-center gap-2 font-body text-[0.65rem] tracking-widest uppercase text-steel-blue">
                <span className="w-6 h-px bg-steel-blue inline-block" /> VASD
              </span>
            </div>
          </Reveal>
        </div>

        <motion.div
          ref={rowsRef}
          className="border-t border-silver-dim/10"
          initial="hidden"
          animate={rowsShow ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {services.map(({ n, icon: Icon, title, arm, armColor, desc }) => (
            <motion.div
              key={title}
              variants={rowVariants}
              className="group relative flex items-center gap-6 md:gap-10 py-7 md:py-8 border-b border-silver-dim/10 px-4 cursor-default rounded-lg"
              whileHover={{
                backgroundColor: 'rgba(42, 45, 56, 1)',
                borderLeft: '2px solid rgba(232,232,240,0.3)',
                paddingLeft: '1.25rem',
              }}
              transition={{ duration: 0.25 }}
            >
              <motion.span
                className="font-body text-[0.65rem] text-silver-dim/40 w-6 shrink-0 hidden md:block tabular-nums"
                whileHover={{ color: 'rgba(232,232,240,1)' }}
              >
                {n}
              </motion.span>

              <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <Icon size={17} strokeWidth={1.5} className="text-silver-dim group-hover:text-platinum transition-colors shrink-0" />
              </motion.div>

              <h3
                className="font-body text-sm md:text-base tracking-wide uppercase text-silver group-hover:text-platinum transition-colors flex-1"
                style={{ letterSpacing: '0.08em' }}
              >
                {title}
              </h3>

              <p className="font-body text-sm text-silver-dim leading-relaxed max-w-xs hidden lg:block flex-1">
                {desc}
              </p>

              <span
                className="rounded-pill font-body text-[0.6rem] tracking-[0.22em] uppercase shrink-0 px-3 py-1.5 hidden md:block"
                style={{
                  color: armColor,
                  background: `${armColor}18`,
                  border: `1px solid ${armColor}4D`,
                }}
              >
                {arm}
              </span>

              <motion.div whileHover={{ x: 12 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <ArrowRight size={14} className="text-silver-dim/30 group-hover:text-silver shrink-0 hidden md:block" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-14 pt-10 border-t border-silver-dim/10">
          <p className="font-body text-sm text-silver-dim">
            Not sure which service fits? We&apos;ll tell you honestly.
          </p>
          <Link
            href="/#contact"
            className="rounded-pill inline-flex items-center gap-3 font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-charcoal bg-platinum px-7 py-3.5 hover:bg-silver transition-colors"
          >
            Talk to Us
            <ArrowRight size={13} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
