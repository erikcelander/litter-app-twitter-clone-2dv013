// import Feed from '@/components/feed'
import { SubmitLit } from '@/components/home/submit-lit'
import { getAllLits } from '@/lib/queries/get-all-lits'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import Home from '@/components/home/home'
import { getLits } from '@/lib/queries/qet-lits'
import HomeFeed from '@/components/home/home-feed'

export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const queryClient = new QueryClient()

  // await prefetchQuery(queryClient, getAllLits(supabase))
  // await queryClient.prefetchQuery('lits', () => getAllLits(supabase))

  await queryClient.prefetchQuery({
    queryKey: ['lits'],
    queryFn: getLits,
  })

  return (
    <div>
      {user && <SubmitLit user={user} />}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Home /> */}
        <HomeFeed />
      </HydrationBoundary>
    </div>
  )
}
