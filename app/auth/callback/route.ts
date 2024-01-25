import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  console.log(1)
  console.log(request)
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  console.log(code)
  if (code) {
    console.log(2)
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
    console.log(3)
    let response
    try {
      response = await supabase.auth.exchangeCodeForSession(code)
      console.log(response)
      const { error } = response
      console.log(4)

      if (error) console.log(error)
      if (!error) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}`)
      }
    } catch (error) {
      if (error) console.log(error)
      if (response) console.log(response)
    }

    console.log(5)
  }
  console.log(6)

  // return the user to an error page with instructions
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_LITTER_URL}/auth/auth-code-error`)
}
