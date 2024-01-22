//import { ModeToggle } from './mode-toggle'
import Image from 'next/image'
import litter from '@/public/litter.svg'
import AuthButton from './auth-button'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div
      className={` flex justify-between items-center h-16 px-4 border-b border-b-background/10`}
      {...props}
    >
      <div className='flex-initial pr-1'>

          <Link className='flex flex-row text-center cursor-pointer' href='/'>
          <Image src={litter} alt='Litter Logo' width={35} height={35} />
          <h2 className='text-center text-3xl pl-4 items-center text-primary pt-1'>
            litter
          </h2>

          </Link>

      </div>

      <div className='flex-initial pl-40'>
        {isSupabaseConnected && <AuthButton />}

        {/* <ModeToggle /> */}
      </div>
    </div>
  )
}
