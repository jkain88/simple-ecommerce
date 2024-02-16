import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function ForgotPassword() {
  return (
    <div className="z-20 max-w-2xl sm:flex-auto xl:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-4">
            {' '}
            <Link href="/signin">
              <FontAwesomeIcon className="w-5" icon={faArrowLeft} />
            </Link>
            Forgot Password
          </CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your
            password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
