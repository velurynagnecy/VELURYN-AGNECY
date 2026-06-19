import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/motion/AppShell'

export const metadata: Metadata = {
  title: 'Veluryn Agnecy — Business Intelligence & Digital Operations.',
  description:
    'Veluryn Agnecy is a global business intelligence and digital services firm. We operate across two distinct verticals: digital management and trust infrastructure.',
  keywords:
    'trust intelligence, entity verification, enterprise security, digital agency, business intelligence, VA Mgmt, VASD',
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'Veluryn Agnecy',
    description: 'Business Intelligence & Digital Operations.',
    siteName: 'Veluryn Agnecy',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
