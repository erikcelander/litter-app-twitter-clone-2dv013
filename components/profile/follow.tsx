'use client'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { User } from '@supabase/supabase-js'

export function FollowButton({ currentUserID, profileUserID }: { currentUserID: string, profileUserID: string }) {
  const supabase = createSupabaseBrowser();

  const handleFollow = async () => {
    try {
      const { error } = await supabase.from('follows').insert([{
        follower_id: currentUserID,
        followed_id: profileUserID,
      }])

      if (error) throw error


    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }

  return (
    <Button onClick={handleFollow} className='bg-[#F6AE28] rounded-3xl w-24 text-black'>
      Follow
    </Button>
  )
}
