'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

/* Types */
interface Template { id: string; name: string; category: string; subject: string; body: string; proOnly: boolean }
interface GeneratedEmail { index: number; to: string; subject: string; body: string; copied: boolean }
type Tab = 'template' | 'generate' | 'results'
type Mode = 'single' | 'bulk'

/* 20 Templates - 5 free + 15 pro */
const ALL_TEMPLATES: Template[] = [
  { id: 't01', proOnly: false, name: 'Cold Outreach', category: 'Sales',
    subject: 'Quick question about [Company]',
    body: 'Hi [Name],\n\nI came across [Company] and was genuinely impressed by what you are building in [Industry].\n\nWe help companies like yours [Benefit]. I would love to show you how.\n\nWould you be open to a 15-minute call this week?\n\nBest,\n[Sender]' },
  { id: 't02', proOnly: false, name: 'Follow-Up', category: 'Sales',
    subject: 'Following up - [Company]',
    body: 'Hi [Name],\n\nJust following up on my previous note about [Topic].\n\nI know things get busy. Even a quick 10-minute call could be valuable.\n\nAre you free this week?\n\nBest,\n[Sender]' },
  { id: 't03', proOnly: false, name: 'Partnership Proposal', category: 'Networking',
    subject: 'Partnership opportunity - [Company]',
    body: 'Hi [Name],\n\nI am reaching out because I see a meaningful alignment between [Company] and us.\n\nWe are both focused on [SharedGoal] and I think a partnership could create real value for both sides.\n\nWould you be open to a conversation?\n\nWarm regards,\n[Sender]' },
  { id: 't04', proOnly: false, name: 'Introduction', category: 'Networking',
    subject: 'Introduction - [YourName] at [YourCompany]',
    body: 'Hi [Name],\n\nI am [YourName] from [YourCompany]. I found your work at [Company] in [Industry] very impressive.\n\nI would love to connect and explore how we might help each other.\n\nLooking forward to hearing from you.\n\n[YourName]' },
  { id: 't05', proOnly: false, name: 'Thank You', category: 'General',
    subject: 'Thank you, [Name]',
    body: 'Hi [Name],\n\nI just wanted to take a moment to thank you for [Reason]. It meant a lot.\n\n[PersonalNote]\n\nI look forward to staying in touch.\n\nWarm regards,\n[Sender]' },
  { id: 't06', proOnly: true, name: 'Demo Request', category: 'Sales',
    subject: 'Private demo - [Product] for [Company]',
    body: 'Hi [Name],\n\nI wanted to personally invite [Company] to a private demo of [Product].\n\nIn 20 minutes I can show you exactly how we help [Industry] teams [Benefit].\n\nWhen works best for you this week?\n\nBest,\n[Sender]' },
  { id: 't07', proOnly: true, name: 'Renewal Reminder', category: 'Sales',
    subject: 'Your [Product] subscription renews on [Date]',
    body: 'Hi [Name],\n\nI wanted to give you a heads-up that your [Product] subscription renews on [Date].\n\nIf you have any questions or want to discuss your plan, I am happy to jump on a call.\n\nThank you for your continued trust.\n\n[Sender]' },
  { id: 't08', proOnly: true, name: 'Job Offer', category: 'HR',
    subject: 'Offer Letter - [Position] at [Company]',
    body: 'Dear [Name],\n\nWe are delighted to offer you the position of [Position] at [Company], starting [StartDate].\n\nCompensation: [Salary]\nLocation: [Location]\n\nPlease confirm your acceptance by [Deadline].\n\nWe look forward to welcoming you.\n\nSincerely,\n[Sender]' },
  { id: 't09', proOnly: true, name: 'Interview Invite', category: 'HR',
    subject: 'Interview invitation - [Position] at [Company]',
    body: 'Dear [Name],\n\nThank you for applying for the [Position] role at [Company].\n\nWe would like to invite you to an interview on [Date] at [Time] with [Interviewer].\n\nPlease confirm your availability.\n\nBest,\n[Sender]' },
  { id: 't10', proOnly: true, name: 'Rejection Letter', category: 'HR',
    subject: 'Your application at [Company]',
    body: 'Dear [Name],\n\nThank you for your interest in the [Position] position at [Company] and the time you invested in our process.\n\nAfter careful consideration, we have decided to move forward with another candidate.\n\nWe will keep your profile on file for future opportunities.\n\nWarm regards,\n[Sender]' },
  { id: 't11', proOnly: true, name: 'Client Onboarding', category: 'Customer Success',
    subject: 'Welcome to [Company], [Name]!',
    body: 'Hi [Name],\n\nWelcome aboard! We are thrilled to have [ClientCompany] as a client.\n\nWhat happens next:\n1. Your account is being configured\n2. Login details will arrive within 24 hours\n3. Your dedicated contact is [ContactName]\n\nDo not hesitate to reach out.\n\nBest,\n[Sender]' },
  { id: 't12', proOnly: true, name: 'Feedback Request', category: 'Customer Success',
    subject: 'Quick question about your experience, [Name]',
    body: 'Hi [Name],\n\nI hope things are going well. I wanted to check in on how [Product] has been working for [Company].\n\nCould you spare 5 minutes to share your thoughts? Your feedback shapes what we build next.\n\nYou can reply here or book time: [Link]\n\nThank you,\n[Sender]' },
  { id: 't13', proOnly: true, name: 'Product Launch', category: 'Marketing',
    subject: 'Introducing [Product] - built for [Industry]',
    body: 'Hi [Name],\n\nWe just launched [Product] and thought of you immediately.\n\n[Product] helps [Industry] teams [Benefit]. We are seeing incredible early results.\n\nI would love to give you a private walkthrough. Are you free this week?\n\nBest,\n[Sender]' },
  { id: 't14', proOnly: true, name: 'Webinar Invite', category: 'Marketing',
    subject: 'You are invited: [WebinarName] on [Date]',
    body: 'Hi [Name],\n\nI wanted to personally invite you to our upcoming webinar: [WebinarName].\n\nDate: [Date] at [Time]\nKey takeaway: [KeyTakeaway]\n\nSpots are limited. Register here: [Link]\n\nSee you there,\n[Sender]' },
  { id: 't15', proOnly: true, name: 'Case Study Share', category: 'Marketing',
    subject: 'How [ClientName] achieved [Result] with [Product]',
    body: 'Hi [Name],\n\nWe recently helped [ClientName] achieve [Result] using [Product].\n\nGiven that [Company] operates in a similar space, I thought the approach might resonate.\n\nFull case study: [Link]\n\nHappy to walk you through the specifics.\n\n[Sender]' },
  { id: 't16', proOnly: true, name: 'Conference Follow-Up', category: 'Networking',
    subject: 'Great meeting you at [Event]',
    body: 'Hi [Name],\n\nIt was a genuine pleasure meeting you at [Event]. Our conversation about [Topic] stuck with me.\n\nI would love to continue the discussion. Are you free for a quick call next week?\n\nBest,\n[Sender]' },
  { id: 't17', proOnly: true, name: 'Referral Request', category: 'Networking',
    subject: 'A quick favour, [Name]',
    body: 'Hi [Name],\n\nI hope you are well. I wanted to ask if you know anyone at [TargetCompany] who handles [Department].\n\nI am working on something that could genuinely help them, and a warm introduction would mean the world.\n\nNo worries at all if not.\n\nBest,\n[Sender]' },
  { id: 't18', proOnly: true, name: 'Mentorship Request', category: 'Networking',
    subject: 'Mentorship request - [YourName]',
    body: 'Dear [Name],\n\nMy name is [YourName] and I have been following your work in [Field] for some time.\n\nI am currently at [Stage] in my career and would value your guidance on [Topic].\n\nWould you be open to a 30-minute conversation at your convenience?\n\nThank you,\n[YourName]' },
  { id: 't19', proOnly: true, name: 'Team Update', category: 'Internal',
    subject: '[Project] update - week of [Date]',
    body: 'Hi team,\n\nHere is a quick update on [Project] for the week of [Date].\n\nCompleted:\n- [Item1]\n- [Item2]\n\nIn Progress:\n- [Item3]\n\nNext Steps:\n- [Item4]\n\nLet me know if you have any questions.\n\n[Sender]' },
  { id: 't20', proOnly: true, name: 'Meeting Recap', category: 'Internal',
    subject: 'Recap - [MeetingName] on [Date]',
    body: 'Hi [Name],\n\nThanks for joining [MeetingName] on [Date]. Here is a quick recap.\n\nKey decisions:\n- [Decision1]\n- [Decision2]\n\nAction items:\n- [Owner1]: [Task1] by [Due1]\n- [Owner2]: [Task2] by [Due2]\n\nNext meeting: [NextDate]\n\n[Sender]' },
]

