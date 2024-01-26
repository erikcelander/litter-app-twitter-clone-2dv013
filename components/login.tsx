"use client"
import { Button } from './ui/button'
import createSupabaseBrowser from '@/lib/supabase/client'

// import { createSupabaseServer } from '@/lib/supabase/server'
import { GitlabIcon } from 'lucide-react'

export default async function Login() {
  const supabase = createSupabaseBrowser()

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${location.pathname}`,
      },
    })
  }

  return (
    <form action={signIn}>
      <Button className='text-foreground hover:bg-primary/70'>
        Login &nbsp; <GitlabIcon />
      </Button>
    </form>
  )
}
