import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from 'next/link'
import { Comment } from "@/lib/types" // Ensure this is imported correctly
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PawPrint } from "lucide-react"
import styles from './comment-component.module.css'
import { formatDistanceToNow, format } from 'date-fns'

const timeAgo = (date: string | number | Date) => formatDistanceToNow(new Date(date), { addSuffix: true })
const formattedDate = (date: string | number | Date) => format(new Date(date), 'HH:mm dd/MM/yyyy')

export const CommentComponent = ({ comment, session }: { comment: Comment, session: any }) => {
  return (
    <div className={`p-2 pt-4 pb-4 text-white max-w-xl mx-auto ${styles.comment} border-t border-t-background/10`}>
      <div className="flex flex-row min-w-xl" style={{ width: '470px' }}>
        <Link className='hover:cursor-pointer' href={`/profile/${comment?.username}`}>

          <Avatar className="h-8 w-8 mt-auto mb-auto">
            <AvatarImage alt={`@${comment?.username}`} src={comment?.avatar_url!} />
            <AvatarFallback>{comment?.full_name ? comment?.full_name.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex flex-col justify-center">
          <div className="ml-5 flex flex-row justify-between" style={{ width: '420px' }}>
            <Link className='hover:cursor-pointer flex flex-row' href={`/profile/${comment?.username}`}>

              <div className="hover:underline text-primary/100 text-lg">{comment?.full_name || "Unknown User"}</div>
              <div className="hover:underline text-primary/40 text-base mt-0.5 ml-2">@{comment?.username || "unknown"}</div>
            </Link>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><span className="mr-5 text-xs text-gray-500">
                  {comment.created_at ? timeAgo(comment.created_at) : "Unknown time"}
                </span></TooltipTrigger>
                <TooltipContent>
                  {comment.created_at ? formattedDate(comment.created_at) : "Unknown date"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex ml-5 justify-between text-sm pl-0 flex-1">
            <Link className='hover:cursor-pointer flex-grow' href={`/comment/${comment?.id}`}>

              <p className="flex-grow">
                {comment?.content || "No content available."}
              </p>
            </Link>

            {
              session &&
              <div className="flex flex-row mr-6 mt-1 text-sm ">
                <span className="text-xs pt-1 mr-1 text-gray-400">10</span> {/* Placeholder for likes count */}
                <PawPrint className={`${styles.icon} mr-2`} style={{ width: '18px', height: 'auto' }} />
              </div>
            }
          </div>
        </div>
      </div>
    </div >
  )
}
