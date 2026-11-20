import { useRef, useState } from 'react'

interface ImageCompareProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
}

export function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Structural Framing',
  afterLabel = 'Completed Residence',
}: ImageCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100))
    setPosition(Math.round(pct * 10) / 10)
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="slider"
      aria-label="Compare structural framing and completed residence"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPosition((p) => Math.max(4, p - 4))
        if (e.key === 'ArrowRight') setPosition((p) => Math.min(96, p + 4))
      }}
      onPointerDown={(e) => {
        setDragging(true)
        e.currentTarget.setPointerCapture(e.pointerId)
        updateFromClientX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX)
      }}
      onPointerUp={() => setDragging(false)}
      className="relative aspect-[16/9] w-full cursor-ew-resize overflow-hidden rounded-[20px] border border-[#0A1112]/15 bg-[#0A1112] select-none touch-none"
    >
      {/* After Image */}
      <img
        src={afterSrc}
        alt={afterAlt}
        draggable={false}
        loading="lazy"
        width={1600}
        height={900}
        className="h-full w-full object-cover"
      />

      {/* Before Image (Real Construction/Framing Photo) */}
      <div
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        className="absolute inset-0 overflow-hidden bg-[#0A1112]"
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          draggable={false}
          loading="lazy"
          width={1600}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Divider Handle */}
      <div
        style={{ left: `${position}%` }}
        className="pointer-events-none absolute inset-y-0 z-10 w-[2px] -translate-x-1/2 bg-white"
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-[#0A1112]/80 text-xs text-white backdrop-blur-md sm:h-11 sm:w-11">
          ↔
        </div>
      </div>

      {/* Responsive Labels (no overlap at 390px) */}
      <div className="pointer-events-none absolute top-3 left-3 max-w-[42%] truncate rounded-full border border-white/20 bg-[#0A1112]/80 px-2.5 py-1 text-[10px] tracking-[0.06em] text-white uppercase backdrop-blur-md sm:top-4 sm:left-4 sm:max-w-none sm:px-4 sm:py-1.5 sm:text-[12px]">
        {beforeLabel} ({Math.round(position)}%)
      </div>
      <div className="pointer-events-none absolute top-3 right-3 max-w-[42%] truncate rounded-full border border-white/20 bg-[#0A1112]/80 px-2.5 py-1 text-[10px] tracking-[0.06em] text-white uppercase backdrop-blur-md sm:top-4 sm:right-4 sm:max-w-none sm:px-4 sm:py-1.5 sm:text-[12px]">
        {afterLabel} ({100 - Math.round(position)}%)
      </div>
    </div>
  )
}
