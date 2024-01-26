// 'use client'
// import createSupabaseBrowser from '@/lib/supabase/client'

// import { getLitById } from '@/lib/queries/get-lit'
// import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
// import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
// import { Separator } from '@/components/ui/separator'
// import Link from 'next/link'
// import LitComponent from '@/components/lit-component'

// export default function Lit({ id }: { id: string }) {
//   const supabase = createSupabaseBrowser()
//   const { data: lit } = useQuery(getLitById(supabase, id))

//   return <LitComponent lit={lit} />
// }
