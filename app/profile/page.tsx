import { ProfileHeaderSkeleton } from '@/components/skeleton/profile-header-skeleton'
import { SkeletonFeed } from '@/components/skeleton/skeleton-feed'

export default function Page() {
  return (
    <div>
      <ProfileHeaderSkeleton />
      <SkeletonFeed />
    </div>
  )
}
