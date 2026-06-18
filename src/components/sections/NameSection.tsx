'use client'

import { ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle } from '@/lib/typography'

export function NameSection() {
  return (
    <section id="name" className="relative bg-charcoal border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">

        {/* Section label */}
        <Reveal className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-silver-dim" />
          <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim font-medium">
            Corporate Identity
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — the name displayed large */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border border-[rgba(200,200,220,0.07)] p-8 bg-charcoal-2" style={{ borderRadius: '4px' }}>
                <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-6 font-semibold">Registered Entity</p>
                
                {/* VELURYN */}
                <p className="font-body font-semibold text-platinum leading-none mb-1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
                  VELURYN
                </p>

                {/* AGNECY — with the rearranged letters highlighted */}
                <p className="font-body font-semibold leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}>
                  <span className="text-platinum">AG</span>
                  <span className="text-steel-blue">N</span>
                  <span className="text-platinum">E</span>
                  <span className="text-steel-blue">C</span>
                  <span className="text-platinum">Y</span>
                </p>

                {/* Not a typo badge */}
                <div className="inline-flex items-center gap-3 bg-[rgba(200,200,220,0.05)] border border-[rgba(200,200,220,0.1)] px-4 py-2.5" style={{ borderRadius: '3px' }}>
                  <ShieldCheck size={14} className="text-steel-blue" />
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-platinum font-semibold">
                    Intentional Structural Anagram
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — the explanation */}
          <div className="lg:col-span-7 flex flex-col">
            
            <Reveal delay={0.06}>
              <h2 className="text-platinum mb-6" style={sectionHeadingStyle}>
                Built to hold a specific reputation.
              </h2>
            </Reveal>
            
            <Reveal delay={0.12}>
              <p className="font-body text-sm text-silver-dim leading-relaxed max-w-2xl mb-12">
                A brand name should be owned entirely. No existing dictionary word. No shared meaning. We rejected the standard dictionary spelling because &ldquo;Agency&rdquo; describes a common function, not an identity. 
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Block 1 — VELURYN */}
              <Reveal delay={0.18}>
                <div className="h-full border-t border-[rgba(200,200,220,0.08)] pt-6">
                  <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-platinum mb-3 font-semibold">
                    VELURYN
                  </p>
                  <p className="font-body text-xs text-silver-dim leading-relaxed">
                    A constructed word carrying no prior meaning, inherited association, or borrowed identity. It was designed to hold whatever reputation the work builds into it. Every meaning VELURYN has, it earned through execution.
                  </p>
                </div>
              </Reveal>

              {/* Block 2 — What AGNECY means */}
              <Reveal delay={0.24}>
                <div className="h-full border-t border-[rgba(200,200,220,0.08)] pt-6">
                  <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-platinum mb-3 font-semibold">
                    AGNECY
                  </p>
                  <p className="font-body text-xs text-silver-dim leading-relaxed">
                    A deliberate reconstruction. The letters are taken — the meaning is not. It represents the highest standard of trust a firm can earn from its clients. Not promised. Not marketed. Proven through every decision.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
