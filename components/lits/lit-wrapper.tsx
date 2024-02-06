'use client'
import { createSupabaseBrowser } from '@/lib/supabase/client'

import { getLitById } from '@/lib/queries/get-lit'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { LitComponent } from '@/components/lits/lit-component'
import { Lit } from '@/lib/types'
import { LoadingSpinner } from '../ui/spinner'

export const LitWrapper = ({ id, session }: { id: string, session: any }) => {
  const supabase = createSupabaseBrowser()
  const { isError, isLoading, data: lit, } = useQuery(getLitById(supabase, id))

  if (isLoading) return <div className='flex justify-center items-center mt-5' style={{ width: '100%' }}><LoadingSpinner className={''} /></div>
  if (isError) return <div>Something went wrong. </div>



  return (
    <div className='pt-4'>
      {lit && <LitComponent session={session} lit={lit as Lit} />}
    </div>
  )
}

