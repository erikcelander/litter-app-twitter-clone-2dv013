import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@/lib/supabase/server'


interface LitData {
  content: string;
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }


  const litData: LitData = await request.json();

  if (litData.content.length > 42) {
    return new Response("Lit content exceeds 42 characters", { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('lits')
      .insert([{ user_id: user.id, content: litData.content }]);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
