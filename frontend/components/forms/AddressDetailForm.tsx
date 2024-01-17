'use client'

import { addressSchema } from '@/lib/form-validations/account'
import { z } from 'zod'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Address, Api } from '@/lib/Api'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

type Input = z.infer<typeof addressSchema>

type Props = {
  address?: Address
}

const AddressDetailForm: React.FC<Props> = ({ address }) => {
  const [deliveryLabel, setDeliveryLabel] = useState<
    'home' | 'office' | undefined
  >(address?.delivery_label)

  const { data: session } = useSession()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateAddress', address?.id],
    mutationFn: async (input: Address) => {
      const api = new Api()
      return await api.users.usersAddressesUpdate(
        address!.id!.toString(),
        input,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
    onSuccess: () => {
      router.push('/account/addresses')
    },
  })

  const form = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      contact_number: address?.contact_number || '',
      street: address?.street || '',
      city_area: address?.city_area || '',
      city: address?.city || '',
      province: address?.province || '',
      delivery_label: address?.delivery_label,
      postal_code: address?.postal_code,
    },
    mode: 'onSubmit',
  })

  const onSubmit = (data: Input) => {
    mutate({
      ...data,
      delivery_label: deliveryLabel,
      address_type: address!.address_type!,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="mt-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city_area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Barangay</FormLabel>
                <FormControl>
                  <Input placeholder="Barangay" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Province</FormLabel>
                <FormControl>
                  <Input placeholder="Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postal_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <p>Label as:</p>
            <div className="mt-2 flex gap-3">
              <Button
                type="button"
                onClick={() => setDeliveryLabel('home')}
                className={cn(
                  'border-2 border-gray-300 bg-white p-4 text-black hover:border-black hover:bg-white',
                  { 'border-black': deliveryLabel == 'home' }
                )}
              >
                Home
              </Button>
              <Button
                type="button"
                onClick={() => setDeliveryLabel('office')}
                className={cn(
                  'border-2 border-gray-300 bg-white p-4 text-black hover:border-black hover:bg-white',
                  { 'border-black': deliveryLabel == 'office' }
                )}
              >
                Office
              </Button>
            </div>
          </div>
          <Button className="mt-4 px-14" type="submit">
            <div className="flex items-center gap-2">
              {isPending && <Spinner size="sm" color="default" />}
              <span>Submit</span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddressDetailForm
