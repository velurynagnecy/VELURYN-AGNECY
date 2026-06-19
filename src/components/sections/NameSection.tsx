'use client'

import { ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

export function NameSection() {
  return (
    <section id="name" className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-14">
          <div className="h-px w-10 bg-gray-300" />
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
            Corporate Identity
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left — the name displayed formally */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="border border-gray-200 p-8 bg-gray-50" style={{ borderRadius: '2px' }}>
                <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 mb-6 font-bold">Registered Entity</p>
                
                {/* VELURYN */}
                <p className="font-body font-bold text-gray-900 leading-none mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                  VELURYN
                </p>

                {/* AGNECY */}
                <p className="font-body font-bold leading-none mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}>
                  <span className="text-gray-900">AG</span>
                  <span className="text-[#0F3B68]">N</span>
                  <span className="text-gray-900">E</span>
                  <span className="text-[#0F3B68]">C</span>
                  <span className="text-gray-900">Y</span>
                </p>

                {/* Not a typo badge */}
                <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-2.5" style={{ borderRadius: '2px' }}>
                  <ShieldCheck size={14} className="text-[#0F3B68]" />
                  <span className="font-body text-[0.65rem] tracking-[0.1em] uppercase text-gray-900 font-semibold">
                    Intentional Structural Anagram
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — the explanation */}
          <div className="lg:col-span-7 flex flex-col">
            
            <Reveal delay={0.06}>
              <h2 className="font-body text-2xl md:text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
                Built to hold a specific reputation.
              </h2>
            </Reveal>
            
            <Reveal delay={0.12}>
              <p className="font-body text-base text-gray-600 leading-relaxed max-w-2xl mb-12">
                A corporate identity should be owned entirely. We rejected the standard dictionary spelling because &ldquo;Agency&rdquo; describes a common function, not an identity. A dictionary word carries inherited meaning; a constructed name carries only the reputation earned by the firm.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Block 1 — VELURYN */}
              <Reveal delay={0.18}>
                <div className="h-full border-t border-gray-200 pt-6">
                  <p className="font-body text-sm text-gray-900 mb-3 font-bold">
                    VELURYN
                  </p>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
                    A constructed word carrying no prior meaning, inherited association, or borrowed identity. It was designed to hold whatever reputation the work builds into it. Every meaning VELURYN has, it earned through execution.
                  </p>
                </div>
              </Reveal>

              {/* Block 2 — What AGNECY means */}
              <Reveal delay={0.24}>
                <div className="h-full border-t border-gray-200 pt-6">
                  <p className="font-body text-sm text-gray-900 mb-3 font-bold">
                    AGNECY
                  </p>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">
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
