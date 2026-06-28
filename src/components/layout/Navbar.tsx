'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About Us', href: '/#about' },
  { label: 'VASD', href: '/vasd' },
  { label: 'Intelligence Reports', href: '/case-studies' },
  { label: 'Capabilities', href: '/#services' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
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
          'top-0 left-0 right-0 w-full border-b',
          scrolled
            ? 'bg-[#1A1C24] border-[rgba(200,200,220,0.1)] shadow-md'
            : 'bg-[#1A1C24] border-[rgba(200,200,220,0.06)]'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="logo-circle bg-[#252830] border border-[rgba(200,200,220,0.12)] p-1">
              <Image
                src="/assets/logo.png"
                alt="Veluryn Agnecy"
                fill
                sizes="32px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[0.7rem] font-bold text-[#E8E8F0] uppercase tracking-widest leading-none mb-0.5">
                Veluryn Agnecy
              </span>
              <span className="font-body text-[0.55rem] font-medium text-[#8A8AA0] uppercase tracking-widest leading-none">
                Intelligence & Operations
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[0.7rem] font-medium uppercase tracking-[0.1em] text-[#C4C4D4] hover:text-[#E8E8F0] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="font-body text-[0.7rem] uppercase tracking-[0.1em] font-semibold text-white bg-[#0F3B68] px-6 py-2.5 hover:bg-[#1E4D82] transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[rgba(200,200,220,0.12)] text-[#C4C4D4] hover:text-[#E8E8F0] transition-colors bg-[#252830]"
            style={{ borderRadius: '2px' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[45] bg-[#1A1C24] flex flex-col justify-center px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-6 mt-16">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-xl font-semibold text-[#E8E8F0] uppercase tracking-widest"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-8 border-t border-[rgba(200,200,220,0.1)] mt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full font-body text-sm font-semibold uppercase tracking-[0.1em] text-white bg-[#0F3B68] px-6 py-4"
                  style={{ borderRadius: '2px' }}
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}