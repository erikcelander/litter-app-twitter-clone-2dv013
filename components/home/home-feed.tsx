'use client'
import React, { useEffect } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import {LitComponent} from '../lits/lit-component';
import { useQuery } from '@tanstack/react-query';
import { getLits } from '@/lib/queries/qet-lits';
import { Lit } from '@/lib/types';
import { QueryData } from '@/lib/types';
import { LoadingSpinner } from '../ui/spinner';



export default function HomeFeed() {

  const supabase = createSupabaseBrowser();
  const queryClient = useQueryClient();

  const { data: res, error, isLoading } = useQuery({ queryKey: ['lits'], queryFn: getLits })
  let lits = res.data

  useEffect(() => {
    const channel = supabase
      .channel("realtime-lits")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "lits",
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

        queryClient.setQueryData<QueryData>(['lits'], (prevLits: QueryData | undefined) => {
          const oldData = prevLits?.data || [];
          return { data: [lit, ...oldData] };
        });

      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, queryClient]);


  if (isLoading) return <div className='flex justify-center items-center mt-5' style={{ width: '100%' }}><LoadingSpinner className={''} /></div>
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div style={{ width: '100%' }} className='bg-[#1a1a1a] pt-5'>
        {lits?.map((lit: any) => (
          <LitComponent key={lit.id} lit={lit} />
        ))}

      </div>
    </>
  );
}
