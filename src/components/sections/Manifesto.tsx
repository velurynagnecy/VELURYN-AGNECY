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
    tag: 'Digital Management',
    short: 'VA Mgmt',
    full: 'Veluryn Agnecy Management',
    desc: 'Full-service digital management. Campaign strategy, brand scaling, and performance reporting executed with strict institutional discipline.',
    href: '/va-mgmt',
  },
  {
    tag: 'Trust Infrastructure',
    short: 'VASD',
    full: 'Veluryn Agnecy Service Digital',
    desc: 'Entity verification and threat intelligence infrastructure. A rigorous multi-layer assessment framework for identifying structural risk.',
    href: '/vasd',
  },
]

export function Manifesto() {
  return (
    <section id="about" className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <Reveal className="flex items-center gap-4 mb-14">
          <div className="h-px w-10 bg-gray-300" />
          <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
            Agency Overview
          </span>
        </Reveal>

        {/* Two-column overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <Reveal>
            <h2 className="font-body font-semibold text-gray-900 mb-6 text-3xl md:text-4xl leading-tight tracking-tight">
              An intelligence and digital operations agency built on radical transparency.
            </h2>
            <p className="font-body text-base text-gray-600 leading-relaxed">
              VELURYN AGNECY is a remote-first global organisation headquartered in Asia. We operate across two distinct divisions — digital management and trust infrastructure — delivering measurable results under a single corporate standard: evidence over optics.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-l-2 border-gray-100 pl-8 h-full flex flex-col justify-center">
              <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 mb-2 font-bold">Corporate Mission</p>
              <p className="font-body text-sm font-medium text-gray-800 leading-relaxed mb-8">
                To establish structural integrity in digital commerce by providing the frameworks that replace assumption with verifiable evidence.
              </p>
              
              <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 mb-2 font-bold">Founding Principle</p>
              <p className="font-body text-lg font-semibold text-[#0F3B68] italic tracking-tight">
                &ldquo;Trust First. Everything Follows.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core Principles */}
        <Reveal>
          <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 mb-6 font-bold border-b border-gray-200 pb-2">Operational Standards</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {principles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="h-full">
                <p className="font-body text-xs font-bold text-[#0F3B68] mb-3">{p.id}</p>
                <h3 className="font-body text-base font-semibold text-gray-900 mb-3">{p.title}</h3>
                <p className="font-body text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Operating Divisions */}
        <Reveal>
          <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 mb-6 font-bold border-b border-gray-200 pb-2">Core Divisions</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((d, i) => (
            <Reveal key={d.short} delay={i * 0.1}>
              <a
                href={d.href}
                className="block p-8 border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-[0.65rem] tracking-[0.1em] uppercase font-bold text-gray-900">
                    {d.full}
                  </span>
                  <span className="font-body text-xs font-semibold text-[#0F3B68] bg-[#EBF1F7] px-3 py-1 rounded-sm">
                    {d.short}
                  </span>
                </div>
                <h4 className="font-body text-lg font-semibold text-gray-900 mb-3">{d.tag}</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">{d.desc}</p>
              </a>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
