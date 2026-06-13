import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://strchqvezcrpthmvstok.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cmNocXZlemNycHRobXZzdG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTgzMDgsImV4cCI6MjA5NjgzNDMwOH0.PvTKdg7EEJtS2HiBfppJN-YJExFqhX8PyYWopRju0ig'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type Plan = 'free' | 'pro' | 'ultimate'

export interface Profile {
  id: string
  email: string | null
  plan: Plan
  created_at: string
}
