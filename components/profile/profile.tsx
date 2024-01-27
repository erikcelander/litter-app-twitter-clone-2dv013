'use client'

import { getProfileByUsername } from '@/lib/queries/get-profile'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import ProfileFeed from './profile-feed'
import {ProfileHeader, UserProfile} from './profile-header'


const Profile = ({ username }: { username: string }) => {
  const supabase = createSupabaseBrowser()
  const { data: profile } = useQuery(getProfileByUsername(supabase, username))

  return (
    <div>
      <ProfileHeader profile={profile as UserProfile} />
      <ProfileFeed username={username} />
    </div>
  )
}

export default Profile
