import { OAuth } from '@/components/auth/oauth'
import SignUpForm from '@/components/forms/SignUpForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Signup() {
  return (
    <div className="z-20 max-w-2xl sm:flex-auto xl:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuth />
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-500"></div>
            <span className="mx-2 flex-shrink text-xs font-semibold uppercase">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-500"></div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between gap-2 ">
            <Link href="/signin">
              <span className="mr-1 hidden text-sm lg:inline-block">
                Already have an account?
              </span>
              <span className="text-sm font-semibold">Sign in</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
