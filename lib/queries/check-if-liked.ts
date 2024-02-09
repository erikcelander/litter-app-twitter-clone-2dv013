import { createSupabaseBrowser } from '../supabase/client'

export const checkIfLiked = async (userId: string, litId: string) => {
  if (!userId || userId.length === 0) return false
  if (!litId || litId.length === 0) return false

  const supabase = createSupabaseBrowser()

  try {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('target_id', litId)

    if (error) {
      console.error('Supabase error:', error.message)
      return false
    }
    return data.length > 0

    return !!data
  } catch (error) {
    return false
  }
}
