'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Youtube, Mail } from 'lucide-react'
import { EllipseImage } from '@/components/ui/EllipseImage'

const socials = [
  { icon: Instagram, href: 'https://instagram.com/velurynagnecy', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/veluryn-agnecy', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/velurynagnecy', label: 'X / Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@velurynagnecy', label: 'YouTube' },
]

const navGroups = {
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ],
  Verticals: [
    { label: 'VA Mgmt', href: '/va-mgmt' },
    { label: 'VASD', href: '/vasd' },
    { label: 'Case Studies', href: '/case-studies' },
  ],
  Connect: [
    { label: 'Contact', href: '/#contact' },
    { label: 'Partners', href: '/#contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal-2 border-t border-[rgba(200,200,220,0.07)]">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="logo-circle border border-[rgba(200,200,220,0.08)]">
                <Image src="/assets/logo.png" alt="VELURYN AGNECY" fill sizes="32px" className="object-cover" />
              </div>
              <span className="font-body text-sm font-semibold text-platinum uppercase tracking-widest">
                Veluryn <span className="text-silver-dim font-normal">Agnecy</span>
              </span>
            </Link>

            <p className="font-body text-sm font-medium text-silver mb-4 leading-snug max-w-xs">
              &ldquo;Trust First. Everything Follows.&rdquo;
            </p>

            <p className="font-body text-xs text-silver-dim leading-relaxed max-w-sm mb-8" style={{ opacity: 0.7 }}>
              A global business intelligence and digital services firm. Remote-first. Asia-based. Worldwide in reach.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              <a
                href="mailto:vivin.b@velurynagnecy.com"
                className="flex items-center gap-2.5 font-body text-xs text-silver-dim hover:text-platinum transition-colors"
              >
                <Mail size={12} className="text-silver shrink-0" />
                vivin.b@velurynagnecy.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon w-8 h-8 border border-[rgba(200,200,220,0.08)] flex items-center justify-center text-silver-dim hover:text-platinum hover:border-[rgba(200,200,220,0.2)] transition-all"
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {Object.entries(navGroups).map(([group, links]) => (
              <div key={group}>
                <h4 className="font-body text-[0.6rem] tracking-[0.25em] uppercase text-silver-dim mb-5 font-semibold">{group}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-xs text-silver-dim hover:text-platinum transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Verticals strip */}
        <div className="border-t border-[rgba(200,200,220,0.06)] pt-8 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 px-4 py-3 bg-charcoal border border-[rgba(200,200,220,0.06)] flex-1">
            <div className="w-0.5 h-8 bg-platinum shrink-0" />
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-platinum mb-0.5 font-semibold">VA Mgmt</p>
              <p className="font-body text-xs text-silver-dim">Talent & Influencer Marketing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-charcoal border border-[rgba(200,200,220,0.06)] flex-1">
            <div className="w-0.5 h-8 bg-steel-blue shrink-0" />
            <div>
              <p className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-steel-blue mb-0.5 font-semibold">VASD</p>
              <p className="font-body text-xs text-silver-dim">Trust Intelligence & Verification</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(200,200,220,0.06)] pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="font-body text-xs text-silver-dim" style={{ opacity: 0.4 }}>
              © {new Date().getFullYear()} VELURYN AGNECY. All rights reserved.
            </p>

            <div className="hidden sm:block w-px h-6 bg-[rgba(200,200,220,0.08)] shrink-0" aria-hidden />

            <div className="flex items-center gap-3">
              <EllipseImage
                src="/assets/vivin-bharathi.png"
                alt="Vivin Bharathi"
                width={44}
                className="ring-1 ring-[rgba(200,200,220,0.1)]"
              />
              <div>
                <p className="font-body text-sm font-semibold text-platinum leading-tight">Vivin Bharathi</p>
                <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-silver-dim mt-0.5">CEO & Founder</p>
              </div>
            </div>
          </div>

          <p className="font-body text-xs text-silver-dim lg:text-right" style={{ opacity: 0.35 }}>
            Built with integrity. Delivered with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
