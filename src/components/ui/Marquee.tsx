'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const items = [
  'Influencer Marketing',
  'VA Mgmt',
  'Email Infrastructure',
  'VASD',
  'Brand Strategy',
  'PR & Communications',
  'SEO & Digital',
  'Social Media',
  'Web Development',
  'Radical Transparency',
  'Global Reach',
  'Trust First',
]

export function Marquee() {
  const [slow, setSlow] = useState(false)
  const track = [...items, ...items]

  return (
    <div
      className="border-t border-silver-dim/10 bg-charcoal-2/70 backdrop-blur-sm py-4 overflow-hidden"
      onMouseEnter={() => setSlow(true)}
      onMouseLeave={() => setSlow(false)}
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: slow ? 60 : 24,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[0, 1].map((di) => (
          <div key={di} className="flex items-center shrink-0">
            {track.map((item, ii) => (
              <span
                key={`${di}-${ii}`}
                className="font-body uppercase text-silver-dim whitespace-nowrap flex items-center"
                style={{ fontSize: '0.62rem', letterSpacing: '0.28em' }}
              >
                <span className="px-8">{item}</span>
                <span className="w-1 h-1 rounded-full bg-silver-dim/40 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
