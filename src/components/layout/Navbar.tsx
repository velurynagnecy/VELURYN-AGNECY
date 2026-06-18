'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'VA Mgmt', href: '/va-mgmt' },
  { label: 'VASD', href: '/vasd' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const contactHref =
    pathname === '/va-mgmt' || pathname === '/vasd' ? '#contact' : '/#contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed z-50 transition-all duration-300',
          scrolled
            ? 'top-0 left-0 right-0 w-full border-b border-[rgba(200,200,220,0.07)] bg-[rgba(26,28,36,0.98)] backdrop-blur-sm'
            : 'top-0 left-0 right-0 w-full'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="logo-circle">
              <Image
                src="/assets/logo.png"
                alt="Veluryn Agnecy"
                fill
                sizes="32px"
                className="object-cover object-center"
              />
            </div>
            <span
              className="font-body text-sm font-semibold text-platinum uppercase tracking-widest"
            >
              Veluryn <span className="text-silver-dim font-normal">Agnecy</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-silver-dim hover:text-platinum transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={contactHref}
              className="font-body text-[0.7rem] uppercase tracking-[0.18em] font-semibold text-charcoal bg-platinum px-5 py-2 hover:bg-silver transition-colors"
              style={{ borderRadius: '3px' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden w-9 h-9 flex items-center justify-center border border-[rgba(200,200,220,0.1)] text-silver-dim hover:text-platinum transition-colors"
            style={{ borderRadius: '3px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[55] bg-charcoal flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* top border accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[rgba(200,200,220,0.08)]" />
            <ul className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-2xl font-semibold text-platinum uppercase tracking-widest"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6 border-t border-[rgba(200,200,220,0.08)]">
                <Link
                  href={contactHref}
                  className="inline-block font-body text-sm font-semibold uppercase tracking-[0.2em] text-charcoal bg-platinum px-6 py-3"
                  style={{ borderRadius: '3px' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}