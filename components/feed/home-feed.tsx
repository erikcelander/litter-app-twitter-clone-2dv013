'use client'
import React, { useEffect, useState } from 'react'
import LitComponent from '@/components/feed/lit-component'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/types/supabase'
import createSupabaseBrowser from '@/lib/supabase/client'
import { getAllLits } from '@/lib/queries/get-all-lits'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import Feed from './feed'

export default function HomeFeed({}) {
  const supabase = createSupabaseBrowser()

  const { data: lits } = useQuery(getAllLits(supabase))

  console.log(lits)
  return <div>{lits && <Feed lits={lits} />}</div>
}
