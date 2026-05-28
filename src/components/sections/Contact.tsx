'use client'

import { useState } from 'react'
import { Mail, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/motion/Reveal'
import { FormField } from '@/components/ui/FormField'
import { EllipseImage } from '@/components/ui/EllipseImage'
import { sectionHeadingStyle } from '@/lib/typography'

const FORMSUBMIT_ACTION = 'https://formsubmit.co/vivin.b@velurynagnecy.com'
const FORMSUBMIT_AJAX = 'https://formsubmit.co/ajax/vivin.b@velurynagnecy.com'

const fieldClass =
  'form-input w-full bg-charcoal-2 text-platinum font-body text-sm px-4 py-3.5 placeholder:text-silver-dim/35'

type IdentityType = '' | 'Influencer / Individual' | 'Company'

const emptyForm = {
  name: '',
  email: '',
  identityType: '' as IdentityType,
  yourRole: '',
  companyType: '',
  service: '',
  message: '',
}

const identityFieldMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

export function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('sending')
    setErrorMessage('')

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
      setErrorMessage(
        typeof data.message === 'string'
          ? data.message
          : 'Unable to send your message. Please email vivin.b@velurynagnecy.com directly.'
      )
    } catch {
      setState('error')
      setErrorMessage('Network error. Please try again or email vivin.b@velurynagnecy.com directly.')
    }
  }

  return (
    <section id="contact" className="relative bg-charcoal-2 overflow-hidden">
      <span className="ambient-text left-[-4%] top-20 hidden lg:block" aria-hidden>
        CONTACT
      </span>

      <div className="bleed-full h-px bg-silver-dim/10" />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <Reveal className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-silver-dim" />
              <span className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim">
                Get In Touch
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display font-light text-platinum mb-10" style={sectionHeadingStyle}>
                Let&apos;s Build
                <span className="block italic">Something Real.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-body text-base text-silver-dim leading-relaxed mb-10 max-w-md">
                Whether you&apos;re a creator looking for inbox protection through VASD, or a brand seeking influencer strategy through VA Mgmt — we want to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.18} className="flex items-center gap-5 mb-14">
              <EllipseImage
                src="/assets/vivin-bharathi.png"
                alt="Vivin Bharathi, CEO & Founder"
                width={72}
                className="ring-1 ring-silver-dim/15"
              />
              <div>
                <p className="font-display text-xl font-medium text-platinum">Vivin Bharathi</p>
                <p className="font-body text-[0.65rem] tracking-[0.22em] uppercase text-silver-dim mt-1">
                  CEO &amp; Founder · VELURYN AGNECY
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-5 mb-14">
              <a href="mailto:vivin.b@velurynagnecy.com" className="flex items-center gap-5 group">
                <div className="w-11 h-11 rounded-icon border border-silver-dim/15 flex items-center justify-center group-hover:border-silver transition-colors shrink-0">
                  <Mail size={15} className="text-silver-dim group-hover:text-platinum transition-colors" />
                </div>
                <div>
                  <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-0.5">Admin</p>
                  <p className="font-body text-sm text-platinum group-hover:text-silver transition-colors">vivin.b@velurynagnecy.com</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4">
                Follow @velurynagnecy
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, href: 'https://instagram.com/velurynagnecy' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/velurynagnecy' },
                  { icon: Twitter, href: 'https://x.com/velurynagnecy' },
                  { icon: Youtube, href: 'https://youtube.com/@velurynagnecy' },
                ].map(({ icon: Icon, href }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 border border-silver-dim/15 flex items-center justify-center text-silver-dim rounded-full"
                    whileHover={{ scale: 1.15, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={0.1}>
            <div className="contact-form-panel relative bg-charcoal p-8 md:p-12 glow-silver">
              <AnimatePresence mode="wait">
                {state === 'done' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    className="flex flex-col items-center justify-center min-h-80 text-center gap-6"
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
                    <h3 className="font-display text-3xl font-light text-platinum">Message Received.</h3>
                    <p className="font-body text-sm text-silver-dim">
                      We&apos;ll be in touch within 24 hours. No exceptions.
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
                    <input type="hidden" name="_subject" value="New enquiry — VELURYN AGNECY website" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField id="name" label="Name" required>
                        <input
                          id="name"
                          name="name"
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your Name"
                          className={fieldClass}
                        />
                      </FormField>
                      <FormField id="email" label="Email" required>
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Your Email"
                          className={fieldClass}
                        />
                      </FormField>
                    </div>

                    <FormField id="identityType" label="I am a" required>
                      <select
                        id="identityType"
                        name="i_am_a"
                        data-cursor-accent="rgb(196, 196, 212)"
                        required
                        value={form.identityType}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            identityType: e.target.value as IdentityType,
                            yourRole: '',
                            companyType: '',
                          })
                        }
                        className={fieldClass}
                      >
                        <option value="" disabled>Select one</option>
                        <option value="Influencer / Individual">Influencer / Individual</option>
                        <option value="Company">Company</option>
                      </select>
                    </FormField>

                    <AnimatePresence mode="wait" initial={false}>
                      {form.identityType === 'Influencer / Individual' && (
                        <motion.div key="your-role" {...identityFieldMotion}>
                          <FormField id="yourRole" label="Your Role" required>
                            <input
                              id="yourRole"
                              name="your_role"
                              type="text"
                              required
                              value={form.yourRole}
                              onChange={(e) => setForm({ ...form, yourRole: e.target.value })}
                              placeholder="e.g. YouTuber, Lawyer, Creator"
                              className={fieldClass}
                            />
                          </FormField>
                        </motion.div>
                      )}
                      {form.identityType === 'Company' && (
                        <motion.div key="company-type" {...identityFieldMotion}>
                          <FormField id="companyType" label="Company Type" required>
                            <input
                              id="companyType"
                              name="company_type"
                              type="text"
                              required
                              value={form.companyType}
                              onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                              placeholder="e.g. Clothing Brand, Fintech, Agency"
                              className={fieldClass}
                            />
                          </FormField>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <FormField id="service" label="I'm interested in" required>
                      <select
                        id="service"
                        name="service"
                        data-cursor-accent="rgb(196, 196, 212)"
                        required
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={fieldClass}
                      >
                        <option value="" disabled>Select a service</option>
                        <option value="VA Mgmt — Influencer Marketing">VA Mgmt — Influencer Marketing</option>
                        <option value="VASD — Inbox Validation & Protection">VASD — Inbox Validation & Protection</option>
                        <option value="Both Verticals">Both Verticals</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </FormField>

                    <FormField id="message" label="Message" required>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={4}
                        placeholder="Your Message"
                        className={cn(fieldClass, 'resize-none min-h-[120px]')}
                      />
                    </FormField>

                    {state === 'error' && errorMessage && (
                      <p className="font-body text-sm text-silver text-center px-2" role="alert">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      data-cursor-accent="rgb(232, 232, 240)"
                      className="btn-submit w-full bg-platinum text-charcoal font-body text-[0.7rem] tracking-[0.22em] uppercase font-medium py-4 hover:bg-silver disabled:opacity-60 flex items-center justify-center gap-3 mt-2"
                    >
                      {state === 'sending' ? (
                        <>
                          <span className="btn-spinner" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                    <p className="font-body text-[0.65rem] text-silver-dim text-center">
                      We respond within 24 hours. No spam. Ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
