'use client'
import { Button } from './ui/button'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { GitlabIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LockOpen1Icon } from "@radix-ui/react-icons";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function Logout() {
  const qc = useQueryClient()

  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const logout = async () => {
    const supabase = createSupabaseBrowser()

    startTransition(async () => {
      await supabase.auth.signOut()
      qc.invalidateQueries({ queryKey: ['user'] })
      router.refresh()
    })
  }

  return (
    <Button className='text-foreground hover:bg-primary/70' onClick={logout}>
      Logout &nbsp; <LockOpen1Icon className={cn({ "animate-spin": isPending })} />
    </Button>
  )
}
