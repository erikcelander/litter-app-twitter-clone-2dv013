import { Lit } from '@/components/lit'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

async function getLit(slug: string) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: lit, error } = await supabase.from('lits').select('*').eq('id', slug).single()

    if (error) throw error

    return lit
  } catch (error: any) {
    console.error(error)
    return <div>error displaying lit</div>
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const lit = await getLit(params.slug)

  return (
    <div>
      <div>My Lit: {params.slug}</div>
      
    </div>
  )
}
