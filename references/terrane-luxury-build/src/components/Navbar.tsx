import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Projects', to: '/projects' },
  { label: 'Studio', to: '/studio' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const forceSolidDark = scrolled || mobileOpen || pathname === '/contact'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          forceSolidDark
            ? 'border-b border-white/10 bg-neutral-950/95 py-4 text-[#F2F4F3] backdrop-blur-md'
            : 'bg-transparent py-6 text-white'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Link
            to="/"
            className="font-serif text-2xl font-light tracking-[0.22em] text-white uppercase"
          >
            Terrane
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[13px] font-normal tracking-[0.14em] uppercase transition-colors ${
                    isActive
                      ? 'text-white underline underline-offset-8'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-block rounded-full border border-white/80 px-5 py-2.5 text-[12px] tracking-[0.14em] text-white uppercase transition-colors hover:bg-white hover:text-[#0A1112]"
            >
              Book a Site Walk
            </Link>
          </div>

          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="cursor-pointer p-1.5 text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 top-[64px] z-50 bg-neutral-950 px-6 py-10 text-white md:hidden">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-[0.18em] text-white/90 uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-block rounded-full border border-white/80 px-5 py-3.5 text-center text-xs tracking-[0.16em] text-white uppercase"
            >
              Book a Site Walk
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
