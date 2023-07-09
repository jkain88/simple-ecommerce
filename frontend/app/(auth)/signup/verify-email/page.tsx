import VerifyEmailForm from '@/components/forms/VerifyEmailForm'
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

export default function VerifyEmailPage() {
  return (
    <div className="z-20 max-w-2xl sm:flex-auto xl:w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-4">
            {' '}
            <Link href="/signup">
              <FontAwesomeIcon className="w-5" icon={faArrowLeft} />
            </Link>
            Verify email
          </CardTitle>

          <CardDescription>
            Verify your email address to continue your sign up process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </div>
  )
}
