'use client'

import React from 'react'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { verifyEmailSchema } from '@/lib/form-validations/auth'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type Inputs = z.infer<typeof verifyEmailSchema>

const VerifyEmailForm: React.FC = () => {
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      verificationCode: '',
    },
  })

  const onSubmit = () => {
    router.push('/account/profile')
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="101010" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-2 w-full">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default VerifyEmailForm
