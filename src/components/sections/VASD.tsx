'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Target, Search, CheckCircle, Activity, FileText } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle, subHeadingStyle } from '@/lib/typography'

const layers = [
  { n: 'L1', icon: Search, title: 'Initial Screening', desc: 'Identifies and validates basic trust signals including email authenticity, domain legitimacy, website presence, public business information, contact consistency, and technical verification indicators.' },
  { n: 'L2', icon: Target, title: 'Entity Validation', desc: 'Evaluates whether an entity presents a consistent and verifiable business identity by assessing business footprint, brand consistency, operational presence, public reputation, platform activity, and cross-source validation.' },
  { n: 'L3', icon: Activity, title: 'Intelligence Analysis', desc: 'Focuses on identifying patterns, inconsistencies, and risk indicators through behavioral indicators, credibility signals, risk factors, trust indicators, consistency analysis, and verification findings.' },
  { n: 'L4', icon: CheckCircle, title: 'Final Classification', desc: 'Consolidates findings into a final assessment. Classifications include Trusted, Suspicious, or High Risk, each supported by documented observations and verification findings.' },
]

export function VASD() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section id="vasd" className="relative overflow-hidden bg-charcoal grid-drift">
      <div ref={heroRef} className="bleed-full relative h-[55vh] md:h-[65vh] image-cover rounded-none overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="/assets/vasd-bg.jpeg"
            alt="VASD"
            fill
            sizes="100vw"
            priority
            className="section-bg-image scale-110"
            style={{ opacity: 0.45 }}
          />
        </motion.div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(26,28,36,0.2) 0%, rgba(26,28,36,0.95) 100%)',
          }}
        />

        <div className="absolute inset-0 z-[2] flex items-end">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12 md:pb-16">
            <Reveal className="flex items-center gap-4 mb-6">
              <div className="w-px h-10 bg-steel-blue" />
              <div>
                <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-0.5">
                  Service Vertical 02
                </p>
                <p className="font-body text-[0.65rem] tracking-widest uppercase text-steel-blue">VASD</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display font-light text-platinum" style={sectionHeadingStyle}>
                Veluryn Agnecy
                <span className="block italic text-gradient-steel">Service Digital</span>
              </h1>
            </Reveal>
          </div>
        </div>

        <span className="ambient-text right-[-2%] top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden>
          VASD
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <Reveal>
            <blockquote className="font-display font-light italic text-platinum" style={subHeadingStyle}>
              &ldquo;VASD is a trust intelligence and verification infrastructure designed to evaluate entities, communications, and business credibility.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 pt-2">
            <p className="font-body text-base text-silver-dim leading-relaxed">
              Through a structured multi-layer assessment process, VASD helps founders, investors, agencies, creators, and organizations make more informed decisions before entering business relationships.
            </p>
            <p className="font-body text-sm text-silver-dim leading-relaxed">
              Trust should be evaluated through evidence, not assumptions. We prioritize consistency, transparency, and verification over claims alone.
            </p>
            <Link
              href="/submit-case"
              className="rounded-pill inline-flex self-start font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-platinum border border-steel-blue px-7 py-3.5 hover:bg-steel-blue/15 transition-colors mt-2"
            >
              Submit a Case
            </Link>
          </Reveal>
        </div>

        {/* ── Core Framework ─────────────────────────────────────────────── */}
        <Reveal className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-steel-blue" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue">
              Core Framework
            </span>
          </div>
          <h2 className="font-display font-light text-platinum mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Layered Verification Methodology
          </h2>
          <p className="font-body text-sm text-silver-dim leading-relaxed max-w-2xl">
            VASD operates through a structured four-layer methodology, rigorously validating signals and extracting findings.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-28">
          {layers.map(({ n, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <motion.div
                className="service-card service-card--steel bg-charcoal p-8 md:p-10 rounded-card relative overflow-hidden h-full"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-steel-blue origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <span
                  className="font-display text-steel-blue block mb-4 pointer-events-none select-none"
                  style={{ fontSize: '3rem', fontWeight: 300, lineHeight: 1, opacity: 0.15, letterSpacing: '-0.04em' }}
                  aria-hidden
                >
                  {n}
                </span>
                <Icon size={18} className="service-icon text-steel-blue mb-5" strokeWidth={1.5} />
                <h3 className="font-body text-xs tracking-[0.15em] uppercase text-platinum mb-3">{title}</h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed">{desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* ── Infrastructure Principles & Use Cases ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-28">
          <Reveal>
            <div className="relative border border-silver-dim/12 bg-charcoal-2/50 overflow-hidden rounded-panel p-10 md:p-14 h-full">
              <div className="absolute top-0 left-0 w-24 h-px bg-steel-blue" />
              <div className="absolute bottom-0 right-0 w-24 h-px bg-steel-blue" />
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-6">
                Infrastructure Principles
              </p>
              <h3 className="font-display font-light text-platinum mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}>
                Built on Verification
              </h3>
              <div className="flex flex-col gap-8">
                <div>
                  <h4 className="font-body text-xs tracking-[0.15em] uppercase text-platinum mb-2">Evidence First</h4>
                  <p className="font-body text-sm text-silver-dim leading-relaxed">Conclusions are based on observable information and verification findings.</p>
                </div>
                <div>
                  <h4 className="font-body text-xs tracking-[0.15em] uppercase text-platinum mb-2">Consistency Validation</h4>
                  <p className="font-body text-sm text-silver-dim leading-relaxed">Information is reviewed across multiple sources to identify alignment or discrepancies.</p>
                </div>
                <div>
                  <h4 className="font-body text-xs tracking-[0.15em] uppercase text-platinum mb-2">Risk Awareness</h4>
                  <p className="font-body text-sm text-silver-dim leading-relaxed">Potential concerns are documented to support informed decision making.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-10 md:p-14 h-full flex flex-col justify-center">
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-6">
                Intended Use Cases
              </p>
              <h3 className="font-display font-light text-platinum mb-8" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}>
                Who relies on VASD?
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Agency Evaluation',
                  'Partnership Assessment',
                  'Vendor Screening',
                  'Founder Due Diligence',
                  'Creator & Influencer Verification',
                  'Business Trust Assessments',
                  'Outreach & Proposal Reviews',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <Shield size={14} className="text-steel-blue shrink-0" />
                    <span className="font-body text-sm text-silver-dim">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ── Short Preview of Case Studies ──────────────────────────────── */}
        <div className="mt-28">
          <Reveal className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-steel-blue" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue">
              Proof of Work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-light text-platinum mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Case Studies Overview
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-xl mb-10">
              We have compiled deep dive verdicts on several high-risk cases including Labor Extraction, Malware Delivery, and Data Harvesting campaigns.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-3 font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-platinum border border-steel-blue px-8 py-4 hover:bg-steel-blue/15 transition-colors rounded-pill"
            >
              <FileText size={14} />
              View All Trust Verdicts
            </Link>
          </Reveal>
        </div>

        {/* ── How To Spot A Scam ───────────────────────────────────────────── */}
        <div className="mt-28">
          <Reveal className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-steel-blue" />
            <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue">
              Public Trust Guide
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-light text-platinum mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              How To Spot A Scam
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-xl mb-10">
              A public guide produced by VELURYN AGNECY using VASD Trust Authority Infrastructure. Based on 11 real scam cases observed across LinkedIn, Threads, X, WhatsApp, Facebook Messenger, Email, and SMS. Every pattern documented is real. Once you know them, they become impossible to miss.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.div
              className="relative bg-charcoal rounded-card overflow-hidden border p-8 md:p-10"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left bg-steel-blue"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8">
                  <p className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-steel-blue mb-3">
                    VASD — VELURYN AGNECY
                  </p>
                  <h3 className="font-display font-light text-platinum text-2xl mb-4">
                    How To Spot A Scam
                  </h3>
                  <p className="font-body text-sm text-silver-dim leading-relaxed mb-6">
                    11 real scam cases. 6 universal mechanics that appear in every single one. Fake job offers, platform impersonation, government authority fraud, celebrity scams, advance fee schemes, and more — all analysed using VASD&apos;s multi layer verification system.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['6 Universal Scam Mechanics', '8 Documented Scam Types', '6-Step Action Guide', 'Real Cases Only'].map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[0.58rem] tracking-[0.15em] uppercase text-silver-dim border border-silver-dim/15 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="/VASD_Public_Scam_Guide.pdf"
                    download="VASD Public Trust Guide — How To Spot A Scam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 font-body text-[0.68rem] tracking-[0.2em] uppercase font-medium text-platinum border border-steel-blue/40 px-5 py-2.5 rounded-pill hover:bg-steel-blue/10 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    View Full Guide
                  </a>
                </div>

                <div className="md:col-span-4 flex flex-col gap-3">
                  {[
                    'Pretends to be someone you trust',
                    'Creates pressure so you do not think',
                    'Moves you away from the safe environment',
                    'Uses a fake sender address',
                    'Hits you in the feelings',
                    'Creates fake evidence',
                  ].map((mechanic, i) => (
                    <div key={mechanic} className="flex items-start gap-3">
                      <span
                        className="font-display font-light shrink-0 mt-0.5"
                        style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-body text-xs text-silver-dim leading-relaxed">{mechanic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* ── Submit CTA ────────────────────────────────────────────────── */}
        <Reveal>
          <div className="mt-20 relative border border-silver-dim/12 bg-charcoal-2/50 rounded-panel overflow-hidden p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="absolute top-0 left-0 w-24 h-px bg-steel-blue" />
            <div className="absolute bottom-0 right-0 w-24 h-px bg-steel-blue" />
            <div>
              <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-3">
                VASD Case Submission
              </p>
              <h3
                className="font-display font-light text-platinum mb-3"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
              >
                Received something suspicious?
              </h3>
              <p className="font-body text-sm text-silver-dim leading-relaxed max-w-lg">
                Submit it to VASD. We run a full multi-layer verification, document the findings, and publish the case study. No cost. Your identity is never published.
              </p>
            </div>
            <a
              href="/submit-case"
              className="shrink-0 inline-flex items-center gap-3 font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-charcoal bg-platinum px-8 py-4 hover:bg-silver transition-colors rounded-none"
            >
              Submit a Case
            </a>
          </div>
        </Reveal>

        {/* ── Disclaimer ────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <p className="font-body text-[0.65rem] tracking-[0.1em] text-silver-dim/50 mt-16 text-center max-w-4xl mx-auto border-t border-silver-dim/10 pt-8">
            <strong>Disclaimer:</strong> VASD provides verification and trust intelligence assessments based on available information at the time of review. Assessments are informational and should be considered alongside independent business, legal, and financial due diligence.
          </p>
        </Reveal>

      </div>
    </section>
  )
}
