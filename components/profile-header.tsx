import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  created_at: Date | null;
}

export function ProfileHeader({ user }: { user: UserProfile }) {
  const fullName = `${user.first_name} ${user.last_name}`;
  const initials = fullName.split(' ').map(name => name[0]).join('');

  return (
    <div className="p-4 rounded-lg w-full mx-auto flex flex-row items-center justify-center" style={{ height: '200px', width: '600px' }}>


      <div className="flex flex-col flex-grow items-center justify-center w-full" style={{ height: '200px' }}>
        <div className="pb-5">
          <Avatar className="w-23 h-23">
            {user.avatar_url ? <AvatarImage alt={fullName} src={user.avatar_url} /> : <AvatarFallback>{initials}</AvatarFallback>}
          </Avatar>
        </div>

        <div className="flex flex-col justify-center ml-4">
          <span className="text-white  text-lg">{fullName}</span>
          <span className="text-gray-400">@{user.username}</span>
        </div>
      </div>



      <div className="flex flex-col flex-grow items-center justify-center w-full  text-gray-400" style={{ height: '200px' }}>
        <div className="flex flex-grow items-center justify-center flex-col pt-6 ">
        
          <Button className="text-black">Follow</Button>

        </div>
        <div className="text-center flex flex-col justify-between  p-6 pt-0" >

          <div className="">
            <span className="text-gray-500  text-sm ">Joined {user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</span>
            <div className="flex space-x-4">

              <span>3 following</span>
              <span>3 followers</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}