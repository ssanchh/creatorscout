import { createClient } from '@supabase/supabase-js'

// Define table types
export type WaitlistEntry = {
  id: string
  email: string
  signed_up_at: string
  status: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistEntry
        Insert: Omit<WaitlistEntry, 'id' | 'created_at'>
        Update: Partial<Omit<WaitlistEntry, 'id' | 'created_at'>>
      }
    }
  }
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create typed client
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) 