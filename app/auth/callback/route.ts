import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const response = await supabase.auth.exchangeCodeForSession(code)
    const { error } = response
    console.log('response', response)
    console.log('error', error)
    console.log('origin', origin)

    if (!error) {
      return NextResponse.redirect(`https://cscloud7-103.lnu.se`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`https://cscloud7-103.lnu.se/auth/auth-code-error`)
}