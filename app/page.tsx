import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()


  

  return (
    <div className=''>
     {user ? user.email : "no user"}
    </div>
  )
}
