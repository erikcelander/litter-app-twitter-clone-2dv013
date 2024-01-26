'use client'
//import { ModeToggle } from './mode-toggle'
import Image from 'next/image'
import litter from '@/public/litter.svg'
import Link from 'next/link'
import Login from '@/components/login'
// import Logout from '@/components/logout'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseBrowser } from '@/lib/supabase/client'

export function Nav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // const supabase = createSupabaseBrowser()
  //  const { data: session, isLoading, isError } = useQuery(getSession(supabase))

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
        test
        <Login />
        {/* <RenderAuth /> */}
      </div>
    </div>
  )
}

// const RenderAuth = () => {
// 	const { data, isFetching } = useUser();

// 	if (isFetching) {
// 		return <></>;
// 	}

// 	if (data?.user?.id) {
// 		return <Logout />;
// 	} else {
// 		return <Login />;
// 	}
// }
