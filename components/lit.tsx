import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"
import Link from 'next/link';


type LitProps = {
  username: string;
  name: string;
  avatarUrl: string;
  content: string;
}

export function Lit({ username, name, avatarUrl, content }: LitProps) {
  return (
    <div className="flex gap-4 p-4  text-white rounded-lg max-w-md mx-auto">
      <Link className='hover:cursor-pointer' href={`/profile/${username}`}>
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage alt={`@${username}`} src={avatarUrl || "/default-avatar.jpg"} />
          <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5 text-xs mt-2">
          <div className="font-medium">{name || "Unknown User"}</div>
          <div className="text-gray-500 dark:text-gray-400 text-center">@{username || "unknown"}</div>
        </div>
      </div>
      </Link>

      <div><Separator className='bg-primary' orientation="vertical" /></div>
  
      <div className="flex w-56 p-6 pl-3">
        <p className="text-sm">
          {content || "No content available."}
        </p>
      </div>
    </div>
  );
}
