// import { useQuery } from '@tanstack/react-query'
// import { createSupabaseBrowser } from '../supabase/client'

// export function useUserProfile(userId: string) {
//   const supabase = createSupabaseBrowser()

//   return useQuery({
//     queryKey: ['profile', userId],
//     queryFn: async () => {
//       const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

//       if (error) {
//         throw new Error(error.message)
//       }

//       return data
//     },
//   })
// }

// export function useLits(limit = 10) {
//   const supabase = createSupabaseBrowser()

//   return useQuery({
//     queryKey: ['lits', limit],
//     queryFn: async () => {
//       const { data, error } = await supabase.from('lits').select('*').limit(limit)

//       if (error) {
//         throw new Error(error.message)
//       }

//       return data
//     },
//   })
// }

// export function useUser() {
//   const supabase = createSupabaseBrowser();

//   return useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       const { data } = await supabase.auth.getSession();
//       return { user: data?.session?.user };
//     },
//   })
// }


// // export function useRealTimeLits() {
// //   const supabase = createSupabaseBrowser();
// //   const queryClient = useQueryClient();

// //   // Use React Query to fetch initial data
// //   const { data, isLoading, error } = useQuery(['lits'], async () => {
// //     const { data, error } = await supabase
// //       .from('lits')
// //       .select('*')
// //       .order('created_at', { ascending: false });

// //     if (error) throw new Error(error.message);
// //     return data;
// //   });

// //   // Set up real-time subscription
// //   useEffect(() => {
// //     const subscription = supabase
// //       .from('lits')
// //       .on('*', payload => {
// //         // Update React Query cache
// //         queryClient.setQueryData(['lits'], oldData => {
// //           return [payload.new, ...oldData];
// //         });
// //       })
// //       .subscribe();

// //     return () => {
// //       supabase.removeSubscription(subscription);
// //     };
// //   }, [supabase, queryClient]);

// //   return { data, isLoading, error };
// // }
