import { createSupabaseBrowser } from '../supabase/client';

export async function getLits(): Promise<any> {
    const supabase = createSupabaseBrowser();
    return await supabase
        .from('lits')
        .select('*')
        .order('created_at', { ascending: false })
        .throwOnError();
}
