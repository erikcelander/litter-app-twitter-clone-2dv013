import Profile from '@/components/profile/profile'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getProfileByUsername } from '@/lib/queries/get-profile'
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'
import { User } from '@supabase/supabase-js'
import { checkIfUserFollows } from '@/lib/queries/check-follow'


export default async function Page({ params }: { params: { username: string } }) {
  const queryClient = new QueryClient()
  const supabase = createSupabaseServer()
  const { data } = await supabase.auth.getUser()
  const user: User | null = data.user ? data.user : null;
  
  
  
  const profileUsername = params.username



  await prefetchQuery(queryClient, getProfileByUsername(supabase, profileUsername))

  await queryClient.prefetchQuery({
    queryKey: [`${profileUsername}-lits`, profileUsername],
    queryFn: () => getLitsByUsername(profileUsername),
  })
 
  await queryClient.prefetchQuery({
    queryKey: ['followStatus', user?.id, profileUsername],
    queryFn: () => checkIfUserFollows(user?.id || '', profileUsername),
  })


  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Profile profileUsername={profileUsername} currentUserID={user ? user.id : ''} />
      </HydrationBoundary>
    </div>
  )

}
