'use client'
import React, { useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {LitComponent} from '../lits/lit-component';
import { useQuery } from '@tanstack/react-query';
import { Lit } from '@/lib/types';
import { getLitsByUsername } from '@/lib/queries/get-lits-by-user';
import { QueryData } from '@/lib/types';
import { LoadingSpinner } from '../ui/spinner';

export default function ProfileFeed({ username }: { username: string }) {
  const supabase = createSupabaseBrowser();
  const queryClient = useQueryClient();

  const { data: res, error, isLoading } = useQuery({ queryKey: [`${username}-lits`, username], queryFn: () => getLitsByUsername(username) })
  let lits = res.data


  useEffect(() => {
    const channel = supabase
      .channel(`${username}-lits`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "lits",
        filter: `username=eq.${username}`, 
      }, (payload) => {


        const lit = {
          id: payload.new.id,
          user_id: payload.new.user_id,
          username: payload.new.username,
          full_name: payload.new.full_name,
          avatar_url: payload.new.avatar_url,
          content: payload.new.content,
          created_at: payload.new.created_at,
        } as Lit

        queryClient.setQueryData<QueryData>([`${username}-lits`, username], (prevLits: QueryData | undefined) => {
          const oldData = prevLits?.data || [];
          return { data: [lit, ...oldData] };
        });

      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, queryClient]);


  if (isLoading) return <div className='flex justify-center items-center mt-5' style={{width: '100%'}}><LoadingSpinner className={''} /></div>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        {lits?.map((lit: any) => (
          <LitComponent key={lit.id} lit={lit} />
        ))}
      </div>
    </>
  );
}
