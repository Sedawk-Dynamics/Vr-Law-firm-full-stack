import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function isSupabaseConfigured(): boolean {
  return Boolean(url && (serviceKey || anonKey))
}

let adminClient: SupabaseClient | null = null
let publicClient: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.',
    )
  }
  if (!adminClient) {
    adminClient = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return adminClient
}

export function getSupabasePublic(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error(
      'Supabase public client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.',
    )
  }
  if (!publicClient) {
    publicClient = createClient(url, anonKey)
  }
  return publicClient
}
