'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, FileText, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

const FORMSUBMIT_ACTION = 'https://formsubmit.co/vivin.b@velurynagnecy.com'
const FORMSUBMIT_AJAX   = 'https://formsubmit.co/ajax/vivin.b@velurynagnecy.com'

const fieldClass =
  'form-input w-full bg-charcoal-2 text-platinum font-body text-sm px-4 py-3.5 placeholder:text-silver-dim/35'

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

const emptyForm = {
  submitterName: '',
  submitterEmail: '',
  scamType: '',
  platform: '',
  senderAddress: '',
  entityClaimed: '',
  description: '',
  additionalDetails: '',
}

export function SubmitCase() {
  const [form, setForm] = useState(emptyForm)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('sending')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch(FORMSUBMIT_AJAX, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success !== 'false') {
        setForm(emptyForm)
        setState('done')
        return
      }
      setState('error')
      setErrorMsg('Unable to submit. Please email vivin.b@velurynagnecy.com directly.')
    } catch {
      setState('error')
      setErrorMsg('Network error. Please try again or email vivin.b@velurynagnecy.com.')
    }
  }

  return (
    <section className="relative bg-charcoal overflow-hidden min-h-screen">

      {/* Hero */}
      <div className="relative bg-charcoal-2 border-b border-silver-dim/10 overflow-hidden">
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

      {/* Form */}
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
                { n: '02', title: 'Layer Two',         desc: 'Entity presence — cross-platform existence, real-world presence, payment structure, and reputation.' },
                { n: '03', title: 'Layer Three',       desc: 'Deep trust intelligence — behavioral analysis, relationship mapping, and full trust classification.' },
                { n: '04', title: 'Report Published',  desc: 'If the case becomes a case study, it is published with all identifying details removed. You are never named.' },
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
                  {state === 'done' ? (
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
                      <p className="font-body text-sm text-silver-dim">
                        We have received your submission. VASD will begin verification shortly. Your identity will never be published.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      action={FORMSUBMIT_ACTION}
                      method="POST"
                      onSubmit={handleSubmit}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col gap-5"
                    >
                      <input type="hidden" name="_subject" value="VASD Case Submission — VELURYN AGNECY" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="_next" value="https://velurynagnecy.com/submit-case" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Your Name <span className="text-silver-dim/40">(optional)</span>
                          </label>
                          <input
                            name="submitter_name"
                            type="text"
                            value={form.submitterName}
                            onChange={(e) => setForm({ ...form, submitterName: e.target.value })}
                            placeholder="Your name"
                            className={fieldClass}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Your Email <span className="text-silver-dim/40">(for follow-up)</span>
                          </label>
                          <input
                            name="submitter_email"
                            type="email"
                            value={form.submitterEmail}
                            onChange={(e) => setForm({ ...form, submitterEmail: e.target.value })}
                            placeholder="your@email.com"
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Scam Type <span className="text-silver-dim/60">*</span>
                          </label>
                          <select
                            name="scam_type"
                            required
                            value={form.scamType}
                            onChange={(e) => setForm({ ...form, scamType: e.target.value })}
                            className={fieldClass}
                          >
                            <option value="" disabled>Select type</option>
                            {scamTypes.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Platform / Channel <span className="text-silver-dim/60">*</span>
                          </label>
                          <input
                            name="platform"
                            type="text"
                            required
                            value={form.platform}
                            onChange={(e) => setForm({ ...form, platform: e.target.value })}
                            placeholder="e.g. Email, Instagram DM, SMS"
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Actual Sender Address <span className="text-silver-dim/60">*</span>
                          </label>
                          <input
                            name="sender_address"
                            type="text"
                            required
                            value={form.senderAddress}
                            onChange={(e) => setForm({ ...form, senderAddress: e.target.value })}
                            placeholder="e.g. hello@poecontact.com"
                            className={fieldClass}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                            Entity Claimed to Be
                          </label>
                          <input
                            name="entity_claimed"
                            type="text"
                            value={form.entityClaimed}
                            onChange={(e) => setForm({ ...form, entityClaimed: e.target.value })}
                            placeholder="e.g. Skillshare, Land Transport Authority"
                            className={fieldClass}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                          What Did the Message Say? <span className="text-silver-dim/60">*</span>
                        </label>
                        <textarea
                          name="description"
                          required
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          rows={5}
                          placeholder="Paste the message or describe what was sent. The more detail, the more thorough the verification."
                          className={cn(fieldClass, 'resize-none')}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-silver-dim">
                          Additional Context <span className="text-silver-dim/40">(optional)</span>
                        </label>
                        <textarea
                          name="additional_details"
                          value={form.additionalDetails}
                          onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })}
                          rows={3}
                          placeholder="Any links, domain names, phone numbers, or other details."
                          className={cn(fieldClass, 'resize-none')}
                        />
                      </div>

                      {state === 'error' && errorMsg && (
                        <p className="font-body text-sm text-silver text-center px-2" role="alert">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="btn-submit w-full bg-platinum text-charcoal font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium py-4 hover:bg-silver disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                      >
                        {state === 'sending' ? (
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
