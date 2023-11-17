'use client'

import { addressSchema } from '@/lib/form-validations/account'
import { z } from 'zod'

type Inputs = z.infer<typeof addressSchema>

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

const AddressDetailForm: React.FC = () => {
  const [deliveryLabel, setDeliveryLabel] = useState<'Home' | 'Office' | ''>(
    'Home'
  )
  const form = useForm<Inputs>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: '',
      contactNumber: '',
      street: '',
      barangay: '',
      city: '',
      province: '',
      deliveryLabel: '',
    },
    mode: 'onSubmit',
  })
  const onSubmit = () => {
    console.log('Submit')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="barangay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Barangay</FormLabel>
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
                <FormLabel>City</FormLabel>
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
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input placeholder="Province" {...field} />
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
