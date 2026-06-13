'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { planConfig, templateLimit, bulkLimit, canExport } from '@/lib/plans'
import type { Profile, Plan } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { EmailGeneratorTool } from '@/app/tools/email-generator/EmailGeneratorTool'

type DashTab = 'overview' | 'generate' | 'templates' | 'account'

const ALL_TEMPLATES_META = [
  { name: 'Cold Outreach', category: 'Sales', tier: 0 },
  { name: 'Follow-Up', category: 'Sales', tier: 0 },
  { name: 'Partnership Proposal', category: 'Networking', tier: 0 },
  { name: 'Introduction', category: 'Networking', tier: 0 },
  { name: 'Thank You', category: 'General', tier: 0 },
  { name: 'Demo Request', category: 'Sales', tier: 1 },
  { name: 'Proposal Send', category: 'Sales', tier: 1 },
  { name: 'Renewal Reminder', category: 'Sales', tier: 1 },
  { name: 'Referral Request', category: 'Sales', tier: 1 },
  { name: 'Win-Back', category: 'Sales', tier: 1 },
  { name: 'Job Offer', category: 'HR', tier: 1 },
  { name: 'Interview Invite', category: 'HR', tier: 1 },
  { name: 'Rejection Letter', category: 'HR', tier: 1 },
  { name: 'Onboarding Welcome', category: 'HR', tier: 1 },
  { name: 'Performance Review', category: 'HR', tier: 1 },
  { name: 'Client Onboarding', category: 'Customer Success', tier: 1 },
  { name: 'Check-In', category: 'Customer Success', tier: 1 },
  { name: 'Feedback Request', category: 'Customer Success', tier: 1 },
  { name: 'Issue Resolution', category: 'Customer Success', tier: 1 },
  { name: 'Product Launch', category: 'Marketing', tier: 1 },
  { name: 'Webinar Invite', category: 'Marketing', tier: 1 },
  { name: 'Newsletter', category: 'Marketing', tier: 1 },
  { name: 'Case Study Share', category: 'Marketing', tier: 1 },
  { name: 'Conference Follow-Up', category: 'Networking', tier: 1 },
  { name: 'Mentorship Request', category: 'Networking', tier: 1 },
  { name: 'Alumni Reconnect', category: 'Networking', tier: 1 },
  { name: 'Team Update', category: 'Internal', tier: 1 },
  { name: 'Meeting Recap', category: 'Internal', tier: 1 },
  { name: 'Project Kickoff', category: 'Internal', tier: 1 },
  { name: 'Policy Update', category: 'Internal', tier: 1 },
  { name: 'Investor Outreach', category: 'Fundraising', tier: 2 },
  { name: 'Investor Update', category: 'Fundraising', tier: 2 },
  { name: 'Press Outreach', category: 'PR', tier: 2 },
  { name: 'Speaker Invite', category: 'Events', tier: 2 },
  { name: 'Sponsorship Request', category: 'Events', tier: 2 },
]

const GET_APP_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=App%20Access%20Request&body=Hi%2C%20I%20would%20like%20to%20get%20access%20to%20the%20VELURYN%20AGNECY%20app.'
const ULTIMATE_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Ultimate%20Plan%20Request&body=Hi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Ultimate%20plan%20($19%2Fmonth).'

