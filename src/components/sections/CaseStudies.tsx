'use client'

import { FileText, Download, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'

export const caseStudies = [
  {
    num: '001',
    title: 'Credibility Inflation',
    category: 'Leadership & Coaching Platform',
    type: 'Unsolicited Email Outreach',
    verdict: 'SUSPICIOUS',
    verdictColor: '#B7770D',
    borderColor: 'rgba(183,119,13,0.4)',
    summary: 'A real, operational entity with verified physical presence — but carrying multiple credibility inflation signals including unverifiable accreditations, contradicting nation counts across the same website, and a pattern of curated reviews inconsistent with organic behavior.',
    flags: 9,
    fileName: 'VASD Case Study 001 — Credibility Inflation',
    file: '/case-studies/VASD_Case001.pdf',
  },
  {
    num: '002',
    title: 'Labor Extraction',
    category: 'Creator Affiliate Network',
    type: 'Unsolicited Partner Program Email',
    verdict: 'HIGH RISK',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.4)',
    summary: 'An entity with zero verifiable external footprint presenting itself as a creator-sponsor directory. Business model structured to extract creator labor and referrals — including a ready-made promotional script — under the guise of a recurring income opportunity.',
    flags: 16,
    fileName: 'VASD Case Study 002 — Labor Extraction',
    file: '/case-studies/VASD_Case002.pdf',
  },
  {
    num: '003',
    title: 'Malware Delivery',
    category: 'Online Learning Platform',
    type: 'Fake Sponsorship — Windows-Only Contract Link',
    verdict: 'HIGH RISK — MALWARE',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.5)',
    summary: 'Confirmed impersonation of a globally recognized brand. Directs creators to sign a contract through a Windows-only link — a documented malware delivery mechanism. The impersonated platform has published an official help center warning about this exact email pattern.',
    flags: 12,
    fileName: 'VASD Case Study 003 — Malware Delivery',
    file: '/case-studies/VASD_Case003.pdf',
  },
  {
    num: '004',
    title: 'Data Harvesting',
    category: 'AI Platform Impersonation',
    type: 'Fake Creator Partnership — One Day Old Domain',
    verdict: 'HIGH RISK — DATA HARVESTING',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.5)',
    summary: 'Domain registered 24 hours before the email was sent. Website behind the domain displays a completely different brand and a data collection form requesting channel name, link, subscriber count, and email. Infrastructure built to harvest creator profiles for future targeted scam campaigns.',
    flags: 14,
    fileName: 'VASD Case Study 004 — Data Harvesting',
    file: '/case-studies/VASD_Case004.pdf',
  },
  {
    num: '005',
    title: 'Financial Platform Impersonation',
    category: 'Educational Email Infrastructure',
    type: 'Fake Financial Rewards — Two Stage Attack',
    verdict: 'HIGH RISK — FINANCIAL FRAUD',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.5)',
    summary: 'Two emails claiming to represent a financial platform — sent from an Italian university alumni account and a US charter school student account. A two-stage trigger: the first creates financial anticipation, the second creates withdrawal panic. Both sent to BCC, confirming mass automated distribution.',
    flags: 17,
    fileName: 'VASD Case Study 005 — Financial Platform Impersonation',
    file: '/case-studies/VASD_Case005.pdf',
  },
  {
    num: '006',
    title: 'VASD — Trust Verdict',
    category: 'Zoona AI',
    type: 'Trust Factor Analysis — Entity Verification',
    verdict: 'TRUST VERDICT',
    verdictColor: '#4A6580',
    borderColor: 'rgba(74,101,128,0.4)',
    summary: 'A structured trust factor analysis conducted on Zoona AI using VASD\'s multi-layer verification methodology. Assessment covers entity legitimacy, operational presence, digital footprint consistency, and credibility signals across all available public-facing channels.',
    flags: 0,
    fileName: 'VASD Trust Factor Analysis — Zoona AI',
    file: '/case-studies/VASD_Trust_Factor_Analysis_Zoona_AI.pdf',
  },
]

