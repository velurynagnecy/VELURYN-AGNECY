'use client'

import { Shield, Search, Database, Lock, ArrowRight, Eye, CheckCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'


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
              VASD is the trust verdict for brands and creators.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-lg text-gray-800 leading-relaxed font-medium mb-6">
              Before you sign a contract or send payment, we evaluate and verify the credibility, legitimacy, and trustworthiness of the brand, creator, agency, or vendor on the other side.
            </p>
            <p className="font-body text-base text-gray-600 leading-relaxed">
              VASD operates as a structured multi-layer assessment system. We help founders, investors, agencies, and enterprise clients evaluate entities and communications before entering business relationships. Trust should be validated through evidence, not assumed through presentation.
            </p>
          </Reveal>
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



      </div>
    </section>
  )
}
