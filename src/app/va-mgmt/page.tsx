import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { VAMgmt } from '@/components/sections/VAMgmt'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'VA Mgmt — Veluryn Agnecy Management',
  description:
    'Influencer marketing management — talent scouting, campaign strategy, and performance tracking.',
}

export default function VAMgmtPage() {
  return (
    <>
      <Navbar />
      <main>
        <VAMgmt />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
