import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.warn('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client (will work even if env vars are missing, but will fail on first request)
export const supabase = createClient(
  supabaseUrl || 'https://missing.supabase.co',
  supabaseAnonKey || 'missing-anon-key'
)