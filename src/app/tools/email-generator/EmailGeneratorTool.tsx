'use client'

import { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Template {
  id: string
  name: string
  category: string
  subject: string
  body: string
}

interface GeneratedEmail {
  index: number
  subject: string
  body: string
  copied: boolean
}

const DEMO_TEMPLATES: Template[] = [
  {
    id: 'cold-outreach',
    name: 'Cold Outreach',
    category: 'Sales',
    subject: 'Quick question about [Company]',
    body: 'Hi [Name],\n\nI came across [Company] and was impressed by what you are building in [Industry].\n\nWe help companies like yours streamline outreach at scale. I would love to show you how.\n\nWould you be open to a 15-minute call this week?\n\nBest,\n[Sender]',
  },
  {
    id: 'follow-up',
    name: 'Follow-Up',
    category: 'Sales',
    subject: 'Following up - [Company]',
    body: 'Hi [Name],\n\nJust following up on my previous note about [Topic].\n\nI know things get busy. Would a quick call work?\n\nBest,\n[Sender]',
  },
  {
    id: 'partnership',
    name: 'Partnership Proposal',
    category: 'Networking',
    subject: 'Partnership opportunity - [Company] x VELURYN AGNECY',
    body: 'Hi [Name],\n\nI am reaching out because I believe there is a meaningful alignment between [Company] and VELURYN AGNECY.\n\nWe are both committed to [SharedGoal] and I think a partnership could create real value for both sides.\n\nWould you be open to an exploratory conversation?\n\nWarm regards,\n[Sender]',
  },
  {
    id: 'job-offer',
    name: 'Job Offer',
    category: 'HR',
    subject: 'Offer Letter - [Position] at [Company]',
    body: 'Dear [Name],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nYour start date would be [StartDate], with compensation of [Salary].\n\nPlease confirm your acceptance by [Deadline].\n\nWe look forward to welcoming you to the team.\n\nSincerely,\n[Sender]',
  },
  {
    id: 'onboarding',
    name: 'Client Onboarding',
    category: 'Customer Success',
    subject: 'Welcome to [Company], [Name]!',
    body: 'Hi [Name],\n\nWelcome aboard! We are thrilled to have [ClientCompany] as a partner.\n\nHere is what happens next:\n1. Your account is being set up\n2. You will receive login details within 24 hours\n3. Your dedicated contact is [ContactName]\n\nDo not hesitate to reach out.\n\nBest,\n[Sender]',
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'Marketing',
    subject: 'Introducing [Product] - built for [Industry]',
    body: 'Hi [Name],\n\nWe just launched [Product] and thought of you immediately.\n\n[Product] helps [Industry] teams [Benefit] and we are seeing incredible early results.\n\nI would love to give you a private walkthrough. Are you free this week?\n\nBest,\n[Sender]',
  },
]

function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g) || []
  const keys = matches.map((m) => m.slice(1, -1))
  return keys.filter((item, index) => keys.indexOf(item) === index)
}

function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\[([^\]]+)\]/g, (_, key) => values[key] || `[${key}]`)
}

