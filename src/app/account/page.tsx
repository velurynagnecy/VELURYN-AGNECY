import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AccountClient } from './AccountClient'

export const metadata: Metadata = {
  title: 'Account - VELURYN AGNECY',
  description: 'Sign in or create your VELURYN AGNECY account to access the email generator and pro tools.',
}

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-charcoal">
        <AccountClient />
      </main>
      <Footer />
    </>
  )
}