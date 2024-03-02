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
import { useCategoryStore } from '@/store/category'
import { select } from '@nextui-org/react'

type Inputs = z.infer<typeof categorySchema>
type Props = {
  onClose: () => void
  page: string
  search: string
  action: 'create' | 'update'
}

const CategoryActionForm: React.FC<Props> = ({
  onClose,
  page,
  search,
  action,
}) => {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory)
  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: selectedCategory?.name || '',
      description: selectedCategory?.description || '',
    },
  })
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate: createCategory } = useMutation({
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

  const { mutate: updateCategory } = useMutation({
    mutationKey: ['categoryUpdate'],
    mutationFn: async (data: Inputs) => {
      const api = new Api()
      return api.products.productsCategoryUpdate(selectedCategory!.id!, data, {
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
    if (action === 'create') {
      createCategory(data)
    } else if (action === 'update') {
      updateCategory(data)
    }
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
        <div className="mb-4 mt-4 flex w-full justify-between ">
          <div className="space-x-3">
            <Button type="submit" className="mr-auto">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CategoryActionForm
