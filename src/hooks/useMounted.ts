'use client'

import { useEffect, useState } from 'react'

/** Avoid SSR/hydration leaving motion elements at opacity: 0 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
