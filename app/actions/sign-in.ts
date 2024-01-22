'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


export const signIn = async () => {
  const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const email = process.env.NEXT_PUBLIC_TEST_EMAIL as string;
    const password = process.env.NEXT_PUBLIC_TEST_PASSWORD as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });


    if (error) {
      console.error('Failed to login', error.message);
  
    } else {
      redirect('/') 
    }
  };
