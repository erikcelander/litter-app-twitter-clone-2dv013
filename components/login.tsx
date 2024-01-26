'use client'
import { Button } from './ui/button'
import createSupabaseBrowser from '@/lib/supabase/client'
import { sign } from 'crypto'

import { createSupabaseServer } from '@/lib/supabase/server'
import { GitlabIcon } from 'lucide-react'

export default function Login() {
  const supabase = createSupabaseBrowser()

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <Button onClick={signIn} className='text-foreground hover:bg-primary/70'>
      Login &nbsp; <GitlabIcon />
    </Button>
  )
}
