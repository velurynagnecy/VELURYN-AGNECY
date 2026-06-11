'use client'
import { useState, useCallback, useRef } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { sectionHeadingStyle } from '@/lib/typography'
import { cn } from '@/lib/utils'

/* â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Sample Templates (demo subset) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const DEMO_TEMPLATES: Template[] = [
  {
    id: 'cold-outreach',
    name: 'Cold Outreach',
    category: 'Sales',
    subject: 'Quick question about [Company]',
    body: `Hi [Name],\n\nI came across [Company] and was impressed by what you're building in [Industry].\n\nWe help companies like yours streamline outreach at scale â€” I'd love to show you how.\n\nWould you be open to a 15-minute call this week?\n\nBest,\n[Sender]`,
  },
  {
    id: 'follow-up',
    name: 'Follow-Up',
    category: 'Sales',
    subject: 'Following up â€” [Company]',
    body: `Hi [Name],\n\nJust following up on my previous note about [Topic].\n\nI know things get busy â€” happy to keep it brief. Would a quick call work?\n\nBest,\n[Sender]`,
  },
  {
    id: 'partnership',
    name: 'Partnership Proposal',
    category: 'Networking',
    subject: 'Partnership opportunity â€” [Company] Ã— VELURYN AGNECY',
    body: `Hi [Name],\n\nI'm reaching out because I believe there's a meaningful alignment between [Company] and VELURYN AGNECY.\n\nWe're both committed to [SharedGoal] â€” and I think a partnership could create real value for both sides.\n\nWould you be open to an exploratory conversation?\n\nWarm regards,\n[Sender]`,
  },
  {
    id: 'job-offer',
    name: 'Job Offer',
    category: 'HR',
    subject: 'Offer Letter â€” [Position] at [Company]',
    body: `Dear [Name],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nYour start date would be [StartDate], with compensation of [Salary].\n\nPlease confirm your acceptance by [Deadline].\n\nWe look forward to welcoming you to the team.\n\nSincerely,\n[Sender]`,
  },
  {
    id: 'onboarding',
    name: 'Client Onboarding',
    category: 'Customer Success',
    subject: 'Welcome to [Company], [Name]!',
    body: `Hi [Name],\n\nWelcome aboard! We're thrilled to have [ClientCompany] as a partner.\n\nHere's what happens next:\n1. Your account is being set up\n2. You'll receive login details within 24 hours\n3. Your dedicated contact is [ContactName]\n\nDon't hesitate to reach out â€” we're here for you.\n\nBest,\n[Sender]`,
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'Marketing',
    subject: 'Introducing [Product] â€” built for [Industry]',
    body: `Hi [Name],\n\nWe just launched [Product] and thought of you immediately.\n\n[Product] helps [Industry] teams [Benefit] â€” and we're seeing incredible early results.\n\nI'd love to give you a private walkthrough. Are you free this week?\n\nBest,\n[Sender]`,
  },
]

/* â”€â”€â”€ Utilities â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g) || []
  const unique = [...new Set(matches.map(m => m.slice(1, -1)))]
  return unique
}

function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\[([^\]]+)\]/g, (_, key) => values[key] || `[${key}]`)
}

/* â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function EmailGeneratorPage() {
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
    const email: GeneratedEmail = {
      index: 0,
      subject: previewSubject,
      body: previewBody,
      copied: false,
    }
    setGenerated([email])
    setActiveTab('output')
    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const copyEmail = useCallback((idx: number) => {
    const email = generated[idx]
    if (!email) return
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`)
    setGenerated(prev => prev.map((e, i) => i === idx ? { ...e, copied: true } : e))
    setTimeout(() => setGenerated(prev => prev.map((e, i) => i === idx ? { ...e, copied: false } : e)), 2000)
  }, [generated])

  const copyAll = useCallback(() => {
    const text = generated.map(e => `Subject: ${e.subject}\n\n${e.body}`).join('\n\n---\n\n')
    navigator.clipboard.writeText(text)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }, [generated])

  const categoryColors: Record<string, string> = {
    Sales: 'text-platinum border-platinum/20 bg-platinum/5',
    Marketing: 'text-silver border-silver/20 bg-silver/5',
    HR: 'text-silver-dim border-silver-dim/20 bg-silver-dim/5',
    Networking: 'text-platinum border-platinum/20 bg-platinum/5',
    'Customer Success': 'text-silver border-silver/20 bg-silver/5',
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-charcoal">

        {/* â”€â”€ Hero Banner â”€â”€ */}
        <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
          {/* radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-radial-silver opacity-40" />

          <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim mb-6">
            VELURYN AGNECY â€” VASD TOOLS
          </p>
          <h1
            className="text-platinum mb-6"
            style={{ ...sectionHeadingStyle, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Email Generator
          </h1>
          <p className="font-body text-silver-dim text-sm max-w-xl mx-auto leading-relaxed mb-10">
            Select a professional template, fill in your details, and generate a perfectly personalised email in seconds.
          </p>

          {/* Pro upsell pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-pill border border-border bg-charcoal-2 font-body text-[0.65rem] tracking-[0.15em] uppercase text-silver-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-platinum/40 inline-block" />
            Pro: CSV bulk generation + 30 templates
            <a href="/contact" className="text-platinum hover:underline ml-1">Upgrade â†’</a>
          </div>
        </section>

        <div className="divider" />

        {/* â”€â”€ Main Tool â”€â”€ */}
        <section className="max-w-6xl mx-auto px-6 py-20">

          {/* Step tabs */}
          <div className="flex items-center gap-1 mb-12 p-1 rounded-pill border border-border bg-charcoal-2 w-fit mx-auto">
            {(['template', 'fill', 'output'] as const).map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-2.5 rounded-pill transition-all duration-300',
                  activeTab === tab
                    ? 'bg-platinum text-charcoal font-medium'
                    : 'text-silver-dim hover:text-platinum'
                )}
              >
                {i + 1}. {tab === 'template' ? 'Choose Template' : tab === 'fill' ? 'Fill Details' : 'Your Email'}
              </button>
            ))}
          </div>

          {/* â”€â”€ Step 1: Template Picker â”€â”€ */}
          {activeTab === 'template' && (
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim text-center mb-8">
                {DEMO_TEMPLATES.length} templates included in demo &nbsp;Â·&nbsp; 30+ in Pro
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEMO_TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => selectTemplate(t)}
                    className={cn(
                      'glass-dark text-left p-6 rounded-[20px] border transition-all duration-300 group',
                      selectedTemplate.id === t.id
                        ? 'border-platinum/30 bg-charcoal-3'
                        : 'border-border hover:border-border-md hover:bg-charcoal-2'
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={cn(
                        'font-body text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-pill border',
                        categoryColors[t.category] || 'text-silver-dim border-border bg-transparent'
                      )}>
                        {t.category}
                      </span>
                      {selectedTemplate.id === t.id && (
                        <span className="w-2 h-2 rounded-full bg-platinum mt-1 flex-shrink-0" />
                      )}
                    </div>
                    <h3 className="font-body font-medium text-platinum text-sm mb-2 group-hover:text-platinum transition-colors">
                      {t.name}
                    </h3>
                    <p className="font-body text-silver-dim text-xs leading-relaxed line-clamp-2">
                      {t.subject}
                    </p>
                  </button>
                ))}
              </div>
              <div className="text-center mt-10">
                <button
                  onClick={() => setActiveTab('fill')}
                  className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-pill hover:bg-silver transition-colors"
                >
                  Continue with "{selectedTemplate.name}" â†’
                </button>
              </div>
            </div>
          )}

          {/* â”€â”€ Step 2: Fill Details â”€â”€ */}
          {activeTab === 'fill' && (
            <div className="grid lg:grid-cols-2 gap-8">

              {/* Left: Inputs */}
              <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">
                    Fill Placeholders
                  </span>
                  <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/60">
                    {selectedTemplate.name}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  {placeholders.length === 0 ? (
                    <p className="text-silver-dim font-body text-sm text-center py-6">
                      No placeholders in this template.
                    </p>
                  ) : (
                    placeholders.map(p => (
                      <div key={p}>
                        <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">
                          {p}
                        </label>
                        <input
                          type="text"
                          value={values[p] || ''}
                          onChange={e => setValues(v => ({ ...v, [p]: e.target.value }))}
                          placeholder={`Enter ${p}â€¦`}
                          className="form-input w-full bg-charcoal px-4 py-3 font-body text-sm text-platinum placeholder-silver-dim/40"
                        />
                      </div>
                    ))
                  )}
                  <button
                    onClick={handleGenerate}
                    className="w-full mt-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3.5 rounded-pill hover:bg-silver transition-colors"
                  >
                    Generate Email
                  </button>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">
                    Live Preview
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-platinum/50 ml-auto" />
                </div>
                <div className="p-6">
                  {/* Fake email client chrome */}
                  <div className="flex gap-1.5 mb-4">
                    {['#ef4444','#f59e0b','#22c55e'].map(c => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="border-b border-border pb-3 mb-4">
                    <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/60 mb-0.5">Subject</p>
                    <p className="font-body text-platinum text-sm font-medium">
                      {previewSubject || <span className="text-silver-dim/40 italic">Preview will appear hereâ€¦</span>}
                    </p>
                  </div>
                  <div className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                    {previewBody || <span className="text-silver-dim/40 italic">Fill in the details on the left to see your email.</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* â”€â”€ Step 3: Output â”€â”€ */}
          {activeTab === 'output' && (
            <div ref={outputRef}>
              {generated.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-body text-silver-dim text-sm mb-6">No email generated yet.</p>
                  <button
                    onClick={() => setActiveTab('fill')}
                    className="inline-flex items-center gap-2 border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-pill hover:border-silver hover:text-platinum transition-all"
                  >
                    â† Go back and fill details
                  </button>
                </div>
              ) : (
                <>
                  {/* Header + copy all */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">
                      {generated.length} email generated
                    </p>
                    <button
                      onClick={copyAll}
                      className={cn(
                        'font-body text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-pill border transition-all duration-200',
                        allCopied
                          ? 'border-platinum/30 bg-platinum/10 text-platinum'
                          : 'border-border-md text-silver-dim hover:border-silver hover:text-platinum'
                      )}
                    >
                      {allCopied ? 'âœ“ Copied' : 'Copy All'}
                    </button>
                  </div>

                  {/* Email cards */}
                  <div className="space-y-4">
                    {generated.map((email, idx) => (
                      <div
                        key={idx}
                        className="glass-dark border border-border rounded-[20px] overflow-hidden"
                      >
                        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                          <div>
                            <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-0.5">
                              Subject
                            </p>
                            <p className="font-body text-platinum text-sm font-medium">
                              {email.subject}
                            </p>
                          </div>
                          <button
                            onClick={() => copyEmail(idx)}
                            className={cn(
                              'flex-shrink-0 ml-4 font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-pill border transition-all duration-200',
                              email.copied
                                ? 'border-platinum/30 bg-platinum/10 text-platinum'
                                : 'border-border text-silver-dim hover:border-silver-dim hover:text-silver'
                            )}
                          >
                            {email.copied ? 'âœ“ Copied' : 'Copy'}
                          </button>
                        </div>
                        <div className="px-6 py-5 font-body text-silver text-sm leading-relaxed whitespace-pre-wrap">
                          {email.body}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-border">
                    <button
                      onClick={() => { setActiveTab('fill') }}
                      className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-pill border border-border-md text-silver hover:border-silver hover:text-platinum transition-all"
                    >
                      â† Edit Details
                    </button>
                    <button
                      onClick={() => { setActiveTab('template'); setGenerated([]) }}
                      className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-pill border border-border-md text-silver hover:border-silver hover:text-platinum transition-all"
                    >
                      New Template
                    </button>

                    {/* Pro CTA */}
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
                        className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-[0.65rem] tracking-widest uppercase px-5 py-2.5 rounded-pill hover:bg-silver transition-colors"
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

        <div className="divider" />

        {/* â”€â”€ Pro Feature Preview â”€â”€ */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4">Pro Features</p>
          <h2
            className="text-platinum mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Scale Without Limits
          </h2>
          <p className="font-body text-silver-dim text-sm max-w-lg mx-auto mb-14 leading-relaxed">
            The free demo lets you generate one email at a time. Pro unlocks everything â€” CSV uploads, 30 templates, and 5 export formats.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-left mb-12">
            {[
              { icon: 'âŠŸ', title: '30 Templates', desc: 'Across Sales, HR, Marketing, Customer Success, Networking & Internal.' },
              { icon: 'âŠž', title: 'CSV Bulk Generation', desc: 'Upload thousands of contacts and personalise every single email instantly.' },
              { icon: 'âŠ•', title: '5 Export Formats', desc: 'CSV, Excel, JSON, ZIP text files, or copy all to clipboard in one click.' },
            ].map(f => (
              <div key={f.title} className="glass-dark border border-border rounded-[20px] p-6">
                <div className="text-platinum/60 text-2xl mb-3">{f.icon}</div>
                <h3 className="font-body font-medium text-platinum text-sm mb-2">{f.title}</h3>
                <p className="font-body text-silver-dim text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-pill hover:bg-silver transition-colors"
          >
            Get Pro Access
          </a>
        </section>

      </main>

      <Footer />
    </>
  )
}
