'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'VA Mgmt', href: '/va-mgmt' },
  { label: 'VASD', href: '/vasd' },
  { label: 'Submit a Case', href: '/submit-case' },
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
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed z-50 transition-all duration-[400ms]',
          scrolled
            ? 'top-4 left-1/2 -translate-x-1/2 w-fit min-w-[min(700px,90vw)] max-w-[90vw]'
            : 'top-0 left-0 right-0 w-full'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        <nav
          className={cn(
            'flex items-center justify-between transition-all duration-[400ms]',
            scrolled ? 'nav-pill px-6 py-3' : 'max-w-7xl mx-auto px-6 py-6 bg-transparent'
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="logo-circle">
              <Image
                src="/assets/logo.png"
                alt="Veluryn Agnecy"
                fill
                sizes="36px"
                className="object-cover object-center"
              />
            </div>
            <AnimatePresence mode="wait">
              {!scrolled && (
                <motion.span
                  key="full-logo"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-lg font-medium text-platinum uppercase overflow-hidden whitespace-nowrap"
                  style={{ letterSpacing: '0.12em' }}
                >
                  Veluryn <span className="text-silver-dim">Agnecy</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <ul
            className={cn(
              'hidden md:flex items-center',
              scrolled ? 'gap-5' : 'gap-8'
            )}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body uppercase text-silver-dim hover:text-platinum hover-underline"
                  style={{
                    fontSize: scrolled ? '0.65rem' : '0.7rem',
                    letterSpacing: '0.2em',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={contactHref}
            className={cn(
              'hidden md:inline-flex items-center font-body uppercase font-medium text-charcoal bg-platinum hover:bg-silver rounded-pill transition-colors',
              scrolled ? 'text-[0.65rem] px-4 py-2' : 'text-[0.7rem] px-5 py-2.5'
            )}
            style={{ letterSpacing: '0.2em' }}
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Mobile floating hamburger */}
      <button
        type="button"
        className="md:hidden fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full glass-dark flex items-center justify-center text-platinum shadow-lg"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[55] bg-charcoal/98 backdrop-blur-xl flex flex-col justify-end pb-24 px-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.ul
              className="flex flex-col gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-4xl font-light text-platinum"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={contactHref}
                  className="inline-flex rounded-pill font-body text-xs tracking-widest uppercase font-medium text-charcoal bg-platinum px-6 py-3"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
