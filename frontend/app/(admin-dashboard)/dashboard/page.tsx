'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu'
import { Banknote } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session } = useSession()
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/dashboard/login' })
  }

  return (
    <div>
      <div className="mt-20">
        <div className="flex justify-between">
          <div>
            <p className="text-3xl font-semibold">
              Hi there, {session?.user.email}
            </p>
            <p className="mt-2">
              Here&apos;s some information we gathered about your store
            </p>
          </div>

          <NavigationMenu className="self-start">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {session?.user.email}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="h-32 space-y-4">
                  <p className="mx-4 mt-3 w-48 cursor-pointer rounded-lg p-2 hover:bg-gray-100">
                    Account Settings
                  </p>
                  <p
                    className="mx-4 w-48 cursor-pointer rounded-lg p-2 hover:bg-gray-100"
                    onClick={handleSignOut}
                  >
                    Logout
                  </p>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="mt-10 flex gap-16">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Sales</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">₱100.00</p>
            </CardContent>
          </Card>

          <Card className="w-96">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Banknote size={50} />
              <p className="text-xl">28</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
