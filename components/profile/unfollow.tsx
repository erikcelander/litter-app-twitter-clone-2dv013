'use client'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'

export function UnfollowButton({ currentUserID, profileUserID }: { currentUserID: string, profileUserID: string }) {
  const supabase = createSupabaseBrowser();

  const handleUnfollow = async () => {
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .match({ follower_id: currentUserID, followed_id: profileUserID })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'You have unfollowed the user.',
      });
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }

  return (
    <Button onClick={handleUnfollow} className='bg-[#F6AE28] rounded-3xl w-24 text-black'>
      Unfollow
    </Button>
  )
}
