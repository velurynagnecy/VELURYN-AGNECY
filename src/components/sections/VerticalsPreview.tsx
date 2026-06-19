'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

const verticals = [
  {
    href: '/va-mgmt',
    label: 'Division 01',
    tag: 'Digital Management',
    short: 'VA Mgmt',
    title: 'Veluryn Agnecy Management',
    desc: 'Influencer marketing and digital management executed with discipline. We deliver strategy, talent validation, and performance reporting without inflated metrics.',
    accentColor: '#1E4D82',
    cta: 'Explore VA Mgmt',
  },
  {
    href: '/vasd',
    label: 'Division 02',
    tag: 'Trust Infrastructure',
    short: 'VASD',
    title: 'Veluryn Agnecy Service Digital',
    desc: 'Enterprise trust intelligence and verification infrastructure. We deliver structured evaluations of entity legitimacy, threat protection, and digital security.',
    accentColor: '#0F3B68',
    cta: 'Explore VASD',
  },
]

export function VerticalsPreview() {
  return (
    <section id="verticals" className="relative bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        {/* Header */}
        <Reveal className="flex items-center gap-4 mb-14">
          <div className="h-px w-10 bg-gray-300" />
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
            Operational Structure
          </span>
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-end">
          <Reveal delay={0.06}>
            <h2 className="font-body text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
              Two divisions. One standard.
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="lg:text-right">
            <p className="font-body text-base text-gray-600 max-w-lg lg:ml-auto leading-relaxed">
              Every operation falls under one of two structured divisions. Both are built entirely on the foundation of radical transparency and evidence-based reporting.
            </p>
          </Reveal>
        </div>

        {/* Verticals Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {verticals.map((v, i) => (
            <Reveal key={v.href} delay={i * 0.1}>
              <div className="group flex flex-col justify-between p-10 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow h-full" style={{ borderRadius: '2px' }}>
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <span className="font-body text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {v.label}
                    </span>
                    <span className="font-body text-xs font-semibold text-[#0F3B68] bg-[#EBF1F7] px-3 py-1 rounded-sm">
                      {v.short}
                    </span>
                  </div>

                  <h3 className="font-body text-xl font-bold text-gray-900 mb-4">{v.title}</h3>
                  <p className="font-body text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">{v.tag}</p>
                  <p className="font-body text-base text-gray-600 leading-relaxed mb-12 max-w-sm">{v.desc}</p>
                </div>

                <Link
                  href={v.href}
                  className="inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest transition-colors w-max text-[#0F3B68] hover:text-[#1E4D82]"
                >
                  {v.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
