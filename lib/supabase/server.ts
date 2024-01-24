import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createSupabaseServer = () => {
  const cookieStore = cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL! as string
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string

  console.log("supabase url env: " + url)
  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      }
    },
  })
}
