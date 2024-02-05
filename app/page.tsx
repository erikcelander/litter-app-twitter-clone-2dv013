import { CreateLit } from '@/components/home/create-lit'
import { createSupabaseServer } from '@/lib/supabase/server'
import HomeFeed from '@/components/home/home-feed'
import FollowingFeed from '@/components/home/following-feed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='flex flex-col justify-center items-center bg-[#1a1a1a]' style={{ width: '600px' }}>
      <div className='flex items-center justify-center '>
        {user?.id ? (
          <Tabs className='pt-4' defaultValue="following">

            <TabsList className='mx-auto'>
              <TabsTrigger className='w-60' value="following">Following</TabsTrigger>
              <TabsTrigger className='w-60' value="all">All Lits</TabsTrigger>
            </TabsList>

            <div className='flex flex-col justify-center items-center bg-[#1a1a1a]' >
              <div style={{ width: '400px' }}>
                {user && <CreateLit user={user} />}
              </div>
            </div>

            <TabsContent value="following">
              <FollowingFeed currentUserID={user.id} />
            </TabsContent>

            <TabsContent value="all">
              <HomeFeed currentUserID={user.id} />
            </TabsContent>

          </Tabs>
        ) : <HomeFeed currentUserID='' />}
      </div>
    </div>
  )
}