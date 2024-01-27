import { createSupabaseBrowser } from "../supabase/client";


export const checkIfUserFollows = async (currentUserID: string, username: string) => {
    const supabase = createSupabaseBrowser();

    try {
        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .single();

        if (profileError) throw profileError;
        if (!userProfile) return false; 

        const profileUserID = userProfile.id;

        const { data, error } = await supabase
            .from('follows')
            .select('follower_id')
            .eq('follower_id', currentUserID)
            .eq('followed_id', profileUserID)
            .maybeSingle();

        if (error) throw error;

        return !!data;
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
        throw error;
    }
};