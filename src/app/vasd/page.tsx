import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { VASD } from '@/components/sections/VASD'

export const metadata: Metadata = {
  title: 'VASD — Trust Intelligence & Entity Verification',
  description: 'Multi-layer assessment framework for evaluating business entities and communications. Trust first, verified through evidence.',
}

export default function VASDPage() {
  return (
    <>
      <Navbar />
      <main>
        <VASD />
      </main>
      <Footer />
    </>
  )
}
