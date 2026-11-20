import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ScrollProgressBar } from './components/ScrollProgressBar'
import { PageLoader } from './components/PageLoader'
import { HouseCursor } from './components/HouseCursor'
import { HomePage } from './pages/HomePage'
import { ProjectsIndexPage } from './pages/ProjectsIndexPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { StudioPage } from './pages/StudioPage'
import { JournalPage } from './pages/JournalPage'
import { JournalArticlePage } from './pages/JournalArticlePage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'

gsap.registerPlugin(ScrollTrigger)

function AppShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [location.pathname])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F2F4F3] text-[#0A1112]">
      <HouseCursor />
      <PageLoader />
      <ScrollProgressBar />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsIndexPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/studio" element={<StudioPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<JournalArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<LegalPage mode="privacy" />} />
              <Route path="/terms" element={<LegalPage mode="terms" />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
