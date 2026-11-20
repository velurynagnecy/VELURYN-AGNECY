import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface ScopeEstimatorProps {
  onBookWithEstimate: (summary: string) => void
}

type Discipline = 'remodel' | 'pool' | 'estate'
type FinishTier = 'architectural' | 'reserve'

const POOL_FEATURES = [
  { id: 'zero-edge', label: 'Zero-Edge Infinity Weir', cost: 48000, weeks: 3 },
  { id: 'sunken-fire', label: 'Sunken Travertine Fire Lounge', cost: 34000, weeks: 2 },
  { id: 'spa-spill', label: 'Integrated Thermal Spa + Cold Plunge', cost: 42000, weeks: 2 },
  { id: 'auto-cover', label: 'Concealed Automatic Vault Cover', cost: 24000, weeks: 1 },
  { id: 'ozone-uv', label: 'Salt / UV-Ozone Purification + Automation', cost: 16000, weeks: 0 },
]

const REMODEL_FEATURES = [
  { id: 'pocket-glass', label: 'Motorized Bronze Pocket Glazing', cost: 85000, weeks: 4 },
  { id: 'structural-span', label: 'Load-Bearing Steel Beam Opening', cost: 45000, weeks: 3 },
  { id: 'taj-kitchen', label: 'Bookmatched Quartzite & White Oak Millwork', cost: 92000, weeks: 4 },
  { id: 'lutron-hvac', label: 'Lutron HomeWorks & Linear Slot HVAC', cost: 38000, weeks: 2 },
]

