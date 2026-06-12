'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { Plan, Profile } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface Template {
  id: string
  name: string
  category: string
  subject: string
  body: string
  proOnly: boolean
}

interface GeneratedEmail {
  index: number
  subject: string
  body: string
  copied: boolean
}

const ALL_TEMPLATES: Template[] = [
  { id: 'cold-outreach', name: 'Cold Outreach', category: 'Sales', proOnly: false,
    subject: 'Quick question about [Company]',
    body: 'Hi [Name],\n\nI came across [Company] and was impressed by what you are building in [Industry].\n\nWe help companies like yours streamline outreach at scale. I would love to show you how.\n\nWould you be open to a 15-minute call this week?\n\nBest,\n[Sender]' },
  { id: 'follow-up', name: 'Follow-Up', category: 'Sales', proOnly: false,
    subject: 'Following up - [Company]',
    body: 'Hi [Name],\n\nJust following up on my previous note about [Topic].\n\nI know things get busy. Would a quick call work?\n\nBest,\n[Sender]' },
  { id: 'partnership', name: 'Partnership Proposal', category: 'Networking', proOnly: false,
    subject: 'Partnership opportunity - [Company]',
    body: 'Hi [Name],\n\nI am reaching out because I believe there is a meaningful alignment between [Company] and our work.\n\nWe are both committed to [SharedGoal] and I think a partnership could create real value.\n\nWould you be open to an exploratory conversation?\n\nWarm regards,\n[Sender]' },
  { id: 'job-offer', name: 'Job Offer', category: 'HR', proOnly: true,
    subject: 'Offer Letter - [Position] at [Company]',
    body: 'Dear [Name],\n\nWe are delighted to offer you the position of [Position] at [Company].\n\nYour start date would be [StartDate], with compensation of [Salary].\n\nPlease confirm your acceptance by [Deadline].\n\nWe look forward to welcoming you to the team.\n\nSincerely,\n[Sender]' },
  { id: 'onboarding', name: 'Client Onboarding', category: 'Customer Success', proOnly: true,
    subject: 'Welcome to [Company], [Name]!',
    body: 'Hi [Name],\n\nWelcome aboard! We are thrilled to have [ClientCompany] as a partner.\n\nHere is what happens next:\n1. Your account is being set up\n2. You will receive login details within 24 hours\n3. Your dedicated contact is [ContactName]\n\nDo not hesitate to reach out.\n\nBest,\n[Sender]' },
  { id: 'product-launch', name: 'Product Launch', category: 'Marketing', proOnly: true,
    subject: 'Introducing [Product] - built for [Industry]',
    body: 'Hi [Name],\n\nWe just launched [Product] and thought of you immediately.\n\n[Product] helps [Industry] teams [Benefit] and we are seeing incredible early results.\n\nI would love to give you a private walkthrough. Are you free this week?\n\nBest,\n[Sender]' },
  { id: 'demo-request', name: 'Demo Request', category: 'Sales', proOnly: true,
    subject: 'Demo request - [Product] for [Company]',
    body: 'Hi [Name],\n\nI wanted to personally reach out and invite [Company] to a private demo of [Product].\n\nIn 20 minutes I can show you exactly how we help [Industry] teams [Benefit].\n\nWhen works best for you this week?\n\nBest,\n[Sender]' },
  { id: 'networking-conference', name: 'Conference Follow-Up', category: 'Networking', proOnly: true,
    subject: 'Great meeting you at [Event]',
    body: 'Hi [Name],\n\nIt was great meeting you at [Event]. I really enjoyed our conversation about [Topic].\n\nI would love to continue the discussion. Are you free for a quick call this week?\n\nBest,\n[Sender]' },
  { id: 'feedback-request', name: 'Feedback Request', category: 'Customer Success', proOnly: true,
    subject: 'Quick question about your experience, [Name]',
    body: 'Hi [Name],\n\nI hope things are going well! I wanted to check in and hear how [Product] has been working for [Company].\n\nWould you be open to sharing a few thoughts? It only takes 5 minutes and helps us improve.\n\nThank you,\n[Sender]' },
  { id: 'webinar-invite', name: 'Webinar Invite', category: 'Marketing', proOnly: true,
    subject: 'You are invited - [WebinarName] on [Date]',
    body: 'Hi [Name],\n\nI wanted to personally invite you to our upcoming webinar: [WebinarName].\n\nDate: [Date] at [Time]\nWhat you will learn: [Benefit]\n\nSpots are limited. Reserve yours here: [Link]\n\nSee you there,\n[Sender]' },
]

