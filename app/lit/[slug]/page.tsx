import { Lit } from '@/components/lit'

type LitProps = {
  id: string
  user_id: string
  username: string
  full_name: string
  avatar_url: string
  content: string
  created_at: string
}

async function getLit(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/lits?lit=${slug}`)
    const data = await response.json()
    return data as LitProps
  } catch (error: any) {
    console.error(error)
  }
 
}

export default async function Page({ params }: { params: { slug: string } }) {
  const lit = await getLit(params.slug)

  return (
    <div>
     {lit && <Lit username={lit.username} name={lit.full_name} avatarUrl={lit.avatar_url} content={lit.content} />} 
    </div>
  )
}