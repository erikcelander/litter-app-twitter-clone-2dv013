import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';
import { Lit } from "@/lib/types";

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

            <div className="ml-5  flex flex-row" style={{ width: '470px' }}>
            <Link className='hover:cursor-pointer flex flex-row' href={`/profile/${lit?.username}`}>

              <div className="hover:underline text-primary/100 text-lg">{lit?.full_name || "Unknown User"}</div>
              <div className="hover:underline text-primary/40 text-base  mt-0.5 ml-2">@{lit?.username || "unknown"}</div>
              </Link>

            </div>

          <Link className='hover:cursor-pointer text-gray-100' href={`/lit/${lit?.id}`}>

            <div className="flex ml-5  pl-0">
              <p className="text-sm">
                {lit?.content || "No content available."}
              </p>
            </div>
          </Link>

        </div>

      </div>






    </div>
  )
}
