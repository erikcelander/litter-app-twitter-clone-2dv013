'use client'
import { UserProfile, ProfileHeader } from '@/components/profile/profile-header'
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'
import { getProfileByUsername } from '@/lib/queries/get-profile'
import createSupabaseBrowser from '@/lib/supabase/client'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import Feed from '@/components/feed/feed'


const Profile = ({ username }: { username: string }) => {
  const supabase = createSupabaseBrowser()
  const { data: profile } = useQuery(getProfileByUsername(supabase, username))
  const { data: lits } = useQuery(getLitsByUsername(supabase, username))


  return (
    <div>
      <ProfileHeader profile={profile as UserProfile} />
      {lits && <Feed lits={lits} />}
    </div>
  )
}

export default Profile
