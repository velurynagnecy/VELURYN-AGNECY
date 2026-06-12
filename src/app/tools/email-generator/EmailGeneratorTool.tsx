'use client'

import { useState, useCallback, useRef, useEffect, ChangeEvent } from 'react'
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

const DEMO_LIMIT = 3
const PRO_KEY = 'va_email_pro_access'
const DEMO_COUNT_KEY = 'va_email_demo_count'
const PRO_ACCESS_CODE = 'VELURYNPRO2026'

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
  {
    id: 'internal-announcement',
    name: 'Internal Announcement',
    category: 'Internal',
    subject: 'Update: [Topic]',
    body: 'Hi team,\n\nWanted to share an update on [Topic].\n\n[Details]\n\nIf you have any questions, reach out to [ContactName].\n\nThanks,\n[Sender]',
  },
  {
    id: 'event-invite',
    name: 'Event Invitation',
    category: 'Marketing',
    subject: 'You are invited - [EventName]',
    body: 'Hi [Name],\n\nWe are hosting [EventName] on [Date] and would love for you to join.\n\n[EventDetails]\n\nLet us know if you can make it.\n\nBest,\n[Sender]',
  },
  {
    id: 'renewal-reminder',
    name: 'Renewal Reminder',
    category: 'Customer Success',
    subject: 'Your [Plan] plan renews soon',
    body: 'Hi [Name],\n\nJust a reminder that your [Plan] plan with [Company] renews on [RenewalDate].\n\nNo action is needed if everything looks good. If you would like to make changes, reply to this email.\n\nBest,\n[Sender]',
  },
]

function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g) || []
  const keys = matches.map((m) => m.slice(1, -1))
  return keys.filter((item, index) => keys.indexOf(item) === index)
}

