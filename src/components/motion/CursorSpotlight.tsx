'use client'

import { useEffect, useState } from 'react'

export function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -400, y: -400 })

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] transition-none max-md:hidden"
      style={{
        background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px,
          rgba(196,196,212,0.055) 0%, transparent 65%)`,
      }}
      aria-hidden
    />
  )
}
