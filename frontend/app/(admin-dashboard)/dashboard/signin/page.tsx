'use client'

import SignInForm from '@/components/forms/SignInForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useEffect } from 'react'

export default function DashboardLogin() {
  const { data: session } = useSession()

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut({ redirect: false })
    }
    if (session) {
      if (session.user.is_staff) {
        window.location.href = '/dashboard'
      } else {
        handleSignOut()
      }
    }
  }, [session])
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your credentials to proceed</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm accountType="staff" />
        </CardContent>
      </Card>
    </div>
  )
}
