'use client'
import { createSupabaseBrowser } from '@/lib/supabase/client'

import { getLitById } from '@/lib/queries/get-lit'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import LitComponent from '@/components/lits/lit-component'
import { Lit } from '@/lib/types'


export default function LitWrapper({ id }: { id: string }) {
  const supabase = createSupabaseBrowser()
  const { data: lit } = useQuery(getLitById(supabase, id))

  return (
    <div>
      {lit && <LitComponent lit={lit as Lit} />}
    </div>
  )
}
  