export function DashboardClient() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setDashTab] = useState<DashTab>('overview')
  const [usageCount, setUsageCount] = useState<number>(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/account'); return }
      setUser(u)
      loadProfile(u)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) { router.push('/account'); return }
      setUser(session.user)
      loadProfile(session.user)
    })
    return () => { listener.subscription.unsubscribe() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadProfile(u: User) {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', u.id).single()
      if (data) setProfile(data as Profile)
      else {
        const { data: created } = await supabase.from('profiles').upsert({ id: u.id, email: u.email, plan: 'free' }, { onConflict: 'id' }).select().single()
        if (created) setProfile(created as Profile)
      }
    } catch (_) {}

    // Load usage count
    try {
      const { count } = await supabase.from('usage_logs').select('*', { count: 'exact', head: true }).eq('user_id', u.id)
      setUsageCount(count || 0)
    } catch (_) {}
    setLoading(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const plan: Plan = profile?.plan ?? 'free'
  const config = planConfig(plan)
  const isPaid = plan === 'pro' || plan === 'ultimate'
  const isUltimate = plan === 'ultimate'
  const maxTemplates = templateLimit(plan)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-charcoal">
      <div className="w-8 h-8 rounded-full border-2 border-silver-dim border-t-platinum" style={{ animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  if (!isPaid) return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center glass-dark border border-border rounded-[24px] p-10">
        <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-4">Dashboard Access</p>
        <h2 className="text-platinum mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 300 }}>
          App access required
        </h2>
        <p className="font-body text-silver-dim text-sm leading-relaxed mb-8">
          The VELURYN dashboard is available on Pro ($9/mo) and Ultimate ($19/mo) plans. You are currently on the Free plan (web only).
        </p>
        <a href={GET_APP_MAILTO} className="inline-flex items-center justify-center bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-silver transition-colors">
          Get App Access
        </a>
        <div className="mt-4">
          <a href="/pricing" className="font-body text-silver-dim text-xs underline underline-offset-4">See all plans</a>
        </div>
      </div>
    </div>
  )

  const navItems: { key: DashTab; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key: 'generate', label: 'Generate', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'templates', label: 'Templates', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { key: 'account', label: 'Account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  return (
    <div className="min-h-screen bg-charcoal flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-charcoal/80 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full z-30 w-64 bg-charcoal-2 border-r border-border flex flex-col transition-transform duration-300',
        'md:static md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-charcoal-3 border border-border overflow-hidden flex-shrink-0 relative">
              {/* Logo placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-platinum font-bold text-xs">V</div>
            </div>
            <div>
              <p className="font-body font-medium text-platinum text-xs">VELURYN</p>
              <p className="font-body text-silver-dim text-[0.6rem] uppercase tracking-widest">Agnecy</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => { setDashTab(item.key); setSidebarOpen(false) }}
              className={cn('w-full flex items-center gap-3 px-4 py-3 rounded-[12px] font-body text-xs tracking-[0.1em] uppercase transition-all text-left',
                tab === item.key ? 'bg-platinum/10 text-platinum border border-platinum/20' : 'text-silver-dim hover:text-platinum hover:bg-charcoal-3')}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <div className="px-4 py-3 rounded-[12px] bg-charcoal-3 border border-border">
            <p className="font-body text-[0.5rem] tracking-[0.2em] uppercase text-silver-dim mb-1">{config.name} Plan</p>
            <p className="font-body text-platinum text-xs font-medium">{config.price === 0 ? 'Free' : '$' + config.price + '/mo'}</p>
          </div>
          <button onClick={signOut} className="w-full font-body text-[0.6rem] tracking-widest uppercase px-4 py-2.5 rounded-[10px] border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all text-left">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="border-b border-border bg-charcoal-2/50 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-silver-dim hover:text-platinum" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-body font-medium text-platinum text-sm capitalize">{tab}</h1>
              <p className="font-body text-silver-dim/60 text-[0.6rem]">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn('font-body text-[0.55rem] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border',
              isUltimate ? 'border-platinum/40 bg-platinum/15 text-platinum' : 'border-platinum/30 bg-platinum/10 text-platinum')}>
              {config.name}
            </span>
            {!isUltimate && (
              <a href={ULTIMATE_MAILTO} className="hidden sm:inline-flex font-body text-[0.55rem] tracking-widest uppercase px-3 py-1.5 rounded-full border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all">
                Upgrade to Ultimate
              </a>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {/* ── Overview ── */}
          {tab === 'overview' && (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="mb-8">
                <h2 className="text-platinum mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 300 }}>
                  Welcome back{user?.email ? ', ' + user.email.split('@')[0] : ''}
                </h2>
                <p className="font-body text-silver-dim text-sm">Here is your dashboard overview.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Emails Generated', value: usageCount, suffix: 'total' },
                  { label: 'Templates Available', value: maxTemplates, suffix: 'of ' + ALL_TEMPLATES_META.length },
                  { label: 'Current Plan', value: config.name, suffix: '$' + config.price + '/mo' },
                  { label: 'CSV Row Limit', value: bulkLimit(plan) === -1 ? 'Unlimited' : String(bulkLimit(plan)), suffix: 'per upload' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-dark border border-border rounded-[18px] p-5">
                    <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-2">{stat.label}</p>
                    <p className="font-body font-medium text-platinum text-xl mb-1">{stat.value}</p>
                    <p className="font-body text-silver-dim/60 text-[0.65rem]">{stat.suffix}</p>
                  </div>
                ))}
              </div>

              {/* Export formats */}
              <div className="glass-dark border border-border rounded-[20px] p-6 mb-6">
                <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-4">Export Formats Available</p>
                <div className="flex flex-wrap gap-2">
                  {(['csv', 'txt', 'pdf'] as const).map((fmt) => (
                    <span key={fmt} className={cn('font-body text-[0.55rem] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border',
                      canExport(plan, fmt) ? 'border-platinum/30 bg-platinum/10 text-platinum' : 'border-border text-silver-dim/40')}>
                      {fmt.toUpperCase()} {canExport(plan, fmt) ? '' : '(locked)'}
                    </span>
                  ))}
                  {!isUltimate && (
                    <a href={ULTIMATE_MAILTO} className="font-body text-[0.55rem] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-border-md text-silver-dim hover:border-silver hover:text-silver transition-all">
                      Upgrade for TXT + PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Quick actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <button onClick={() => setDashTab('generate')} className="glass-dark border border-border rounded-[20px] p-6 text-left hover:border-border-md transition-all">
                  <p className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim mb-2">Quick Start</p>
                  <p className="font-body font-medium text-platinum text-sm mb-1">Generate an Email</p>
                  <p className="font-body text-silver-dim text-xs">Choose a template and fill in the details.</p>
                </button>
                <button onClick={() => setDashTab('templates')} className="glass-dark border border-border rounded-[20px] p-6 text-left hover:border-border-md transition-all">
                  <p className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim mb-2">Browse</p>
                  <p className="font-body font-medium text-platinum text-sm mb-1">Template Library</p>
                  <p className="font-body text-silver-dim text-xs">{maxTemplates} templates available on your plan.</p>
                </button>
              </div>
            </div>
          )}

          {/* ── Generate (embeds the tool) ── */}
          {tab === 'generate' && (
            <div className="py-4">
              <EmailGeneratorTool />
            </div>
          )}

          {/* ── Templates ── */}
          {tab === 'templates' && (
            <div className="p-6 max-w-5xl mx-auto">
              <h2 className="text-platinum mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.5rem', fontWeight: 300 }}>Template Library</h2>
              <p className="font-body text-silver-dim text-xs mb-8">{maxTemplates} unlocked of {ALL_TEMPLATES_META.length} total</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALL_TEMPLATES_META.map((t, i) => {
                  const locked = i >= maxTemplates
                  return (
                    <div key={i} className={cn('glass-dark border rounded-[16px] p-5', locked ? 'border-border opacity-40' : 'border-border hover:border-border-md')}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-body text-[0.5rem] tracking-[0.2em] uppercase text-silver-dim border border-border px-2 py-0.5 rounded-full">{t.category}</span>
                        {locked && <span className="font-body text-[0.45rem] tracking-widest uppercase text-silver-dim">{t.tier === 2 ? 'Ultimate' : 'Pro'}</span>}
                      </div>
                      <p className="font-body font-medium text-platinum text-xs">{t.name}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Account ── */}
          {tab === 'account' && (
            <div className="p-6 max-w-2xl mx-auto">
              <h2 className="text-platinum mb-6" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.5rem', fontWeight: 300 }}>Account</h2>
              <div className="space-y-4">
                <div className="glass-dark border border-border rounded-[20px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-border"><p className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim">Profile</p></div>
                  <div className="px-6 py-5 space-y-4">
                    <div><p className="font-body text-[0.55rem] tracking-widests uppercase text-silver-dim mb-1">Email</p><p className="font-body text-platinum text-sm">{user?.email}</p></div>
                    <div><p className="font-body text-[0.55rem] tracking-widests uppercase text-silver-dim mb-1">User ID</p><p className="font-body text-silver text-[0.65rem] font-mono break-all">{user?.id}</p></div>
                    <div><p className="font-body text-[0.55rem] tracking-widests uppercase text-silver-dim mb-1">Current Plan</p>
                      <span className={cn('font-body text-[0.6rem] tracking-[0.15em] uppercase px-3 py-1 rounded-full border inline-block',
                        isUltimate ? 'border-platinum/40 bg-platinum/15 text-platinum' : 'border-platinum/30 bg-platinum/10 text-platinum')}>
                        {config.name} - ${config.price}/mo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glass-dark border border-border rounded-[20px] overflow-hidden">
                  <div className="px-6 py-4 border-b border-border"><p className="font-body text-[0.6rem] tracking-widest uppercase text-silver-dim">Plan Features</p></div>
                  <div className="px-6 py-5 space-y-3">
                    {[
                      { label: 'Templates', value: maxTemplates + ' available' },
                      { label: 'CSV Upload', value: config.csvUpload ? 'Yes' : 'No' },
                      { label: 'CSV Row Limit', value: bulkLimit(plan) === -1 ? 'Unlimited' : String(bulkLimit(plan)) + ' rows' },
                      { label: 'Export Formats', value: config.exportFormats.length > 0 ? config.exportFormats.map(f => f.toUpperCase()).join(', ') : 'None' },
                      { label: 'Dashboard Access', value: 'Yes' },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <p className="font-body text-silver-dim text-xs">{row.label}</p>
                        <p className="font-body text-platinum text-xs font-medium">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {!isUltimate && (
                  <div className="glass border border-border rounded-[20px] p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body font-medium text-platinum text-sm mb-1">Upgrade to Ultimate</p>
                      <p className="font-body text-silver-dim text-xs">150 templates, unlimited CSV, TXT + PDF export for $19/mo.</p>
                    </div>
                    <a href={ULTIMATE_MAILTO} className="flex-shrink-0 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-6 py-3 rounded-full hover:bg-silver transition-colors">
                      Upgrade
                    </a>
                  </div>
                )}

                <button onClick={signOut} className="w-full font-body text-[0.65rem] tracking-widest uppercase px-6 py-3.5 rounded-full border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
