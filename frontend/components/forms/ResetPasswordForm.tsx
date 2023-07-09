'use client'

import React from 'react'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { resetPasswordSchema } from '@/lib/form-validations/auth'
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

type Inputs = z.infer<typeof resetPasswordSchema>

const ResetPasswordForm: React.FC = () => {
  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = ({
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: Inputs) => {
    if (confirmNewPassword !== newPassword) {
      form.setError('confirmNewPassword', {
        type: 'manual',
        message: 'Password does not match',
      })
    }
    console.log('SUBMIT')
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
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

export default ResetPasswordForm
