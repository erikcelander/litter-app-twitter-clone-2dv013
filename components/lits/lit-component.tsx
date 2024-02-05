import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from 'next/link';
import { Lit } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { formatDistanceToNow, format } from 'date-fns';

const timeAgo = (date: string | number | Date) => formatDistanceToNow(new Date(date), { addSuffix: true });
const formattedDate = (date: string | number | Date) => format(new Date(date), 'HH:mm dd/MM/yyyy');


export const LitComponent = ({ lit }: { lit: Lit }) => {
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

          <div className="ml-5  flex flex-row" style={{ width: '420px' }}>
            <Link className='hover:cursor-pointer flex flex-row' href={`/profile/${lit?.username}`}>

              <div className="hover:underline text-primary/100 text-lg">{lit?.full_name || "Unknown User"}</div>
              <div className="hover:underline text-primary/40 text-base  mt-0.5 ml-2">@{lit?.username || "unknown"}</div>
            </Link>

          </div>

          <Link className='hover:cursor-pointer ' href={`/lit/${lit?.id}`}>

            <div className="flex ml-5 justify-between text-sm pl-0">
              <p className="">
                {lit?.content || "No content available."}
              </p>
              <div>
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

            </div>
          </Link>

        </div>

      </div>






    </div>
  )
}
