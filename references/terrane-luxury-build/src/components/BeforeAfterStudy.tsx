import { useEffect, useRef, useState } from 'react'

export function BeforeAfterStudy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const beforeRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const targetRef = useRef(50)
  const currentRef = useRef(50)
  const draggingRef = useRef(false)
  const [readout, setReadout] = useState(50)

  useEffect(() => {
    let rafId = 0
    const tick = () => {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.02) {
        currentRef.current += diff * 0.14
        const pct = currentRef.current.toFixed(2)
        if (beforeRef.current) {
          beforeRef.current.style.clipPath = `inset(0 ${100 - currentRef.current}% 0 0)`
        }
        if (dividerRef.current) {
          dividerRef.current.style.left = `${pct}%`
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let pct = ((clientX - rect.left) / rect.width) * 100
    pct = Math.max(4, Math.min(96, pct))
    if (Math.abs(pct - 50) < 1.8) pct = 50
    targetRef.current = pct
    setReadout(Math.round(pct))
  }

  return (
    <section className="border-t border-white/10 bg-[#0A0A0A] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#A3A3A3] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D15]" />
              Elevation &amp; Structural Study
            </div>
            <h2 className="mt-4 text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-white sm:text-5xl">
              From Structural Blueprint{' '}
              <span className="text-[#737373]">to Built Reality.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#A3A3A3]">
              Drag across the elevation study to inspect how our caisson-supported pool shells and
              bronze steel moment-frames align to the millimeter.
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          data-cursor="DRAG"
          onPointerDown={(e) => {
            draggingRef.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            updateFromClientX(e.clientX)
          }}
          onPointerMove={(e) => {
            if (draggingRef.current) updateFromClientX(e.clientX)
          }}
          onPointerUp={() => {
            draggingRef.current = false
          }}
          className="relative aspect-[16/9] w-full cursor-ew-resize overflow-hidden rounded-2xl border border-white/15 bg-[#111111] select-none touch-none"
        >
          <img
            src="/images/hero-estate.jpg"
            alt="Completed architectural home remodel and infinity pool"
            draggable={false}
            className="h-full w-full object-cover"
          />

          <div
            ref={beforeRef}
            style={{ clipPath: 'inset(0 50% 0 0)' }}
            className="absolute inset-0 overflow-hidden bg-[#111111]"
          >
            <img
              src="/images/hero-estate.jpg"
              alt="Structural architectural blueprint study"
              draggable={false}
              className="h-full w-full object-cover opacity-30 grayscale contrast-150"
            />
            <div
              className="absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,77,21,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,77,21,0.3) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <svg
              viewBox="0 0 1200 675"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <line x1="120" y1="0" x2="120" y2="675" stroke="#FF4D15" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="880" y1="0" x2="880" y2="675" stroke="#FF4D15" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="0" y1="430" x2="1200" y2="430" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1" />
              <rect x="240" y="210" width="520" height="190" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="1.2" />
              <text x="132" y="420" fill="#FFFFFF" fontSize="13" fontFamily="JetBrains Mono, monospace">
                DATUM +104.50 FT / CANTILEVER WEIR
              </text>
              <text x="252" y="234" fill="#FF4D15" fontSize="12" fontFamily="JetBrains Mono, monospace">
                W18x50 STEEL MOMENT FRAME · 38 FT CLEAR SPAN
              </text>
            </svg>
          </div>

          <div
            ref={dividerRef}
            style={{ left: '50%' }}
            className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white/90"
          >
            <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#FF4D15] bg-[#0A0A0A]/90 font-mono text-[10px] text-white backdrop-blur-md">
              ↔
            </div>
          </div>

          <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/20 bg-[#0A0A0A]/80 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white uppercase backdrop-blur-md">
            01 · Structural CAD ({readout}%)
          </div>
          <div className="pointer-events-none absolute top-4 right-4 rounded-full border border-white/20 bg-[#0A0A0A]/80 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white uppercase backdrop-blur-md">
            02 · Built Estate ({100 - readout}%)
          </div>
        </div>
      </div>
    </section>
  )
}