/* Utilities */
function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\[([^\]]+)\]/g) || []
  const keys = matches.map((m) => m.slice(1, -1))
  return keys.filter((item, index) => keys.indexOf(item) === index)
}

function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\[([^\]]+)\]/g, (_, key) => values[key] || '[' + key + ']')
}

function parseCSV(raw: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = raw.trim().split('\n').filter((l) => l.trim().length > 0)
  if (lines.length < 2) return { headers: [], rows: [] }
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"(.*)"$/, '$1'))
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/^"(.*)"$/, '$1'))
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = values[i] || '' })
    return row
  })
  return { headers, rows }
}

function downloadCSV(emails: GeneratedEmail[], name: string) {
  const rows = emails.map((e) =>
    [e.index + 1, e.to || '', e.subject, e.body.replace(/\n/g, ' ')]
      .map((v) => '"' + String(v).replace(/"/g, '""') + '"')
      .join(','))
  const csv = ['#,To,Subject,Body', ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name.replace(/\s+/g, '-').toLowerCase() + '-emails.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const PRO_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Pro%20Plan%20Upgrade%20Request&body=Hi%2C%20I%20would%20like%20to%20upgrade%20my%20account%20to%20the%20Pro%20plan.'

/* Main Component */
export function EmailGeneratorTool() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authChecking, setAuthChecking] = useState(true)
  const [tab, setTab] = useState<Tab>('template')
  const [mode, setMode] = useState<Mode>('single')
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(ALL_TEMPLATES[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [generated, setGenerated] = useState<GeneratedEmail[]>([])
  const [allCopied, setAllCopied] = useState(false)
  const [csvData, setCsvData] = useState<{ headers: string[]; rows: Record<string, string>[] } | null>(null)
  const [csvFileName, setCsvFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (u) fetchProfile(u)
      else setAuthChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_ev, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) fetchProfile(u)
      else { setProfile(null); setAuthChecking(false) }
    })
    return () => { listener.subscription.unsubscribe() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchProfile(u: User) {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', u.id).single()
      if (data) {
        setProfile(data as Profile)
      } else if (error) {
        try {
          const { data: ins } = await supabase
            .from('profiles')
            .upsert({ id: u.id, email: u.email, plan: 'free' }, { onConflict: 'id' })
            .select()
            .single()
          setProfile(ins as Profile ?? null)
        } catch (_) { setProfile(null) }
      }
    } catch (_) { setProfile(null) }
    setAuthChecking(false)
  }

  async function logUsage(action: string) {
    if (!user) return
    try { await supabase.from('usage_logs').insert({ user_id: user.id, action }) } catch (_) {}
  }

  const isPro = profile?.plan === 'pro'
  const placeholders = extractPlaceholders(selectedTemplate.subject + ' ' + selectedTemplate.body)
  const previewSubject = fillPlaceholders(selectedTemplate.subject, values)
  const previewBody = fillPlaceholders(selectedTemplate.body, values)

  function pickTemplate(t: Template) {
    if (t.proOnly && !isPro) return
    setSelectedTemplate(t)
    setValues({})
    setGenerated([])
    setCsvData(null)
    setCsvFileName('')
    setTab('generate')
    setMode('single')
  }

  async function handleSingleGenerate() {
    setGenerated([{ index: 0, to: '', subject: previewSubject, body: previewBody, copied: false }])
    setTab('results')
    logUsage('generate_single')
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCsvFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => { setCsvData(parseCSV(ev.target?.result as string)) }
    reader.readAsText(file)
  }

  async function handleBulkGenerate() {
    if (!csvData) return
    const emails: GeneratedEmail[] = csvData.rows.map((row, i) => ({
      index: i,
      to: row['Email'] || row['email'] || row['To'] || row['to'] || '',
      subject: fillPlaceholders(selectedTemplate.subject, row),
      body: fillPlaceholders(selectedTemplate.body, row),
      copied: false,
    }))
    setGenerated(emails)
    setTab('results')
    logUsage('generate_bulk')
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const copyEmail = useCallback((idx: number) => {
    const email = generated[idx]
    if (!email) return
    navigator.clipboard.writeText('Subject: ' + email.subject + '\n\n' + email.body)
    setGenerated((prev) => prev.map((e, i) => i === idx ? { ...e, copied: true } : e))
    setTimeout(() => setGenerated((prev) => prev.map((e, i) => i === idx ? { ...e, copied: false } : e)), 2000)
  }, [generated])

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(generated.map((e) => 'Subject: ' + e.subject + '\n\n' + e.body).join('\n\n---\n\n'))
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }, [generated])

  if (authChecking) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-6 h-6 rounded-full border-2 border-silver-dim border-t-platinum" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (!user) {
    return (
      <section className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="glass-dark border border-border rounded-[24px] p-10">
          <h2 className="text-platinum mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.02em' }}>
            Sign in to continue
          </h2>
          <p className="font-body text-silver-dim text-sm leading-relaxed mb-8">
            Create a free account to generate professional emails. Pro plan unlocks all 20 templates, CSV bulk generation, and CSV export.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/account" className="inline-flex items-center justify-center bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">Sign In</a>
            <a href="/account" className="inline-flex items-center justify-center border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">Create Free Account</a>
          </div>
        </div>
      </section>
    )
  }

  const tabItems: { key: Tab; label: string }[] = [
    { key: 'template', label: '1. Templates' },
    { key: 'generate', label: '2. Generate' },
    { key: 'results', label: generated.length ? '3. Results (' + generated.length + ')' : '3. Results' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Plan bar */}
      <div className="flex items-center justify-between mb-10 p-4 rounded-[16px] border border-border bg-charcoal-2">
        <div className="flex items-center gap-3">
          <span className={cn('font-body text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border',
            isPro ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim')}>
            {isPro ? 'Pro Plan' : 'Free Plan'}
          </span>
          <span className="font-body text-silver-dim/60 text-xs">{user.email}</span>
        </div>
        {!isPro && (
          <a href={PRO_MAILTO} className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-platinum text-charcoal font-medium hover:bg-silver transition-colors">
            Upgrade to Pro
          </a>
        )}
        {isPro && (
          <span className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim">
            {ALL_TEMPLATES.length} templates | CSV bulk | CSV export
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-10 p-1 rounded-full border border-border bg-charcoal-2 w-fit mx-auto">
        {tabItems.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={cn('font-body text-[0.65rem] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full transition-all duration-200',
              tab === t.key ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum')}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Template tab */}
      {tab === 'template' && (
        <div>
          <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim text-center mb-8">
            {isPro ? 'All ' + ALL_TEMPLATES.length + ' templates unlocked' : '5 free templates - upgrade for ' + (ALL_TEMPLATES.length - 5) + ' more'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ALL_TEMPLATES.map((t) => {
              const locked = t.proOnly && !isPro
              return (
                <button key={t.id} onClick={() => pickTemplate(t)} disabled={locked}
                  className={cn('glass-dark text-left p-5 rounded-[18px] border transition-all duration-200 relative',
                    locked ? 'opacity-40 cursor-not-allowed border-border' : '',
                    !locked && selectedTemplate.id === t.id ? 'border-platinum/40 bg-charcoal-3' : '',
                    !locked && selectedTemplate.id !== t.id ? 'border-border hover:border-border-md hover:bg-charcoal-2' : '')}>
                  {locked && <span className="absolute top-3 right-3 font-body text-[0.45rem] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded border border-border text-silver-dim">Pro</span>}
                  {!locked && selectedTemplate.id === t.id && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-platinum" />}
                  <span className="block font-body text-[0.5rem] tracking-[0.2em] uppercase text-silver-dim mb-2">{t.category}</span>
                  <h3 className="font-body font-medium text-platinum text-xs mb-1.5">{t.name}</h3>
                  <p className="font-body text-silver-dim text-[0.65rem] leading-relaxed line-clamp-2">{t.subject}</p>
                </button>
              )
            })}
          </div>
          {!isPro && (
            <div className="mt-8 glass border border-border rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-body font-medium text-platinum text-sm mb-1">Unlock 15 more templates + CSV bulk generation</p>
                <p className="font-body text-silver-dim text-xs">Pro plan includes all 20 templates, CSV upload for bulk sending, and one-click CSV export.</p>
              </div>
              <a href={PRO_MAILTO} className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">
                Get Pro
              </a>
            </div>
          )}
          <div className="text-center mt-8">
            <button onClick={() => setTab('generate')} className="bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors">
              Continue with {selectedTemplate.name}
            </button>
          </div>
        </div>
      )}

      {/* Generate tab */}
      {tab === 'generate' && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-body text-silver-dim text-xs mb-1">Template: <span className="text-platinum">{selectedTemplate.name}</span></p>
              <p className="font-body text-silver-dim/60 text-[0.65rem]">{selectedTemplate.category}</p>
            </div>
            <div className="flex gap-1 p-1 rounded-full border border-border bg-charcoal-2">
              <button onClick={() => { setMode('single'); setCsvData(null); setCsvFileName('') }}
                className={cn('font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all',
                  mode === 'single' ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum')}>
                Single
              </button>
              {isPro ? (
                <button onClick={() => setMode('bulk')}
                  className={cn('font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all',
                    mode === 'bulk' ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum')}>
                  Bulk CSV
                </button>
              ) : (
                <span className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full text-silver-dim/30 cursor-not-allowed">
                  Bulk (Pro)
                </span>
              )}
            </div>
          </div>

          {/* Single mode */}
          {mode === 'single' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">Fill Placeholders</span>
                </div>
                <div className="p-6 space-y-4">
                  {placeholders.length === 0 ? (
                    <p className="font-body text-silver-dim text-sm text-center py-4">No placeholders in this template.</p>
                  ) : placeholders.map((p) => (
                    <div key={p}>
                      <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">{p}</label>
                      <input type="text" value={values[p] || ''} onChange={(e) => setValues((v) => ({ ...v, [p]: e.target.value }))}
                        placeholder={'Enter ' + p} className="form-input w-full bg-charcoal px-4 py-3 font-body text-sm text-platinum" />
                    </div>
                  ))}
                  <button onClick={handleSingleGenerate} className="w-full mt-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase py-3.5 rounded-full hover:bg-silver transition-colors">
                    Generate Email
                  </button>
                </div>
              </div>
              <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">Live Preview</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-platinum/50" />
                </div>
                <div className="p-6">
                  <div className="flex gap-1.5 mb-4">
                    {['#ef4444','#f59e0b','#22c55e'].map((c) => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                  </div>
                  <div className="border-b border-border pb-3 mb-4">
                    <p className="font-body text-[0.55rem] tracking-widest uppercase text-silver-dim/60 mb-1">Subject</p>
                    <p className="font-body text-platinum text-sm font-medium min-h-5">
                      {previewSubject || <span className="text-silver-dim/40 italic font-normal">Preview will appear here</span>}
                    </p>
                  </div>
                  <div className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {previewBody || <span className="text-silver-dim/40 italic">Fill the placeholders to preview.</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bulk CSV mode */}
          {mode === 'bulk' && isPro && (
            <div className="space-y-6">
              <div className="glass-dark border border-border rounded-[24px] p-6">
                <p className="font-body text-silver-dim text-xs leading-relaxed mb-5">
                  Upload a CSV where the <span className="text-platinum font-medium">first row contains column headers</span>. Columns matching template placeholders (e.g. <span className="text-platinum">Name</span>, <span className="text-platinum">Company</span>) are auto-substituted. One email per row.
                </p>
                <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleFileChange} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()}
                  className="font-body text-[0.65rem] tracking-widest uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all">
                  {csvFileName ? 'Change CSV' : 'Upload CSV File'}
                </button>
                {csvFileName && <span className="ml-4 font-body text-silver text-xs">{csvFileName}</span>}
                {csvData && (
                  <div className="mt-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-body text-[0.55rem] tracking-widest uppercase text-silver-dim">Columns:</span>
                      {csvData.headers.map((h) => (
                        <span key={h} className={cn('font-body text-[0.5rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border',
                          placeholders.map(p => p.toLowerCase()).indexOf(h.toLowerCase()) >= 0
                            ? 'border-platinum/30 bg-platinum/10 text-platinum'
                            : 'border-border text-silver-dim')}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-silver-dim text-xs">{csvData.rows.length} contacts loaded - will generate {csvData.rows.length} emails</p>
                  </div>
                )}
              </div>
              {csvData && csvData.rows.length > 0 && (
                <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <span className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim">Preview (row 1 of {csvData.rows.length})</span>
                  </div>
                  <div className="p-6">
                    <p className="font-body text-platinum text-sm font-medium mb-3">{fillPlaceholders(selectedTemplate.subject, csvData.rows[0])}</p>
                    <p className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">
                      {fillPlaceholders(selectedTemplate.body, csvData.rows[0])}
                    </p>
                  </div>
                </div>
              )}
              <button onClick={handleBulkGenerate} disabled={!csvData}
                className="w-full bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase py-4 rounded-full hover:bg-silver transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {csvData ? 'Generate ' + csvData.rows.length + ' Emails' : 'Generate Emails'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results tab */}
      {tab === 'results' && (
        <div ref={resultsRef}>
          {generated.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-silver-dim text-sm mb-6">No emails generated yet.</p>
              <button onClick={() => setTab('generate')} className="border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">
                Go to Generate
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-[16px] border border-border bg-charcoal-2">
                <span className="font-body text-silver-dim text-xs">{generated.length} email{generated.length !== 1 ? 's' : ''} generated</span>
                <div className="flex items-center gap-2 ml-auto flex-wrap">
                  <button onClick={copyAll}
                    className={cn('font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all',
                      allCopied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border-md text-silver-dim hover:border-silver hover:text-platinum')}>
                    {allCopied ? 'Copied All' : 'Copy All'}
                  </button>
                  {isPro && (
                    <button onClick={() => downloadCSV(generated, selectedTemplate.name)}
                      className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-platinum transition-all">
                      Download CSV
                    </button>
                  )}
                  <button onClick={() => { setTab('generate'); setGenerated([]) }}
                    className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all">
                    New Email
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {generated.map((email, idx) => (
                  <div key={idx} className="glass-dark border border-border rounded-[20px] overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {email.to && <p className="font-body text-[0.5rem] tracking-widest uppercase text-silver-dim mb-0.5">To: {email.to}</p>}
                        <p className="font-body text-[0.55rem] tracking-widest uppercase text-silver-dim/60 mb-0.5">Subject</p>
                        <p className="font-body text-platinum text-sm font-medium truncate">{email.subject}</p>
                      </div>
                      <button onClick={() => copyEmail(idx)}
                        className={cn('flex-shrink-0 font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all',
                          email.copied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim hover:border-silver-dim hover:text-silver')}>
                        {email.copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="px-6 py-5 font-body text-silver text-sm leading-relaxed whitespace-pre-wrap">
                      {email.body}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}
