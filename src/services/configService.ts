import { supabase } from '@/integrations/supabase/client'

export interface BackendConfig {
  id?: string
  api_key: string
  model: string
  system_prompt: string
  domain_format: string
  email_format: string
  admin_email: string
  updated_at?: string
}

export interface UserSettings {
  id?: string
  region: string
  verticals: string
  color_scheme: string
  webhook_url: string
  updated_at?: string
}

export const configService = {
  // Get backend configuration
  async getBackendConfig(): Promise<BackendConfig | null> {
    const { data, error } = await supabase
      .from('backend_config')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching backend config:', error)
      return null
    }

    return data
  },

  // Save backend configuration
  async saveBackendConfig(config: Omit<BackendConfig, 'id' | 'updated_at'>): Promise<BackendConfig | null> {
    const { data, error } = await supabase
      .from('backend_config')
      .upsert(config, { onConflict: 'id' })

    if (error) {
      console.error('Error saving backend config:', error)
      return null
    }

    return data ? data[0] : null
  },

  // Get user settings
  async getUserSettings(): Promise<UserSettings | null> {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      console.error('Error fetching user settings:', error)
      return null
    }

    return data
  },

  // Save user settings
  async saveUserSettings(settings: Omit<UserSettings, 'id' | 'updated_at'>): Promise<UserSettings | null> {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert(settings, { onConflict: 'id' })

    if (error) {
      console.error('Error saving user settings:', error)
      return null
    }

    return data ? data[0] : null
  }
}