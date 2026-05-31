import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SubmitCase } from '@/components/sections/SubmitCase'

export const metadata: Metadata = {
  title: 'Submit a Case — VASD | VELURYN AGNECY',
  description: 'Submit a suspicious email, domain, or entity to VASD for three-layer verification. Free. Confidential. Documented.',
}

export default function SubmitCasePage() {
  return (
    <>
      <Navbar />
      <main>
        <SubmitCase />
      </main>
      <Footer />
    </>
  )
}
