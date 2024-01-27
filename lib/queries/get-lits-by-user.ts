import { TypedSupabaseClient } from '@/lib/types/supabase'

import { createSupabaseBrowser } from '../supabase/client';
 


export async function getLitsByUsername(username: string): Promise<any> {
  const supabase = createSupabaseBrowser();

  return supabase
  .from('lits')
  .select('*')
  .eq('username', username)
  .order('created_at', { ascending: false })
  .throwOnError()
}