export function ScopeEstimator({ onBookWithEstimate }: ScopeEstimatorProps) {
  const [discipline, setDiscipline] = useState<Discipline>('estate')
  const [sqft, setSqft] = useState(2400)
  const [tier, setTier] = useState<FinishTier>('architectural')
  const [selectedPool, setSelectedPool] = useState<string[]>(['zero-edge', 'sunken-fire'])
  const [selectedRemodel, setSelectedRemodel] = useState<string[]>(['pocket-glass', 'taj-kitchen'])

  const toggleItem = (id: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  }

  const estimate = useMemo(() => {
    const tierMult = tier === 'reserve' ? 1.28 : 1
    let base = 0
    let weeks = 12

    if (discipline === 'remodel' || discipline === 'estate') {
      base += sqft * 340 * tierMult
      weeks += Math.round(sqft / 320)
      selectedRemodel.forEach((id) => {
        const feat = REMODEL_FEATURES.find((f) => f.id === id)
        if (feat) {
          base += feat.cost * tierMult
          weeks += feat.weeks
        }
      })
    }

    if (discipline === 'pool' || discipline === 'estate') {
      base += 195000 * tierMult
      weeks += 14
      selectedPool.forEach((id) => {
        const feat = POOL_FEATURES.find((f) => f.id === id)
        if (feat) {
          base += feat.cost * tierMult
          weeks += feat.weeks
        }
      })
    }

    const low = Math.round((base * 0.92) / 5000) * 5000
    const high = Math.round((base * 1.12) / 5000) * 5000
    const monthsLow = Math.max(4, Math.floor(weeks / 4.3))
    const monthsHigh = monthsLow + 2

    return {
      low,
      high,
      timeline: `${monthsLow} to ${monthsHigh} Months`,
    }
  }, [discipline, sqft, tier, selectedPool, selectedRemodel])

  const formatMoney = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : `$${Math.round(n / 1000).toLocaleString()}K`

  const handleLockBrief = () => {
    const label =
      discipline === 'estate'
        ? 'Integrated Home Remodel & Luxury Pool'
        : discipline === 'pool'
          ? 'Bespoke Luxury Pool & Aquatic Terrace'
          : 'Custom Architectural Home Remodel'
    onBookWithEstimate(
      `${label} | ${tier === 'reserve' ? 'Reserve Atelier' : 'Architectural'} Tier | Est. ${formatMoney(estimate.low)} to ${formatMoney(estimate.high)}`,
    )
  }

  return (
    <section id="estimator" className="bg-[#FAF9F6] py-24 text-[#141312] lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 border-b border-black/10 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-4xl font-normal sm:text-5xl">
              Scope &amp; Investment <span className="italic text-[#8C6D46]">Estimator</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[#57534E]">
              Configure your remodeling footprint, pool engineering, and finish level to preview a
              realistic 2026 design-build budget.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-[#57534E] uppercase">
                01. Primary Scope
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {(
                  [
                    { id: 'estate', title: 'Full Estate', sub: 'Remodel + Pool' },
                    { id: 'remodel', title: 'Home Remodel', sub: 'Interior & Glazing' },
                    { id: 'pool', title: 'Luxury Pool', sub: 'Zero-Edge & Spa' },
                  ] as const
                ).map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDiscipline(d.id)}
                    className={`cursor-pointer rounded-xl border p-4 text-left transition-all ${
                      discipline === d.id
                        ? 'border-[#141312] bg-[#141312] text-[#FAF9F6]'
                        : 'border-black/10 bg-[#F0ECE4] text-[#141312] hover:border-black/30'
                    }`}
                  >
                    <div className="text-sm font-medium">{d.title}</div>
                    <div
                      className={`mt-0.5 text-xs ${
                        discipline === d.id ? 'text-[#C5A47E]' : 'text-[#57534E]'
                      }`}
                    >
                      {d.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {(discipline === 'remodel' || discipline === 'estate') && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="sqft-range"
                    className="text-xs font-medium tracking-[0.12em] text-[#57534E] uppercase"
                  >
                    02. Remodel Footprint
                  </label>
                  <span className="text-sm font-semibold text-[#141312]">
                    {sqft.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  id="sqft-range"
                  type="range"
                  min={800}
                  max={6500}
                  step={100}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-[#8C6D46]"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium tracking-[0.12em] text-[#57534E] uppercase">
                03. Material Specification
              </label>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setTier('architectural')}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-all ${
                    tier === 'architectural'
                      ? 'border-[#141312] bg-[#141312] text-[#FAF9F6]'
                      : 'border-black/10 bg-[#F0ECE4] text-[#141312]'
                  }`}
                >
                  <div className="text-sm font-medium">Architectural Standard</div>
                  <p
                    className={`mt-1 text-xs ${
                      tier === 'architectural' ? 'text-white/70' : 'text-[#57534E]'
                    }`}
                  >
                    Honed travertine, white oak millwork, PebbleFina finish, smart automation.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setTier('reserve')}
                  className={`cursor-pointer rounded-xl border p-4 text-left transition-all ${
                    tier === 'reserve'
                      ? 'border-[#141312] bg-[#141312] text-[#FAF9F6]'
                      : 'border-black/10 bg-[#F0ECE4] text-[#141312]'
                  }`}
                >
                  <div className="text-sm font-medium">Reserve Atelier (+28%)</div>
                  <p
                    className={`mt-1 text-xs ${
                      tier === 'reserve' ? 'text-white/70' : 'text-[#57534E]'
                    }`}
                  >
                    Bookmatched quartzite slabs, bronze steel glazing, Venetian plaster.
                  </p>
                </button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {(discipline === 'remodel' || discipline === 'estate') && (
                <div>
                  <div className="text-xs font-medium tracking-[0.12em] text-[#57534E] uppercase">
                    Structural Additions
                  </div>
                  <div className="mt-3 space-y-2">
                    {REMODEL_FEATURES.map((f) => {
                      const active = selectedRemodel.includes(f.id)
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => toggleItem(f.id, selectedRemodel, setSelectedRemodel)}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs transition-colors ${
                            active
                              ? 'border-[#8C6D46] bg-[#C5A47E]/15 font-medium text-[#141312]'
                              : 'border-black/10 bg-white text-[#57534E]'
                          }`}
                        >
                          <span>{f.label}</span>
                          <span className="text-[11px] text-[#8C6D46]">
                            +${Math.round(f.cost / 1000)}K
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {(discipline === 'pool' || discipline === 'estate') && (
                <div>
                  <div className="text-xs font-medium tracking-[0.12em] text-[#57534E] uppercase">
                    Aquatic Engineering
                  </div>
                  <div className="mt-3 space-y-2">
                    {POOL_FEATURES.map((f) => {
                      const active = selectedPool.includes(f.id)
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => toggleItem(f.id, selectedPool, setSelectedPool)}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs transition-colors ${
                            active
                              ? 'border-[#8C6D46] bg-[#C5A47E]/15 font-medium text-[#141312]'
                              : 'border-black/10 bg-white text-[#57534E]'
                          }`}
                        >
                          <span>{f.label}</span>
                          <span className="text-[11px] text-[#8C6D46]">
                            +${Math.round(f.cost / 1000)}K
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-[#141312] p-8 text-[#FAF9F6] sm:p-10 lg:col-span-5">
            <div>
              <div className="text-xs tracking-[0.14em] text-[#C5A47E] uppercase">
                Preliminary Estimate
              </div>
              <div className="mt-4 font-serif text-5xl text-[#FAF9F6] sm:text-6xl">
                {formatMoney(estimate.low)} <span className="text-2xl text-white/50">to</span>{' '}
                {formatMoney(estimate.high)}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/15 py-5">
                <div>
                  <div className="text-[11px] text-white/55 uppercase">Schedule</div>
                  <div className="mt-1 font-serif text-2xl text-[#FAF9F6]">
                    {estimate.timeline}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/55 uppercase">Warranty</div>
                  <div className="mt-1 font-serif text-2xl text-[#FAF9F6]">10-Yr Structural</div>
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-xs leading-relaxed text-white/70">
                <li>• 3D LiDAR site scan &amp; architectural engineering included</li>
                <li>• Municipal permitting &amp; HOA review included</li>
                <li>• Fixed-price contract prior to groundbreaking</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleLockBrief}
              className="mt-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#C5A47E] px-6 py-4 text-xs font-medium tracking-[0.14em] text-[#0B0B0C] uppercase transition-colors hover:bg-[#d4b692]"
            >
              Lock Brief &amp; Book Site Walk
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
