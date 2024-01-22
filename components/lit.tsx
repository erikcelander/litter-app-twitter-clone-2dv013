import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";


type LitProps = {
  username: string;
  name: string;
  avatarUrl: string;
  content: string;
}

export function Lit({ username, name, avatarUrl, content }: LitProps) {
  return (
    <div className="flex gap-4 p-4 bg-black text-white rounded-lg max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <Avatar className="h-12 w-12">
          <AvatarImage alt={`@${username}`} src={avatarUrl || "/default-avatar.jpg"} />
          <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div className="grid gap-0.5 text-xs mt-2">
          <div className="font-medium">{name || "Unknown User"}</div>
          <div className="text-gray-500 dark:text-gray-400">@{username || "unknown"}</div>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          {content || "No content available."}
        </p>
      </div>
    </div>
  );
}
