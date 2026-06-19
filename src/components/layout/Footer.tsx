'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Youtube, Mail } from 'lucide-react'
import { EllipseImage } from '@/components/ui/EllipseImage'

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/veluryn-agnecy', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/velurynagnecy', label: 'X / Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@velurynagnecy', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/velurynagnecy', label: 'Instagram' },
]

const navGroups = {
  Agency: [
    { label: 'About Us', href: '/#about' },
    { label: 'Capabilities', href: '/#services' },
    { label: 'Contact Us', href: '/#contact' },
  ],
  Divisions: [
    { label: 'Digital Management', href: '/va-mgmt' },
    { label: 'Trust Infrastructure', href: '/vasd' },
    { label: 'Intelligence Reports', href: '/case-studies' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="logo-circle bg-gray-900 border border-gray-800 p-1">
                <Image src="/assets/logo.png" alt="VELURYN AGNECY" fill sizes="32px" className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-body text-[0.7rem] font-bold text-gray-100 uppercase tracking-widest leading-none mb-0.5">
                  Veluryn Agnecy
                </span>
                <span className="font-body text-[0.55rem] font-medium text-gray-500 uppercase tracking-widest leading-none">
                  Intelligence & Operations
                </span>
              </div>
            </Link>

            <p className="font-body text-xs text-gray-400 leading-relaxed max-w-sm mb-8 font-medium">
              A global business intelligence and digital services firm. <br/>
              Remote-first. Asia-based. Worldwide in reach.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              <a
                href="mailto:vivin.b@velurynagnecy.com"
                className="flex items-center gap-2 font-body text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-gray-500 shrink-0" />
                vivin.b@velurynagnecy.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all rounded-sm"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(navGroups).map(([group, links]) => (
              <div key={group}>
                <h4 className="font-body text-xs font-bold text-gray-300 mb-5">{group}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-xs font-medium text-gray-500 hover:text-gray-200 transition-colors"
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

        {/* Divisions strip */}
        <div className="border-t border-gray-800 pt-8 mb-10 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-1 h-8 bg-gray-300 shrink-0" />
            <div>
              <p className="font-body text-[0.65rem] tracking-[0.1em] uppercase text-gray-300 mb-1 font-bold">VA Mgmt</p>
              <p className="font-body text-xs font-medium text-gray-500">Digital Management Division</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1">
            <div className="w-1 h-8 bg-[#60A5FA] shrink-0" />
            <div>
              <p className="font-body text-[0.65rem] tracking-[0.1em] uppercase text-[#60A5FA] mb-1 font-bold">VASD</p>
              <p className="font-body text-xs font-medium text-gray-500">Trust Infrastructure Division</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="font-body text-xs font-medium text-gray-500">
              © {new Date().getFullYear()} VELURYN AGNECY. All rights reserved.
            </p>

            <div className="hidden sm:block w-px h-6 bg-gray-800 shrink-0" aria-hidden />

            <div className="flex items-center gap-3">
              <EllipseImage
                src="/assets/vivin-bharathi.png"
                alt="Vivin Bharathi"
                width={36}
                className="ring-1 ring-gray-700"
              />
              <div>
                <p className="font-body text-xs font-bold text-gray-300 leading-tight">Vivin Bharathi</p>
                <p className="font-body text-[0.6rem] tracking-[0.1em] uppercase font-medium text-gray-500 mt-0.5">CEO & Founder</p>
              </div>
            </div>
          </div>

          <p className="font-body text-[0.65rem] tracking-widest font-bold uppercase text-gray-600 lg:text-right">
            Trust First.
          </p>
        </div>
      </div>
    </footer>
  )
}
