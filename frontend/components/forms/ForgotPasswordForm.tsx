'use client'

import React from 'react'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/lib/form-validations/auth'
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

type Inputs = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordForm: React.FC = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = () => {
    console.log('SUBMIT')
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
