export type Lit = {
    user_id: string,
    username: string | null; // Allow null
    full_name: string | null;
    avatar_url: string | null;
    content: string,
    created_at: string,
    id: string
  }

  export type QueryData = {
    data: Lit[];
  };
  