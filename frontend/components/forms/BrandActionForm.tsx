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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { useCategoryStore } from '@/store/category'
import { brandSchema } from '@/lib/form-validations/admin-dashboard'
import { useBrandStore } from '@/store/brand'

type Inputs = z.infer<typeof brandSchema>
type Props = {
  onClose: () => void
  page: string
  search: string
  action: 'create' | 'update'
}

const BrandActionForm: React.FC<Props> = ({
  onClose,
  page,
  search,
  action,
}) => {
  const selectedBrand = useBrandStore((state) => state.selectedBrand)
  const form = useForm<Inputs>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: selectedBrand?.name || '',
    },
  })
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const { mutate: createBrand } = useMutation({
    mutationKey: ['categoryCreate'],
    mutationFn: async (data: Inputs) => {
      const api = new Api()
      return api.products.productsBrandCreateCreate(data, {
        headers: {
          Authorization: `Token ${session?.token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({
        queryKey: ['dashboard-brands', search, page],
      })
    },
  })

  const { mutate: updateBrand } = useMutation({
    mutationKey: ['categoryUpdate'],
    mutationFn: async (data: Inputs) => {
      const api = new Api()
      return api.products.productsBrandUpdate(selectedBrand!.id!, data, {
        headers: {
          Authorization: `Token ${session?.token}`,
          'Content-Type': 'application/json',
        },
      })
    },
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({
        queryKey: ['dashboard-brands', search, page],
      })
    },
  })

  const onSubmit = (data: Inputs) => {
    // API CALL
    if (action === 'create') {
      createBrand(data)
    } else if (action === 'update') {
      updateBrand(data)
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
                    placeholder="Brand Name"
                    className="max-w-lg"
                    {...field}
                  />
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

export default BrandActionForm
