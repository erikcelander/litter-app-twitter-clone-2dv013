'use client'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function UnfollowButton({ currentUserID, profileUserID }: { currentUserID: string, profileUserID: string }) {
  const supabase = createSupabaseBrowser();
  const router = useRouter()

  const handleUnfollow = async () => {
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .match({ follower_id: currentUserID, followed_id: profileUserID })

      if (error) throw error

        router.refresh()
    } catch (error: any) {
      console.error(error)

    }
  }

  return (
    <Button onClick={handleUnfollow} className='bg-[#F6AE28] rounded-3xl w-24 text-black'>
      Unfollow
    </Button>
  )
}
