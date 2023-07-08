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

export default function VerifyEmailPage() {
    return (
        <div className="z-20 max-w-2xl sm:flex-auto xl:w-1/2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex gap-4">
                        {' '}
                        <Link href="/signup">
                            <FontAwesomeIcon
                                className="w-5"
                                icon={faArrowLeft}
                            />
                        </Link>
                        Verify email
                    </CardTitle>

                    <CardDescription>
                        Verify your email address to continue your sign up
                        process
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="text-sm" htmlFor="verification-code">
                            Verification Code
                        </Label>
                        <Input
                            type="text"
                            id="verification-code"
                            placeholder="101010"
                            className="mt-2"
                        />
                    </div>
                    <Button className="mt-4 w-full">Verify</Button>
                </CardContent>
            </Card>
        </div>
    )
}
