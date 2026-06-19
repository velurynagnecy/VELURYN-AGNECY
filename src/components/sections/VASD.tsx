'use client'

import { Shield, Search, Database, Lock, ArrowRight, Eye, CheckCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

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
    <section className="bg-white pt-32 pb-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-24">
          <Reveal className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-gray-300" />
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
              Division: VASD
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-body text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-8">
              Trust Intelligence & Entity Verification Infrastructure.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-lg text-gray-600 leading-relaxed">
              VASD operates as a structured multi-layer assessment system. We help founders, investors, agencies, and enterprise clients evaluate entities and communications before entering business relationships. Trust should be validated through evidence, not assumed through presentation.
            </p>
          </Reveal>
        </div>

        {/* ── Multi-Layer Framework ─────────────────────────────────────── */}
        <Reveal>
          <h2 className="font-body text-xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
            Assessment Methodology
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {coreLayers.map((layer, i) => (
            <Reveal key={layer.num} delay={i * 0.08}>
              <div className="p-8 border border-gray-200 bg-gray-50 h-full rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#EBF1F7] border border-[#0F3B68] text-[#0F3B68] font-body text-xs font-bold rounded-sm">
                    {layer.num}
                  </span>
                  <h3 className="font-body text-base font-bold text-gray-900 tracking-tight">{layer.title}</h3>
                </div>
                <p className="font-body text-sm text-gray-600 leading-relaxed mb-8 h-10">
                  {layer.desc}
                </p>
                <ul className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  {layer.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0F3B68] shrink-0" />
                      <span className="font-body text-sm font-medium text-gray-700 leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Operational Principles ────────────────────────────────────── */}
        <div className="border-t border-gray-200 pt-20 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <Reveal>
                <h2 className="font-body text-xl font-bold text-gray-900 mb-4">
                  Operational Directives
                </h2>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  VASD assessments are executed under a strict set of operational directives to ensure institutional neutrality and accuracy.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              <Reveal delay={0.1}>
                <Shield size={20} className="text-[#0F3B68] mb-4" />
                <h4 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Absolute Verification</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  Every claim is verified against independent public or private records. Internal documentation is considered secondary to external proof.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <Eye size={20} className="text-[#0F3B68] mb-4" />
                <h4 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Neutral Execution</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  Assessments are conducted without prejudice. Findings are documented factually without prescriptive emotional language.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <Database size={20} className="text-[#0F3B68] mb-4" />
                <h4 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Evidence Preservation</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  All signal sources are documented, archived, and referenced within the final intelligence report.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <Lock size={20} className="text-[#0F3B68] mb-4" />
                <h4 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Strict Confidentiality</h4>
                <p className="font-body text-sm text-gray-600 leading-relaxed">
                  For private client assessments, the identity of the target entity and the client remains strictly under NDA.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ── Case Studies Banner ───────────────────────────────────────── */}
        <Reveal>
          <div className="border border-gray-300 bg-gray-50 p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-10 rounded-sm">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Intelligence Reports
              </p>
              <h3 className="font-body text-2xl font-bold text-gray-900 mb-3">
                VASD Trust Verdicts
              </h3>
              <p className="font-body text-sm text-gray-600 max-w-xl leading-relaxed">
                Review our public intelligence reports, covering Threat Intelligence on unsolicited scams and Voluntary Trust Assessments of verified entities.
              </p>
            </div>
            <a
              href="/case-studies"
              className="shrink-0 inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-widest text-white bg-[#0F3B68] px-8 py-4 hover:bg-[#1E4D82] transition-colors rounded-sm"
            >
              View Reports
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
