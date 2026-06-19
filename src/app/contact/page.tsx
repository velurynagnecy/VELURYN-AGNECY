'use client'

import { useState } from 'react'
import { Mail, ShieldCheck, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/motion/Reveal'

const FORMSUBMIT_AJAX = 'https://formsubmit.co/ajax/vivin.b@velurynagnecy.com'

type InquiryType = 'Business' | 'Partnership' | 'Media' | 'General'

const emptyForm = {
  name: '',
  email: '',
  company: '',
  inquiryType: 'Business' as InquiryType,
  message: '',
}

export default function ContactPage() {
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
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Page Header */}
        <div className="bg-[#111827] border-b border-gray-800 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#60A5FA]" />
              <span className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-[#60A5FA] font-semibold">
                VELURYN AGNECY
              </span>
            </Reveal>
            <Reveal delay={0.07}>
              <h1
                className="text-white mb-5"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Contact.
              </h1>
            </Reveal>
            <Reveal delay={0.13}>
              <p className="font-body text-base text-gray-400 leading-relaxed max-w-xl font-light">
                We assess every inquiry before scheduling. Provide your context below and our team will respond with the appropriate next step.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Left Column — Context + Metadata */}
            <div className="lg:col-span-4">
              <Reveal>
                <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 font-bold mb-6 border-b border-gray-100 pb-4">
                  Inquiry Channel
                </p>
                <p className="font-body text-sm text-gray-600 leading-relaxed mb-10">
                  Whether you require entity verification, structural consulting, or full-service digital management — all inquiries are reviewed by the VELURYN AGNECY team prior to scheduling.
                </p>
              </Reveal>

              {/* Direct Line */}
              <Reveal delay={0.08}>
                <div className="border border-gray-200 p-6 mb-6 bg-gray-50" style={{ borderRadius: '2px' }}>
                  <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold mb-4">
                    Direct Line
                  </p>
                  <a
                    href="mailto:vivin.b@velurynagnecy.com"
                    className="group flex items-center gap-3 font-body text-sm font-semibold text-gray-900 hover:text-[#0F3B68] transition-colors"
                  >
                    <Mail size={15} className="text-gray-400 group-hover:text-[#0F3B68] transition-colors shrink-0" />
                    vivin.b@velurynagnecy.com
                  </a>
                </div>
              </Reveal>

              {/* Confidentiality */}
              <Reveal delay={0.14}>
                <div className="flex items-start gap-4 p-6 bg-[#EBF1F7] border border-[#D1E0F0]" style={{ borderRadius: '2px' }}>
                  <ShieldCheck size={18} className="text-[#0F3B68] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm font-bold text-gray-900 mb-1.5">Confidentiality Assured</p>
                    <p className="font-body text-xs text-gray-600 leading-relaxed">
                      All submitted information is handled under strict confidentiality protocols. Data is not shared externally without explicit written consent.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Response Time */}
              <Reveal delay={0.18}>
                <div className="mt-6 border-l-2 border-gray-200 pl-5">
                  <p className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">Response Time</p>
                  <p className="font-body text-xs text-gray-600 leading-relaxed">
                    All inquiries receive an initial assessment within 48 business hours.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column — Form */}
            <div className="lg:col-span-8">
              <Reveal delay={0.1}>
                <div className="border border-gray-200 bg-white p-10 md:p-14" style={{ borderRadius: '2px' }}>
                  {state === 'done' ? (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 mx-auto flex items-center justify-center mb-8">
                        <CheckCircle size={28} className="text-emerald-600" />
                      </div>
                      <h3 className="font-body text-xl font-bold text-gray-900 mb-3">Inquiry Received</h3>
                      <p className="font-body text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                        Your message has been logged securely. Our team will review the details and respond within 48 business hours.
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

                      {/* Inquiry Type */}
                      <div>
                        <p className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 mb-3 font-bold">
                          Inquiry Classification
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {(['Business', 'Partnership', 'Media', 'General'] as InquiryType[]).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, inquiryType: type }))}
                              className={`font-body text-xs font-semibold px-5 py-2.5 border transition-all ${
                                form.inquiryType === type
                                  ? 'bg-gray-900 border-gray-900 text-white'
                                  : 'bg-white border-gray-300 text-gray-600 hover:border-gray-500'
                              }`}
                              style={{ borderRadius: '2px' }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">
                            Full Name
                          </label>
                          <input
                            id="name" name="name" type="text" required
                            className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                            placeholder="Jane Doe"
                            value={form.name} onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">
                            Email Address
                          </label>
                          <input
                            id="email" name="email" type="email" required
                            className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                            placeholder="jane@organization.com"
                            value={form.email} onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Organization */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="company" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">
                          Organization / Entity <span className="text-gray-400 normal-case tracking-normal">(Optional)</span>
                        </label>
                        <input
                          id="company" name="company" type="text"
                          className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                          placeholder="Company or entity name"
                          value={form.company} onChange={handleChange}
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-body text-[0.65rem] uppercase tracking-[0.15em] text-gray-500 font-bold">
                          Message
                        </label>
                        <textarea
                          id="message" name="message" required rows={6}
                          className="form-input bg-white border-gray-300 text-gray-900 font-body text-sm px-4 py-3 placeholder:text-gray-400 resize-y focus:border-[#0F3B68] focus:ring-1 focus:ring-[#0F3B68]"
                          placeholder="Describe the nature of your inquiry in detail..."
                          value={form.message} onChange={handleChange}
                        />
                      </div>

                      {/* Error */}
                      {errorMessage && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-sm">
                          <HelpCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
                          <p className="font-body text-sm text-red-800">{errorMessage}</p>
                        </div>
                      )}

                      {/* Submit */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <p className="font-body text-xs text-gray-400">
                          Responses within 48 business hours.
                        </p>
                        <button
                          type="submit"
                          disabled={state === 'sending'}
                          className="btn-submit inline-flex items-center justify-center gap-3 font-body text-xs uppercase tracking-widest font-bold text-white bg-gray-900 px-10 py-4 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                          style={{ borderRadius: '2px' }}
                        >
                          {state === 'sending' ? (
                            <>
                              <div className="btn-spinner border-gray-500 border-t-white" />
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

      </main>
      <Footer />
    </>
  )
}
