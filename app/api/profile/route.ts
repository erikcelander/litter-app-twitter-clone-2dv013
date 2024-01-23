// api/profile/[slug].ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {

  const { searchParams } = new URL(request.url)

  const slug = searchParams.get('user')
  console.log("api:" + slug)


  if (!slug) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', slug)
      .single()

    if (error) throw error

    return NextResponse.json(profile)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }

}