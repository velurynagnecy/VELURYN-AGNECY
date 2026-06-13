import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Pricing | VELURYN AGNECY Email Generator',
  description: 'Simple, transparent pricing. Start free, upgrade when you need more templates, bulk CSV, and multi-format export.',
}

const GET_APP_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=App%20Access%20Request&body=Hi%2C%20I%20would%20like%20to%20get%20access%20to%20the%20VELURYN%20AGNECY%20app.'
const PRO_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Pro%20Plan%20Request&body=Hi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Pro%20plan%20($9%2Fmonth).'
const ULTIMATE_MAILTO = 'mailto:vivin.b@velurynagnecy.com?subject=Ultimate%20Plan%20Request&body=Hi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Ultimate%20plan%20($19%2Fmonth).'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '',
    tagline: 'Web access. Get started today.',
    href: '/account',
    cta: 'Start Free',
    primary: false,
    features: [
      { label: '5 email templates', included: true },
      { label: 'Single email generation', included: true },
      { label: 'Copy to clipboard', included: true },
      { label: 'Web access only', included: true },
      { label: 'CSV bulk generation', included: false },
      { label: 'CSV export', included: false },
      { label: 'TXT / PDF export', included: false },
      { label: 'Dashboard app', included: false },
    ],
  },
  {
    name: 'Pro',
    price: 9,
    period: '/mo',
    tagline: 'Full app + 30 templates.',
    href: PRO_MAILTO,
    cta: 'Get App',
    primary: true,
    features: [
      { label: '30 email templates', included: true },
      { label: 'Single + bulk generation', included: true },
      { label: 'CSV upload (500 rows)', included: true },
      { label: 'CSV export', included: true },
      { label: 'Full dashboard app', included: true },
      { label: 'TXT export', included: false },
      { label: 'PDF export', included: false },
      { label: 'Unlimited CSV rows', included: false },
    ],
  },
  {
    name: 'Ultimate',
    price: 19,
    period: '/mo',
    tagline: '150 templates. Unlimited everything.',
    href: ULTIMATE_MAILTO,
    cta: 'Get Ultimate',
    primary: false,
    features: [
      { label: '150 email templates', included: true },
      { label: 'Single + bulk generation', included: true },
      { label: 'Unlimited CSV rows', included: true },
      { label: 'CSV export', included: true },
      { label: 'TXT export', included: true },
      { label: 'PDF export', included: true },
      { label: 'Full dashboard app', included: true },
      { label: 'Priority support', included: true },
    ],
  },
]

const comparison = [
  { feature: 'Templates', free: '5', pro: '30', ultimate: '150' },
  { feature: 'Bulk CSV generation', free: 'No', pro: 'Up to 500 rows', ultimate: 'Unlimited' },
  { feature: 'CSV export', free: 'No', pro: 'Yes', ultimate: 'Yes' },
  { feature: 'TXT export', free: 'No', pro: 'No', ultimate: 'Yes' },
  { feature: 'PDF export', free: 'No', pro: 'No', ultimate: 'Yes' },
  { feature: 'Dashboard app', free: 'No', pro: 'Yes', ultimate: 'Yes' },
  { feature: 'Web access', free: 'Yes', pro: 'Yes', ultimate: 'Yes' },
  { feature: 'Price', free: '$0', pro: '$9/mo', ultimate: '$19/mo' },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '100px' }}>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-8 text-center">
          <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4">Pricing</p>
          <h1 className="text-platinum mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, letterSpacing: '-0.02em' }}>
            Simple, transparent pricing
          </h1>
          <p className="font-body text-silver-dim text-sm leading-relaxed max-w-xl mx-auto">
            Start free. Upgrade to Pro or Ultimate when you need bulk generation, the dashboard app, and multi-format export.
          </p>
        </section>

        {/* Plan cards */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`glass-dark border rounded-[24px] overflow-hidden flex flex-col ${plan.primary ? 'border-platinum/30 relative' : 'border-border'}`}>
                {plan.primary && (
                  <div className="bg-platinum text-charcoal text-center font-body text-[0.55rem] tracking-[0.2em] uppercase py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-8 flex-1">
                  <p className="font-body text-[0.55rem] tracking-[0.2em] uppercase text-silver-dim mb-3">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-platinum" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '3rem', fontWeight: 300, lineHeight: 1 }}>
                      ${plan.price}
                    </span>
                    {plan.period && <span className="font-body text-silver-dim text-sm mb-2">{plan.period}</span>}
                  </div>
                  <p className="font-body text-silver-dim text-xs mb-8">{plan.tagline}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[0.6rem] ${f.included ? 'bg-platinum/20 text-platinum' : 'bg-border text-silver-dim/40'}`}>
                          {f.included ? '✓' : '×'}
                        </span>
                        <span className={`font-body text-xs ${f.included ? 'text-silver' : 'text-silver-dim/40'}`}>{f.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <a href={plan.href} className={`w-full flex items-center justify-center font-body font-medium text-xs tracking-widest uppercase py-3.5 rounded-full transition-colors ${plan.primary ? 'bg-platinum text-charcoal hover:bg-silver' : 'border border-border-md text-silver hover:border-silver hover:text-platinum'}`}>
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <h2 className="text-platinum text-center mb-8" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.75rem', fontWeight: 300 }}>
            Full comparison
          </h2>
          <div className="glass-dark border border-border rounded-[20px] overflow-hidden">
            <div className="grid grid-cols-4 border-b border-border">
              <div className="px-6 py-4"><span className="font-body text-[0.55rem] tracking-widest uppercase text-silver-dim">Feature</span></div>
              {['Free', 'Pro', 'Ultimate'].map((h) => (
                <div key={h} className="px-4 py-4 text-center"><span className="font-body text-[0.55rem] tracking-widest uppercase text-platinum">{h}</span></div>
              ))}
            </div>
            {comparison.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 ${i < comparison.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="px-6 py-4"><p className="font-body text-silver text-xs">{row.feature}</p></div>
                {[row.free, row.pro, row.ultimate].map((val, j) => (
                  <div key={j} className="px-4 py-4 text-center">
                    <p className={`font-body text-xs ${val === 'No' ? 'text-silver-dim/40' : 'text-platinum'}`}>{val}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className="font-body text-silver-dim/60 text-xs text-center mt-6">
            To upgrade, email us at{' '}
            <a href="mailto:vivin.b@velurynagnecy.com" className="text-silver-dim underline underline-offset-4 hover:text-platinum">
              vivin.b@velurynagnecy.com
            </a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
