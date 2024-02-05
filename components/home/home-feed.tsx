'use client'

import React, { useEffect, useRef } from 'react';
import { createSupabaseBrowser } from '@/lib/supabase/client';
import { useInfiniteQuery, useQueryClient, InfiniteData } from '@tanstack/react-query';
import { LitComponent } from '../lits/lit-component';
import { Lit, QueryData } from '@/lib/types';
import { LoadingSpinner } from '../ui/spinner';


export default function HomeFeed({ currentUserID }: { currentUserID: string }) {
  const supabase = createSupabaseBrowser();
  const queryClient = useQueryClient();
  const pageSize = 10;

  // const { data: res, error, isLoading } = useQuery({ queryKey: ['lits'], queryFn: getLits });
  // let lits = res?.data;

  const fetchLits = async ({ pageParam }: { pageParam: any }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/lits/home/?page=${pageParam}&size=${pageSize}`)
    return res.json()
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [`lits`],
    queryFn: fetchLits,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextCursor !== null ? (lastPage.nextCursor / pageSize) : undefined;
    },
    initialPageParam: 0
  })

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '200px',
      }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);


  useEffect(() => {
    const channel = supabase.channel("realtime-lits")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "lits",
      }, (payload) => {
        if (payload.new) {
          const lit = {
            id: payload.new.id,
            user_id: payload.new.user_id,
            username: payload.new.username,
            full_name: payload.new.full_name,
            avatar_url: payload.new.avatar_url,
            content: payload.new.content,
            created_at: payload.new.created_at,
          } as Lit;

          queryClient.setQueryData<InfiniteData<Array<Lit>>>([`lits`], (prevLits: any) => {
            const updatedFirstPageData = [lit, ...prevLits.pages[0].data];
            updatedFirstPageData.pop()


            const updatedPages = prevLits.pages.map((page: any, pageIndex: any) =>
              pageIndex === 0 ? { ...page, data: updatedFirstPageData } : page
            )

            return {
              ...prevLits,
              pages: updatedPages,
            };
          });


          // supabase
          //   .from('follows')
          //   .select('follower_id')
          //   .eq('follower_id', lit.user_id)
          //   .eq('followed_id', currentUserID)
          //   .single()
          //   .then(({ data }) => {

          //     if (data?.follower_id.length === 36) {
          //       queryClient.setQueryData<Lit[]>([`litsByFollowing-${currentUserID}`, currentUserID], (prevLits) => {
          //         if (prevLits) {
          //           return [lit, ...prevLits]
          //         } else {
          //           return [lit]
          //         }
          //       })
          //     }
          //   }


            // )
        }
      }).subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, queryClient]);

  return status === 'pending' ? (
    <div className='flex justify-center items-center mt-5' style={{ width: '100%' }}><LoadingSpinner className={''} /></div>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <div className='flex flex-col items-center'>
        {data?.pages?.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((lit: Lit) => (
              <LitComponent key={lit.id} lit={lit} />
            ))}
          </React.Fragment>
        ))}

        <div ref={loadMoreRef} style={{ height: "20px" }}></div>

      </div>
      {isFetching && !isFetchingNextPage && (
        <div className='flex justify-center items-center mt-5'>
          <LoadingSpinner className='' />
        </div>
      )}
    </>
  );
}