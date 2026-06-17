import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'VASD Trust Verdicts — Veluryn Agnecy',
  description: 'Real validation sessions and trust intelligence findings by VELURYN AGNECY SERVICE DIGITAL.',
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
