import { SubmitLit } from '@/components/submit-lit'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) console.log(user)

  return (
    <div className=''>
      {user && <SubmitLit />}
    </div>
  )
}
