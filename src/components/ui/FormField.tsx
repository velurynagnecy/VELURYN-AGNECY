'use client'

import { cn } from '@/lib/utils'

type FormFieldProps = {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ id, label, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className="font-body text-[0.65rem] tracking-[0.22em] uppercase text-silver-dim"
      >
        {label}
        {required && <span className="text-silver ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
