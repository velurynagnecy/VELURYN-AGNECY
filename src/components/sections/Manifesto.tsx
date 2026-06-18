'use client'

import { Reveal } from '@/components/motion/Reveal'

const principles = [
  {
    id: '01',
    title: 'Evidence First',
    desc: 'Every claim, partnership, and assessment is evaluated on verifiable evidence, not reputation or assumption.',
  },
  {
    id: '02',
    title: 'Structural Consistency',
    desc: 'Business identity must be consistent across all surfaces — digital, operational, and reputational.',
  },
  {
    id: '03',
    title: 'Transparent Execution',
    desc: 'No inflated metrics. No hidden fees. No vanity reporting. Honest delivery at every engagement.',
  },
]

const divisions = [
  {
    tag: 'VA Mgmt',
    color: '#E8E8F0',
    borderColor: 'rgba(232,232,240,0.15)',
    full: 'Veluryn Agnecy Management',
    desc: 'Full-service talent and influencer marketing. Campaign strategy, talent scouting, and performance reporting without inflated numbers.',
    href: '/va-mgmt',
  },
  {
    tag: 'VASD',
    color: '#4A6580',
    borderColor: 'rgba(74,101,128,0.3)',
    full: 'Veluryn Agnecy Service Digital',
    desc: 'Trust intelligence and entity verification infrastructure. Multi-layer assessment framework for founders, investors, and organisations.',
    href: '/vasd',
  },
]

export function Manifesto() {
  return (
    <section id="about" className="relative bg-charcoal border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">

        {/* Header */}
        <Reveal className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-silver-dim" />
          <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim font-medium">
            Company Overview
          </span>
        </Reveal>

        {/* Two-column overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Reveal>
            <h2
              className="font-body font-semibold text-platinum mb-5"
              style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}
            >
              A trust intelligence and digital services firm built on radical transparency.
            </h2>
            <p className="font-body text-sm text-silver-dim leading-relaxed">
              VELURYN AGNECY is a remote-first global organisation headquartered in Asia. We operate across two verticals — digital services management and trust infrastructure — delivering measurable results under a single standard: honesty over optics.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-l border-[rgba(200,200,220,0.08)] pl-8">
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-4 font-semibold">Mission</p>
              <p className="font-body text-sm text-silver leading-relaxed mb-6">
                To make every business relationship more trustworthy by providing the tools, assessments, and frameworks that replace assumption with evidence.
              </p>
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-3 font-semibold">Founding Principle</p>
              <p className="font-body text-sm font-semibold text-platinum">
                &ldquo;Trust First. Everything Follows.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core Principles */}
        <Reveal>
          <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim mb-6 font-semibold">Core Principles</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[rgba(200,200,220,0.07)] mb-16" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          {principles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className={`p-6 h-full ${i < principles.length - 1 ? 'border-b md:border-b-0 md:border-r border-[rgba(200,200,220,0.07)]' : ''}`}>
                <p className="font-body text-[0.58rem] tracking-[0.2em] uppercase text-steel-blue mb-3 font-semibold">{p.id}</p>
                <p className="font-body text-sm font-semibold text-platinum mb-2">{p.title}</p>
                <p className="font-body text-xs text-silver-dim leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Operating Divisions */}
        <Reveal>
          <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim mb-6 font-semibold">Operating Divisions</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {divisions.map((d, i) => (
            <Reveal key={d.tag} delay={i * 0.07}>
              <a
                href={d.href}
                className="block p-6 border bg-charcoal-2 hover:bg-charcoal-3 transition-colors group"
                style={{ borderColor: d.borderColor, borderRadius: '4px' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-body text-[0.6rem] tracking-[0.2em] uppercase font-bold px-2.5 py-1"
                    style={{ color: d.color, background: `${d.color}12`, border: `1px solid ${d.borderColor}`, borderRadius: '3px' }}
                  >
                    {d.tag}
                  </span>
                  <p className="font-body text-[0.6rem] text-silver-dim uppercase tracking-[0.15em]">{d.full}</p>
                </div>
                <p className="font-body text-sm text-silver-dim leading-relaxed">{d.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
