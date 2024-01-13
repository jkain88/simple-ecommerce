'use client'

import { profileSchema } from '@/lib/form-validations/account'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Api } from '@/lib/Api'
import { useSession } from 'next-auth/react'
import { Spinner } from '@nextui-org/react'

type Inputs = z.infer<typeof profileSchema>

const ProfileForm: React.FC = () => {
  const { data: session } = useSession()
  const form = useForm<Inputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: undefined,
      contactNumber: '',
      gender: 'male',
      email: '',
    },
  })
  const { mutate, isPending } = useMutation({
    mutationKey: ['userProfileUpdate'],
    mutationFn: async (data: Inputs) => {
      const api = new Api()
      return await api.users.usersProfileUpdate(
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          contact_number: data.contactNumber,
          birthday: data.birthday,
          sex: data.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${session?.token}`,
          },
        }
      )
    },
  })
  const { data: userData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const api = new Api()
      const response = await api.users.usersProfileRead({
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
      return response
    },
    enabled: session !== undefined,
  })

  useEffect(() => {
    if (!isLoading) {
      form.setValue('email', userData!.data.email)
      form.setValue('firstName', userData!.data.first_name)
      form.setValue('lastName', userData!.data.last_name)
      form.setValue('birthday', userData!.data.birthday)
      form.setValue('contactNumber', userData!.data.contact_number)
      form.setValue('gender', userData!.data.sex)
    }
  }, [isLoading, userData, form])

  const onSubmit = (data: Inputs) => {
    mutate(data)
  }

  if (isLoading) return <div>Loading...</div>
  
  return (
    <Form {...form}>
      <form
        className="pt-5"
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" className="max-w-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
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
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contact Number"
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
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base">Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="others" />
                      </FormControl>
                      <FormLabel className="font-normal">Others</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : undefined
                          ) : (
                            <span>Birthday</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                        }
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-4" disabled={isPending}>
          <div className="flex items-center gap-2">
            {isPending && <Spinner size="sm" color="default" />}
            <span>Submit</span>
          </div>
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
