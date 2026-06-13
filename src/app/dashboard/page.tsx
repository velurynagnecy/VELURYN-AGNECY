import type { Metadata } from 'next'
import { DashboardClient } from './DashboardClient'

export const metadata: Metadata = {
  title: 'Dashboard | VELURYN AGNECY',
  description: 'Your VELURYN AGNECY dashboard. Generate emails, manage templates, and track usage.',
  robots: { index: false },
}

export default function DashboardPage() {
  return <DashboardClient />
}
