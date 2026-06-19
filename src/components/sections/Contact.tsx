'use client'

import { useState } from 'react'
import { Mail, ArrowRight, ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react'
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
    <section id="contact" className="relative bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column — Context */}
          <div className="lg:col-span-5">
            <Reveal className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-gray-300" />
              <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
                Engagement
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-body text-4xl font-semibold text-gray-900 tracking-tight mb-8">
                Initiate Contact.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-base text-gray-600 leading-relaxed mb-14">
                Whether you require business intelligence verification, structural consulting, or full-service digital management, provide the necessary context below. We assess every inquiry prior to scheduling.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-gray-200 p-8 bg-white mb-8" style={{ borderRadius: '2px' }}>
                <p className="font-body text-xs tracking-widest uppercase text-gray-500 font-bold mb-4">
                  Direct Line
                </p>
                <a
                  href="mailto:vivin.b@velurynagnecy.com"
                  className="group flex items-center gap-3 font-body text-sm font-semibold text-gray-900 hover:text-[#0F3B68] transition-colors"
                >
                  <Mail size={16} className="text-gray-400 group-hover:text-[#0F3B68] transition-colors" />
                  vivin.b@velurynagnecy.com
                </a>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 p-8 bg-[#EBF1F7] border border-[#D1E0F0]" style={{ borderRadius: '2px' }}>
                <ShieldCheck size={20} className="text-[#0F3B68] shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-bold text-gray-900 mb-2">Confidentiality Assured</p>
                  <p className="font-body text-xs text-gray-600 leading-relaxed">
                    All submitted information is treated under strict confidentiality protocols. Data is not shared externally without explicit written consent.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column — Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="bg-white border border-gray-200 p-8 md:p-12 shadow-sm" style={{ borderRadius: '2px' }}>
                {state === 'done' ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 mx-auto flex items-center justify-center mb-8">
                      <CheckCircle size={28} className="text-emerald-600" />
                    </div>
                    <h3 className="font-body text-xl font-bold text-gray-900 mb-3">Message Delivered</h3>
                    <p className="font-body text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been logged securely. Our team will review the details and respond accordingly.
                    </p>
                    <button
                      onClick={() => setState('idle')}
                      className="mt-10 font-body text-xs font-bold uppercase tracking-widest text-[#0F3B68] hover:text-[#1E4D82] transition-colors underline underline-offset-4"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    
                    {/* Inquiry Type Tabs */}
                    <div>
                      <p className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 mb-3 font-bold">
                        Inquiry Classification
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {['Business', 'Partnership', 'Media', 'General'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, inquiryType: type as InquiryType }))}
                            className={`font-body text-xs font-semibold px-5 py-2.5 border transition-all ${
                              form.inquiryType === type
                                ? 'bg-gray-900 border-gray-900 text-white'
                                : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                            }`}
                            style={{ borderRadius: '2px' }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">Full Name</label>
                        <input
                          id="name" name="name" type="text" required
                          className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                          placeholder="Jane Doe"
                          value={form.name} onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">Email Address</label>
                        <input
                          id="email" name="email" type="email" required
                          className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                          placeholder="jane@organization.com"
                          value={form.email} onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">Organization / Entity (Optional)</label>
                      <input
                        id="company" name="company" type="text"
                        className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                        placeholder="Company Name"
                        value={form.company} onChange={handleChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">Message</label>
                      <textarea
                        id="message" name="message" required rows={5}
                        className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 resize-y focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                        placeholder="Please provide details regarding your inquiry..."
                        value={form.message} onChange={handleChange}
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
                        <HelpCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                        <p className="font-body text-sm text-red-800">{errorMessage}</p>
                      </div>
                    )}

                    <div className="mt-4">
                      <button
                        type="submit"
                        disabled={state === 'sending'}
                        className="btn-submit w-full sm:w-auto inline-flex items-center justify-center gap-3 font-body text-xs uppercase tracking-widest font-bold text-white bg-gray-900 px-10 py-4 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {state === 'sending' ? (
                          <>
                            <div className="btn-spinner border-gray-500 border-t-white" />
                            Processing
                          </>
                        ) : (
                          <>
                            Submit Inquiry
                            <ArrowRight size={16} />
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
