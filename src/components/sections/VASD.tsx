'use client'

import { Shield, Search, Database, Lock, ArrowRight, Eye, CheckCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle } from '@/lib/typography'

const coreLayers = [
  {
    num: 'L1',
    title: 'Initial Screening',
    desc: 'Automated and manual extraction of core identifiers from incoming communication.',
    points: ['Email authenticity (SPF, DKIM, DMARC)', 'Domain registration maturity', 'Public contact consistency'],
  },
  {
    num: 'L2',
    title: 'Entity Validation',
    desc: 'Cross-referencing stated identity against public, corporate, and operational footprints.',
    points: ['Corporate registry validation', 'Brand consistency checks', 'Cross-platform presence'],
  },
  {
    num: 'L3',
    title: 'Intelligence Analysis',
    desc: 'Behavioral analysis designed to detect sophisticated manipulation and impersonation.',
    points: ['Incentive structure review', 'Urgency & pressure tactics', 'Credential inflation detection'],
  },
  {
    num: 'L4',
    title: 'Final Classification',
    desc: 'Synthesis of all signals into a formal, actionable security posture determination.',
    points: ['Trust Verdict', 'Suspicious Activity Flag', 'High-Risk Block'],
  },
]

export function VASD() {
  return (
    <section className="bg-charcoal pt-32 pb-24 border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-24">
          <Reveal className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-steel-blue" />
            <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-steel-blue font-medium">
              Veluryn Agnecy Service Digital
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-platinum mb-6" style={sectionHeadingStyle}>
              Trust Intelligence & Entity Verification Infrastructure.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-base text-silver-dim leading-relaxed">
              VASD operates as a structured multi-layer assessment system. We help founders, investors, agencies, and enterprise clients evaluate entities and communications before entering business relationships. Trust should be validated through evidence, not assumed through presentation.
            </p>
          </Reveal>
        </div>

        {/* ── Multi-Layer Framework ─────────────────────────────────────── */}
        <Reveal>
          <h2 className="font-body text-[1.1rem] text-platinum font-semibold mb-8">
            The Assessment Methodology
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
          {coreLayers.map((layer, i) => (
            <Reveal key={layer.num} delay={i * 0.08}>
              <div className="p-8 border border-[rgba(200,200,220,0.07)] bg-charcoal-2 h-full" style={{ borderRadius: '4px' }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 bg-[rgba(74,101,128,0.15)] border border-[rgba(74,101,128,0.3)] text-steel-blue font-body text-[0.6rem] font-bold tracking-widest rounded-sm">
                    {layer.num}
                  </span>
                  <h3 className="font-body text-sm font-semibold text-platinum uppercase tracking-wider">{layer.title}</h3>
                </div>
                <p className="font-body text-xs text-silver-dim leading-relaxed mb-6 h-10">
                  {layer.desc}
                </p>
                <ul className="flex flex-col gap-2">
                  {layer.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="mt-1 w-1 h-1 rounded-full bg-steel-blue shrink-0" />
                      <span className="font-body text-xs text-silver leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Operational Principles ────────────────────────────────────── */}
        <div className="border-t border-[rgba(200,200,220,0.06)] pt-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Reveal>
                <h2 className="font-body text-[1.1rem] text-platinum font-semibold mb-4">
                  Operational Principles
                </h2>
                <p className="font-body text-xs text-silver-dim leading-relaxed">
                  VASD assessments are executed under a strict set of operational directives to ensure neutrality and accuracy.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              <Reveal delay={0.1}>
                <Shield size={16} className="text-steel-blue mb-4" />
                <h4 className="font-body text-xs font-semibold text-platinum uppercase tracking-widest mb-2">Absolute Verification</h4>
                <p className="font-body text-xs text-silver-dim leading-relaxed">
                  Every claim is verified against independent public or private records. Internal documentation is considered secondary to external proof.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <Eye size={16} className="text-steel-blue mb-4" />
                <h4 className="font-body text-xs font-semibold text-platinum uppercase tracking-widest mb-2">Neutral Execution</h4>
                <p className="font-body text-xs text-silver-dim leading-relaxed">
                  Assessments are conducted without prejudice. Findings are documented factually without prescriptive emotional language.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Database size={16} className="text-steel-blue mb-4" />
                <h4 className="font-body text-xs font-semibold text-platinum uppercase tracking-widest mb-2">Evidence Preservation</h4>
                <p className="font-body text-xs text-silver-dim leading-relaxed">
                  All signal sources are documented, archived, and referenced within the final intelligence report.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Lock size={16} className="text-steel-blue mb-4" />
                <h4 className="font-body text-xs font-semibold text-platinum uppercase tracking-widest mb-2">Strict Confidentiality</h4>
                <p className="font-body text-xs text-silver-dim leading-relaxed">
                  For private client assessments, the identity of the target entity and the client remains strictly under NDA.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── Case Studies Banner ───────────────────────────────────────── */}
        <Reveal>
          <div className="border border-[rgba(200,200,220,0.07)] bg-charcoal-2 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8" style={{ borderRadius: '4px' }}>
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-steel-blue mb-2 font-semibold">
                Intelligence Reports
              </p>
              <h3 className="font-body text-[1.4rem] font-semibold text-platinum mb-2">
                VASD Trust Verdicts
              </h3>
              <p className="font-body text-xs text-silver-dim max-w-lg leading-relaxed">
                Review our public intelligence reports, covering Threat Intelligence on unsolicited scams and Voluntary Trust Assessments of verified entities.
              </p>
            </div>
            <a
              href="/case-studies"
              className="shrink-0 inline-flex items-center gap-2 font-body text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-charcoal bg-platinum px-6 py-3 hover:bg-silver transition-colors"
              style={{ borderRadius: '3px' }}
            >
              View Reports
              <ArrowRight size={13} />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
