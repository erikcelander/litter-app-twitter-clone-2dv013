import Profile from '@/components/profile/profile'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getProfileByUsername } from '@/lib/queries/get-profile'
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'


export default async function Page({ params }: { params: { username: string } }) {
  const queryClient = new QueryClient()
  const supabase = createSupabaseServer()
  const username = params.username


  await prefetchQuery(queryClient, getProfileByUsername(supabase, params.username))

  await queryClient.prefetchQuery({
    queryKey: [`${username}-lits`, username],
    queryFn: () => getLitsByUsername(username),
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile username={username} />
      </HydrationBoundary>
    </div>
  )

}
