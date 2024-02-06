import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createSupabaseServer } from '@/lib/supabase/server'
import { getLitById } from '@/lib/queries/get-lit'
import { LitWrapper } from '@/components/lits/lit-wrapper'
import { CreateComment } from '@/components/lits/create-comment'
import { User } from '@supabase/supabase-js'

export default async function Page({ params }: { params: { id: string } }) {

  const queryClient = new QueryClient()
  const supabase = createSupabaseServer()

  await prefetchQuery(queryClient, getLitById(supabase, params.id))
  const { data: session } = await supabase.auth.getSession()
  const { data } = await supabase.auth.getUser()
  const { user } = data as { user: User }


  console.log(user)

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LitWrapper id={params.id} session={session.session} />
        {user && <CreateComment litId={params.id} user={user} />}
      </HydrationBoundary>
    </div>
  )
}
