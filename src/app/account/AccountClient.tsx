'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { cn } from '@/lib/utils'

type Tab = 'signin' | 'signup'

export function AccountClient() {
  const [tab, setTab] = useState<Tab>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      if (data.session?.user) fetchProfile(data.session.user.id)
      else setChecking(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setChecking(false) }
    })
    return () => { listener.subscription.unsubscribe() }
  }, [])

  async function fetchProfile(userId: string) {
    setChecking(true)
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    setProfile(data ?? null)
    setChecking(false)
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) setError(err.message)
    setLoading(false)
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({ email, password })
    if (err) setError(err.message)
    else setMessage('Check your email to confirm your account.')
    setLoading(false)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  const PRO_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Pro%20Plan%20Upgrade%20Request&body=Hi%2C%20I%20would%20like%20to%20upgrade%20to%20the%20Pro%20plan.%20My%20account%20email%20is%3A%20' + encodeURIComponent(email || (user?.email ?? ''))

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 rounded-full border-2 border-silver-dim border-t-platinum animate-spin" />
      </div>
    )
  }

  if (user) {
    return (
      <section className="max-w-lg mx-auto px-6 pt-40 pb-20">
        <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4 text-center">
          Your Account
        </p>
        <h1
          className="text-platinum text-center mb-12"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          Welcome back
        </h1>

        <div className="glass-dark border border-border rounded-[24px] overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-1">Email</p>
            <p className="font-body text-platinum text-sm">{user.email}</p>
          </div>
          <div className="px-6 py-5 border-b border-border flex items-center justify-between">
            <div>
              <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-1">Plan</p>
              <p className="font-body text-platinum text-sm capitalize">{profile?.plan ?? 'free'}</p>
            </div>
            {(profile?.plan ?? 'free') === 'free' && (
              <a
                href={PRO_MAILTO}
                className="font-body text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 rounded-full bg-platinum text-charcoal hover:bg-silver transition-colors font-medium"
              >
                Upgrade to Pro
              </a>
            )}
            {(profile?.plan ?? 'free') === 'pro' && (
              <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-platinum/30 bg-platinum/10 text-platinum">
                Active
              </span>
            )}
          </div>
          <div className="px-6 py-5">
            <a href="/tools/email-generator" className="block w-full text-center font-body font-medium text-[0.65rem] tracking-widest uppercase px-6 py-3 rounded-full border border-border-md text-silver hover:border-silver hover:text-platinum transition-all mb-3">
              Open Email Generator
            </a>
            <button
              onClick={handleSignOut}
              className="w-full font-body text-[0.65rem] tracking-widest uppercase px-6 py-3 rounded-full border border-border text-silver-dim hover:border-silver-dim hover:text-silver transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-md mx-auto px-6 pt-40 pb-20">
      <div className="pointer-events-none fixed inset-0 bg-radial-silver opacity-30" />

      <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4 text-center">
        VELURYN AGNECY
      </p>
      <h1
        className="text-platinum text-center mb-10"
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 300,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {tab === 'signin' ? 'Sign In' : 'Create Account'}
      </h1>

      <div className="flex p-1 rounded-full border border-border bg-charcoal-2 mb-8">
        {(['signin', 'signup'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(null); setMessage(null) }}
            className={cn(
              'flex-1 font-body text-[0.6rem] tracking-[0.15em] uppercase py-2.5 rounded-full transition-all duration-200',
              tab === t ? 'bg-platinum text-charcoal font-medium' : 'text-silver-dim hover:text-platinum'
            )}
          >
            {t === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        ))}
      </div>

      <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp} className="glass-dark border border-border rounded-[24px] p-6 space-y-4">
        <div>
          <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="form-input w-full bg-charcoal px-4 py-3 font-body text-sm text-platinum"
          />
        </div>
        <div>
          <label className="block font-body text-[0.6rem] tracking-[0.2em] uppercase text-silver-dim mb-1.5">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 characters"
            minLength={6}
            className="form-input w-full bg-charcoal px-4 py-3 font-body text-sm text-platinum"
          />
        </div>

        {error && (
          <p className="font-body text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-[10px] px-4 py-3">
            {error}
          </p>
        )}
        {message && (
          <p className="font-body text-xs text-green-400 bg-green-400/10 border border-green-400/20 rounded-[10px] px-4 py-3">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase py-3.5 rounded-full hover:bg-silver transition-colors disabled:opacity-50"
        >
          {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className="font-body text-center text-silver-dim text-xs mt-6">
        {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => { setTab(tab === 'signin' ? 'signup' : 'signin'); setError(null) }} className="text-platinum hover:underline">
          {tab === 'signin' ? 'Sign up free' : 'Sign in'}
        </button>
      </p>
    </section>
  )
}