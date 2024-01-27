'use client'
import React, { useEffect, useState } from 'react'

import { createSupabaseBrowser } from '@/lib/supabase/client'
import { getAllLits } from '@/lib/queries/get-all-lits'
// import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import HomeFeed from './home-feed'
import { useQuery } from '@tanstack/react-query'
import { getLits } from '@/lib/queries/qet-lits'


export default function Home({ }) {
  // const { data: res, error, isLoading } = useQuery({ queryKey: ['lits'], queryFn: getLits })
  // const lits  = res.data


  return (
    <div>
      {/* {<RealtimeFeed />} */}
    </div>
  )
}

      // {/* {lits && lits.map((lit: any) => (
      //   <LitComponent key={lit.id} lit={lit} />
      // ))} */}
// import Feed from './feed'

import LitComponent from '@/components/lits/lit-component'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/types/supabase'
