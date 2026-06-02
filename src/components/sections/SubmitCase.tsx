'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, FileText, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

const scamTypes = [
  'Fake Brand Deal / Sponsorship',
  'Platform Impersonation',
  'Government Authority Impersonation',
  'Financial Fraud / Fake Invoice',
  'Data Harvesting',
  'Malware / Malicious Link',
  'Social Engineering',
  'Fake Job Offer',
  'Celebrity / Influencer Impersonation',
  'Recruitment Scam',
  'Other / Unknown',
]

const fieldClass =
  'form-input w-full bg-charcoal-2 text-platinum font-body text-sm px-4 py-3.5 placeholder:text-silver-dim/35 border-0 outline-none focus:ring-0'

export function SubmitCase() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formsubmit.co/ajax/vivin.b@velurynagnecy.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      })

      if (res.ok) {
        setStatus('done')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative bg-charcoal overflow-hidden min-h-screen">

      {/* Hero */}
      <div className="relative bg-charcoal-2 border-b border-silver-dim/10">
        <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 relative z-10">
          <Reveal className="flex items-center gap-4 mb-8">
            <div className="w-px h-10 bg-steel-blue" />
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-0.5">
                VASD — Trust Authority Infrastructure
              </p>
              <p className="font-body text-[0.65rem] tracking-widest uppercase text-steel-blue">
                Case Submission
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1
              className="font-display font-light text-platinum mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Submit a Case
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="font-body text-base text-silver-dim leading-relaxed max-w-2xl mb-10">
              Received something that felt off? Submit it here. VASD will run a full three-layer
              verification and document the findings.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              {[
                { icon: Shield,        label: 'Three Layer Verification', desc: 'Every submission reviewed in full' },
                { icon: AlertTriangle, label: 'No Cost',                  desc: 'Free during the case study phase' },
                { icon: FileText,      label: 'Confidential',             desc: 'Your identity is never published' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-3 bg-charcoal px-4 py-4 rounded-card border border-silver-dim/10">
                  <Icon size={14} className="text-steel-blue shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-platinum mb-0.5">{label}</p>
                    <p className="font-body text-xs text-silver-dim">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2
                className="font-display font-light text-platinum mb-6"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
              >
                What happens after you submit
              </h2>
            </Reveal>
            <div className="flex flex-col gap-8">
              {[
                { n: '01', title: 'Layer One',         desc: 'Surface verification — domain age, WHOIS, DNS, mail infrastructure, and text analysis.' },
                { n: '02', title: 'Layer Two',         desc: 'Entity presence — whether the entity actually exists and operates as it claims.' },
                { n: '03', title: 'Layer Three',       desc: 'Deep trust intelligence — behavioral analysis, relationship mapping, and full trust classification.' },
                { n: '04', title: 'Report Published',  desc: 'If the case becomes a case study, findings are published with all identifying details removed.' },
              ].map(({ n, title, desc }) => (
                <Reveal key={n}>
                  <div className="flex gap-5">
                    <span
                      className="font-display font-light text-silver-dim/20 shrink-0"
                      style={{ fontSize: '2.2rem', lineHeight: 1, letterSpacing: '-0.04em' }}
                      aria-hidden
                    >
                      {n}
                    </span>
                    <div>
                      <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-steel-blue mb-1">{title}</p>
                      <p className="font-body text-sm text-silver-dim leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-8">
            <Reveal direction="scale" delay={0.1}>
              <div className="contact-form-panel relative bg-charcoal-2 p-8 md:p-12 glow-silver">
                <AnimatePresence mode="wait">
                  {status === 'done' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                      className="flex flex-col items-center justify-center min-h-96 text-center gap-6"
                    >
                      <div className="w-14 h-14 rounded-full border border-platinum flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <motion.path
                            d="M5 12l5 5 9-10"
                            stroke="#E8E8F0"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                          />
                        </svg>
                      </div>
                      <h3 className="font-display text-3xl font-light text-platinum">Case Submitted.</h3>
                      <p className="font-body text-sm text-silver-dim max-w-sm">
                        We have received your submission. VASD will begin verification and reach out if we need more information. Your identity will never be published.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col gap-5"
                    >
                      {/* Submitter info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Your Name <span className="opacity-40">(optional)</span>
                          </label>
                          <input name="submitter_name" type="text" placeholder="Your name" className={fieldClass} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Your Email <span className="opacity-40">(for follow-up)</span>
                          </label>
                          <input name="submitter_email" type="email" placeholder="your@email.com" className={fieldClass} />
                        </div>
                      </div>

                      {/* Scam type + platform */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Scam Type <span className="text-silver-dim/60">*</span>
                          </label>
                          <select name="scam_type" required className={fieldClass}>
                            <option value="">Select type</option>
                            {scamTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Platform / Channel <span className="text-silver-dim/60">*</span>
                          </label>
                          <input name="platform" type="text" required placeholder="e.g. Email, Instagram DM, SMS" className={fieldClass} />
                        </div>
                      </div>

                      {/* Sender + entity */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Actual Sender Address <span className="text-silver-dim/60">*</span>
                          </label>
                          <input name="sender_address" type="text" required placeholder="e.g. hello@poecontact.com" className={fieldClass} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Entity Claimed to Be
                          </label>
                          <input name="entity_claimed" type="text" placeholder="e.g. Skillshare, Land Transport Authority" className={fieldClass} />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                          What Did the Message Say? <span className="text-silver-dim/60">*</span>
                        </label>
                        <textarea
                          name="description"
                          required
                          rows={5}
                          placeholder="Paste the message or describe what was sent. The more detail, the more thorough the verification."
                          className={cn(fieldClass, 'resize-none')}
                        />
                      </div>

                      {/* Additional */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                          Additional Context <span className="opacity-40">(optional)</span>
                        </label>
                        <textarea
                          name="additional_details"
                          rows={3}
                          placeholder="Any links, domain names, phone numbers, or other details."
                          className={cn(fieldClass, 'resize-none')}
                        />
                      </div>

                      {/* Consent */}
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" name="consent" required className="mt-1 shrink-0 accent-platinum" />
                        <span className="font-body text-xs text-silver-dim leading-relaxed">
                          I confirm this is a genuine submission. I understand VASD may publish the findings as a case study with all identifying details removed. My name and email will never be published.
                        </span>
                      </label>

                      {status === 'error' && (
                        <p className="font-body text-sm text-silver text-center" role="alert">
                          Something went wrong. Please email vivin.b@velurynagnecy.com directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="btn-submit w-full bg-platinum text-charcoal font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium py-4 hover:bg-silver disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="btn-spinner" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            Submit Case to VASD
                          </>
                        )}
                      </button>

                      <p className="font-body text-[0.65rem] text-silver-dim text-center">
                        Confidential. Your identity is never published. VASD classifications are probabilistic assessments, not legal determinations.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
