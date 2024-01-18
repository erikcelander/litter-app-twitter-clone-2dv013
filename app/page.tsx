import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function Index() {
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()


  console.log(process.env.NEXT_PUBLIC_LITTER_URL)

  return (
    <div className=''>
      {process.env.NEXT_PUBLIC_LITTER_URL}
    </div>
  )
}
