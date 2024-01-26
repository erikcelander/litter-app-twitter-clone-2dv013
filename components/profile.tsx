'use client'
import { UserProfile, ProfileHeader } from '@/components/profile-header';
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user'
import { getProfileByUsername } from '@/lib/queries/get-profile'
import createSupabaseBrowser from '@/lib/supabase/client'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import Feed from '@/components/feed'



// const Profile = ({ user, lits }: { user: UserProfile, lits: any[] }) => {
const Profile = ({ username }: { username: string }) => {
  //   console.log(username)
    const supabase = createSupabaseBrowser()
    const { data: profile } = useQuery(getProfileByUsername(supabase, username))
    const { data: lits } = useQuery(getLitsByUsername(supabase, username))

  //  if(lits) console.log(lits)
  //    console.log(profile)

  return (
    <div>
      <ProfileHeader profile={profile as UserProfile} />
      {lits && <Feed lits={lits}/>}
    </div>
  )
}

export default Profile

