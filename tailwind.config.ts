import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal:    '#1A1C24',
        'charcoal-2':'#22242E',
        'charcoal-3':'#2A2D38',
        surface:     '#2E3140',
        platinum:    '#E8E8F0',
        silver:      '#C4C4D4',
        'silver-dim':'#8A8AA0',
        'steel-blue':'#4A6580',
        border:      'rgba(200,200,220,0.08)',
        'border-md': 'rgba(200,200,220,0.15)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-silver': 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,196,212,0.12) 0%, transparent 70%)',
        'radial-steel':  'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(74,101,128,0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'line-grow':  'lineGrow 1.2s ease forwards',
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(32px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        lineGrow: { '0%': { width: '0' }, '100%': { width: '100%' } },
      },
    },
  },
  plugins: [],
}
export default config
