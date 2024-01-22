// components/Profile.tsx

export interface UserProfile {
  id: string;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  created_at: Date | null;
}

const Profile = ({ userProfile }: { userProfile: UserProfile }) => {
  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Profile: {userProfile.username}</h1>
    </div>
  );
};

export default Profile;
