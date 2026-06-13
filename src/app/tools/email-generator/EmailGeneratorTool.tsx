'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { planConfig, bulkLimit, canExport, templateLimit } from '@/lib/plans'
import type { Profile, Plan } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Template { id: string; name: string; category: string; subject: string; body: string; tier: number }
// tier: 0=free(all), 1=pro+, 2=ultimate+
interface GeneratedEmail { index: number; to: string; subject: string; body: string; copied: boolean }
type Tab = 'template' | 'generate' | 'results'
type Mode = 'single' | 'bulk'

const GET_APP_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=App%20Access%20Request&body=Hi%2C%20I%20would%20like%20to%20get%20access%20to%20the%20VELURYN%20AGNECY%20app.'
const PRO_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Pro%20Plan%20Request&body=Hi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Pro%20plan%20($9%2Fmonth).'
const ULTIMATE_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Ultimate%20Plan%20Request&body=Hi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Ultimate%20plan%20($19%2Fmonth).'

/* ─── Templates ──────────────────────────────────────────────────────────── */
const ALL_TEMPLATES: Template[] = [
  // Tier 0 - Free (5)
  { id: 't01', tier: 0, name: 'Cold Outreach', category: 'Sales', subject: 'Quick question about [Company]', body: 'Hi [Name],\n\nI came across [Company] and was genuinely impressed by what you are building in [Industry].\n\nWe help companies like yours [Benefit]. I would love to show you how.\n\nWould you be open to a 15-minute call this week?\n\nBest,\n[Sender]' },
  { id: 't02', tier: 0, name: 'Follow-Up', category: 'Sales', subject: 'Following up - [Company]', body: 'Hi [Name],\n\nJust following up on my previous note about [Topic].\n\nI know things get busy. Even a quick 10-minute call could be valuable.\n\nAre you free this week?\n\nBest,\n[Sender]' },
  { id: 't03', tier: 0, name: 'Partnership Proposal', category: 'Networking', subject: 'Partnership opportunity - [Company]', body: 'Hi [Name],\n\nI see a meaningful alignment between [Company] and us around [SharedGoal].\n\nI think a partnership could create real value for both sides. Would you be open to a conversation?\n\nWarm regards,\n[Sender]' },
  { id: 't04', tier: 0, name: 'Introduction', category: 'Networking', subject: 'Introduction - [YourName] at [YourCompany]', body: 'Hi [Name],\n\nI am [YourName] from [YourCompany]. I found your work at [Company] very impressive.\n\nI would love to connect and explore how we might help each other.\n\nLooking forward to hearing from you.\n\n[YourName]' },
  { id: 't05', tier: 0, name: 'Thank You', category: 'General', subject: 'Thank you, [Name]', body: 'Hi [Name],\n\nI just wanted to take a moment to thank you for [Reason]. It truly meant a lot.\n\n[PersonalNote]\n\nLooking forward to staying in touch.\n\nWarm regards,\n[Sender]' },
  // Tier 1 - Pro (25 more = 30 total)
  { id: 't06', tier: 1, name: 'Demo Request', category: 'Sales', subject: 'Private demo - [Product] for [Company]', body: 'Hi [Name],\n\nI wanted to personally invite [Company] to a private demo of [Product].\n\nIn 20 minutes I can show you exactly how we help [Industry] teams [Benefit].\n\nWhen works best for you this week?\n\nBest,\n[Sender]' },
  { id: 't07', tier: 1, name: 'Proposal Send', category: 'Sales', subject: 'Proposal for [Company] - [Product]', body: 'Hi [Name],\n\nThank you for our conversation. As promised, I have attached our proposal for [Company].\n\nThe proposal outlines how [Product] can help you [Benefit] within [Timeframe].\n\nHappy to walk through it on a call. Just say the word.\n\nBest,\n[Sender]' },
  { id: 't08', tier: 1, name: 'Renewal Reminder', category: 'Sales', subject: 'Your [Product] subscription renews on [Date]', body: 'Hi [Name],\n\nYour [Product] subscription renews on [Date]. I wanted to give you a heads-up.\n\nIf you have any questions about your plan or want to discuss upgrading, I am happy to help.\n\nThank you for your continued trust.\n\n[Sender]' },
  { id: 't09', tier: 1, name: 'Referral Request', category: 'Sales', subject: 'A quick favour, [Name]', body: 'Hi [Name],\n\nDo you know anyone at [TargetCompany] who handles [Department]?\n\nI am working on something that could genuinely help them, and a warm introduction would mean the world.\n\nNo worries at all if not.\n\nBest,\n[Sender]' },
  { id: 't10', tier: 1, name: 'Win-Back', category: 'Sales', subject: 'We have missed you, [Name]', body: 'Hi [Name],\n\nIt has been a while since we last connected and I wanted to reach out.\n\nWe have made significant improvements to [Product] since you last used it, including [Feature1] and [Feature2].\n\nWould you be open to a quick catch-up?\n\nBest,\n[Sender]' },
  { id: 't11', tier: 1, name: 'Job Offer', category: 'HR', subject: 'Offer Letter - [Position] at [Company]', body: 'Dear [Name],\n\nWe are delighted to offer you the position of [Position] at [Company], starting [StartDate].\n\nCompensation: [Salary]\nLocation: [Location]\n\nPlease confirm your acceptance by [Deadline].\n\nWe look forward to welcoming you.\n\nSincerely,\n[Sender]' },
  { id: 't12', tier: 1, name: 'Interview Invite', category: 'HR', subject: 'Interview invitation - [Position] at [Company]', body: 'Dear [Name],\n\nThank you for applying for the [Position] role at [Company].\n\nWe would like to invite you to an interview on [Date] at [Time] with [Interviewer].\n\nPlease confirm your availability.\n\nBest,\n[Sender]' },
  { id: 't13', tier: 1, name: 'Rejection Letter', category: 'HR', subject: 'Your application at [Company]', body: 'Dear [Name],\n\nThank you for your interest in the [Position] role and the time you invested in our process.\n\nAfter careful consideration, we have decided to move forward with another candidate.\n\nWe will keep your profile on file for future opportunities.\n\nWarm regards,\n[Sender]' },
  { id: 't14', tier: 1, name: 'Onboarding Welcome', category: 'HR', subject: 'Welcome to [Company], [Name]!', body: 'Dear [Name],\n\nWe are thrilled to welcome you to [Company]! Your first day is [StartDate].\n\nHere is what to expect:\n- Arrive at [Location] by [Time]\n- You will be met by [Buddy]\n- Your equipment will be ready at your desk\n\nSee you soon!\n\n[Sender]' },
  { id: 't15', tier: 1, name: 'Performance Review', category: 'HR', subject: 'Performance review reminder - [Name]', body: 'Hi [Name],\n\nThis is a reminder that your performance review is scheduled for [Date] at [Time] with [Manager].\n\nPlease take some time to reflect on [Period] and come prepared to discuss your achievements and goals.\n\nSee you then.\n\n[Sender]' },
  { id: 't16', tier: 1, name: 'Client Onboarding', category: 'Customer Success', subject: 'Welcome, [Name]! Let us get you started', body: 'Hi [Name],\n\nWelcome aboard! We are thrilled to have [ClientCompany] as a client.\n\nWhat happens next:\n1. Your account is being configured\n2. Login details within 24 hours\n3. Your dedicated contact is [ContactName]\n\nDo not hesitate to reach out.\n\nBest,\n[Sender]' },
  { id: 't17', tier: 1, name: 'Check-In', category: 'Customer Success', subject: 'Quick check-in - [Company]', body: 'Hi [Name],\n\nI just wanted to check in and see how things are going with [Product] at [Company].\n\nIs there anything we can do to help you get more value?\n\nAlways here if you need anything.\n\nBest,\n[Sender]' },
  { id: 't18', tier: 1, name: 'Feedback Request', category: 'Customer Success', subject: 'Quick question about your experience, [Name]', body: 'Hi [Name],\n\nI hope things are going well. How has [Product] been working for [Company]?\n\nCould you spare 5 minutes? Your feedback shapes what we build next.\n\nReply here or book time: [Link]\n\nThank you,\n[Sender]' },
  { id: 't19', tier: 1, name: 'Issue Resolution', category: 'Customer Success', subject: 'Update on your support request - [TicketID]', body: 'Hi [Name],\n\nI am following up on your recent support request ([TicketID]) regarding [Issue].\n\nHere is what we have done to resolve it: [Resolution]\n\nPlease let me know if this has resolved the issue or if there is anything else I can help with.\n\nBest,\n[Sender]' },
  { id: 't20', tier: 1, name: 'Product Launch', category: 'Marketing', subject: 'Introducing [Product] - built for [Industry]', body: 'Hi [Name],\n\nWe just launched [Product] and thought of you immediately.\n\n[Product] helps [Industry] teams [Benefit]. We are seeing incredible early results.\n\nWould you be open to a private walkthrough?\n\nBest,\n[Sender]' },
  { id: 't21', tier: 1, name: 'Webinar Invite', category: 'Marketing', subject: 'You are invited: [WebinarName] on [Date]', body: 'Hi [Name],\n\nI wanted to personally invite you to our upcoming webinar: [WebinarName].\n\nDate: [Date] at [Time]\nKey takeaway: [KeyTakeaway]\n\nSpots are limited. Register here: [Link]\n\nSee you there,\n[Sender]' },
  { id: 't22', tier: 1, name: 'Newsletter', category: 'Marketing', subject: '[NewsletterName] - [Month] Edition', body: 'Hi [Name],\n\nHere is what is new this month at [Company]:\n\n[Highlight1]\n[Highlight2]\n[Highlight3]\n\nRead the full edition here: [Link]\n\nAs always, thank you for being part of our community.\n\n[Sender]' },
  { id: 't23', tier: 1, name: 'Case Study Share', category: 'Marketing', subject: 'How [ClientName] achieved [Result]', body: 'Hi [Name],\n\nWe recently helped [ClientName] achieve [Result] using [Product].\n\nGiven that [Company] operates in a similar space, I thought the approach might resonate.\n\nFull case study: [Link]\n\nHappy to walk you through the specifics.\n\n[Sender]' },
  { id: 't24', tier: 1, name: 'Conference Follow-Up', category: 'Networking', subject: 'Great meeting you at [Event]', body: 'Hi [Name],\n\nIt was a genuine pleasure meeting you at [Event]. Our conversation about [Topic] stuck with me.\n\nI would love to continue the discussion. Are you free for a call next week?\n\nBest,\n[Sender]' },
  { id: 't25', tier: 1, name: 'Mentorship Request', category: 'Networking', subject: 'Mentorship request - [YourName]', body: 'Dear [Name],\n\nMy name is [YourName] and I have been following your work in [Field] for some time.\n\nI am at [Stage] in my career and would deeply value your guidance on [Topic].\n\nWould you be open to a 30-minute conversation?\n\nThank you,\n[YourName]' },
  { id: 't26', tier: 1, name: 'Alumni Reconnect', category: 'Networking', subject: 'Reconnecting - [YourName] from [School]', body: 'Hi [Name],\n\nI hope you are doing well! This is [YourName]. We were both at [School] during [Years].\n\nI have been following your career at [Company] and would love to catch up.\n\nAre you free for a quick call sometime this month?\n\nBest,\n[YourName]' },
  { id: 't27', tier: 1, name: 'Team Update', category: 'Internal', subject: '[Project] update - [Date]', body: 'Hi team,\n\nQuick update on [Project] for [Date].\n\nCompleted:\n- [Item1]\n- [Item2]\n\nIn Progress:\n- [Item3]\n\nBlockers:\n- [Blocker1]\n\nNext Steps:\n- [Item4]\n\n[Sender]' },
  { id: 't28', tier: 1, name: 'Meeting Recap', category: 'Internal', subject: 'Recap: [MeetingName] - [Date]', body: 'Hi [Name],\n\nThanks for joining [MeetingName] on [Date]. Quick recap:\n\nDecisions:\n- [Decision1]\n- [Decision2]\n\nAction items:\n- [Owner1]: [Task1] by [Due1]\n- [Owner2]: [Task2] by [Due2]\n\nNext: [NextDate]\n\n[Sender]' },
  { id: 't29', tier: 1, name: 'Project Kickoff', category: 'Internal', subject: 'Kickoff: [Project] starts [Date]', body: 'Hi team,\n\n[Project] officially kicks off on [Date].\n\nObjective: [Goal]\nTimeline: [StartDate] to [EndDate]\nTeam: [TeamMembers]\n\nOur first milestone is [Milestone1] by [MilestoneDate].\n\nExcited to build this together.\n\n[Sender]' },
  { id: 't30', tier: 1, name: 'Policy Update', category: 'Internal', subject: 'Important: [Policy] update effective [Date]', body: 'Hi [Name],\n\nI want to inform you of an update to our [Policy], effective [Date].\n\nKey changes:\n- [Change1]\n- [Change2]\n\nPlease review the full document here: [Link]\n\nIf you have any questions, do not hesitate to reach out.\n\nBest,\n[Sender]' },
  // Tier 2 - Ultimate (additional)
  { id: 't31', tier: 2, name: 'Investor Outreach', category: 'Fundraising', subject: '[Company] - [Round] round', body: 'Dear [Name],\n\nI am [YourName], CEO of [Company]. We are raising a [Round] and I wanted to reach out given your portfolio focus on [Sector].\n\n[Company] has [Metric] and is growing [GrowthRate]. We believe we are at an inflection point.\n\nWould you be open to a 20-minute intro call?\n\nBest,\n[YourName]' },
  { id: 't32', tier: 2, name: 'Investor Update', category: 'Fundraising', subject: '[Company] update - [Month] [Year]', body: 'Dear [Name],\n\nHere is our [Month] update.\n\nKey metrics:\n- ARR: [ARR]\n- MRR growth: [Growth]\n- Customers: [Customers]\n\nHighlights: [Highlight]\nLooking ahead: [NextGoal]\n\nAs always, thank you for your continued support.\n\n[YourName]' },
  { id: 't33', tier: 2, name: 'Press Outreach', category: 'PR', subject: 'Story tip: [StoryAngle] - [Company]', body: 'Hi [Name],\n\nI am [YourName] from [Company]. I have a story that might interest you and your readers at [Publication].\n\n[StoryAngle]\n\nI can provide quotes, data, and arrange interviews. Would this be of interest?\n\nBest,\n[YourName]' },
  { id: 't34', tier: 2, name: 'Speaker Invite', category: 'Events', subject: 'Speaker invitation - [EventName]', body: 'Dear [Name],\n\nWe would be honoured to invite you to speak at [EventName] on [Date] in [Location].\n\nYour expertise in [Topic] would be a perfect fit for our audience of [AudienceDescription].\n\nWe offer [Compensation] and cover [Travel].\n\nWould you be interested?\n\nWarm regards,\n[Sender]' },
  { id: 't35', tier: 2, name: 'Sponsorship Request', category: 'Events', subject: 'Sponsorship opportunity - [EventName]', body: 'Hi [Name],\n\nWe are hosting [EventName] on [Date], bringing together [AudienceSize] professionals in [Industry].\n\nWe believe [Company] would be a perfect sponsor given your focus on [Area].\n\nOur sponsorship packages start at [Price]. I have attached our prospectus.\n\nWould love to discuss further.\n\n[Sender]' },
]

