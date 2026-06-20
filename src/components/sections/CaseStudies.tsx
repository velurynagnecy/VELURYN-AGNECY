'use client'

import { Download, AlertTriangle, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

type CaseStudy = {
  id: string
  title: string
  vector: string
  scope: string
  findings: string[]
  verdict: 'Fraudulent Activity' | 'Verified Entity' | 'Suspicious' | 'High Risk' | 'Trusted'
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
    pdfUrl: '/case-studies/VASD_Case001.pdf',
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
    pdfUrl: '/case-studies/VASD_Case002.pdf',
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
    pdfUrl: '/case-studies/VASD_Case003.pdf',
  },
  {
    id: 'TR-26-001',
    title: 'Leadership & Coaching Platform',
    vector: 'Unsolicited Email Outreach',
    scope: 'Validation & Authentication Signal Detection',
    findings: [
      'Nation count contradicts itself within its own domain',
      'Accreditations claims not independently verified',
      'Testimonials follow pattern inconsistent with organic review behavior',
      'Founder credentials stated but not externally supported',
      'Mentor holds a title commercially purchased, not independently conferred'
    ],
    verdict: 'Suspicious',
    date: '2026.05',
    pdfUrl: '/case-studies/VASD_Case004_Suspicious.pdf',
  },
  {
    id: 'TR-26-002',
    title: 'Zoho Billing Impersonation',
    vector: 'Inbound Phishing Email',
    scope: 'Digital Infrastructure / SaaS',
    findings: [
      'Sender domain has no verifiable connection to Zoho Corporation',
      'Domain registered 24 hours prior to email delivery',
      'Billing CTA routes through a shortened URL to conceal final destination',
      'Urgency-engineered language threatening service disruption',
      'Grammar anomalies inconsistent with corporate editorial standards'
    ],
    verdict: 'High Risk',
    date: '2026.06',
    pdfUrl: '/case-studies/VASD_Case007.pdf',
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
    pdfUrl: '/case-studies/VASD_Trust_Factor_Analysis_Zoona_AI.pdf',
  },
]

const agencyTrustStudies: CaseStudy[] = [
  {
    id: 'TV-26-001',
    title: 'Viral Nation',
    vector: 'Agency Trust Validation',
    scope: 'Independent Operational Verification',
    findings: [
      'Independent assessment conducted without entity consent or commissioning',
      'Corporate registration and agency track record verified via public intelligence',
      'Client rosters and talent representation cross-checked',
      'Operational footprint and scale authenticated',
    ],
    verdict: 'Verified Entity',
    date: '2026.06',
    pdfUrl: '/case-studies/VASD_ViralNation_Trust_Assessment.pdf',
  },
]


const independentStudies: CaseStudy[] = [
  {
    id: 'TV-001',
    title: 'Tesla, Inc.',
    vector: 'Independent Trust Assessment',
    scope: 'Public presence only',
    findings: [
      '16+ year track record, S&P-tracked, deep market presence',
      'Disclosed HQ, factories & offices across US, EU, China, India, APAC',
      'Active, dense, independently reported media coverage',
      'Polarised consumer sentiment (~471 one-star vs ~162 five-star)',
      'Customer Support Flag: recurring complaints regarding unresolved post-sale issues'
    ],
    verdict: 'Trusted',
    date: '2026.06',
    pdfUrl: '/case-studies/VASD_Trust_Verdict_Tesla.pdf',
  },
]

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const isFraud = study.verdict === 'Fraudulent Activity' || study.verdict === 'High Risk'
  const isSuspicious = study.verdict === 'Suspicious'
  const isTrusted = study.verdict === 'Trusted' || study.verdict === 'Verified Entity'

  return (
    <div className="flex flex-col border border-gray-200 bg-white transition-shadow hover:shadow-md rounded-sm h-full">
      
      {/* Card Header */}
      <div className="p-8 border-b border-gray-100 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 font-bold">{study.id}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-gray-500 font-bold">{study.date}</span>
          </div>
          <div
            className={`shrink-0 flex items-center gap-2 px-3 py-1 font-body text-[0.65rem] uppercase tracking-widest font-bold rounded-sm ${
              isFraud
                ? 'bg-red-50 text-red-700 border border-red-200'
                : isSuspicious
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {isFraud ? <AlertTriangle size={14} /> : isSuspicious ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
            {study.verdict}
          </div>
        </div>
        <h3 className="font-body text-xl font-bold text-gray-900 tracking-tight">{study.title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-8 flex-1 flex flex-col bg-gray-50">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Investigation Vector</p>
            <p className="font-body text-sm font-medium text-gray-900">{study.vector}</p>
          </div>
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Assessment Scope</p>
            <p className="font-body text-sm font-medium text-gray-900">{study.scope}</p>
          </div>
        </div>

        <div className="mb-10">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2">Key Findings</p>
          <ul className="flex flex-col gap-3">
            {study.findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${isFraud ? 'bg-red-500' : isSuspicious ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span className="font-body text-sm text-gray-700 leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <a
            href={study.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between font-body text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="tracking-widest uppercase font-bold">Download Full Report</span>
            <div className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 group-hover:border-gray-400 transition-colors rounded-sm">
              <Download size={14} className="text-gray-600" />
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}

export function CaseStudies() {
  return (
    <section className="bg-white pt-32 pb-24 min-h-screen border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <Reveal className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-gray-300" />
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
              Intelligence Reports
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="font-body text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-8">
              VASD Trust Verdicts
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-lg text-gray-600 leading-relaxed">
              Public intelligence reports resulting from our multi-layer entity assessments. These executive briefings detail the scope, investigation vector, and key findings that inform our final trust verdict.
            </p>
          </Reveal>
        </div>

        {/* Section: Threat Intelligence */}
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <h2 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest">Threat Intelligence</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {scamStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Section: Verified Entities */}
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <h2 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest">Voluntary Trust Verification</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {verifiedStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Section: Agency Trust Validation */}
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <h2 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest">Agency Trust Validation Assessment</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {agencyTrustStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Section: Independent Case Studies */}
        <Reveal>
          <div className="flex items-center gap-6 mb-10">
            <h2 className="font-body text-sm font-bold text-gray-900 uppercase tracking-widest">Unverified: Independent Case Studies</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {independentStudies.map((study, i) => (
            <Reveal key={study.id} delay={i * 0.1}>
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal>
          <div className="border border-gray-300 bg-gray-50 p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-10 rounded-sm">
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Entity Assessment
              </p>
              <h3 className="font-body text-2xl font-bold text-gray-900 mb-3">
                Need to verify an entity?
              </h3>
              <p className="font-body text-sm text-gray-600 max-w-xl leading-relaxed">
                Contact our intelligence team to initiate a structural assessment of a partner, vendor, or agency before committing to a contract.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-3 font-body text-xs font-bold uppercase tracking-widest text-white bg-[#0F3B68] px-8 py-4 hover:bg-[#1E4D82] transition-colors rounded-sm"
            >
              Initiate Assessment
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
