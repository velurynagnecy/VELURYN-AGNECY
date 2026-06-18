'use client'

import { useState } from 'react'
import { Mail, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { sectionHeadingStyle } from '@/lib/typography'

const FORMSUBMIT_AJAX = 'https://formsubmit.co/ajax/vivin.b@velurynagnecy.com'

type InquiryType = 'Business' | 'Partnership' | 'Media' | 'General'

const emptyForm = {
  name: '',
  email: '',
  company: '',
  inquiryType: 'Business' as InquiryType,
  message: '',
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
    formData.append('_subject', `New ${form.inquiryType} Inquiry from ${form.name}`)

    try {
      const res = await fetch(FORMSUBMIT_AJAX, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.success !== 'false') {
        setForm({ ...emptyForm, inquiryType: form.inquiryType })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="relative bg-charcoal-2 border-t border-[rgba(200,200,220,0.06)]">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column — Context */}
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-silver-dim" />
              <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver-dim font-medium">
                Engagement
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-platinum mb-6" style={sectionHeadingStyle}>
                Initiate Contact.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-sm text-silver-dim leading-relaxed mb-12">
                Whether you require business intelligence verification, structural consulting, or full-service digital management, provide the necessary context below. We assess every inquiry prior to scheduling.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-[rgba(200,200,220,0.07)] p-6 bg-charcoal mb-8" style={{ borderRadius: '4px' }}>
                <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-steel-blue font-semibold mb-4">
                  Direct Line
                </p>
                <a
                  href="mailto:vivin.b@velurynagnecy.com"
                  className="group flex items-center gap-3 font-body text-sm text-platinum hover:text-white transition-colors"
                >
                  <Mail size={16} className="text-silver-dim group-hover:text-platinum transition-colors" />
                  vivin.b@velurynagnecy.com
                </a>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 p-6 bg-[rgba(74,101,128,0.05)] border border-[rgba(74,101,128,0.15)]" style={{ borderRadius: '4px' }}>
                <ShieldCheck size={18} className="text-steel-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-xs font-semibold text-platinum mb-1">Confidentiality Assured</p>
                  <p className="font-body text-[0.65rem] text-silver-dim leading-relaxed">
                    All submitted information is treated under strict confidentiality protocols.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="contact-form-panel bg-charcoal p-8 md:p-10">
                {state === 'done' ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 rounded-full bg-[rgba(200,200,220,0.05)] border border-[rgba(200,200,220,0.1)] mx-auto flex items-center justify-center mb-6">
                      <CheckCircle size={20} className="text-platinum" />
                    </div>
                    <h3 className="font-body text-lg font-semibold text-platinum mb-2">Message Delivered</h3>
                    <p className="font-body text-sm text-silver-dim max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been logged securely. Our team will review the details and respond accordingly.
                    </p>
                    <button
                      onClick={() => setState('idle')}
                      className="mt-8 font-body text-[0.65rem] uppercase tracking-widest text-silver hover:text-platinum transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    
                    {/* Inquiry Type Tabs */}
                    <div>
                      <p className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-silver-dim mb-3 font-semibold">
                        Inquiry Classification
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Business', 'Partnership', 'Media', 'General'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, inquiryType: type as InquiryType }))}
                            className={`font-body text-xs px-4 py-2 border transition-all ${
                              form.inquiryType === type
                                ? 'bg-[rgba(200,200,220,0.1)] border-[rgba(200,200,220,0.2)] text-platinum font-medium'
                                : 'bg-transparent border-[rgba(200,200,220,0.08)] text-silver-dim hover:border-[rgba(200,200,220,0.15)]'
                            }`}
                            style={{ borderRadius: '3px' }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-silver-dim font-semibold">Full Name</label>
                        <input
                          id="name" name="name" type="text" required
                          className="form-input bg-charcoal-2 text-platinum font-body text-sm px-4 py-3 placeholder:text-silver-dim/40"
                          placeholder="Jane Doe"
                          value={form.name} onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-silver-dim font-semibold">Email Address</label>
                        <input
                          id="email" name="email" type="email" required
                          className="form-input bg-charcoal-2 text-platinum font-body text-sm px-4 py-3 placeholder:text-silver-dim/40"
                          placeholder="jane@organization.com"
                          value={form.email} onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-silver-dim font-semibold">Organization / Entity (Optional)</label>
                      <input
                        id="company" name="company" type="text"
                        className="form-input bg-charcoal-2 text-platinum font-body text-sm px-4 py-3 placeholder:text-silver-dim/40"
                        placeholder="Company Name"
                        value={form.company} onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-silver-dim font-semibold">Message</label>
                      <textarea
                        id="message" name="message" required rows={5}
                        className="form-input bg-charcoal-2 text-platinum font-body text-sm px-4 py-3 placeholder:text-silver-dim/40 resize-y"
                        placeholder="Please provide details regarding your inquiry..."
                        value={form.message} onChange={handleChange}
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 bg-red-900/10 border border-red-900/30 rounded">
                        <HelpCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="font-body text-xs text-red-200">{errorMessage}</p>
                      </div>
                    )}

                    <div className="mt-2">
                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="btn-submit w-full sm:w-auto inline-flex items-center justify-center gap-3 font-body text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-charcoal bg-platinum px-8 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {state === 'sending' ? (
                          <>
                            <div className="btn-spinner" />
                            Processing
                          </>
                        ) : (
                          <>
                            Submit Inquiry
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="box" />
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
        
      </div>
    </section>
  )
}
