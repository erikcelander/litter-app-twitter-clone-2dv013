// import Profile from '@/components/profile'
// import { cookies } from 'next/headers'
// import { createSupabaseServer } from '@/lib/supabase/server'

// async function fetchUserProfile(slug: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/profile?user=${slug}`)
//     const profileData = await response.json()
//     return profileData
//   } catch (error) {
//     console.error('Error fetching profile:', error)
//   }
// }

// export default async function Page({ params }: { params: { slug: string } }) {
//   const supabase = createSupabaseServer()


//   const user = await fetchUserProfile(params.slug)

//   let lits = []
//   try {
//     const { data, error } = await supabase
//       .from('lits')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false })

//     if (error) throw error
//     lits = data
//   } catch (error) {
//     console.error('Error fetching lits:', error)
//   }

//   return <div>{user && <Profile user={user} lits={lits} />}</div>
// }
