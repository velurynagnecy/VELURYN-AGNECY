import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { EmailGeneratorTool } from './EmailGeneratorTool'

export const metadata: Metadata = {
  title: 'Email Generator — VELURYN AGNECY',
  description: 'Generate perfectly personalised emails in seconds. Pick a template, fill your details, and copy your email instantly. Pro plan unlocks CSV bulk generation and 30+ templates.',
}

export default function EmailGeneratorPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-charcoal">

        {/* ── Hero Banner ── */}
        <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-radial-silver opacity-40" />

          <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-silver-dim mb-6">
            VELURYN AGNECY — VASD TOOLS
          </p>
          <h1
            className="text-platinum mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.035em',
            }}
          >
            Email Generator
          </h1>
          <p className="font-body text-silver-dim text-sm max-w-xl mx-auto leading-relaxed mb-10">
            Select a professional template, fill in your details, and generate a perfectly personalised email in seconds.
          </p>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-charcoal-2 font-body text-[0.65rem] tracking-[0.15em] uppercase text-silver-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-platinum/40 inline-block" />
            Pro: CSV bulk generation + 30 templates
            <a href="/contact" className="text-platinum hover:underline ml-1">Upgrade →</a>
          </div>
        </section>

        <div className="divider" />

        {/* ── Interactive Tool (client component) ── */}
        <EmailGeneratorTool />

        <div className="divider" />

        {/* ── Pro Feature Preview ── */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-silver-dim mb-4">Pro Features</p>
          <h2
            className="text-platinum mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Scale Without Limits
          </h2>
          <p className="font-body text-silver-dim text-sm max-w-lg mx-auto mb-14 leading-relaxed">
            The free demo lets you generate one email at a time. Pro unlocks everything — CSV uploads, 30 templates, and 5 export formats.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-left mb-12">
            {[
              { icon: '⊟', title: '30 Templates', desc: 'Across Sales, HR, Marketing, Customer Success, Networking & Internal.' },
              { icon: '⊞', title: 'CSV Bulk Generation', desc: 'Upload thousands of contacts and personalise every single email instantly.' },
              { icon: '⊕', title: '5 Export Formats', desc: 'CSV, Excel, JSON, ZIP text files, or copy all to clipboard in one click.' },
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
            className="inline-flex items-center gap-2 bg-platinum text-charcoal font-body font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-silver transition-colors"
          >
            Get Pro Access
          </a>
        </section>

      </main>
      <Footer />
    </>
  )
}
