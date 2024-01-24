import Feed from '@/components/feed'
import { SubmitLit } from '@/components/submit-lit'

import { createSupabaseServer } from '@/lib/supabase/server'


export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let lits
  try {
    const { data, error } = await supabase
      .from('lits')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    lits = data
  } catch (error) {
    console.error('Error fetching lits:', error)
  }

  return (
    <div className=''>
      {session && <SubmitLit />}
      {lits && <Feed lits={lits} />}
    </div>
  )
}
