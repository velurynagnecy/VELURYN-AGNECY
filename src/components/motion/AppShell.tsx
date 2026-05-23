'use client'

import { SmoothScroll } from './SmoothScroll'
import { CursorSpotlight } from './CursorSpotlight'
import { CustomCursor } from './CustomCursor'
import { PageTransition } from './PageTransition'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <CursorSpotlight />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  )
}
