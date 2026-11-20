import { Link } from 'react-router-dom'
import { Compass, Globe, Mail, MapPin } from 'lucide-react'
import { STUDIO_LOCATIONS } from '../data/projects'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#0A1112]/10 bg-[#F2F4F3] text-[#0A1112]">
      {/* Top Grid */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-20 pb-10 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: Brand, Tagline & Social Icons */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="font-serif text-xl font-bold tracking-[-0.02em] text-[#0A1112]"
            >
              Terrane
            </Link>
            <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-[#0A1112]/65">
              Built for homeowners who want architecture and water engineered as one structure.
            </p>
            <div className="mt-6 flex items-center gap-4 text-[#0A1112]/70">
              <Link to="/projects" aria-label="Projects" className="hover:text-[#0A1112]">
                <Compass className="h-4 w-4" />
              </Link>
              <Link to="/studio" aria-label="Studio" className="hover:text-[#0A1112]">
                <Globe className="h-4 w-4" />
              </Link>
              <a
                href="mailto:studio@terrane.build"
                aria-label="Email Terrane"
                className="hover:text-[#0A1112]"
              >
                <Mail className="h-4 w-4" />
              </a>
              <Link to="/contact" aria-label="Offices" className="hover:text-[#0A1112]">
                <MapPin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: 4 Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
            <div>
              <div className="text-xs font-semibold text-[#0A1112]">Disciplines</div>
              <ul className="mt-4 space-y-2.5 text-xs text-[#0A1112]/65">
                <li>
                  <Link to="/projects" className="hover:text-[#0A1112]">
                    Whole-Estate
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-[#0A1112]">
                    Luxury Pools
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="hover:text-[#0A1112]">
                    Home Remodels
                  </Link>
                </li>
                <li>
                  <Link to="/studio" className="hover:text-[#0A1112]">
                    Site Engineering
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#0A1112]">Studio</div>
              <ul className="mt-4 space-y-2.5 text-xs text-[#0A1112]/65">
                <li>
                  <Link to="/studio" className="hover:text-[#0A1112]">
                    Practice
                  </Link>
                </li>
                <li>
                  <Link to="/studio" className="hover:text-[#0A1112]">
                    Principals
                  </Link>
                </li>
                <li>
                  <Link to="/studio" className="hover:text-[#0A1112]">
                    Material Library
                  </Link>
                </li>
                <li>
                  <Link to="/journal" className="hover:text-[#0A1112]">
                    Journal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#0A1112]">Offices</div>
              <ul className="mt-4 space-y-2.5 text-xs text-[#0A1112]/65">
                {STUDIO_LOCATIONS.map((loc) => (
                  <li key={loc.city}>
                    <Link to="/contact" className="hover:text-[#0A1112]">
                      {loc.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-[#0A1112]">Legal</div>
              <ul className="mt-4 space-y-2.5 text-xs text-[#0A1112]/65">
                <li>CSLB #1094821</li>
                <li>
                  <Link to="/contact" className="hover:text-[#0A1112]">
                    Book a Site Walk
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-[#0A1112]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[#0A1112]">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="mt-16 text-center text-xs font-medium text-[#0A1112]/70">
          © 2026 Terrane
        </div>
      </div>

      {/* Bottom Horizon Fade + Giant Wordmark */}
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px] lg:h-[360px]">
        <img
          src="/images/pool-infinity.jpg"
          alt="Terrane architectural infinity pool horizon"
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F2F4F3] via-[#F2F4F3]/40 to-transparent" />
        <div
          aria-hidden="true"
          style={{ fontWeight: 700 }}
          className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center font-serif text-[23vw] leading-[0.76] font-bold tracking-[-0.05em] text-white/95 select-none"
        >
          terrane
        </div>
      </div>
    </footer>
  )
}