function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g) || []
  const keys = matches.map((m) => m.slice(1, -1))
  return keys.filter((item, index) => keys.indexOf(item) === index)
}

function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\[([^\]]+)\]/g, (_, key) => values[key] || `[${key}]`)
}

const PRO_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Pro%20Plan%20Upgrade%20Request&body=Hi%2C%20I%20would%20like%20to%20upgrade%20to%20the%20Pro%20plan.'

export function EmailGeneratorTool() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authChecking, setAuthChecking] = useState(true)

  const [selectedTemplate, setSelectedTemplate] = useState<Template>(ALL_TEMPLATES[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [generated, setGenerated] = useState<GeneratedEmail[]>([])
  const [activeTab, setActiveTab] = useState<'template' | 'fill' | 'output'>('template')
  const [allCopied, setAllCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      if (data.session?.user) fetchProfile(data.session.user.id)
      else setAuthChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setAuthChecking(false) }
    })
    return () => { listener.subscription.unsubscribe() }
  }, [])

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data ?? null)
    setAuthChecking(false)
  }

  async function logUsage(action: string) {
    if (!user) return
    await supabase.from('usage_logs').insert({ user_id: user.id, action })
  }

  const plan: Plan = profile?.plan ?? 'free'
  const isPro = plan === 'pro'

  const visibleTemplates = isPro
    ? ALL_TEMPLATES
    : ALL_TEMPLATES.filter((t) => !t.proOnly)

  const placeholders = extractPlaceholders(`${selectedTemplate.subject} ${selectedTemplate.body}`)
  const previewSubject = fillPlaceholders(selectedTemplate.subject, values)
  const previewBody = fillPlaceholders(selectedTemplate.body, values)

  function selectTemplate(t: Template) {
    if (t.proOnly && !isPro) return
    setSelectedTemplate(t)
    setValues({})
    setGenerated([])
    setActiveTab('fill')
  }

  async function handleGenerate() {
    setGenerated([{ index: 0, subject: previewSubject, body: previewBody, copied: false }])
    setActiveTab('output')
    await logUsage('generate_email')
    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const copyEmail = useCallback((idx: number) => {
    const email = generated[idx]
    if (!email) return
    navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`)
    setGenerated((prev) => prev.map((e, i) => (i === idx ? { ...e, copied: true } : e)))
    setTimeout(() => setGenerated((prev) => prev.map((e, i) => (i === idx ? { ...e, copied: false } : e))), 2000)
  }, [generated])

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

  if (authChecking) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-6 h-6 rounded-full border-2 border-silver-dim border-t-platinum animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <section className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="glass-dark border border-border rounded-[24px] p-10">
          <h2
            className="text-platinum mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            Sign in to generate emails
          </h2>
          <p className="font-body text-silver-dim text-sm leading-relaxed mb-8">
            Create a free account to start generating professional emails instantly. Pro plan unlocks all 10+ templates and bulk CSV generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/account" className="inline-flex items-center justify-center bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">
              Sign In
            </a>
            <a href="/account" className="inline-flex items-center justify-center border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">
              Create Free Account
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Plan badge */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <span className={cn(
            'font-body text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border',
            isPro ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim'
          )}>
            {isPro ? 'Pro Plan' : 'Free Plan'}
          </span>
          <span className="font-body text-silver-dim text-xs">{user.email}</span>
        </div>
        {!isPro && (
          <a href={PRO_MAILTO} className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-platinum text-charcoal font-medium hover:bg-silver transition-colors">
            Upgrade to Pro
          </a>
        )}
      </div>

      {/* Step tabs */}
      <div className="flex items-center gap-1 mb-12 p-1 rounded-full border border-border bg-charcoal-2 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-300',
              activeTab === tab.key ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum'
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
            {visibleTemplates.length} templates available &mdash; {isPro ? 'All Pro templates unlocked' : 'Upgrade for 10+ templates'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_TEMPLATES.map((t) => {
              const locked = t.proOnly && !isPro
              return (
                <button
                  key={t.id}
                  onClick={() => selectTemplate(t)}
                  disabled={locked}
                  className={cn(
                    'glass-dark text-left p-6 rounded-[20px] border transition-all duration-300',
                    locked ? 'opacity-40 cursor-not-allowed' : '',
                    !locked && selectedTemplate.id === t.id ? 'border-platinum/30 bg-charcoal-3' : '',
                    !locked && selectedTemplate.id !== t.id ? 'border-border hover:border-border-md hover:bg-charcoal-2' : ''
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-body text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border border-border text-silver-dim">
                      {t.category}
                    </span>
                    {locked && <span className="font-body text-[0.5rem] tracking-[0.15em] uppercase px-2 py-1 rounded-full bg-charcoal-3 text-silver-dim border border-border">Pro</span>}
                    {!locked && selectedTemplate.id === t.id && <span className="w-2 h-2 rounded-full bg-platinum mt-1 flex-shrink-0" />}
                  </div>
                  <h3 className="font-body font-medium text-platinum text-sm mb-2">{t.name}</h3>
                  <p className="font-body text-silver-dim text-xs leading-relaxed line-clamp-2">{t.subject}</p>
                </button>
              )
            })}
          </div>

          {!isPro && (
            <div className="mt-8 glass border border-border rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-body font-medium text-platinum text-sm mb-1">Unlock all templates</p>
                <p className="font-body text-silver-dim text-xs">Get the Pro plan to access HR, Customer Success, Marketing and Networking templates.</p>
              </div>
              <a href={PRO_MAILTO} className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">
                Get Pro
              </a>
            </div>
          )}

          <div className="text-center mt-8">
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
              <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">Fill Placeholders</span>
              <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/50">{selectedTemplate.name}</span>
            </div>
            <div className="p-6 space-y-4">
              {placeholders.length === 0 ? (
                <p className="text-silver-dim font-body text-sm text-center py-6">No placeholders in this template.</p>
              ) : (
                placeholders.map((p) => (
                  <div key={p}>
                    <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">{p}</label>
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
              <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">Live Preview</span>
              <span className="w-1.5 h-1.5 rounded-full bg-platinum/50 ml-auto" />
            </div>
            <div className="p-6">
              <div className="flex gap-1.5 mb-4">
                {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div className="border-b border-border pb-3 mb-4">
                <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim/60 mb-0.5">Subject</p>
                <p className="font-body text-platinum text-sm font-medium min-h-5">
                  {previewSubject || <span className="text-silver-dim/40 italic font-normal">Preview will appear here</span>}
                </p>
              </div>
              <div className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto min-h-16">
                {previewBody || <span className="text-silver-dim/40 italic">Fill in the details to see your email.</span>}
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
              <button onClick={() => setActiveTab('fill')} className="border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">
                Go back and fill details
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim">{generated.length} email generated</p>
                <button
                  onClick={copyAll}
                  className={cn(
                    'font-body text-[0.65rem] tracking-[0.15em] uppercase px-5 py-2.5 rounded-full border transition-all duration-200',
                    allCopied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border-md text-silver-dim hover:border-silver hover:text-platinum'
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
                        <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-0.5">Subject</p>
                        <p className="font-body text-platinum text-sm font-medium truncate">{email.subject}</p>
                      </div>
                      <button
                        onClick={() => copyEmail(idx)}
                        className={cn(
                          'flex-shrink-0 ml-4 font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-all duration-200',
                          email.copied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim hover:border-silver-dim hover:text-silver'
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
                <button onClick={() => setActiveTab('fill')} className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all">
                  Edit Details
                </button>
                <button onClick={() => { setActiveTab('template'); setGenerated([]) }} className="font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all">
                  New Template
                </button>
                {!isPro && (
                  <div className="ml-auto glass border border-border rounded-[16px] px-5 py-3 flex items-center gap-4">
                    <div>
                      <p className="font-body text-[0.6rem] tracking-[0.15em] uppercase text-silver-dim mb-0.5">Want CSV bulk generation?</p>
                      <p className="font-body text-platinum text-xs">Generate thousands of personalised emails at once with Pro.</p>
                    </div>
                    <a href={PRO_MAILTO} className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-[0.65rem] tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-silver transition-colors">
                      Get Pro
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}