import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('lit')

  if (!slug) {
    return new Response('Not Found', { status: 404 })
  }

  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: lit, error } = await supabase.from('lits').select('*').eq('id', slug).single()

    if (error) throw error

   if (!lit) {
      return new Response('Not Found', { status: 404 })
    }
    
    return NextResponse.json(lit)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}

interface LitData {
  content: string
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
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
