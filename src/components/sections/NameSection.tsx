'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'

export function NameSection() {
  return (
    <section id="name" className="relative bg-charcoal overflow-hidden">
      <div className="bleed-full h-px bg-silver-dim/10" />

      <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 relative z-10">

        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-16">
          <div className="h-px w-12 bg-silver-dim" />
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
            The Name
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left — the name displayed large */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                {/* VELURYN */}
                <p
                  className="font-display font-light text-platinum leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
                >
                  VELURYN
                </p>

                {/* AGNECY — with the rearranged letters highlighted */}
                <p
                  className="font-display font-light leading-none mt-1"
                  style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
                >
                  <span className="text-platinum">AG</span>
                  <span
                    className="italic"
                    style={{ color: '#9A9A9A' }}
                  >
                    N
                  </span>
                  <span className="text-platinum">E</span>
                  <span
                    className="italic"
                    style={{ color: '#9A9A9A' }}
                  >
                    C
                  </span>
                  <span className="text-platinum">Y</span>
                </p>

                {/* Rule */}
                <div className="h-px w-full bg-silver-dim/15 mt-10 mb-8" />

                {/* Not a typo badge */}
                <motion.div
                  className="inline-flex items-center gap-3 border border-silver-dim/20 px-5 py-3 rounded-full"
                  whileHover={{ borderColor: 'rgba(200,200,212,0.35)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-platinum" />
                  <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim">
                    Intentional. Not a typo.
                  </span>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Right — the explanation */}
          <div className="lg:col-span-7 flex flex-col gap-10">

            {/* Block 1 — Why not AGENCY */}
            <Reveal delay={0.08}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0 mt-1">
                  <span
                    className="font-display font-light text-silver-dim"
                    style={{ fontSize: '2.5rem', lineHeight: 1, opacity: 0.2, letterSpacing: '-0.04em' }}
                    aria-hidden
                  >
                    01
                  </span>
                </div>
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.28em] uppercase text-silver-dim mb-3">
                    Why not Agency
                  </p>
                  <p
                    className="font-display font-light text-platinum mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                  >
                    &ldquo;Agency&rdquo; already belongs to everyone.
                  </p>
                  <p className="font-body text-sm text-silver-dim leading-relaxed max-w-lg">
                    AGENCY is a dictionary word. Thousands of companies carry it. It describes a function — not an identity.
                    VELURYN AGNECY did not need a borrowed word to define what it is.
                    A brand name should be owned entirely. No existing word. No shared meaning.
                    Something that belongs to no one else, because no one else built it.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="h-px bg-silver-dim/10" />

            {/* Block 2 — What AGNECY means */}
            <Reveal delay={0.14}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0 mt-1">
                  <span
                    className="font-display font-light text-silver-dim"
                    style={{ fontSize: '2.5rem', lineHeight: 1, opacity: 0.2, letterSpacing: '-0.04em' }}
                    aria-hidden
                  >
                    02
                  </span>
                </div>
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.28em] uppercase text-silver-dim mb-3">
                    What AGNECY stands for
                  </p>
                  <p
                    className="font-display font-light text-platinum mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                  >
                    The ultimate level of trust.
                  </p>
                  <p className="font-body text-sm text-silver-dim leading-relaxed max-w-lg">
                    AGNECY is not a misspelling. It is a deliberate reconstruction.
                    The letters are taken — the meaning is not. It stands for the highest standard of trust
                    a brand can earn from the people it works with. Not promised. Not marketed.
                    Proven — through every decision, every delivery, every client.
                    The tagline is &ldquo;Trust First. Everything Follows.&rdquo; The name carries the same weight.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="h-px bg-silver-dim/10" />

            {/* Block 3 — VELURYN */}
            <Reveal delay={0.2}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0 mt-1">
                  <span
                    className="font-display font-light text-silver-dim"
                    style={{ fontSize: '2.5rem', lineHeight: 1, opacity: 0.2, letterSpacing: '-0.04em' }}
                    aria-hidden
                  >
                    03
                  </span>
                </div>
                <div>
                  <p className="font-body text-[0.65rem] tracking-[0.28em] uppercase text-silver-dim mb-3">
                    VELURYN
                  </p>
                  <p
                    className="font-display font-light text-platinum mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                  >
                    A name built from nothing — owned completely.
                  </p>
                  <p className="font-body text-sm text-silver-dim leading-relaxed max-w-lg">
                    VELURYN exists nowhere else. It carries no prior meaning, no inherited association,
                    no borrowed identity. It is the company&apos;s own word — built to hold
                    whatever reputation the work builds into it.
                    Every meaning VELURYN has, it earned.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>

      <div className="bleed-full h-px bg-silver-dim/10" />
    </section>
  )
}
