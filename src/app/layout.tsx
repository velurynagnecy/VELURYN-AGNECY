import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/motion/AppShell'

export const metadata: Metadata = {
  title: 'VELURYN AGNECY | Full-Service Global Digital Agency',
  description:
    'VELURYN AGNECY is a full-service global digital agency offering high-end web design, poster design, SMMA, marketing, and the VASD entity verification division.',
  keywords:
    'digital agency, web design, SMMA, poster design, branding, VASD, entity verification',
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'VELURYN AGNECY | Full-Service Global Digital Agency',
    description: 'A full-service global digital agency providing design, marketing, and trust verification services.',
    siteName: 'VELURYN AGNECY',
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
