import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function ResetPassword() {
    return (
        <div className="z-20 max-w-2xl sm:flex-auto xl:w-1/2">
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="text-sm" htmlFor="current-password">
                            Current Password
                        </Label>
                        <Input
                            type="password"
                            id="current-password"
                            placeholder="*******"
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label className="text-sm" htmlFor="new-password">
                            New Password
                        </Label>
                        <Input
                            type="password"
                            id="new-password"
                            placeholder="*******"
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <Label
                            className="text-sm"
                            htmlFor="confirm-new-password"
                        >
                            Confirm New Password
                        </Label>
                        <Input
                            type="password"
                            id="confirm-new-password"
                            placeholder="*******"
                            className="mt-2"
                        />
                    </div>
                    <Button className="mt-4 w-full">Submit</Button>
                </CardContent>
            </Card>
        </div>
    )
}
