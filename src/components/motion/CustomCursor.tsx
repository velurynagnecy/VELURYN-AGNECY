'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_ACCENT = { r: 232, g: 232, b: 240 } // platinum
const LERP_POS = 0.2
const LERP_RING = 0.14
const LERP_STYLE = 0.18

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  '[role="button"]',
  '[role="link"]',
  'summary',
  '.service-card',
  '.card-hover',
  '.contact-form-panel',
  '.nav-pill',
  '.social-icon',
  '.btn-submit',
].join(',')

type Rgb = { r: number; g: number; b: number }

function parseRgb(color: string): Rgb | null {
  if (!color || color === 'transparent') return null
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return null
  const [, r, g, b] = match.map(Number)
  if (r === 0 && g === 0 && b === 0) return null
  return { r, g, b }
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpRgb(from: Rgb, to: Rgb, t: number): Rgb {
  return {
    r: lerp(from.r, to.r, t),
    g: lerp(from.g, to.g, t),
    b: lerp(from.b, to.b, t),
  }
}

function rgbToCss({ r, g, b }: Rgb, alpha = 1) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha})`
}

function getAccentFromElement(el: HTMLElement): Rgb {
  const explicit = el.closest('[data-cursor-accent]') as HTMLElement | null
  if (explicit?.dataset.cursorAccent) {
    const parsed = parseRgb(explicit.dataset.cursorAccent) || hexToRgb(explicit.dataset.cursorAccent)
    if (parsed) return parsed
  }

  const chain: HTMLElement[] = [el]
  let parent = el.parentElement
  while (parent && parent !== document.body) {
    chain.push(parent)
    parent = parent.parentElement
  }

  for (const node of chain) {
    const style = getComputedStyle(node)

    const dataAccent = node.dataset?.cursorAccent
    if (dataAccent) {
      const parsed = parseRgb(dataAccent) || hexToRgb(dataAccent)
      if (parsed) return parsed
    }

    if (node.matches('input, select, textarea') && document.activeElement === node) {
      const border = parseRgb(style.borderColor)
      if (border) return border
      const outline = parseRgb(style.outlineColor)
      if (outline) return outline
    }

    if (node.classList.contains('text-steel-blue') || node.classList.contains('bg-steel-blue')) {
      return { r: 74, g: 101, b: 128 }
    }
    if (node.classList.contains('border-steel-blue')) {
      return { r: 74, g: 101, b: 128 }
    }

    const bg = parseRgb(style.backgroundColor)
    if (bg && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      const luminance = (bg.r * 299 + bg.g * 587 + bg.b * 114) / 1000
      if (luminance > 40 && luminance < 240) return bg
      if (luminance >= 200) return bg
    }

    const color = parseRgb(style.color)
    if (color) {
      const luminance = (color.r * 299 + color.g * 587 + color.b * 114) / 1000
      if (luminance > 90) return color
    }

    const border = parseRgb(style.borderTopColor)
    if (border) {
      const width = parseFloat(style.borderTopWidth)
      if (width >= 1 && border.r + border.g + border.b > 60) return border
    }
  }

  return DEFAULT_ACCENT
}

function hexToRgb(hex: string): Rgb | null {
  const normalized = hex.trim().replace('#', '')
  if (normalized.length !== 6) return null
  const num = parseInt(normalized, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function findInteractiveTarget(el: Element | null): HTMLElement | null {
  let current: Element | null = el
  while (current && current !== document.documentElement) {
    if (current instanceof HTMLElement) {
      if (current.matches(INTERACTIVE_SELECTOR)) return current
      if (current.dataset.cursorInteractive !== undefined) return current
    }
    current = current.parentElement
  }
  return null
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const accent = useRef<Rgb>(DEFAULT_ACCENT)
  const targetAccent = useRef<Rgb>(DEFAULT_ACCENT)
  const hover = useRef(0)
  const targetHover = useRef(0)
  const visible = useRef(0)
  const rafId = useRef(0)

  useEffect(() => {
    const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mqCoarse = window.matchMedia('(pointer: coarse)')
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const evaluate = () => {
      const ok =
        mqFine.matches &&
        !mqCoarse.matches &&
        !mqReduced.matches &&
        window.innerWidth >= 768
      setEnabled(ok)
      document.documentElement.classList.toggle('custom-cursor-active', ok)
    }

    evaluate()
    mqFine.addEventListener('change', evaluate)
    mqCoarse.addEventListener('change', evaluate)
    mqReduced.addEventListener('change', evaluate)
    window.addEventListener('resize', evaluate)

    return () => {
      mqFine.removeEventListener('change', evaluate)
      mqCoarse.removeEventListener('change', evaluate)
      mqReduced.removeEventListener('change', evaluate)
      window.removeEventListener('resize', evaluate)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      visible.current = 1

      const under = document.elementFromPoint(e.clientX, e.clientY)
      const target = findInteractiveTarget(under)
      targetHover.current = target ? 1 : 0
      if (target) targetAccent.current = getAccentFromElement(target)
      else targetAccent.current = DEFAULT_ACCENT
    }

    const onDown = () => {
      targetHover.current = 1
    }

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target
      if (t instanceof HTMLElement && t.matches('input, select, textarea, button, a')) {
        targetHover.current = 1
        targetAccent.current = getAccentFromElement(t)
      }
    }

    const onFocusOut = () => {
      targetHover.current = 0
      targetAccent.current = DEFAULT_ACCENT
    }

    const onLeave = () => {
      visible.current = 0
    }

    const onEnter = () => {
      visible.current = 1
    }

    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, LERP_POS)
      pos.current.y = lerp(pos.current.y, mouse.current.y, LERP_POS)
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, LERP_RING)
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, LERP_RING)
      hover.current = lerp(hover.current, targetHover.current, LERP_STYLE)
      accent.current = lerpRgb(accent.current, targetAccent.current, LERP_STYLE)

      const dot = dotRef.current
      const ring = ringRef.current
      if (dot && ring) {
        const scale = 1 + hover.current * 0.85
        const ringScale = 1 + hover.current * 1.35
        const opacity = 0.35 + visible.current * 0.65
        const color = rgbToCss(accent.current)
        const glow = rgbToCss(accent.current, 0.22 + hover.current * 0.2)

        dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        dot.style.opacity = String(opacity)
        dot.style.backgroundColor = color
        dot.style.boxShadow = `0 0 14px ${glow}, 0 0 28px ${rgbToCss(accent.current, 0.12)}`

        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`
        ring.style.opacity = String(0.12 + hover.current * 0.22)
        ring.style.borderColor = rgbToCss(accent.current, 0.35 + hover.current * 0.25)
        ring.style.backgroundColor = rgbToCss(accent.current, 0.04 + hover.current * 0.06)
      }

      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown, { passive: true })
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusOut)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    rafId.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="custom-cursor-root pointer-events-none fixed inset-0 z-[10000]" aria-hidden>
      <div
        ref={ringRef}
        className="custom-cursor-ring fixed left-0 top-0 rounded-full border will-change-transform"
        style={{
          width: 36,
          height: 36,
          marginLeft: 0,
          marginTop: 0,
        }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed left-0 top-0 rounded-full will-change-transform"
        style={{
          width: 8,
          height: 8,
        }}
      />
    </div>
  )
}
