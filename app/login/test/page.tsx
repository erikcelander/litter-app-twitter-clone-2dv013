'use server'
import { Button } from '@/components/ui/button';
import { signIn } from '@/app/actions/sign-in';
import { redirect } from 'next/navigation'

export default async function Login() {
  // TODO: if node env = production redirect to login

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <form
        action={signIn}
        className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
      >
        <Button type='submit' className='text-foreground hover:bg-primary/70'>
          Log in for Testing
        </Button>
      </form>
    </div>
  );
}
