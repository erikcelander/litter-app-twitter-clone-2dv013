import { createSupabaseServer } from '@/lib/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'

export default async function AuthButton() {
  const supabase = createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const supabase = createSupabaseServer()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <form action={signOut}>
      <Button className='text-foreground hover:bg-primary/70'>Logout</Button>
    </form>
  ) : (
    <Button asChild className='text-foreground hover:bg-primary/70'>
      <Link href='/login'>Log in</Link>
    </Button>
  )
}
