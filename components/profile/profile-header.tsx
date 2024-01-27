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

export function ProfileHeader({ profile }: { profile: UserProfile }) {
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const initials = fullName.split(' ').map(name => name[0]).join('');

  return (
    <div className="p-4 rounded-lg w-full mx-auto flex flex-row items-center justify-center" style={{ height: '200px', width: '600px' }}>


      <div className="flex flex-col flex-grow items-center justify-center w-full" style={{ height: '200px' }}>
        {/* <div className="pb-5"> */}
          <div className="" style={{height: '80px', width: '80px'}} >
            <Avatar className="" style={{height: '80px', width: '80px'}}>


              <AvatarImage style={{height: '80px', width: '80px'}} alt={`@${profile.username}`} src={profile.avatar_url!} />
              <AvatarFallback style={{height: '80px', width: '80px', fontSize: '32px'}} >{fullName ? fullName.charAt(0) : "U"}</AvatarFallback>


            </Avatar>
          </div>


        {/* </div> */}

        <div className="flex flex-col justify-center ml-4 pt-5">
          <span className="text-white  text-lg">{fullName}</span>
          <span className="text-gray-400">@{profile.username}</span>
        </div>
      </div>



      <div className="flex flex-col flex-grow items-center justify-center w-full  text-gray-400" style={{ height: '200px' }}>
        <div className="flex flex-grow items-center justify-center flex-col pt-6 ">

          <Button className="text-black">Follow</Button>

        </div>
        <div className="text-center flex flex-col justify-between  p-6 pt-0" >

          <div className="">
            <span className="text-gray-500  text-sm ">  Joined {profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-GB') : ''}</span>
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