import { UserProfile, ProfileHeader } from '@/components/profile-header';
import Feed from '@/components/feed'

const Profile = ({ user, lits }: { user: UserProfile, lits: any[] }) => {
  return (
    <div>
      <ProfileHeader user={user} />
      <Feed lits={lits}/>
    </div>
  );
};

export default Profile;