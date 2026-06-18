'use client'

import Link from 'next/link'
import { Megaphone, Mail, PenTool, Share2, Shield, Newspaper, UserCheck, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
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

export function Services() {
  return (
    <section id="services" className="relative bg-charcoal border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <Reveal className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-silver-dim" />
              <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim font-medium">
                Service Architecture
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-platinum" style={sectionHeadingStyle}>
                Comprehensive Capabilities.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:text-right">
            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-sm lg:ml-auto mb-6">
              Seven distinct disciplines deployed across two vertical operations. We execute with precision and report with radical transparency.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:justify-end">
              <span className="flex items-center gap-2 font-body text-[0.6rem] tracking-widest uppercase text-platinum font-semibold">
                <span className="w-4 h-px bg-platinum inline-block" /> VA Mgmt
              </span>
              <span className="flex items-center gap-2 font-body text-[0.6rem] tracking-widest uppercase text-steel-blue font-semibold">
                <span className="w-4 h-px bg-steel-blue inline-block" /> VASD
              </span>
            </div>
          </Reveal>
        </div>

        <div className="border border-[rgba(200,200,220,0.07)]" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          {services.map(({ n, icon: Icon, title, arm, armColor, desc }, i) => (
            <div
              key={title}
              className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 bg-charcoal-2 hover:bg-charcoal-3 transition-colors ${i < services.length - 1 ? 'border-b border-[rgba(200,200,220,0.05)]' : ''}`}
            >
              <div className="flex items-center gap-4 shrink-0 md:w-48">
                <span className="font-body text-[0.6rem] text-silver-dim/60 w-5 tabular-nums">{n}</span>
                <Icon size={16} strokeWidth={1.5} className="text-silver-dim group-hover:text-platinum transition-colors" />
                <h3 className="font-body text-xs tracking-[0.08em] uppercase text-silver group-hover:text-platinum transition-colors font-medium">
                  {title}
                </h3>
              </div>

              <p className="font-body text-xs text-silver-dim leading-relaxed flex-1 md:pl-6 md:border-l border-[rgba(200,200,220,0.05)]">
                {desc}
              </p>

              <div className="shrink-0 flex items-center justify-between md:justify-end gap-6 mt-2 md:mt-0">
                <span
                  className="font-body text-[0.58rem] tracking-[0.2em] uppercase font-bold px-2.5 py-1"
                  style={{
                    color: armColor,
                    background: `${armColor}12`,
                    border: `1px solid ${armColor}30`,
                    borderRadius: '3px'
                  }}
                >
                  {arm}
                </span>
                <ArrowRight size={14} className="text-[rgba(200,200,220,0.1)] group-hover:text-silver-dim transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-12">
          <p className="font-body text-sm text-silver-dim">
            Not sure which architecture fits your needs?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 font-body text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-charcoal bg-platinum px-6 py-3 hover:bg-silver transition-colors"
            style={{ borderRadius: '3px' }}
          >
            Request Consultation
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
