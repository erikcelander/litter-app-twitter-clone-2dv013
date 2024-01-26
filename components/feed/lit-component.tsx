import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';


export default function LitComponent({ lit }: { lit: any }) {
  return (
    <div className="flex gap-4 p-4  text-white rounded-lg max-w-md mx-auto">
    <Link className='hover:cursor-pointer' href={`/profile/${lit?.username}`}>
    <div className="flex flex-col items-center">
      <Avatar className="h-10 w-10">
        <AvatarImage alt={`@${lit?.username}`} src={lit?.avatar_url || "/default-avatar.jpg"} />
        <AvatarFallback>{lit?.full_name ? lit?.full_name.charAt(0) : "U"}</AvatarFallback>
      </Avatar>
      <div className="grid gap-0.5 text-xs mt-2">
        <div className="font-medium">{lit?.full_name || "Unknown User"}</div>
        <div className="text-gray-500 dark:text-gray-400 text-center">@{lit?.username || "unknown"}</div>
      </div>
    </div>
    </Link>

    <div><Separator className='bg-primary' orientation="vertical" /></div>

    <div className="flex w-56 p-6 pl-3">
      <p className="text-sm">
        {lit?.content || "No content available."}
      </p>
    </div>
  </div>
  )
}
