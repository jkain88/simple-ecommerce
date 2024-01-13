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
import { signUpSchema } from '@/lib/form-validations/auth'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { Api, UserRegister } from '@/lib/Api'
import { Spinner } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

type Inputs = z.infer<typeof signUpSchema>

const SignUpForm: React.FC = () => {
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (input: UserRegister) => {
      const api = new Api()
      return api.users.usersRegisterCreate(input)
    },
    onSuccess: async (data) => {
      await signIn('credentials', {
        email: form.getValues().email,
        password: form.getValues().password,
        redirect: false,
      })
      router.push('/signup/verify-email')
    },
    onError: () => {
      toast.error('Email already exists', { position: 'bottom-right' })
    },
  })
  const onSubmit = (data: Inputs) => {
    mutate(data)
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          <div className="flex items-center gap-2">
            {isPending && <Spinner size="sm" color="default" />}
            <span>Continue</span>
          </div>
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
