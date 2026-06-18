'use client'

import { Download, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

type CaseStudy = {
  id: string
  title: string
  vector: string
  scope: string
  findings: string[]
  verdict: 'Fraudulent Activity' | 'Verified Entity'
  date: string
  pdfUrl: string
}

const scamStudies: CaseStudy[] = [
  {
    id: 'TR-24-001',
    title: 'Clifford Agency Scam',
    vector: 'Impersonation / Advance Fee',
    scope: 'Email Communications & Identity',
    findings: [
      'Email originated from unverified free domain',
      'Contact names cross-referenced to stolen identities',
      'No verifiable corporate registration found',
    ],
    verdict: 'Fraudulent Activity',
    date: '2024.10',
    pdfUrl: '/case-studies/VASD_Trust_Factor_Analysis_Clifford_Agency.pdf',
  },
  {
    id: 'TR-24-002',
    title: 'Sponsorship Phishing Network',
    vector: 'Mass Phishing Campaign',
    scope: 'Domain Infrastructure & Incentive Structure',
    findings: [
      'Domains registered < 30 days prior to contact',
      'Artificial urgency applied to contract signing',
      'Identical infrastructure used across 14 "brands"',
    ],
    verdict: 'Fraudulent Activity',
    date: '2024.11',
    pdfUrl: '/case-studies/VASD_Trust_Factor_Analysis_Sponsorship_Scam.pdf',
  },
  {
    id: 'TR-24-003',
    title: 'Fake Influencer Agency',
    vector: 'Credential Inflation / Identity Theft',
    scope: 'Corporate Footprint & Reputation',
    findings: [
      'Stolen case studies presented as original work',
      'CEO identity verified as non-existent persona',
      'Payment routed through non-corporate channels',
    ],
    verdict: 'Fraudulent Activity',
    date: '2024.12',
    pdfUrl: '/case-studies/VASD_Trust_Factor_Analysis_Fake_Agency.pdf',
  },
]

const verifiedStudies: CaseStudy[] = [
  {
    id: 'TV-24-001',
    title: 'Zoona AI',
    vector: 'Corporate Identity Validation',
    scope: 'Complete Entity Verification',
    findings: [
      'Corporate registration verified and active',
      'Domain infrastructure mature and secured',
      'Leadership identity cross-platform consistent',
    ],
    verdict: 'Verified Entity',
    date: '2024.12',
    pdfUrl: '/case-studies/VASD_Trust_Factor_Analysis_Zoona_AI(2).pdf',
  },
]

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const isFraud = study.verdict === 'Fraudulent Activity'

  return (
    <div className="flex flex-col border border-[rgba(200,200,220,0.08)] bg-charcoal-2 transition-colors hover:bg-charcoal-3" style={{ borderRadius: '4px' }}>
      
      {/* Card Header */}
      <div className="p-6 border-b border-[rgba(200,200,220,0.06)] flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim font-semibold">{study.id}</span>
            <span className="w-1 h-1 rounded-full bg-[rgba(200,200,220,0.15)]" />
            <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">{study.date}</span>
          </div>
          <h3 className="font-body text-lg font-semibold text-platinum mb-1">{study.title}</h3>
        </div>
        
        <div
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 border font-body text-[0.6rem] uppercase tracking-wider font-semibold rounded-sm ${
            isFraud
              ? 'bg-[rgba(220,38,38,0.05)] border-[rgba(220,38,38,0.2)] text-red-400'
              : 'bg-[rgba(16,185,129,0.05)] border-[rgba(16,185,129,0.2)] text-emerald-400'
          }`}
        >
          {isFraud ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
          {study.verdict}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1 font-semibold">Investigation Vector</p>
            <p className="font-body text-xs text-silver">{study.vector}</p>
          </div>
          <div>
            <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1 font-semibold">Assessment Scope</p>
            <p className="font-body text-xs text-silver">{study.scope}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-3 font-semibold">Key Findings</p>
          <ul className="flex flex-col gap-2">
            {study.findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isFraud ? 'bg-red-400/50' : 'bg-emerald-400/50'}`} />
                <span className="font-body text-xs text-silver-dim leading-snug">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action */}
        <div className="mt-auto pt-6 border-t border-[rgba(200,200,220,0.06)]">
          <a
            href={study.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between font-body text-xs text-silver hover:text-platinum transition-colors"
          >
            <span className="tracking-[0.1em] uppercase font-semibold">Download Full Report</span>
            <div className="w-8 h-8 flex items-center justify-center bg-[rgba(200,200,220,0.05)] group-hover:bg-[rgba(200,200,220,0.1)] transition-colors rounded-sm">
              <Download size={14} />
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}

export function CaseStudies() {
  return (
    <section className="bg-charcoal pt-32 pb-24 min-h-screen border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <Reveal className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-steel-blue" />
            <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-steel-blue font-medium">
              Intelligence Reports
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-body font-semibold text-platinum mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              VASD Trust Verdicts
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-sm text-silver-dim leading-relaxed">
              Public intelligence reports resulting from our multi-layer entity assessments. These executive briefings detail the scope, investigation vector, and key findings that inform our final trust verdict.
            </p>
          </Reveal>
        </div>

        {/* Section: Threat Intelligence */}
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-body text-lg font-semibold text-platinum uppercase tracking-widest">Threat Intelligence</h2>
            <div className="h-px flex-1 bg-[rgba(200,200,220,0.06)]" />
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {scamStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Section: Verified Entities */}
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-body text-lg font-semibold text-platinum uppercase tracking-widest">Voluntary Trust Verification</h2>
            <div className="h-px flex-1 bg-[rgba(200,200,220,0.06)]" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {verifiedStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal>
          <div className="border border-[rgba(200,200,220,0.07)] bg-charcoal-2 p-10 flex flex-col md:flex-row md:items-center justify-between gap-8" style={{ borderRadius: '4px' }}>
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-steel-blue mb-2 font-semibold">
                Entity Assessment
              </p>
              <h3 className="font-body text-[1.2rem] font-semibold text-platinum mb-2">
                Need to verify an entity?
              </h3>
              <p className="font-body text-xs text-silver-dim max-w-md leading-relaxed">
                Contact our intelligence team to initiate a structural assessment of a partner, vendor, or agency before committing to a contract.
              </p>
            </div>
            <a
              href="/#contact"
              className="shrink-0 inline-flex items-center gap-2 font-body text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-charcoal bg-platinum px-6 py-3 hover:bg-silver transition-colors"
              style={{ borderRadius: '3px' }}
            >
              Initiate Assessment
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
