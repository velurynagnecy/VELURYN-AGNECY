'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Filter, Mail, Zap, Lock, BarChart, FileText, Download } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle, subHeadingStyle } from '@/lib/typography'

const services = [
  { n: '01', icon: Filter, title: 'Intelligent Filtering', desc: 'AI-powered spam and threat detection that learns from your email patterns.' },
  { n: '02', icon: Shield, title: 'Threat Protection', desc: 'Real-time phishing, malware, and spoofing protection across all enterprise inboxes.' },
  { n: '03', icon: Mail, title: 'Inbox Management', desc: 'Priority sorting, category management, and automated routing at enterprise scale.' },
  { n: '04', icon: Zap, title: 'Zero Latency Delivery', desc: 'Critical mail reaches its recipient instantly. Filtering never slows your workflow.' },
  { n: '05', icon: Lock, title: 'Compliance & Encryption', desc: 'End-to-end encryption with audit trail reporting. GDPR, HIPAA, and SOC2 aligned.' },
  { n: '06', icon: BarChart, title: 'Analytics Dashboard', desc: 'Full visibility into email traffic, threat vectors, and inbox health — real time.' },
]

const caseStudies = [
  {
    num: '001',
    category: 'Leadership & Coaching Platform',
    type: 'Unsolicited Email Outreach',
    verdict: 'SUSPICIOUS',
    verdictColor: '#B7770D',
    borderColor: 'rgba(183,119,13,0.4)',
    summary: 'A real, operational entity with verified physical presence — but carrying multiple credibility inflation signals including unverifiable accreditations, contradicting nation counts, and a pattern of curated reviews.',
    flags: 9,
    file: '/case-studies/VASD_Case001.pdf',
  },
  {
    num: '002',
    category: 'Creator Affiliate Network',
    type: 'Unsolicited Partner Program Email',
    verdict: 'HIGH RISK',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.4)',
    summary: 'An entity with zero verifiable external footprint presenting itself as a creator-sponsor platform. Business model structured to extract creator labor and referrals under the guise of a recurring income opportunity.',
    flags: 16,
    file: '/case-studies/VASD_Case002.pdf',
  },
  {
    num: '003',
    category: 'Online Learning Platform',
    type: 'Fake Sponsorship — Malware Contract Link',
    verdict: 'HIGH RISK — MALWARE',
    verdictColor: '#C0392B',
    borderColor: 'rgba(192,57,43,0.5)',
    summary: 'Confirmed impersonation of a globally recognized brand. Email directs creators to sign a contract via a Windows-only link — a documented malware delivery mechanism. The impersonated platform has published an official scam warning about this exact pattern.',
    flags: 12,
    file: '/case-studies/VASD_Case003.pdf',
  },
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

      <div className="bleed-full relative h-40 md:h-56 image-cover scan-lines rounded-none overflow-hidden">
        <Image
          src="/assets/vasd-fiber.jpg"
          alt=""
          fill
          sizes="100vw"
          className="section-bg-image"
          style={{ opacity: 0.55 }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,28,36,0.6) 0%, rgba(26,28,36,0.3) 50%, rgba(26,28,36,0.6) 100%)',
          }}
        />
        <div className="absolute inset-0 z-[2] flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-silver-dim/20">
              {[
                { n: '94%', l: 'Of cyberattacks start with email' },
                { n: '$4.9M', l: 'Average cost of a data breach' },
                { n: '83%', l: 'Of companies face phishing weekly' },
              ].map((s, i) => (
                <Reveal key={s.l} delay={i * 0.1} className="px-0 md:px-10 first:md:pl-0 py-3 md:py-0 flex-1">
                  <p
                    className="font-display font-light text-platinum"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
                  >
                    {s.n}
                  </p>
                  <p className="font-body text-xs text-silver-dim mt-1">{s.l}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          <Reveal>
            <blockquote className="font-display font-light italic text-platinum" style={subHeadingStyle}>
              &ldquo;Your inbox is your command centre. Most companies don&apos;t protect it. We do.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 pt-2">
            <p className="font-body text-base text-silver-dim leading-relaxed">
              VASD is not a plugin. It is a fully managed service. We monitor, tune, and optimise your email infrastructure around the clock — so you never have to think about it.
            </p>
            <p className="font-body text-sm text-silver-dim leading-relaxed">
              Enterprise email filtering, threat protection, and inbox management. Intelligent. Secure. Invisible.
            </p>
            <Link
              href="#contact"
              className="rounded-pill inline-flex self-start font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium text-platinum border border-steel-blue px-7 py-3.5 hover:bg-steel-blue/15 transition-colors mt-2"
            >
              Get Protected
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {services.map(({ n, icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <motion.div
                className="service-card service-card--steel bg-charcoal p-8 md:p-10 rounded-card relative overflow-hidden"
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

        <Reveal>
          <blockquote
            className="font-display font-light italic text-platinum border-l-2 border-silver-dim/30 pl-8 py-2 mb-16"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.6, maxWidth: '860px' }}
          >
            &ldquo;AI is incredibly powerful for processing data, but it is deeply stupid when it lacks human intuition, context, and real-world awareness. It doesn&apos;t have the grit, the creative vision, or the skin in the game that it takes to actually build a brand.&rdquo;
            <footer className="mt-4 font-body text-[0.65rem] tracking-[0.25em] uppercase text-silver-dim not-italic">
              Vivin Bharathi &mdash; Founder &amp; CEO, VELURYN AGNECY
            </footer>
          </blockquote>
        </Reveal>

        <Reveal>
          <div className="relative border border-silver-dim/12 bg-charcoal-2/50 overflow-hidden rounded-panel">
            <div className="absolute top-0 left-0 w-24 h-px bg-steel-blue" />
            <div className="absolute bottom-0 right-0 w-24 h-px bg-steel-blue" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-silver-dim/10">
              <div className="p-10 md:p-14">
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-6">
                  Technical Specs
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: '99.9%', label: 'Uptime SLA' },
                    { val: '<0.1%', label: 'False Positive Rate' },
                    { val: '24/7', label: 'Active Monitoring' },
                    { val: '10ms', label: 'Avg Filter Latency' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-charcoal p-5 text-center rounded-[14px]"
                      style={{ borderRadius: '14px' }}
                    >
                      <p
                        className="font-display font-light text-platinum"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}
                      >
                        {s.val}
                      </p>
                      <p className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim mt-2">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-steel-blue mb-6">
                  Compliance
                </p>
                <h3
                  className="font-display font-light text-platinum mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
                >
                  Built for regulated industries.
                </h3>
                <p className="font-body text-sm text-silver-dim leading-relaxed mb-6">
                  VASD is aligned with GDPR, HIPAA, and SOC2 requirements. Full audit trail. End-to-end encryption. Zero data retention policies available on request.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['GDPR', 'HIPAA', 'SOC2'].map((tag) => (
                    <motion.span
                      key={tag}
                      className="rounded-pill font-body text-[0.6rem] tracking-widest uppercase text-steel-blue border border-steel-blue/40 px-4 py-2 cursor-default"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(74,101,128,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Our Case Studies ─────────────────────────────────────────────── */}
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
              Our Case Studies
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-xl mb-14">
              Real validation sessions. Real findings. Entity names withheld. Every report is produced using VASD&apos;s three-layer system — Initial Screening, Real-World Presence, and Deep Verification.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={cs.num} delay={i * 0.08}>
                <motion.div
                  className="relative bg-charcoal rounded-card overflow-hidden border p-8 md:p-10 flex flex-col gap-6"
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
                    <div className="w-px h-8 bg-silver-dim/15" />
                    <div>
                      <p className="font-body text-[0.58rem] tracking-widest uppercase text-silver-dim mb-0.5">Total Flags</p>
                      <p className="font-body text-xs font-bold" style={{ color: cs.verdictColor }}>{cs.flags}</p>
                    </div>
                    <div className="w-px h-8 bg-silver-dim/15" />
                    <div>
                      <p className="font-body text-[0.58rem] tracking-widest uppercase text-silver-dim mb-0.5">System</p>
                      <p className="font-body text-xs text-silver">VASD v1.0</p>
                    </div>
                  </div>

                  {/* summary */}
                  <p className="font-body text-sm text-silver-dim leading-relaxed">{cs.summary}</p>

                  {/* layer badges */}
                  <div className="flex flex-wrap gap-2">
                    {['Layer 1 — Initial Screening', 'Layer 2 — Real-World Presence', 'Layer 3 — Deep Verification'].map((l) => (
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 self-start font-body text-[0.68rem] tracking-[0.2em] uppercase font-medium text-platinum border px-5 py-2.5 rounded-pill hover:bg-white/5 transition-colors mt-auto"
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
            <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-silver-dim/50 mt-8 text-center">
              Entity names withheld from public distribution. Full documentation available under NDA upon request.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
