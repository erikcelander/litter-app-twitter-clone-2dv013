'use client'
import React, { useEffect, useState } from 'react'
import { Lit } from '@/components/lit'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/types/supabase'
import { createSupabaseBrowser } from '@/lib/supabase/client'

export default function Feed({ lits, userId }: { lits: any[]; userId?: string }) {
  const [updatedLits, setLits] = useState<any[]>(lits)
  const supabase = createSupabaseBrowser()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime feed prod')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lits',
        },
        (payload) => {
          console.log('New payload:', payload) // Debugging line
          setLits((current) => [payload.new, ...current])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return (
    <div>
      {updatedLits.map((lit: any) => (
        <Lit
          key={lit.id}
          username={lit.username}
          name={lit.full_name}
          avatarUrl={lit.avatar_url}
          content={lit.content}
        />
      ))}
    </div>
  )
}
