'use client'

import { getProfileByUsername } from '@/lib/queries/get-profile'
import { createReadReplicaSupabaseBrowser } from '@/lib/supabase/client'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import ProfileFeed from './profile-feed'
import { ProfileHeader, UserProfile } from './profile-header'
import { Suspense } from 'react'
import { ProfileHeaderSkeleton } from '../skeleton/profile-header-skeleton'
import { SkeletonFeed } from '../skeleton/skeleton-feed'

const Profile = ({
  profileUsername,
  currentUserID,
  session,
}: {
  profileUsername: string
  currentUserID: string
  session: any
}) => {
  const supabase = createReadReplicaSupabaseBrowser()
  const { data: profile } = useQuery(getProfileByUsername(supabase, profileUsername))

  return (
    <div>
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader profile={profile as UserProfile} currentUserID={currentUserID} />
      </Suspense>
      <Suspense fallback={<SkeletonFeed />}>
        <ProfileFeed session={session} username={profileUsername} />
      </Suspense>
    </div>
  )
}

export default Profile
