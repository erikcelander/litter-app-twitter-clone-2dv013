
import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PawPrint } from 'lucide-react'
import styles from '../lit-component.module.css'
import { createSupabaseBrowser } from '@/lib/supabase/client'

type LikeComponentProps = {
  likes: number
  userId: string | undefined
  litId: string
  isLiked: boolean
}

const supabase = createSupabaseBrowser()

export const LikeComponent: React.FC<LikeComponentProps> = ({ likes, userId, litId, isLiked }) => {
  const [likeCount, setLikeCount] = useState(likes)
  const [liked, setLiked] = useState(isLiked)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (isLiked !== undefined) {
      setLikeCount(likes)
      setLiked(isLiked)
    }
  }, [likes, isLiked])

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (liked) {
        // User already liked the lit, so delete the like
        const { error } = await supabase
          .from('likes')
          .delete()
          .match({ target_id: litId, user_id: userId })
        if (error) throw new Error(error.message)
      } else {
        // User hasn't liked the lit yet, so insert the like
        const { error } = await supabase
          .from('likes')
          .insert([{ target_id: litId, user_id: userId, type: 'lit' }])
        if (error) throw new Error(error.message)
      }
    },
    onSuccess: () => {
      // Toggle the liked state and update the like count optimistically
      setLiked(!liked)
      setLikeCount((prev) => liked ? prev - 1 : prev + 1)
    },
  })

  const handleLike = () => {
    if (!userId) {
      alert('You must be logged in to like a lit.')
      return
    }
    toggleLike.mutate()
  }

  return (
    <div className="flex flex-row">
      <span className="text-xs pt-1 mr-1 text-gray-400">{likeCount}</span>
      {/* <PawPrint className={`${styles.icon} ${liked ? styles.liked : ''} mr-2`} style={{ width: '18px', height: 'auto' }} onClick={handleLike} /> */}
      <PawPrint
        className={`${styles.icon} ${liked === undefined ? '' : liked ? styles.liked : ''} mr-2`}
        style={{ width: '18px', height: 'auto' }}
        onClick={handleLike}
      />
    </div>
  )
}


// import React from 'react'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { PawPrint } from 'lucide-react'
// import styles from '../lit-component.module.css'
// import { createSupabaseBrowser } from '@/lib/supabase/client'
// import { InfiniteData } from '@tanstack/react-query'
// import { Lit } from '@/lib/types'
// import { useState } from 'react'
// import { set } from 'date-fns'

// type LikeComponentProps = {
//   likes: number
//   userId: string | undefined
//   litId: string
// }

// const supabase = createSupabaseBrowser()

// export const LikeComponent: React.FC<LikeComponentProps> = ({ likes, userId, litId }) => {
//   const [likeCount, setLikeCount] = useState(likes)


//   const queryClient = useQueryClient()

//   const { mutate } = useMutation({
//     mutationFn: async () => {
//       const { error } = await supabase
//         .from('likes')
//         .insert([{ target_id: litId, user_id: userId, type: 'lit' }])
//       if (error) throw new Error(error.message)
//     },
//     onSuccess: () => {
//       console.log('success')
//       setLikeCount(likeCount + 1)
//     }

//   })

//   const handleLike = () => {
//     if (!userId) {
//       alert('You must be logged in to like a lit.')
//       return
//     }
//     mutate()
//   }

//   return (
//     <div className="flex flex-row">
//       <span className="text-xs pt-1 mr-1 text-gray-400">{likeCount}</span>
//       <PawPrint className={`${styles.icon} mr-2`} style={{ width: '18px', height: 'auto' }} onClick={handleLike} />
//     </div>
//   )
// }




// // import React from 'react'
// // import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// // import { PawPrint } from 'lucide-react'
// // import styles from './lit-component.module.css' // Adjust the path as needed
// // import { createSupabaseBrowser } from '@/lib/supabase/client'

// // type LikeComponentProps = {
// //   likes: number
// //   userId: string | undefined
// //   litId: string
// // }

// // const supabase = createSupabaseBrowser()


// // export const LikeComponent: React.FC<LikeComponentProps> = ({ likes, userId, litId }) => {
// //   const queryClient = useQueryClient()


// //   return (
// //     <div className="flex flex-row">

// //       <span className="text-xs pt-1 mr-1 text-gray-400">{likes}</span>
// //       <PawPrint className={`${styles.icon} mr-2`} style={{ width: '18px', height: 'auto' }} />

// //     </div>
// //   )
// // }




// {/* <PawPrint
//         className={`${styles.icon} ${likeData?.isLiked ? 'liked' : ''} mr-2`}
//         style={{ width: '18px', height: 'auto' }}
//         onClick={handleLikeClick}
//       /> */}

// {/* <span className="text-xs pt-1 mr-1 text-gray-400">{likeData?.likeCount ? likeData.likeCount : `&nbsp;`}</span> */ }


// // const fetchLikeStatusAndCount = async () => {
// //   const { data: likes, error } = await supabase
// //     .from('likes')
// //     .select('*', { count: 'exact' })
// //     .eq('target_id', litId)
// //     .eq('type', 'lit')

// //   const isLiked = likes?.some(like => like.user_id === userId)
// //   const likeCount = likes?.length || 0

// //   if (error) {
// //     throw new Error(error.message)
// //   }

// //   return { isLiked, likeCount }
// // }

// // const { data: likeData, isLoading } = useQuery({
// //   queryKey: [`like-${litId}`, litId],
// //   queryFn: () => fetchLikeStatusAndCount(),
// // })

// // // Mutation to toggle like status
// // const toggleLikeMutation = useMutation({
// //   mutationFn: async () => {
// //     if (!userId) throw new Error('User must be logged in to like')

// //     if (likeData?.isLiked) {
// //       await supabase
// //         .from('likes')
// //         .delete()
// //         .match({ target_id: litId, user_id: userId, type: 'lit' })
// //     } else {
// //       await supabase
// //         .from('likes')
// //         .insert([{ target_id: litId, user_id: userId, type: 'lit' }])
// //     }

// //     // queryClient.invalidateQueries([`like-${litId}`, litId]);
// //   },

// // })

// // const handleLikeClick = () => {
// //   toggleLikeMutation.mutate()
// // }

// // if (isLoading) return <div>Loading...</div> // Or any loading indicator