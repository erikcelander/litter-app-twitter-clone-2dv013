'use client'
import { UserProfile, ProfileHeader } from '@/components/profile/profile-header'
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'
import { getProfileByUsername } from '@/lib/queries/get-profile'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { useQuery, useSubscription } from '@supabase-cache-helpers/postgrest-react-query'
// import Feed from '@/components/feed/feed'
import LitComponent from '../lits/lit-component'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import HomeFeed from '../home/home-feed'


const Profile = ({ username }: { username: string }) => {
  const supabase = createSupabaseBrowser()
  const { data: profile } = useQuery(getProfileByUsername(supabase, username))
  const { data: lits } = useQuery(getLitsByUsername(supabase, username))
  const router = useRouter()
  const queryClient = useQueryClient()

  //   useEffect(() => {
  //     const channel = supabase
  //     .channel('realtime_feed_updates')
  //     .on(
  //       'postgres_changes',
  //       {
  //         event: '*',
  //         schema: 'public',
  //         table: 'lits',
  //       },
  //       (payload) => {
  //         console.log('New payload:', payload) 
  
  //         // use react query somehow to update the feed in realtime
  //       }
  //     )
  
  //       return () => {
  //     supabase.removeChannel(channel)
  //   }
  // }, [supabase])


  return (
    <div>
      <ProfileHeader profile={profile as UserProfile} />
       {/* {lits &&  <RealtimeFeed lits={lits} />} */}
      {/* {lits && lits.map((lit: any) => (
        <LitComponent key={lit.id} lit={lit} />
      ))} */}
    </div>
  )
}

export default Profile

//const { status } = useSubscription(
  //     supabase,
  //     `realtime_feed_updates`,
  //     {
  //       event: '*',
  //       table: 'contact',
  //       schema: 'lits',
  //     },
  //     ['id'],
  //     { callback: (payload) => console.log(payload) }
  //   );
  
  // //   useEffect(() => {
  // //     const channel = supabase
  // //     .channel('realtime_feed_updates')
  // //     .on(
  // //       'postgres_changes',
  // //       {
  // //         event: '*',
  // //         schema: 'public',
  // //         table: 'lits',
  // //       },
  // //       (payload) => {
  // //         console.log('New payload:', payload) 
  
  // //         // use react query somehow to update the feed in realtime
  // //       }
  // //     )
  
  // //       return () => {
  // //     supabase.removeChannel(channel)
  // //   }
  // // }, [])

    // useSubscription(
  //   supabase,
  //   'postgres_channel_updates', // Replace with your channel name
  //   {
  //     event: '*',
  //     table: 'lits', // Replace with your table name
  //     schema: 'public'
  //   },
  //   ['id'], // Fields you're interested in
  //   {
  //     callback: (payload: any) => {
  //       // Update the cache only if the lit belongs to the same user
  //       console.log('payload: ', payload)
  //       if (payload.new.username === username) {
  //       console.log(payload.username)

  //         // queryClient.setQueryData(['litsQueryKey', username], (oldData: any) => {
  //         //   // Assuming oldData is an array of lits
  //         //   // Add new lit or update existing one based on the payload
   
  //         //   return [...oldData, payload.new];
  //         // });
  //       }
  //     }
  //   }
  // );
  