/* ─── Utilities ─────────────────────────────────────────────────────────── */
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
    const vals = line.split(',').map((v) => v.trim().replace(/^"(.*)"$/, '$1'))
    const row: Record<string, string> = {}
    headers.forEach((hh, i) => { row[hh] = vals[i] || '' })
    return row
  })
  return { headers, rows }
}

function exportCSV(emails: GeneratedEmail[], name: string) {
  const rows = emails.map((e) =>
    [e.index + 1, e.to || '', e.subject, e.body.replace(/\n/g, ' ')]
      .map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(','))
  const csv = ['#,To,Subject,Body', ...rows].join('\n')
  triggerDownload(csv, name + '-emails.csv', 'text/csv;charset=utf-8;')
}

function exportTXT(emails: GeneratedEmail[], name: string) {
  const text = emails.map((e, i) =>
    '--- Email ' + (i + 1) + (e.to ? ' | To: ' + e.to : '') + ' ---\nSubject: ' + e.subject + '\n\n' + e.body)
    .join('\n\n' + '='.repeat(60) + '\n\n')
  triggerDownload(text, name + '-emails.txt', 'text/plain;charset=utf-8;')
}

function exportPDF(emails: GeneratedEmail[], templateName: string) {
  // Open print dialog with formatted HTML
  const content = emails.map((e, i) =>
    '<div style="margin-bottom:40px;page-break-inside:avoid">' +
    '<p style="font-size:11px;color:#888;margin:0 0 8px">Email ' + (i + 1) + (e.to ? ' | To: ' + e.to : '') + '</p>' +
    '<h3 style="margin:0 0 12px;font-size:14px">' + e.subject + '</h3>' +
    '<p style="white-space:pre-wrap;font-size:13px;line-height:1.7;margin:0">' + e.body + '</p>' +
    '</div>').join('<hr style="border:none;border-top:1px solid #eee;margin:32px 0">')
  const html = '<!DOCTYPE html><html><head><title>' + templateName + ' Emails</title>' +
    '<style>body{font-family:Georgia,serif;max-width:700px;margin:0 auto;padding:40px;color:#111}' +
    '@media print{body{padding:20px}}</style></head>' +
    '<body><h2 style="margin-bottom:32px">' + templateName + ' - Generated Emails (' + emails.length + ')</h2>' +
    content + '</body></html>'
  const win = window.open('', '_blank')
  if (win) { win.document.write(html); win.document.close(); win.print() }
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export function EmailGeneratorTool() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [authChecking, setAuthChecking] = useState(true)
  const [profileError, setProfileError] = useState(false)

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
      if (u) loadProfile(u)
      else setAuthChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_ev, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) loadProfile(u)
      else { setProfile(null); setAuthChecking(false) }
    })
    return () => { listener.subscription.unsubscribe() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadProfile(u: User) {
    setProfileError(false)
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', u.id).single()
      if (data) {
        setProfile(data as Profile)
      } else if (error) {
        // Row doesn't exist - create it
        const { data: created, error: createErr } = await supabase
          .from('profiles')
          .upsert({ id: u.id, email: u.email, plan: 'free' }, { onConflict: 'id' })
          .select()
          .single()
        if (createErr) setProfileError(true)
        else setProfile(created as Profile ?? null)
      }
    } catch (_) {
      setProfileError(true)
    }
    setAuthChecking(false)
  }

  async function logUsage(action: string) {
    if (!user) return
    try { await supabase.from('usage_logs').insert({ user_id: user.id, action }) } catch (_) {}
  }

  const plan: Plan = profile?.plan ?? 'free'
  const config = planConfig(plan)
  const maxTemplates = templateLimit(plan)
  const rowLimit = bulkLimit(plan)
  const isPaid = plan === 'pro' || plan === 'ultimate'
  const isUltimate = plan === 'ultimate'

  // Which templates the user can see and use
  const visibleTemplates = ALL_TEMPLATES.filter((_, i) => i < maxTemplates)
  const allTemplatesShown = ALL_TEMPLATES // all shown, locked ones dimmed

  const placeholders = extractPlaceholders(selectedTemplate.subject + ' ' + selectedTemplate.body)
  const previewSubject = fillPlaceholders(selectedTemplate.subject, values)
  const previewBody = fillPlaceholders(selectedTemplate.body, values)

  function pickTemplate(t: Template) {
    const idx = ALL_TEMPLATES.findIndex((x) => x.id === t.id)
    if (idx >= maxTemplates) return // locked
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
    const rows = rowLimit === -1 ? csvData.rows : csvData.rows.slice(0, rowLimit)
    const emails: GeneratedEmail[] = rows.map((row, i) => ({
      index: i, to: row['Email'] || row['email'] || row['To'] || row['to'] || '',
      subject: fillPlaceholders(selectedTemplate.subject, row),
      body: fillPlaceholders(selectedTemplate.body, row), copied: false,
    }))
    setGenerated(emails)
    setTab('results')
    logUsage('generate_bulk')
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const copyEmail = useCallback((idx: number) => {
    const email = generated[idx]; if (!email) return
    navigator.clipboard.writeText('Subject: ' + email.subject + '\n\n' + email.body)
    setGenerated((prev) => prev.map((e, i) => i === idx ? { ...e, copied: true } : e))
    setTimeout(() => setGenerated((prev) => prev.map((e, i) => i === idx ? { ...e, copied: false } : e)), 2000)
  }, [generated])

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(generated.map((e) => 'Subject: ' + e.subject + '\n\n' + e.body).join('\n\n---\n\n'))
    setAllCopied(true); setTimeout(() => setAllCopied(false), 2000)
  }, [generated])

  /* ── Not logged in ── */
  if (authChecking) return (
    <div className="flex items-center justify-center py-40">
      <div className="w-6 h-6 rounded-full border-2 border-silver-dim border-t-platinum" style={{ animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  if (!user) return (
    <section className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="glass-dark border border-border rounded-[24px] p-10">
        <h2 className="text-platinum mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300, letterSpacing: '-0.02em' }}>Sign in to continue</h2>
        <p className="font-body text-silver-dim text-sm leading-relaxed mb-8">
          Free account gives you 5 templates. Pro ($9/mo) and Ultimate ($19/mo) unlock the full tool, bulk CSV, and the VELURYN app.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/account" className="inline-flex items-center justify-center bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">Sign In</a>
          <a href="/account" className="inline-flex items-center justify-center border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">Create Free Account</a>
        </div>
      </div>
    </section>
  )

  const tabItems: { key: Tab; label: string }[] = [
    { key: 'template', label: '1. Templates' },
    { key: 'generate', label: '2. Generate' },
    { key: 'results', label: generated.length ? '3. Results (' + generated.length + ')' : '3. Results' },
  ]

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Plan bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 p-4 rounded-[16px] border border-border bg-charcoal-2">
        <div className="flex items-center gap-3">
          <span className={cn('font-body text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border',
            plan === 'ultimate' ? 'border-platinum/40 bg-platinum/15 text-platinum' :
            plan === 'pro' ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim')}>
            {config.name} Plan
          </span>
          <span className="font-body text-silver-dim/60 text-xs">{user.email}</span>
          {profileError && <span className="font-body text-red-400 text-[0.6rem]">Profile table not found - run Supabase SQL setup</span>}
        </div>
        <div className="flex items-center gap-2">
          {!isPaid && (
            <a href={PRO_MAILTO} className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-platinum text-charcoal font-medium hover:bg-silver transition-colors">
              Get App (Pro $9)
            </a>
          )}
          {plan === 'pro' && (
            <a href={ULTIMATE_MAILTO} className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all">
              Upgrade to Ultimate ($19)
            </a>
          )}
          {isPaid && <a href="/dashboard" className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all">Dashboard</a>}
        </div>
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

      {/* ── Templates tab ── */}
      {tab === 'template' && (
        <div>
          <p className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim text-center mb-8">
            {maxTemplates} of {ALL_TEMPLATES.length} templates unlocked &mdash; {plan === 'free' ? 'Pro unlocks 30, Ultimate unlocks 35+' : plan === 'pro' ? 'Ultimate unlocks 35+ templates' : 'All templates unlocked'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {allTemplatesShown.map((t, idx) => {
              const locked = idx >= maxTemplates
              return (
                <button key={t.id} onClick={() => pickTemplate(t)} disabled={locked}
                  className={cn('glass-dark text-left p-5 rounded-[18px] border transition-all duration-200 relative',
                    locked ? 'opacity-35 cursor-not-allowed border-border' : '',
                    !locked && selectedTemplate.id === t.id ? 'border-platinum/40 bg-charcoal-3' : '',
                    !locked && selectedTemplate.id !== t.id ? 'border-border hover:border-border-md hover:bg-charcoal-2' : '')}>
                  {locked && (
                    <span className="absolute top-2 right-2 font-body text-[0.45rem] tracking-[0.1em] uppercase px-1.5 py-0.5 rounded border border-border text-silver-dim">
                      {t.tier === 2 ? 'Ultimate' : 'Pro'}
                    </span>
                  )}
                  {!locked && selectedTemplate.id === t.id && <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-platinum" />}
                  <span className="block font-body text-[0.5rem] tracking-[0.2em] uppercase text-silver-dim mb-2">{t.category}</span>
                  <h3 className="font-body font-medium text-platinum text-xs mb-1.5">{t.name}</h3>
                  <p className="font-body text-silver-dim text-[0.65rem] leading-relaxed line-clamp-2">{t.subject}</p>
                </button>
              )
            })}
          </div>
          {!isPaid && (
            <div className="mt-8 glass border border-border rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-body font-medium text-platinum text-sm mb-1">Unlock 25+ more templates + the VELURYN app</p>
                <p className="font-body text-silver-dim text-xs">Pro $9/mo: 30 templates, CSV bulk, CSV export. Ultimate $19/mo: 35+ templates, unlimited CSV, TXT + PDF export.</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href={PRO_MAILTO} className="bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-5 py-3 rounded-full hover:bg-silver transition-colors">Get App</a>
                <a href="/pricing" className="border border-border-md text-silver font-body text-xs tracking-widest uppercase px-5 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">See Plans</a>
              </div>
            </div>
          )}
          <div className="text-center mt-8">
            <button onClick={() => setTab('generate')} className="bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors">
              Continue with {selectedTemplate.name}
            </button>
          </div>
        </div>
      )}

      {/* ── Generate tab ── */}
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
              {config.csvUpload ? (
                <button onClick={() => setMode('bulk')}
                  className={cn('font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-all',
                    mode === 'bulk' ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum')}>
                  Bulk CSV {rowLimit !== -1 ? '(max ' + rowLimit + ')' : '(unlimited)'}
                </button>
              ) : (
                <a href={PRO_MAILTO} className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full text-silver-dim/30 cursor-not-allowed" title="Pro+ only">
                  Bulk CSV (Pro+)
                </a>
              )}
            </div>
          </div>

          {mode === 'single' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                <div className="px-6 py-4 border-b border-border"><span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim">Fill Placeholders</span></div>
                <div className="p-6 space-y-4">
                  {placeholders.length === 0 ? <p className="font-body text-silver-dim text-sm text-center py-4">No placeholders in this template.</p>
                  : placeholders.map((p) => (
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
                    <p className="font-body text-platinum text-sm font-medium min-h-5">{previewSubject || <span className="text-silver-dim/40 italic font-normal">Preview will appear here</span>}</p>
                  </div>
                  <div className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {previewBody || <span className="text-silver-dim/40 italic">Fill the placeholders to preview.</span>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'bulk' && config.csvUpload && (
            <div className="space-y-6">
              <div className="glass-dark border border-border rounded-[24px] p-6">
                <p className="font-body text-silver-dim text-xs leading-relaxed mb-5">
                  Upload a CSV where the <span className="text-platinum font-medium">first row contains headers</span>. Column names matching template placeholders are auto-substituted. One email per row.
                  {rowLimit !== -1 && <span className="text-silver-dim/60"> Only the first {rowLimit} rows will be processed on your plan.</span>}
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
                      {csvData.headers.map((hh) => (
                        <span key={hh} className={cn('font-body text-[0.5rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border',
                          placeholders.map(p => p.toLowerCase()).indexOf(hh.toLowerCase()) >= 0
                            ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim')}>
                          {hh}
                        </span>
                      ))}
                    </div>
                    <p className="font-body text-silver-dim text-xs">
                      {csvData.rows.length} contacts loaded &mdash; will generate {rowLimit === -1 ? csvData.rows.length : Math.min(csvData.rows.length, rowLimit)} emails
                      {rowLimit !== -1 && csvData.rows.length > rowLimit && <span className="text-yellow-400"> ({csvData.rows.length - rowLimit} rows skipped, upgrade to Ultimate for unlimited)</span>}
                    </p>
                  </div>
                )}
              </div>
              {csvData && csvData.rows.length > 0 && (
                <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-border"><span className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim">Preview row 1 of {csvData.rows.length}</span></div>
                  <div className="p-6">
                    <p className="font-body text-platinum text-sm font-medium mb-3">{fillPlaceholders(selectedTemplate.subject, csvData.rows[0])}</p>
                    <p className="font-body text-silver text-sm leading-relaxed whitespace-pre-wrap max-h-52 overflow-y-auto">{fillPlaceholders(selectedTemplate.body, csvData.rows[0])}</p>
                  </div>
                </div>
              )}
              <button onClick={handleBulkGenerate} disabled={!csvData}
                className="w-full bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase py-4 rounded-full hover:bg-silver transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {csvData ? 'Generate ' + (rowLimit === -1 ? csvData.rows.length : Math.min(csvData.rows.length, rowLimit)) + ' Emails' : 'Generate Emails'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Results tab ── */}
      {tab === 'results' && (
        <div ref={resultsRef}>
          {generated.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-silver-dim text-sm mb-6">No emails generated yet.</p>
              <button onClick={() => setTab('generate')} className="border border-border-md text-silver font-body text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:border-silver hover:text-platinum transition-all">Go to Generate</button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-[16px] border border-border bg-charcoal-2">
                <span className="font-body text-silver-dim text-xs">{generated.length} email{generated.length !== 1 ? 's' : ''} generated</span>
                <div className="flex items-center gap-2 ml-auto flex-wrap">
                  <button onClick={copyAll} className={cn('font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all',
                    allCopied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border-md text-silver-dim hover:border-silver hover:text-platinum')}>
                    {allCopied ? 'Copied All' : 'Copy All'}
                  </button>
                  {canExport(plan, 'csv') && (
                    <button onClick={() => exportCSV(generated, selectedTemplate.name)} className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-platinum transition-all">
                      CSV
                    </button>
                  )}
                  {canExport(plan, 'txt') && (
                    <button onClick={() => exportTXT(generated, selectedTemplate.name)} className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-platinum transition-all">
                      TXT
                    </button>
                  )}
                  {canExport(plan, 'pdf') && (
                    <button onClick={() => exportPDF(generated, selectedTemplate.name)} className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-platinum transition-all">
                      PDF
                    </button>
                  )}
                  {!canExport(plan, 'csv') && isPaid && null}
                  {!isPaid && (
                    <a href={PRO_MAILTO} className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full bg-platinum text-charcoal font-medium hover:bg-silver transition-colors">
                      Get App for CSV export
                    </a>
                  )}
                  <button onClick={() => { setTab('generate'); setGenerated([]) }} className="font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all">
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
                        <p className="font-body text-[0.55rem] tracking-widests uppercase text-silver-dim/60 mb-0.5">Subject</p>
                        <p className="font-body text-platinum text-sm font-medium truncate">{email.subject}</p>
                      </div>
                      <button onClick={() => copyEmail(idx)}
                        className={cn('flex-shrink-0 font-body text-[0.6rem] tracking-widest uppercase px-4 py-2 rounded-full border transition-all',
                          email.copied ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim hover:border-silver-dim hover:text-silver')}>
                        {email.copied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="px-6 py-5 font-body text-silver text-sm leading-relaxed whitespace-pre-wrap">{email.body}</div>
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
