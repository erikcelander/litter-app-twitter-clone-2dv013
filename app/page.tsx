// import Feed from '@/components/feed'
import { SubmitLit } from '@/components/submit-lit'
import { getAllLits } from '@/lib/queries/get-all-lits'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import HomeFeed from '@/components/home-feed'

export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const queryClient = new QueryClient()

  await prefetchQuery(queryClient, getAllLits(supabase))

  return (
    <div>
      {session && <SubmitLit />}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeFeed />
      </HydrationBoundary>
    </div>
  )
}
