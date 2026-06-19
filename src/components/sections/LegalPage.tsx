import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Reveal } from '@/components/motion/Reveal'

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export type LegalSection = {
  number: number
  title: string
  blocks: ContentBlock[]
}

export type CrossLink = {
  label: string
  href: string
}

type Props = {
  title: string
  subtitle: string
  lastUpdated: string
  sections: LegalSection[]
  crossLinks: CrossLink[]
}

export function LegalPage({ title, subtitle, lastUpdated, sections, crossLinks }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* Page Header — dark, matching /contact */}
        <div className="bg-[#111827] border-b border-gray-800 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#60A5FA]" />
              <span className="font-body text-[0.65rem] tracking-[0.25em] uppercase text-[#60A5FA] font-semibold">
                VELURYN AGNECY — Legal
              </span>
            </Reveal>
            <Reveal delay={0.07}>
              <h1
                className="text-white mb-4"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-body text-sm text-gray-400 font-light">{subtitle}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="font-body text-xs text-gray-600 mt-3 uppercase tracking-widest font-semibold">
                Last updated: {lastUpdated}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Legal Content */}
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">

          {sections.map((section) => (
            <Reveal key={section.number} delay={0.04 * (section.number - 1)}>
              <div className="mb-12 pb-12 border-b border-gray-100 last:border-0 last:mb-0">
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className="font-body text-xs font-bold text-[#0F3B68] tabular-nums shrink-0"
                    aria-hidden="true"
                  >
                    {String(section.number).padStart(2, '0')}
                  </span>
                  <h2 className="font-body text-lg font-bold text-gray-900 tracking-tight">
                    {section.title}
                  </h2>
                </div>

                <div className="pl-8 flex flex-col gap-4">
                  {section.blocks.map((block, idx) => {
                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={idx}
                          className="font-body text-sm text-gray-600 leading-relaxed"
                        >
                          {block.text}
                        </p>
                      )
                    }
                    return (
                      <ul key={idx} className="flex flex-col gap-2.5">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-2 w-1 h-1 rounded-full bg-[#0F3B68] shrink-0" />
                            <span className="font-body text-sm text-gray-600 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Cross-links */}
          <Reveal>
            <div className="mt-16 pt-10 border-t border-gray-200">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 font-bold mb-5">
                Legal Documents
              </p>
              <div className="flex flex-wrap gap-4">
                {crossLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-body text-xs font-semibold text-gray-700 hover:text-[#0F3B68] transition-colors border border-gray-200 px-5 py-2.5 hover:border-[#0F3B68]"
                    style={{ borderRadius: '2px' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </main>
      <Footer />
    </>
  )
}
