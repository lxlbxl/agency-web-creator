import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vejwgliqovftbrbmonoq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlandnbGlxb3ZmdGJyYm1vbm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzODIyODksImV4cCI6MjA2OTk1ODI4OX0.-2abUkhyHPKB-JtmhS5-hhPRutRMY87-eQdnV2mvPP0'

// Validate environment variables
if (!supabaseUrl) {
  console.warn('Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.warn('Missing VITE_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)