export function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 relative z-10">
        <Reveal className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-steel-blue" />
          <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue">
            Proof of Work
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1
            className="font-display font-light text-platinum mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            VASD Trust Verdicts
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="font-body text-sm text-silver-dim leading-relaxed max-w-xl mb-14">
            Real validation sessions. Real findings. Entity names withheld. Every report is produced using VASD&apos;s multi-layer system — Initial Screening, Entity Validation, Intelligence Analysis, and Final Classification.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.num} delay={i * 0.08}>
              <motion.div
                className="relative bg-charcoal-2 rounded-card overflow-hidden border p-8 md:p-10 flex flex-col gap-6 h-full"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                {/* top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                  style={{ backgroundColor: cs.verdictColor }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-icon border flex items-center justify-center shrink-0"
                      style={{ borderColor: cs.borderColor }}
                    >
                      <FileText size={15} style={{ color: cs.verdictColor }} />
                    </div>
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">
                        Case Study #{cs.num}
                      </p>
                      <p className="font-body text-sm font-medium text-platinum mt-0.5">{cs.category}</p>
                    </div>
                  </div>
                  <span
                    className="font-body text-[0.6rem] tracking-[0.2em] uppercase font-bold px-3 py-1.5 rounded-full shrink-0"
                    style={{
                      color: cs.verdictColor,
                      backgroundColor: cs.borderColor,
                      border: `1px solid ${cs.borderColor}`,
                    }}
                  >
                    {cs.verdict}
                  </span>
                </div>

                {/* meta */}
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-body text-[0.58rem] tracking-widest uppercase text-silver-dim mb-0.5">Type</p>
                    <p className="font-body text-xs text-silver">{cs.type}</p>
                  </div>
                  {cs.flags > 0 && (
                    <>
                      <div className="w-px h-8 bg-silver-dim/15" />
                      <div>
                        <p className="font-body text-[0.58rem] tracking-widest uppercase text-silver-dim mb-0.5">Total Flags</p>
                        <p className="font-body text-xs font-bold" style={{ color: cs.verdictColor }}>{cs.flags}</p>
                      </div>
                    </>
                  )}
                  <div className="w-px h-8 bg-silver-dim/15" />
                  <div>
                    <p className="font-body text-[0.58rem] tracking-widest uppercase text-silver-dim mb-0.5">System</p>
                    <p className="font-body text-xs text-silver">VASD v2.0</p>
                  </div>
                </div>

                {/* summary */}
                <p className="font-body text-sm text-silver-dim leading-relaxed flex-grow">{cs.summary}</p>

                {/* layer badges */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4">
                  {['Layer 1 — Screening', 'Layer 2 — Validation', 'Layer 3 — Intelligence', 'Layer 4 — Classification'].map((l) => (
                    <span
                      key={l}
                      className="font-body text-[0.58rem] tracking-[0.15em] uppercase text-silver-dim border border-silver-dim/15 px-3 py-1 rounded-full"
                    >
                      {l}
                    </span>
                  ))}
                </div>

                {/* download */}
                <a
                  href={cs.file}
                  download={cs.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 self-start font-body text-[0.68rem] tracking-[0.2em] uppercase font-medium text-platinum border px-5 py-2.5 rounded-pill hover:bg-white/5 transition-colors mt-4"
                  style={{ borderColor: cs.borderColor }}
                >
                  <Download size={12} />
                  Download Full Report
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-silver-dim/50 mt-12 text-center">
            Entity names withheld from public distribution. Full documentation available under NDA upon request.
          </p>
        </Reveal>

        {/* ── Entity Verification CTA ─────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-20 relative border border-steel-blue/25 bg-charcoal-2/60 rounded-panel overflow-hidden p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="absolute top-0 left-0 w-24 h-px bg-steel-blue" />
            <div className="absolute bottom-0 right-0 w-24 h-px bg-steel-blue" />

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-icon border border-steel-blue/30 flex items-center justify-center shrink-0 mt-1">
                <Mail size={18} className="text-steel-blue" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-3">
                  VASD Entity Verification
                </p>
                <h3
                  className="font-display font-light text-platinum mb-3"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
                >
                  Need to verify your entity?
                </h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed max-w-lg">
                  Drop us an email. We&apos;ll run a full VASD multi-layer trust assessment and issue a formal Trust Verdict.
                </p>
              </div>
            </div>

            <a
              href="mailto:vivin.b@velurynagnecy.com?subject=VASD%20Entity%20Verification%20Request"
              className="shrink-0 inline-flex items-center gap-3 font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-platinum border border-steel-blue px-8 py-4 hover:bg-steel-blue/15 transition-colors rounded-pill whitespace-nowrap"
            >
              <Mail size={14} />
              Contact Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
