import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  const url = process.env.PROD_URL || 'http://localhost:3000'

  const signIn = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        redirectTo: `${url}/auth/callback`,
      },
    })


    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    if (data.url) {
      return redirect(data.url)
    }

    return redirect('/')
  }

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <form
        action={signIn}
        className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
      >
        <Button type='submit' className='text-foreground hover:bg-primary/70'>
          Log in with GitLab
        </Button>

        {searchParams?.message && (
          <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
