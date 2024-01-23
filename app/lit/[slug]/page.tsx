// import { Lit } from '@/components/lit'

// type LitProps = {
//   id: string
//   user_id: string
//   username: string
//   full_name: string
//   avatar_url: string
//   content: string
//   created_at: string
// }

// async function getLit(slug: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/lits?lit=${slug}`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json()
//     if (Array.isArray(data)) {
//       if (data.length === 1) {
//         return data[0] as LitProps;
//       } else if (data.length === 0) {
//         console.error('No lits found with the provided slug');
//       } else {
//         console.error('Multiple lits found with the provided slug');
//       }
//     } else {
//       return data as LitProps;
//     }
//   } catch (error: any) {
//     console.error(error)
 
//   }
// }
export default async function Page({ params }: { params: { slug: string } }) {
 // const lit = await getLit(params.slug)

  return (
    <div>
      test
     {/*lit && <Lit username={lit.username} name={lit.full_name} avatarUrl={lit.avatar_url} content={lit.content} />*/} 
    </div>
  )
}