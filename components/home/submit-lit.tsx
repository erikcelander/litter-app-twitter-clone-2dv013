'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { useQueryClient } from '@tanstack/react-query'
import { User } from '@supabase/supabase-js'

const LitFormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: 'Lit cannot be empty.',
    })
    .max(42, {
      message: 'Lit must not be longer than 42 characters.',
    }),
})

export type LitData = {
  user_id: string,
  username: string,
  full_name: string,
  avatar_url: string,
  content: string,
}

export type Lit = {
  user_id: string,
  username: string,
  full_name: string,
  avatar_url: string,
  content: string,
  created_at: string,
  id: string
}

export function SubmitLit({ user }: { user: User }) {
  const supabase = createSupabaseBrowser();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof LitFormSchema>>({
    resolver: zodResolver(LitFormSchema),
  })

  const username = user.email?.split('@')[0]
  const fullName = user.user_metadata?.full_name
  const avatarUrl = user.user_metadata?.avatar_url





  const onSubmit = async (formData: z.infer<typeof LitFormSchema>) => {
    try {
      if (formData.content.length > 42) {
        throw new Error('Lit content exceeds 42 characters');
      }


      const lit = {
        user_id: user.id,
        username: username,
        full_name: fullName,
        avatar_url: avatarUrl,
        content: formData.content,
      } as LitData


      const { error } = await supabase.from('lits').insert([lit])

      if (error) throw error

      // queryClient.setQueryData(['lits'], (oldLits: Lit[]) => {
      //   if (Array.isArray(oldLits)) {
      //     return [...oldLits, lit];
      //   }
      //   return [lit];
      // });




      form.reset();
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Error',
        description: error.message,
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='flex space-x-3'>
          <Avatar>
            <AvatarImage alt='User avatar' src={avatarUrl} />
            <AvatarFallback>{fullName ? fullName.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <FormItem>
              <FormLabel>What's happening?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Share your thoughts...'
                  className='resize-none w-full rounded-md border p-2'
                  {...form.register('content')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
        <div className='flex justify-end mt-2'>
          <Button type='submit' className='bg-[#F6AE28] text-black'>
            Post
          </Button>
        </div>
      </form>
    </Form>
  )
}
