'use client'
import React, { useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {LitComponent} from '../lits/lit-component';
import { useQuery } from '@tanstack/react-query';
import { getLitsByFollowing } from '@/lib/queries/get-lits-by-following';
import { Lit } from '@/lib/types';
import { LoadingSpinner } from '../ui/spinner';

export default function FollowingFeed({ currentUserID }: { currentUserID: string }) {
  const supabase = createSupabaseBrowser();
  const queryClient = useQueryClient();

  const { data: lits, error, isLoading } = useQuery({
    queryKey: [`litsByFollowing-${currentUserID}`, currentUserID],
    queryFn: () => getLitsByFollowing(currentUserID),
  });

  useEffect(() => {
    const channel = supabase
      .channel("following-lits")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "lits",
      }, (payload) => {
        if (payload.new) {
          const lit = {
            id: payload.new?.id,
            user_id: payload.new?.user_id,
            username: payload.new?.username,
            full_name: payload.new?.full_name,
            avatar_url: payload.new?.avatar_url,
            content: payload.new?.content,
            created_at: payload.new?.created_at,
          } as Lit


          supabase
            .from('follows')
            .select('follower_id')
            .eq('follower_id', currentUserID)
            .eq('followed_id', lit.user_id)
            .then(({ data }) => {
              if (data && data.length > 0) {
                console.log('lit:  ', lit)

                queryClient.setQueryData<Lit[]>([`litsByFollowing-${currentUserID}`, currentUserID], (prevLits) => {
                  if (prevLits) {
                    return [lit, ...prevLits]
                  } else {
                    return [lit]
                  }
                })

              }
            }
            )
        }
      }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, queryClient, currentUserID]);


  if (isLoading) return <div className='flex justify-center items-center mt-5' style={{ width: '100%' }}><LoadingSpinner className={''} /></div>
  if (error) return <div>Error: {error.message}</div>;

  return (

    <div style={{ width: '100%' }} className='bg-[#1a1a1a] pt-5'>
      {lits && lits.length > 0 ? (
        lits.map((lit: Lit) => <LitComponent key={lit.id} lit={lit} />)
      ) : (
        <div className='text-white text-center'>You are not following anyone yet.</div>
      )}
    </div>
  );
}

