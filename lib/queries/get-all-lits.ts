import { TypedSupabaseClient } from '@/lib/types/supabase'

export function getAllLits(client: TypedSupabaseClient) {
  return client
  .from('lits')
  .select('*')
  .throwOnError()
}
