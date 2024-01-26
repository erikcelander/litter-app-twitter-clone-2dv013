'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

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

export function SubmitLit() {
  const form = useForm<z.infer<typeof LitFormSchema>>({
    resolver: zodResolver(LitFormSchema),
  })

  const onSubmit = async (data: z.infer<typeof LitFormSchema>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LITTER_URL}/api/lits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to post lit')
      }

      toast({
        title: 'Lit posted successfully!',
        description: data.content,
      })

      form.reset()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='flex space-x-3'>
          <Avatar>
            <AvatarImage alt='User avatar' src='/placeholder.svg?height=40&width=40' />
            <AvatarFallback>U</AvatarFallback>
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
