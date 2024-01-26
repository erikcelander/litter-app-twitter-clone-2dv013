import Profile from '@/components/profile'
import { cookies } from 'next/headers'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
// import { getLitById } from '@/lib/queries/get-lit'
// import Lit from '@/components/lit'
import { getProfileByUsername } from '@/lib/queries/get-profile'
// import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'

export default async function Page({ params }: { params: { username: string } }) {

 const queryClient = new QueryClient()
 const supabase = createSupabaseServer()

 await prefetchQuery(queryClient, getProfileByUsername(supabase, params.username))
// // await prefetchQuery(queryClient, getLitsByUsername(supabase, params.username))


  return (
    <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile username={params.username} />
    </HydrationBoundary>
  </div>
  )

}
