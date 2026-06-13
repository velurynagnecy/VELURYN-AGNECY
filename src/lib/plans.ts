export type Plan = 'free' | 'pro' | 'ultimate'

export interface PlanConfig {
  name: string
  price: number
  templateLimit: number
  csvUpload: boolean
  bulkRowLimit: number
  exportFormats: string[]
  appAccess: boolean
  description: string
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    name: 'Free',
    price: 0,
    templateLimit: 5,
    csvUpload: false,
    bulkRowLimit: 0,
    exportFormats: [],
    appAccess: false,
    description: 'Web access only. Perfect for getting started.',
  },
  pro: {
    name: 'Pro',
    price: 9,
    templateLimit: 30,
    csvUpload: true,
    bulkRowLimit: 500,
    exportFormats: ['csv'],
    appAccess: true,
    description: 'App + dashboard, 30 templates, CSV bulk up to 500 rows.',
  },
  ultimate: {
    name: 'Ultimate',
    price: 19,
    templateLimit: 150,
    csvUpload: true,
    bulkRowLimit: -1,
    exportFormats: ['csv', 'txt', 'pdf'],
    appAccess: true,
    description: '150 templates, unlimited CSV, export as CSV, TXT or PDF.',
  },
}

export function planConfig(plan: Plan): PlanConfig {
  return PLANS[plan] || PLANS.free
}

export function canExport(plan: Plan, format: string): boolean {
  return PLANS[plan]?.exportFormats.includes(format) ?? false
}

export function templateLimit(plan: Plan): number {
  return PLANS[plan]?.templateLimit ?? 5
}

export function bulkLimit(plan: Plan): number {
  return PLANS[plan]?.bulkRowLimit ?? 0
}
