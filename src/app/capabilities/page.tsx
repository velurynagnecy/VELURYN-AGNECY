import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Services } from '@/components/sections/Services'

export const metadata: Metadata = {
  title: 'Capabilities | VELURYN AGNECY',
  description: 'Comprehensive digital capabilities spanning web design, development, marketing, branding, and trust intelligence.',
}

export default function CapabilitiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Services />
      </main>
      <Footer />
    </>
  )
}
