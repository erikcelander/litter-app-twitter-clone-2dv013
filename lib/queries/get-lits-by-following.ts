import { createSupabaseBrowser } from '../supabase/client';

export const getLitsByFollowing = async (currentUserID: string) => {
    const supabase = createSupabaseBrowser();


    // fetch all the users that the current user follows
    const { data: follows, error: followsError } = await supabase
      .from('follows')
      .select('followed_id')
      .eq('follower_id', currentUserID);
  
    if (followsError) {
      console.error(followsError);
      throw followsError;
    }
  

    // fetch all the lits from the users that the current user follows
    const { data: lits, error: litsError } = await supabase
      .from('lits')
      .select('*')
      .order('created_at', { ascending: false })
      .in('user_id', follows.map(follow => follow.followed_id));
      
  
    if (litsError) {
      console.error(litsError);
      throw litsError;
    }
  
    return lits;
  };
  