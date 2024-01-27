import { TypedSupabaseClient } from '@/lib/types/supabase'

export function getLitsByUsername(client: TypedSupabaseClient, username: string) {
  return client
  .from('lits')
  .select('*')
  .eq('username', username)
  .order('created_at', { ascending: false })
  .throwOnError()
}
