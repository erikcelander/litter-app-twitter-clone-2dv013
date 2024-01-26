import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/types/supabase'
import type { TypedSupabaseClient } from '@/lib/types/supabase'
import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL! as string
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string

  client = createBrowserClient<Database>(
    url,
    key
  )

  return client
}

function createSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default createSupabaseBrowser


// export const createSupabaseBrowser = () => {
// 	const url = process.env.NEXT_PUBLIC_SUPABASE_URL! as string
//   const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string

//   return createBrowserClient<Database>(
// 		url,
// 		key,
// 	);
// }
