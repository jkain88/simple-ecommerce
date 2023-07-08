import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
                            <FontAwesomeIcon
                                className="w-5"
                                icon={faArrowLeft}
                            />
                        </Link>
                        Forgot Password
                    </CardTitle>
                    <CardDescription>
                        Enter your email address and we will send you a link to
                        reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="text-sm" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="mt-2"
                        />
                    </div>
                    <Button className="mt-4 w-full">Submit</Button>
                </CardContent>
            </Card>
        </div>
    )
}
