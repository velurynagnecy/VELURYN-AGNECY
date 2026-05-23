'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Youtube, Facebook, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { EllipseImage } from '@/components/ui/EllipseImage'

const socials = [
  { icon: Instagram, href: 'https://instagram.com/velurynagnecy', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/velurynagnecy', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/velurynagnecy', label: 'X / Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@velurynagnecy', label: 'YouTube' },
  { icon: Facebook, href: 'https://facebook.com/velurynagnecy', label: 'Facebook' },
]

const navGroups = {
  Company: [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Careers', href: '/#contact' },
    { label: 'Press', href: '/#contact' },
  ],
  Verticals: [
    { label: 'VA Mgmt', href: '/va-mgmt' },
    { label: 'VASD', href: '/vasd' },
  ],
  Connect: [
    { label: 'Contact', href: '/#contact' },
    { label: 'Partners', href: '/#contact' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-silver-dim/10">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="logo-circle border border-silver-dim/15">
                <Image src="/assets/logo.png" alt="Veluryn Agnecy" fill sizes="38px" className="object-cover" />
              </div>
              <span
                className="font-display text-base font-medium text-platinum uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                Veluryn <span className="text-silver-dim">Agnecy</span>
              </span>
            </Link>

            <p className="font-display text-2xl font-light italic text-silver mb-8 leading-relaxed max-w-xs">
              &ldquo;Trust First. Everything Follows.&rdquo;
            </p>

            <p className="font-body text-sm text-silver-dim leading-relaxed max-w-sm mb-10">
              A full-service global digital agency built on radical transparency. Remote-first. India-based. Worldwide in reach.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              <a
                href="mailto:velurynandoc@gmail.com"
                className="flex items-center gap-3 font-body text-sm text-silver-dim hover:text-platinum transition-colors"
              >
                <Mail size={13} className="text-silver shrink-0" />
                velurynandoc@gmail.com
              </a>
              <a
                href="mailto:vivin.b@velurynagnecy.com"
                className="flex items-center gap-3 font-body text-sm text-silver-dim hover:text-platinum transition-colors"
              >
                <Mail size={13} className="text-silver shrink-0" />
                vivin.b@velurynagnecy.com
              </a>
              <a
                href="tel:+919677533281"
                className="flex items-center gap-3 font-body text-sm text-silver-dim hover:text-platinum transition-colors"
              >
                <Phone size={13} className="text-silver shrink-0" />
                +91 96775 33281
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon w-9 h-9 border border-silver-dim/15 flex items-center justify-center text-silver-dim rounded-full"
                  whileHover={{ scale: 1.15, y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {Object.entries(navGroups).map(([group, links]) => (
              <div key={group}>
                <h4 className="font-body text-[0.6rem] tracking-[0.28em] uppercase text-silver mb-6">{group}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-silver-dim hover:text-platinum transition-colors hover-underline"
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

        <div className="border-t border-silver-dim/10 pt-8 mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-4 rounded-[14px] px-4 py-3 bg-charcoal-3 flex-1">
            <div className="w-0.5 h-10 bg-platinum shrink-0 rounded-full" />
            <div>
              <p className="font-body text-[0.65rem] tracking-widest uppercase text-platinum mb-0.5">VA Mgmt</p>
              <p className="font-body text-xs text-silver-dim">
                Veluryn Agnecy Management — Influencer Marketing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-[14px] px-4 py-3 bg-charcoal-3 flex-1">
            <div className="w-0.5 h-10 bg-steel-blue shrink-0 rounded-full" />
            <div>
              <p className="font-body text-[0.65rem] tracking-widest uppercase text-steel-blue mb-0.5">VASD</p>
              <p className="font-body text-xs text-silver-dim">
                Veluryn Agnecy Service Digital — Email Solutions
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-silver-dim/10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="font-body text-xs text-silver-dim shrink-0" style={{ opacity: 0.4 }}>
              © {new Date().getFullYear()} Veluryn Agnecy. All rights reserved.
            </p>

            <div className="hidden sm:block w-px h-8 bg-silver-dim/15 shrink-0" aria-hidden />

            <div className="flex items-center gap-4">
              <EllipseImage
                src="/assets/vivin-bharathi.png"
                alt="Vivin Bharathi"
                width={56}
                className="ring-1 ring-silver-dim/20"
              />
              <div>
                <p className="font-display text-lg font-medium text-platinum leading-tight">
                  Vivin Bharathi
                </p>
                <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-silver-dim mt-0.5">
                  CEO &amp; Founder
                </p>
                <a
                  href="mailto:vivin.b@velurynagnecy.com"
                  className="font-body text-xs text-silver-dim hover:text-platinum transition-colors mt-1 inline-block"
                >
                  vivin.b@velurynagnecy.com
                </a>
              </div>
            </div>
          </div>

          <p className="font-body text-xs text-silver-dim lg:text-right" style={{ opacity: 0.4 }}>
            Built with integrity. Delivered with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
