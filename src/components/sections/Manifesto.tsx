'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { useRevealInView } from '@/hooks/useRevealInView'

const pillars = [
  { num: '01', title: 'Radical Transparency', desc: 'No hidden fees. No inflated metrics. No vanity reporting. Ever.' },
  { num: '02', title: 'Remote-First Global', desc: 'Asia-based, worldwide reach. Every timezone is our timezone.' },
  { num: '03', title: 'Precision Execution', desc: 'Small enough to care. Structured enough to scale. Always.' },
]

const QUOTE =
  'The agency world is full of promises. We built Veluryn to be the exception.'

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ')
  const { ref, show } = useRevealInView({ margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
    <blockquote
      className="font-display font-light italic text-platinum relative z-10"
      style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
        lineHeight: 1.0,
        letterSpacing: '-0.03em',
        maxWidth: '1400px',
      }}
    >
      &ldquo;
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.22em]"
          variants={{
            hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
      &rdquo;
    </blockquote>
    </motion.div>
  )
}

function DividerReveal() {
  const { ref, show } = useRevealInView()
  return (
    <motion.div
      ref={ref}
      className="bleed-full h-px bg-silver-dim/15 mb-20 max-w-7xl mx-auto origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: show ? 1 : 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: 'left' }}
    />
  )
}

export function Manifesto() {
  return (
    <section id="about" className="relative bg-charcoal overflow-hidden">
      <span className="ambient-text left-[-4%] top-0 hidden lg:block" aria-hidden>
        TRUST
      </span>

      <div className="bleed-full h-px bg-gradient-to-r from-transparent via-silver-dim/15 to-transparent" />

      <div className="py-24 md:py-40 px-6 md:px-16 xl:px-24 relative z-10">
        <Reveal className="flex items-start gap-4 mb-16 max-w-7xl mx-auto">
          <div className="h-px w-12 bg-silver-dim mt-3 shrink-0" />
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
            Our Philosophy
          </span>
        </Reveal>

        <div className="mb-16">
          <WordReveal text={QUOTE} />
        </div>

        <DividerReveal />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal delay={0.1}>
            <p className="font-body text-base text-silver-dim leading-relaxed">
              We are a remote-first global digital agency headquartered in Asia.
              We believe the most powerful thing an agency can offer a client is not a strategy deck —
              it&apos;s the truth. Honest assessment. Transparent execution. Measurable results.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-body text-base text-silver-dim leading-relaxed">
              That philosophy is the foundation of both our verticals — VA Mgmt, where we match brands
              with authentic voices, and VASD, where we protect and manage enterprise email infrastructure.
              Trust first. Everything follows.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="bleed-full border-t border-silver-dim/8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-silver-dim/8">
          {pillars.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.1}>
              <motion.div
                className="group relative overflow-hidden bg-charcoal-2 px-10 py-14 md:px-14 md:py-16 rounded-card md:rounded-none"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3 },
                }}
                style={{ borderRadius: '20px' }}
              >
                <motion.span
                  className="absolute top-4 right-6 font-display text-platinum pointer-events-none select-none"
                  style={{
                    fontSize: '8rem',
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                  }}
                  initial={{ opacity: 0.04 }}
                  whileHover={{ opacity: 0.1 }}
                  aria-hidden
                >
                  {item.num}
                </motion.span>

                <div className="w-8 h-px bg-silver mb-8 relative z-10" />
                <h3
                  className="font-body uppercase text-platinum mb-4 relative z-10"
                  style={{ letterSpacing: '0.15em', fontSize: '0.72rem' }}
                >
                  {item.title}
                </h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed relative z-10">
                  {item.desc}
                </p>
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
                />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
