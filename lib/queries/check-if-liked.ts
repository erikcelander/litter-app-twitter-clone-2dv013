import { createSupabaseBrowser } from '../supabase/client'

export const checkIfLiked = async (userId: string, targetId: string) => {
  if (!userId || userId.length === 0) return false
  if (!targetId || targetId.length === 0) return false

  const supabase = createSupabaseBrowser()

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('target_id', targetId)

    if (error) {
      console.error('Supabase error:', error.message)
      return false
    }
    return data.length > 0
  } catch (error) {
    return false
  }
}
