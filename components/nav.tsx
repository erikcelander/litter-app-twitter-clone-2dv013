//import { ModeToggle } from './mode-toggle'
import Image from 'next/image'
import litter from '@/public/litter.svg'
import Link from 'next/link'
import Login from '@/components/login'
import Logout from '@/components/logout'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {createSupabaseServer} from '@/lib/supabase/server'

export async function Nav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const supabase = createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session )console.log(session) 
  if (!session) console.log('no session')

  return (
    <div
      className={` flex justify-between items-center h-16 px-4 border-b border-b-background/10`}
      {...props}
    >
      <div className='flex-initial pr-1'>
        <Link className='flex flex-row text-center cursor-pointer' href='/'>
          <Image src={litter} alt='Litter Logo' width={35} height={35} />
          <h2 className='text-center text-3xl pl-4 items-center text-primary pt-1'>litter</h2>
        </Link>
      </div>

      <div className='flex-initial pl-40'>
        {session ? <Logout/> : <Login />}
      </div>
    </div>
  )
}