function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\[([^\]]+)\]/g, (_, key) => {
    const match = Object.keys(values).find((k) => k.toLowerCase() === key.toLowerCase())
    return (match ? values[match] : '') || `[${key}]`
  })
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function EmailGeneratorTool() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(DEMO_TEMPLATES[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [generated, setGenerated] = useState<GeneratedEmail[]>([])
  const [activeTab, setActiveTab] = useState<'template' | 'fill' | 'bulk' | 'output'>('template')
  const [allCopied, setAllCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isPro, setIsPro] = useState(false)
  const [demoCount, setDemoCount] = useState(0)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)

  useEffect(() => {
    setIsPro(localStorage.getItem(PRO_KEY) === 'true')
    setDemoCount(Number(localStorage.getItem(DEMO_COUNT_KEY) || '0'))
  }, [])

  const placeholders = extractPlaceholders(`${selectedTemplate.subject} ${selectedTemplate.body}`)
  const previewSubject = fillPlaceholders(selectedTemplate.subject, values)
  const previewBody = fillPlaceholders(selectedTemplate.body, values)
  const remaining = Math.max(DEMO_LIMIT - demoCount, 0)

  function selectTemplate(t: Template) {
    setSelectedTemplate(t)
    setValues({})
    setGenerated([])
    setActiveTab('fill')
  }

  function unlockPro() {
    if (codeInput.trim().toUpperCase() === PRO_ACCESS_CODE) {
      localStorage.setItem(PRO_KEY, 'true')
      setIsPro(true)
      setShowUpgrade(false)
      setCodeError(false)
      setCodeInput('')
    } else {
      setCodeError(true)
    }
  }

  function handleGenerate() {
    if (!isPro && demoCount >= DEMO_LIMIT) {
      setShowUpgrade(true)
      return
    }
    setGenerated([{ index: 0, subject: previewSubject, body: previewBody, copied: false }])
    setActiveTab('output')
    if (!isPro) {
      const next = demoCount + 1
      setDemoCount(next)
      localStorage.setItem(DEMO_COUNT_KEY, String(next))
    }
    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function handleCSVUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!isPro) {
      setShowUpgrade(true)
      return
    }
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '').trim()
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
      if (lines.length < 2) return
      const headers = lines[0].split(',').map((h) => h.trim())
      const rows = lines.slice(1).map((line) => line.split(',').map((c) => c.trim()))
      const emails: GeneratedEmail[] = rows.map((row, i) => {
        const rowValues: Record<string, string> = {}
        headers.forEach((h, idx) => {
          rowValues[h] = row[idx] || ''
        })
        return {
          index: i,
          subject: fillPlaceholders(selectedTemplate.subject, rowValues),
          body: fillPlaceholders(selectedTemplate.body, rowValues),
          copied: false,
        }
      })
      setGenerated(emails)
      setActiveTab('output')
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
    reader.readAsText(file)
    if (fileInputRef.current) fileInputRef.current.value = ''
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

  function exportAs(format: 'txt' | 'csv' | 'json') {
    if (!isPro) {
      setShowUpgrade(true)
      return
    }
    if (format === 'txt') {
      const text = generated.map((e) => `Subject: ${e.subject}\n\n${e.body}`).join('\n\n---\n\n')
      downloadFile('emails.txt', text, 'text/plain')
    } else if (format === 'json') {
      const data = generated.map(({ index, subject, body }) => ({ index, subject, body }))
      downloadFile('emails.json', JSON.stringify(data, null, 2), 'application/json')
    } else {
      const esc = (s: string) => `"${s.replace(/"/g, '""').replace(/\n/g, ' ')}"`
      const rows = ['subject,body', ...generated.map((e) => `${esc(e.subject)},${esc(e.body)}`)]
      downloadFile('emails.csv', rows.join('\n'), 'text/csv')
    }
  }

  const tabs = [
    { key: 'template' as const, label: '1. Choose Template' },
    { key: 'fill' as const, label: '2. Fill Details' },
    { key: 'bulk' as const, label: 'Bulk (CSV)' },
    { key: 'output' as const, label: '3. Your Email' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 relative">
      {/* Status bar */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        {isPro ? (
          <span className="inline-flex items-center gap-2 font-body text-[0.6rem] tracking-[0.25em] uppercase px-4 py-2 rounded-full border border-platinum/30 bg-platinum/10 text-platinum">
            <span className="w-1.5 h-1.5 rounded-full bg-platinum inline-block" />
            Pro Unlocked
          </span>
        ) : (
          <>
            <span className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">
              {remaining} of {DEMO_LIMIT} free generations remaining
            </span>
            <button
              onClick={() => setShowUpgrade(true)}
              className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-platinum hover-underline"
            >
              Have an access code?
            </button>
          </>
        )}
      </div>

      {/* Step tabs */}
      <div className="flex items-center gap-1 mb-12 p-1 rounded-full border border-border bg-charcoal-2 w-fit mx-auto flex-wrap justify-center">
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
            {tab.key === 'bulk' && !isPro && (
              <span className="ml-1.5 text-[0.55rem] opacity-60">(Pro)</span>
            )}
          </button>
        ))}
      </div>

      {/* Step 1: Pick Template */}
      {activeTab === 'template' && (
        <div>
          <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim text-center mb-8">
            {DEMO_TEMPLATES.length} professional templates included
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
              {!isPro && (
                <p className="text-center font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/60">
                  {remaining} of {DEMO_LIMIT} free generations remaining
                </p>
              )}
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

      {/* Bulk CSV tab */}
      {activeTab === 'bulk' && (
        <div className="max-w-2xl mx-auto">
          {isPro ? (
            <div className="glass-dark border border-border rounded-[24px] p-8 text-center">
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-3">
                Bulk Generation
              </p>
              <h3
                className="text-platinum mb-4"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300 }}
              >
                Upload a CSV
              </h3>
              <p className="font-body text-silver-dim text-sm leading-relaxed mb-6">
                Using template <span className="text-platinum">{selectedTemplate.name}</span>. Your CSV columns
                should match these placeholders (case insensitive):
              </p>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {placeholders.length === 0 ? (
                  <span className="font-body text-silver-dim text-xs italic">This template has no placeholders.</span>
                ) : (
                  placeholders.map((p) => (
                    <span
                      key={p}
                      className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border border-border text-silver-dim"
                    >
                      {p}
                    </span>
                  ))
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors cursor-pointer"
              >
                Choose CSV File
              </label>
              <p className="font-body text-silver-dim/60 text-xs mt-4">
                First row must be column headers. One generated email per row.
              </p>
            </div>
          ) : (
            <div className="glass-dark border border-border rounded-[24px] p-8 text-center">
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-3">
                Pro Feature
              </p>
              <h3
                className="text-platinum mb-4"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300 }}
              >
                CSV Bulk Generation
              </h3>
              <p className="font-body text-silver-dim text-sm leading-relaxed mb-8 max-w-md mx-auto">
                Upload a CSV of contacts and generate a personalised email for every row in one click. Unlock
                Pro for unlimited generations, bulk CSV import, and export to TXT, CSV, or JSON.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors"
                >
                  Get Pro Access
                </a>
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3.5 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all"
                >
                  Enter Access Code
                </button>
              </div>
            </div>
          )}
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
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">
                  {generated.length} email{generated.length > 1 ? 's' : ''} generated
                </p>
                <div className="flex items-center gap-2 flex-wrap">
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
                  {(['txt', 'csv', 'json'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => exportAs(fmt)}
                      className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-platinum transition-all duration-200"
                    >
                      .{fmt}
                      {!isPro && <span className="ml-1 text-[0.55rem] opacity-60">(Pro)</span>}
                    </button>
                  ))}
                </div>
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

                {!isPro && (
                  <div className="ml-auto glass border border-border rounded-[16px] px-5 py-3 flex items-center gap-4">
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim mb-0.5">
                        Want unlimited and bulk CSV?
                      </p>
                      <p className="font-body text-platinum text-xs">
                        Upgrade to Pro for unlimited generations, CSV bulk import and export formats.
                      </p>
                    </div>
                    <a
                      href="/contact"
                      className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-[0.65rem] tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-silver transition-colors"
                    >
                      Get Pro
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Upgrade / Access code overlay */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm px-6">
          <div className="glass-dark border border-border rounded-[24px] p-8 max-w-md w-full text-center">
            <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-3">
              {demoCount >= DEMO_LIMIT && !isPro ? 'Demo Limit Reached' : 'Unlock Pro'}
            </p>
            <h3
              className="text-platinum mb-4"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300 }}
            >
              Upgrade to Pro
            </h3>
            <p className="font-body text-silver-dim text-sm mb-6 leading-relaxed">
              Pro unlocks unlimited generations, CSV bulk import, and export to TXT, CSV, or JSON.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors"
            >
              Get Pro Access
            </a>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-3">
                Already purchased? Enter your access code
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => {
                    setCodeInput(e.target.value)
                    setCodeError(false)
                  }}
                  placeholder="Access code"
                  className="form-input flex-1 bg-charcoal px-4 py-2.5 font-body text-sm text-platinum"
                />
                <button
                  onClick={unlockPro}
                  className="bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-silver transition-colors flex-shrink-0"
                >
                  Unlock
                </button>
              </div>
              {codeError && (
                <p className="font-body text-red-400 text-xs mt-2">
                  Invalid code. Check your confirmation email or contact us.
                </p>
              )}
            </div>
            <button
              onClick={() => setShowUpgrade(false)}
              className="mt-6 font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim hover:text-platinum transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
