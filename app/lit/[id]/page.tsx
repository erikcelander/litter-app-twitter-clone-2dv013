import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getLitById } from '@/lib/queries/get-lit'
import Lit from '@/components/lit'

export default async function Page({ params }: { params: { id: string } }) {

 const queryClient = new QueryClient()
 const supabase = createSupabaseServer()

 await prefetchQuery(queryClient, getLitById(supabase, params.id))


  return (
    <div>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Lit id={params.id} />
    </HydrationBoundary>
    </div>
  )
}