export function EmailGeneratorTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(DEMO_TEMPLATES[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [generated, setGenerated] = useState<GeneratedEmail[]>([])
  const [activeTab, setActiveTab] = useState<'template' | 'fill' | 'output'>('template')
  const [allCopied, setAllCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  const placeholders = extractPlaceholders(`${selectedTemplate.subject} ${selectedTemplate.body}`)
  const previewSubject = fillPlaceholders(selectedTemplate.subject, values)
  const previewBody = fillPlaceholders(selectedTemplate.body, values)

  function selectTemplate(t: Template) {
    setSelectedTemplate(t)
    setValues({})
    setGenerated([])
    setActiveTab('fill')
  }

  function handleGenerate() {
    setGenerated([{ index: 0, subject: previewSubject, body: previewBody, copied: false }])
    setActiveTab('output')
    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const copyEmail = useCallback(
    (idx: number) => {
      const email = generated[idx]
      if (!email) return
      navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`)
      setGenerated((prev) => prev.map((e, i) => (i === idx ? { ...e, copied: true } : e)))
      setTimeout(
        () => setGenerated((prev) => prev.map((e, i) => (i === idx ? { ...e, copied: false } : e))),
        2000,
      )
    },
    [generated],
  )

  const copyAll = useCallback(() => {
    const text = generated.map((e) => `Subject: ${e.subject}\n\n${e.body}`).join('\n\n---\n\n')
    navigator.clipboard.writeText(text)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }, [generated])

  const tabs = [
    { key: 'template' as const, label: '1. Choose Template' },
    { key: 'fill' as const, label: '2. Fill Details' },
    { key: 'output' as const, label: '3. Your Email' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Step tabs */}
      <div className="flex items-center gap-1 mb-12 p-1 rounded-full border border-border bg-charcoal-2 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-300',
              activeTab === tab.key
                ? 'bg-platinum text-charcoal font-medium'
                : 'text-silver-dim hover:text-platinum',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Step 1: Pick Template */}
      {activeTab === 'template' && (
        <div>
          <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim text-center mb-8">
            {DEMO_TEMPLATES.length} templates in demo &mdash; 30+ in Pro
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => selectTemplate(t)}
                className={cn(
                  'glass-dark text-left p-6 rounded-[20px] border transition-all duration-300',
                  selectedTemplate.id === t.id
                    ? 'border-platinum/30 bg-charcoal-3'
                    : 'border-border hover:border-border-md hover:bg-charcoal-2',
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-border text-silver-dim">
                    {t.category}
                  </span>
                  {selectedTemplate.id === t.id && (
                    <span className="w-2 h-2 rounded-full bg-platinum mt-1 flex-shrink-0" />
                  )}
                </div>
                <h3 className="font-body font-medium text-platinum text-sm mb-2">{t.name}</h3>
                <p className="font-body text-silver-dim text-xs leading-relaxed line-clamp-2">{t.subject}</p>
              </button>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('fill')}
              className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors"
            >
              Continue with {selectedTemplate.name}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Fill Details */}
      {activeTab === 'fill' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">
                Fill Placeholders
              </span>
              <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/50">
                {selectedTemplate.name}
              </span>
            </div>
            <div className="p-6 space-y-4">
              {placeholders.length === 0 ? (
                <p className="text-silver-dim font-body text-sm text-center py-6">
                  No placeholders in this template.
                </p>
              ) : (
                placeholders.map((p) => (
                  <div key={p}>
                    <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">
                      {p}
                    </label>
                    <input
                      type="text"
                      value={values[p] || ''}
                      onChange={(e) => setValues((v) => ({ ...v, [p]: e.target.value }))}
                      placeholder={`Enter ${p}`}
                      className="form-input w-full bg-charcoal px-4 py-3 font-body text-sm text-platinum"
                    />
                  </div>
                ))
              )}
              <button
                onClick={handleGenerate}
                className="w-full mt-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3.5 rounded-full hover:bg-silver transition-colors"
              >
                Generate Email
              </button>
            </div>
          </div>

          <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-2">
              <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">
                Live Preview
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-platinum/50 ml-auto" />
            </div>
            <div className="p-6">
              <div className="flex gap-1.5 mb-4">
                {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="border-b border-border pb-3 mb-4">
                <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/60 mb-0.5">
                  Subject
                </p>
                <p className="font-body text-platinum text-sm font-medium min-h-5">
                  {previewSubject || (
                    <span className="text-silver-dim/40 italic font-normal">Preview will appear here</span>
                  )}
                </p>
              </div>
              <div className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto min-h-16">
                {previewBody || (
                  <span className="text-silver-dim/40 italic">Fill in the details to see your email.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Output */}
      {activeTab === 'output' && (
        <div ref={outputRef}>
          {generated.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-silver-dim text-sm mb-6">No email generated yet.</p>
              <button
                onClick={() => setActiveTab('fill')}
                className="inline-flex items-center gap-2 border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all"
              >
                Go back and fill details
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">
                  {generated.length} email generated
                </p>
                <button
                  onClick={copyAll}
                  className={cn(
                    'font-body text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-200',
                    allCopied
                      ? 'border-platinum/30 bg-platinum/10 text-platinum'
                      : 'border-border-md text-silver-dim hover:border-silver hover:text-platinum',
                  )}
                >
                  {allCopied ? 'Copied' : 'Copy All'}
                </button>
              </div>

              <div className="space-y-4">
                {generated.map((email, idx) => (
                  <div key={idx} className="glass-dark border border-border rounded-[20px] overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-0.5">
                          Subject
                        </p>
                        <p className="font-body text-platinum text-sm font-medium truncate">{email.subject}</p>
                      </div>
                      <button
                        onClick={() => copyEmail(idx)}
                        className={cn(
                          'flex-shrink-0 ml-4 font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-all duration-200',
                          email.copied
                            ? 'border-platinum/30 bg-platinum/10 text-platinum'
                            : 'border-border text-silver-dim hover:border-silver-dim hover:text-silver',
                        )}
                      >
                        {email.copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="px-6 py-5 font-body text-silver text-sm leading-relaxed whitespace-pre-wrap">
                      {email.body}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-border">
                <button
                  onClick={() => setActiveTab('fill')}
                  className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => {
                    setActiveTab('template')
                    setGenerated([])
                  }}
                  className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all"
                >
                  New Template
                </button>

                <div className="ml-auto glass border border-border rounded-[16px] px-5 py-3 flex items-center gap-4">
                  <div>
                    <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim mb-0.5">
                      Want to send 1,000+ at once?
                    </p>
                    <p className="font-body text-platinum text-xs">
                      Upload a CSV and generate bulk personalised emails with Pro.
                    </p>
                  </div>
                  <a
                    href="/contact"
                    className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-[0.65rem] tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-silver transition-colors"
                  >
                    Get Pro
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}