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
  const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/lits?lit=${slug}`, {cache: 'no-store'})
  const data = await response.json()
  return data as LitProps
}

export default async function Page({ params }: { params: { slug: string } }) {
  const lit = await getLit(params.slug)

  return (
    <div>
      <Lit username={lit.username} name={lit.full_name} avatarUrl={lit.avatar_url} content={lit.content} />
    </div>
  )
}