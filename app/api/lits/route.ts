import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

interface LitData {
  content: string
}

export async function POST(request: NextRequest) {
  console.log(request.url)
  const supabase = createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const litData: LitData = await request.json()

  if (litData.content.length > 42) {
    return new Response('Lit content exceeds 42 characters', { status: 400 })
  }

  const username = user.email?.split('@')[0]
  const fullName = user.user_metadata?.full_name
  const avatarUrl = user.user_metadata?.avatar_url

  try {
    const { data, error } = await supabase.from('lits').insert([
      {
        user_id: user.id,
        username: username,
        full_name: fullName,
        avatar_url: avatarUrl,
        content: litData.content,
      },
    ])

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
