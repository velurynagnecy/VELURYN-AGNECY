'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

const services = [
  { n: '01', title: 'Marketing & Advertising', arm: 'VA Mgmt', desc: 'Full-funnel marketing campaigns — paid, organic, and influencer-led.' },
  { n: '02', title: 'Email Filtering & Protection', arm: 'VASD', desc: 'AI-powered email filtering, threat detection, and inbox management for individuals and enterprises.' },
  { n: '03', title: 'Branding & Identity', arm: 'VA Mgmt', desc: 'Brand systems that last. Strategy, identity, and guidelines.' },
  { n: '04', title: 'Social Media Management', arm: 'VA Mgmt', desc: 'Content, community, and consistency across every platform.' },
  { n: '05', title: 'Inbox Security & Compliance', arm: 'VASD', desc: 'End-to-end encryption, phishing protection, and compliance across GDPR, HIPAA, and SOC2.' },
  { n: '06', title: 'PR & Communications', arm: 'VA Mgmt', desc: 'Media relations, press strategy, and crisis communications.' },
  { n: '07', title: 'Influencer Marketing', arm: 'VA Mgmt', desc: 'End-to-end influencer campaign management with audited talent.' },
]

export function Services() {
  return (
    <section id="services" className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <Reveal className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-gray-300" />
              <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
                Operational Scope
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-body text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                Comprehensive Capabilities.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:text-right">
            <p className="font-body text-base text-gray-600 leading-relaxed max-w-lg lg:ml-auto mb-6">
              Seven distinct disciplines deployed across two vertical operations. We execute with precision and report with radical transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:justify-end">
              <span className="flex items-center gap-3 font-body text-xs tracking-[0.1em] uppercase text-gray-900 font-bold">
                <span className="w-3 h-3 bg-[#EBF1F7] border border-[#0F3B68] rounded-sm inline-block" /> VA Mgmt
              </span>
              <span className="flex items-center gap-3 font-body text-xs tracking-[0.1em] uppercase text-gray-900 font-bold">
                <span className="w-3 h-3 bg-[#0F3B68] border border-[#0F3B68] rounded-sm inline-block" /> VASD
              </span>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-gray-200">
          {services.map(({ n, title, arm, desc }, i) => (
            <div
              key={title}
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6 shrink-0 md:w-64 pl-4 md:pl-6">
                <span className="font-body text-xs font-bold text-gray-400 w-6 tabular-nums">{n}</span>
                <h3 className="font-body text-sm font-bold text-gray-900">
                  {title}
                </h3>
              </div>

              <p className="font-body text-sm text-gray-600 leading-relaxed flex-1 pr-4">
                {desc}
              </p>

              <div className="shrink-0 flex items-center justify-between md:justify-end gap-8 pr-4 md:pr-6 mt-2 md:mt-0">
                <span
                  className="font-body text-[0.65rem] tracking-[0.1em] uppercase font-bold px-3 py-1 rounded-sm"
                  style={{
                    color: arm === 'VASD' ? '#fff' : '#0F3B68',
                    backgroundColor: arm === 'VASD' ? '#0F3B68' : '#EBF1F7',
                    border: `1px solid ${arm === 'VASD' ? '#0F3B68' : '#D1D5DB'}`
                  }}
                >
                  {arm}
                </span>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-16 bg-gray-50 p-8 border border-gray-200">
          <div>
            <p className="font-body text-sm font-bold text-gray-900 mb-1">
              Determine operational alignment.
            </p>
            <p className="font-body text-sm text-gray-600">
              Not sure which division fits your enterprise needs?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-white bg-[#0F3B68] px-8 py-3.5 hover:bg-[#1E4D82] transition-colors rounded-sm"
          >
            Request Consultation
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
