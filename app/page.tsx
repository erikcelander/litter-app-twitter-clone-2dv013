// import Feed from '@/components/feed'
import { CreateLit } from '@/components/home/create-lit'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getLits } from '@/lib/queries/qet-lits'
import HomeFeed from '@/components/home/home-feed'

export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['lits'],
    queryFn: getLits,
  })

  return (
    <div>
      {user && <CreateLit user={user} />}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Home /> */}
        <HomeFeed />
      </HydrationBoundary>
    </div>
  )
}
