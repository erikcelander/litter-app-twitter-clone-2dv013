// "use client"
import { Button } from './ui/button'
// import { createSupabaseBrowser } from '@/lib/supabase/client'
import { createSupabaseServer } from '@/lib/supabase/server'
import { GitlabIcon } from 'lucide-react'

export default async function Login() {
  const supabase = createSupabaseServer()

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${location.pathname}`,
      },
    })
  }

  return  (
    <Button className='text-foreground hover:bg-primary/70' onClick={signIn} >Login  &nbsp; <GitlabIcon/></Button>
  )
}
