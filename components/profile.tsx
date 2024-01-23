import { UserProfile, ProfileHeader } from '@/components/profile-header';

const Profile = ({ user }: { user: UserProfile }) => {
  return (
    <div>
      <ProfileHeader user={user} />
      {/* TODO: dynamically map over a users lits after fetching all */}
    </div>
  );
};

export default Profile;