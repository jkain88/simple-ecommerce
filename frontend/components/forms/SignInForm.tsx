'use client'

import React, { useEffect } from 'react'
import type { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { signInSchema } from '@/lib/form-validations/auth'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import { useCheckoutStore } from '@/store/checkout'

type Inputs = z.infer<typeof signInSchema>

const SignInForm: React.FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const form = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const setUser = useUserStore((state) => state.setUser)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)
  const { data: user } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const api = new Api()
      return api.users.usersProfileRead({
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    enabled: session?.token !== undefined,
  })

  const onSubmit = async (data: Inputs) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
  }

  useEffect(() => {
    if (session?.token && user?.data) {
      setUser(user.data)
      router.push('/')
    }
  }, [session, user, setUser, router, setCheckout])

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
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
