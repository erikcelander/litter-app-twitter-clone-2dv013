'use client'

import React, { useEffect, useState } from 'react';
import { Lit } from '@/components/lit';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';



export default function Feed({ lits, userId }: { lits: any[], userId?: string }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
    .channel("realtime feed prod")
    .on(
      "postgres_changes",
      userId
        ? {
            event: "*",
            schema: "public",
            table: "lits", 
            filter: `user_id.eq.${userId}`
          }
        : {
            event: "*",
            schema: "public",
            table: "lits", 
          },
      () => {
        router.refresh();
      }
    )
    .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <div>
      {lits.map((lit: any) => (
        <Lit
          key={lit.id}
          username={lit.username}
          name={lit.full_name}
          avatarUrl={lit.avatar_url}
          content={lit.content}
        />
      ))}
    </div>
  );
}