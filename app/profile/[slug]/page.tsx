import Profile from '@/components/profile';

async function fetchUserProfile(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/profile?user=${slug}`);
    const profileData = await response.json();
    return profileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

export default async function Page({ params }: { params: { slug: string } }) {

  console.log("Received slug:", params.slug);
  const user = await fetchUserProfile(params.slug);

  return (
    <div>
      {user && <Profile userProfile={user} />}
    </div>
  );
};


