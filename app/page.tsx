import { CreateLit } from '@/components/home/create-lit'
import { createSupabaseServer } from '@/lib/supabase/server'
import HomeFeed from '@/components/home/home-feed'
import FollowingFeed from '@/components/home/following-feed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User } from '@supabase/supabase-js'

export default async function Index() {
  const supabase = createSupabaseServer()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  let user: User | undefined

  if (session?.user !== null) {
    user = session?.user
  }

  return (
    <div className='flex flex-col justify-center items-center w-full bg-[#1a1a1a]'>
      <div className='flex items-center justify-center w-full '>
        {user?.id ? (
          <Tabs className='pt-4 w-full' defaultValue='all'>
            <TabsList className='mx-auto flex justify-center w-3/4'>
              <TabsTrigger className='w-full' value='following'>
                Following
              </TabsTrigger>
              <TabsTrigger className='w-full' value='all'>
                All Lits
              </TabsTrigger>
            </TabsList>

            <div className='flex flex-col justify-center items-center bg-[#1a1a1a]'>
              <div className='w-[25rem]'>{user && <CreateLit user={user} />}</div>
            </div>

            <TabsContent value='following'>
              <FollowingFeed currentUserID={user.id} session={session} />
            </TabsContent>

            <TabsContent value='all'>
              <HomeFeed currentUserID={user.id} session={session} />
            </TabsContent>
          </Tabs>
        ) : (
          <HomeFeed currentUserID='' session={session} />
        )}
      </div>
    </div>
  )
}
