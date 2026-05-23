import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { VASD } from '@/components/sections/VASD'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'VASD — Veluryn Agnecy Service Digital',
  description: 'Enterprise email filtering, threat protection, and inbox management.',
}

export default function VASDPage() {
  return (
    <>
      <Navbar />
      <main>
        <VASD />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
