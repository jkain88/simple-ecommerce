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
import { Address } from '@/lib/Api'

type Input = z.infer<typeof addressSchema>

type Props = {
  address?: Address
}

const AddressDetailForm: React.FC<Props> = ({ address }) => {
  const [deliveryLabel, setDeliveryLabel] = useState<'Home' | 'Office' | ''>(
    'Home'
  )

  const form = useForm<Address>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      contact_number: address?.contact_number || '',
      street: address?.street || '',
      city_area: address?.city_area || '',
      city: address?.city || '',
      province: address?.province || '',
      // deliveryLabel: address?.deliveryLabel || '',
    },
    mode: 'onSubmit',
  })
  const onSubmit = () => {
    console.log('Submit')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
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
          <div>
            <p>Label as:</p>
            <div className="mt-2 flex gap-3">
              <Button
                onClick={() => setDeliveryLabel('Home')}
                className={cn(
                  'border-2 border-gray-300 bg-white p-4 text-black hover:border-black hover:bg-white',
                  { 'border-black': deliveryLabel == 'Home' }
                )}
              >
                Home
              </Button>
              <Button
                onClick={() => setDeliveryLabel('Office')}
                className={cn(
                  'border-2 border-gray-300 bg-white p-4 text-black hover:border-black hover:bg-white',
                  { 'border-black': deliveryLabel == 'Office' }
                )}
              >
                Office
              </Button>
            </div>
          </div>
          <Button className="mt-4 px-14" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddressDetailForm
