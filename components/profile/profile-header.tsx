'use client'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FollowButton } from "./follow";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { UnfollowButton } from "./unfollow";
import { useQuery } from "@tanstack/react-query";
import { checkIfUserFollows } from "@/lib/queries/check-follow";

export interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  created_at: Date | null;
}


export function ProfileHeader({ profile, currentUserID }: { profile: UserProfile, currentUserID: string }) {
    const { data: ifFollowing, error, isLoading } = useQuery({
      queryKey: ['followStatus', currentUserID, profile.username],
      queryFn: () => checkIfUserFollows(currentUserID, profile.username || '')
    })


    console.log(ifFollowing)


  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="p-4 rounded-lg w-full mx-auto flex flex-row items-center justify-center" style={{ height: '200px', width: '600px' }}>


      <div className="flex flex-col flex-grow items-center justify-center w-full" style={{ height: '200px' }}>

        <div className="" style={{ height: '80px', width: '80px' }} >
          <Avatar className="" style={{ height: '80px', width: '80px' }}>


            <AvatarImage style={{ height: '80px', width: '80px' }} alt={`@${profile.username}`} src={profile.avatar_url!} />
            <AvatarFallback style={{ height: '80px', width: '80px', fontSize: '32px' }} >{fullName ? fullName.charAt(0) : "U"}</AvatarFallback>


          </Avatar>
        </div>



        <div className="flex flex-col justify-center ml-4 pt-5">
          <span className="text-white  text-lg">{fullName}</span>
          <span className="text-gray-400">@{profile.username}</span>
        </div>
      </div>



      <div className="flex flex-col flex-grow items-center justify-center w-full  text-gray-400" style={{ height: '200px' }}>
        <div className="flex flex-grow items-center justify-center flex-col pt-6 ">

          {
            currentUserID && profile.id && currentUserID !== profile.id && (
              ifFollowing
                ? <UnfollowButton profileUserID={profile.id} currentUserID={currentUserID} />
                : <FollowButton profileUserID={profile.id} currentUserID={currentUserID} />
            )
          }


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