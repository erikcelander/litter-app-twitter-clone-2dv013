// import Feed from '@/components/feed'
import { CreateLit } from '@/components/home/create-lit'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getLits } from '@/lib/queries/qet-lits'
import HomeFeed from '@/components/home/home-feed'
import FollowingFeed from '@/components/home/following-feed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLitsByFollowing } from '@/lib/queries/get-lits-by-following'

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

  if (user) {

    await queryClient.prefetchQuery({
      queryKey: [`litsByFollowing-${user!.id}`, user!.id],
      queryFn: () => getLitsByFollowing(user?.id as string),
    });

  }


  return (
    <div className='flex flex-col justify-center items-center bg-[#1a1a1a]' style={{ width: '600px' }}>
      <div style={{ width: '400px' }}>
        {user && <CreateLit user={user} />}
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex items-center justify-center '>
          {user?.id ? (
            <Tabs defaultValue="following">
              <TabsList className='mx-auto'>
                <TabsTrigger className='w-60' value="following">Following</TabsTrigger>
                <TabsTrigger className='w-60' value="all">All Lits</TabsTrigger>
              </TabsList>
              <TabsContent value="following">
                <FollowingFeed currentUserID={user.id} />
              </TabsContent>
              <TabsContent value="all">
                <HomeFeed currentUserID={user.id} />
              </TabsContent>
            </Tabs>
          ) : <HomeFeed  currentUserID='' />}
        </div>
      </HydrationBoundary>
    </div>
  );
}