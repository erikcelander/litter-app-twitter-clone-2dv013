import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from 'next/link'
import { Lit } from "@/lib/types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MessageCircle } from "lucide-react"
import styles from './lit-component.module.css'
import { formatDistanceToNow, format } from 'date-fns'
import { useQuery } from "@tanstack/react-query"
import { LikeComponent } from "./like/like-component"
import { checkIfLiked } from "@/lib/queries/check-if-liked"


const timeAgo = (date: string | number | Date) => formatDistanceToNow(new Date(date), { addSuffix: true })
const formattedDate = (date: string | number | Date) => format(new Date(date), 'HH:mm dd/MM/yyyy')


export const LitComponent = ({ lit, session }: { lit: Lit, session: any }) => {
  let liked = false

  if (session !== null && session !== undefined) {
    const { data: isLiked, isLoading, isError } = useQuery({
      queryKey: [`likeStatus-${lit.id}-${session.user.id}`, lit.id, session.user.id],
      queryFn: () => checkIfLiked(session.user.id, lit.id),
      enabled: !!session.user.id && !!lit.id,
    })
    liked = isLiked!
  }


  return (
    <div className=" p-2 pt-4 pb-4 text-white  max-w-xl mx-auto">
      <div className="flex flex-row min-w-xl" style={{ width: '470px' }}>
        <Link className='hover:cursor-pointer' href={`/profile/${lit?.username}`}>

          <Avatar className="h-12 w-12 mt-auto mb-auto">
            <AvatarImage alt={`@${lit?.username}`} src={lit?.avatar_url!} />
            <AvatarFallback>{lit?.full_name ? lit?.full_name.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col justify-center">

          <div className="ml-5  flex flex-row justify-between" style={{ width: '420px' }}>
            <Link className='hover:cursor-pointer flex flex-row' href={`/profile/${lit?.username}`}>

              <div className="hover:underline text-primary/100 text-lg">{lit?.full_name || "Unknown User"}</div>
              <div className="hover:underline text-primary/40 text-base  mt-0.5 ml-2">@{lit?.username || "unknown"}</div>
            </Link>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><span className="mr-5 text-xs text-gray-500" >
                  {lit.created_at ? timeAgo(lit.created_at) : "Unknown time"}
                </span></TooltipTrigger>
                <TooltipContent>
                  {lit.created_at ? formattedDate(lit.created_at) : "Unknown date"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex ml-5 justify-between text-sm pl-0 flex-1">
            <Link className='hover:cursor-pointer flex-grow' href={`/lit/${lit?.id}`}>

              <p className="flex-grow">
                {lit?.content || "No content available."}
              </p>
            </Link>

            <div>
              {
                session &&
                <div className="flex flex-row mr-6 mt-1 text-sm gap-4">

                  {session.user.id && <LikeComponent isLiked={liked || false} litId={lit.id} likes={lit.like_count} userId={session.user.id} />}

                  <Link className='hover:cursor-pointer ' href={`/lit/${lit?.id}`}>

                    <div className="flex flex-row">
                      <span className="text-xs pt-1 text-gray-400 mr-1">{lit.comment_count}</span>
                      <MessageCircle className={`${styles.icon}`} style={{ width: '18px', height: 'auto' }} />
                    </div>
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}