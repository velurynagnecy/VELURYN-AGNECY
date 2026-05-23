'use client'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-body font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    primary: 'bg-platinum text-charcoal hover:bg-silver active:scale-95',
    ghost:   'text-silver-dim hover:text-platinum border-b border-transparent hover:border-silver',
    outline: 'border border-border-md text-silver hover:border-silver hover:text-platinum bg-transparent',
  }

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-xs px-6 py-3',
    lg: 'text-sm px-8 py-4',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
