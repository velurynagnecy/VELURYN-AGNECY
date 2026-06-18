'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle } from '@/lib/typography'

const verticals = [
  {
    href: '/va-mgmt',
    label: 'Service Vertical 01',
    tag: 'VA Mgmt',
    title: 'Veluryn Agnecy Management',
    desc: 'Influencer marketing and talent management executed with discipline. We deliver campaign strategy, talent scouting, and performance reporting without inflated metrics.',
    accentClass: 'bg-platinum',
    accentColor: '#E8E8F0',
    cta: 'Explore VA Mgmt',
  },
  {
    href: '/vasd',
    label: 'Service Vertical 02',
    tag: 'VASD',
    title: 'Veluryn Agnecy Service Digital',
    desc: 'Enterprise trust intelligence and verification infrastructure. We deliver structured evaluations of entity legitimacy, threat protection, and digital security.',
    accentClass: 'bg-steel-blue',
    accentColor: '#4A6580',
    cta: 'Explore VASD',
  },
]

export function VerticalsPreview() {
  return (
    <section id="verticals" className="relative bg-charcoal border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        
        {/* Header */}
        <Reveal className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-silver-dim" />
          <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim font-medium">
            Our Verticals
          </span>
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-end">
          <Reveal delay={0.06}>
            <h2 className="text-platinum" style={sectionHeadingStyle}>
              Two disciplines. One standard.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:text-right">
            <p className="font-body text-sm text-silver-dim max-w-sm lg:ml-auto leading-relaxed">
              Every operation falls under one of two structured verticals. Both are built entirely on the foundation of radical transparency and evidence-based reporting.
            </p>
          </Reveal>
        </div>

        {/* Verticals Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {verticals.map((v, i) => (
            <Reveal key={v.href} delay={i * 0.1}>
              <div
                className="group flex flex-col justify-between p-8 border border-[rgba(200,200,220,0.07)] bg-charcoal-2 hover:bg-charcoal-3 transition-colors h-full"
                style={{ borderRadius: '4px' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim font-semibold">
                      {v.label}
                    </span>
                    <span
                      className="font-body text-[0.6rem] tracking-[0.2em] uppercase font-bold px-2.5 py-1"
                      style={{
                        color: v.accentColor,
                        background: `${v.accentColor}12`,
                        border: `1px solid ${v.accentColor}30`,
                        borderRadius: '3px'
                      }}
                    >
                      {v.tag}
                    </span>
                  </div>

                  <h3 className="font-body text-xl font-semibold text-platinum mb-4">{v.title}</h3>
                  <p className="font-body text-sm text-silver-dim leading-relaxed mb-10 max-w-sm">{v.desc}</p>
                </div>

                <Link
                  href={v.href}
                  className="inline-flex items-center gap-2 font-body text-[0.65rem] tracking-[0.22em] uppercase font-semibold transition-colors w-max"
                  style={{ color: v.accentColor }}
                >
                  {v.cta}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
