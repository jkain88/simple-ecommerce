'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { categorySchema } from '@/lib/form-validations/admin-dashboard'
import { Textarea } from '../ui/textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

type Inputs = z.infer<typeof categorySchema>
type Props = {
  onClose: () => void
  page: string
  search: string
}

const CategoryActionForm: React.FC<Props> = ({ onClose, page, search }) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const { mutate } = useMutation({
    mutationKey: ['categoryCreate'],
    mutationFn: async (data: Inputs) => {
      const api = new Api()
      return api.products.productsCategoryCreateCreate(data, {
        headers: {
          Authorization: `Token ${session?.token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({
        queryKey: ['dashboard-categories', search, page],
      })
    },
  })
  const onSubmit = (data: Inputs) => {
    // API CALL
    console.log('SUBMIT', data)
    mutate(data)
  }
  return (
    <Form {...form}>
      <form
        className="pt-2"
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category Name"
                    className="max-w-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4 space-x-3">
          <Button type="submit" className="mt-4">
            Submit
          </Button>
          <Button type="submit" className="mt-4" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CategoryActionForm
