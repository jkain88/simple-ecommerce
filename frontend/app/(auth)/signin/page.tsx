import { OAuth } from '@/components/auth/oauth'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React from 'react'

export default function SignInPage() {
    return (
        <div className=" mx-auto my-auto max-w-lg">
            <Card>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>
                        Choose your preferred sign in method
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
                </CardContent>
            </Card>
        </div>
    )
}
