import Feed from '@/components/feed'
import { SubmitLit } from '@/components/submit-lit'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Index() {

  
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)
  const supabase = createServerComponentClient<Database>({ cookies });
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
