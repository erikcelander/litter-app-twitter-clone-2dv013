'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { PostLitButton } from './post-lit-button'

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


export function CreateLit({ user }: { user: User }) {
  const supabase = createSupabaseBrowser();

  const form = useForm<z.infer<typeof LitFormSchema>>({
    resolver: zodResolver(LitFormSchema),
  })

  const username = user.email?.split('@')[0]
  const fullName = user.email === 'test@test.com' ? 'Test Testsson' : user.user_metadata?.full_name;
  const avatarUrl = user.user_metadata?.avatar_url

  const toast = useToast()


  const PostLit = async (formData: z.infer<typeof LitFormSchema>) => {
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


      form.reset();
    } catch (error: any) {
      console.log(error)

    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(PostLit)} className='w-full '>
        <div className='flex space-x-3 pt-5'>
          <Avatar>
            <AvatarImage alt='User avatar' src={avatarUrl} />
            <AvatarFallback>{fullName ? fullName.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className='flex-1'>
            <FormItem>
              <FormLabel>What's happening?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Share your thoughts `}
                  className='resize-none  p-2 text-black'
                  {...form.register('content')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
        </div>
        <div className='flex justify-end mt-2 mb-2 '>
          <PostLitButton />
        </div  >
      </form>
    </Form>
  )
}
