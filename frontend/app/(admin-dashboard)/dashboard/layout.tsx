'use client'

import { BaggageClaim, Box, Home, LogOut, UserCog, Users } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const path = usePathname()
  const { data: session } = useSession()
  if (path === '/dashboard/signin') {
    return <div>{children}</div>
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/dashboard/login' })
  }
  return (
    <div className="flex">
      <div className="mt-16 h-full px-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Home size={30} />
            <p className="text-lg font-semibold">Home</p>
          </div>
          <div className="flex items-center gap-4">
            <Users size={30} />
            <p className="text-lg font-semibold">Customers</p>
          </div>
          <div className="flex items-center gap-4">
            <Box size={30} />
            <p className="text-lg font-semibold">Products</p>
          </div>
          <div className="flex items-center gap-4">
            <Box size={30} />
            <p className="text-lg font-semibold">Brands</p>
          </div>
          <div className="flex items-center gap-4">
            <Box size={30} />
            <p className="text-lg font-semibold">Categories</p>
          </div>
          <div className="flex items-center gap-4">
            <BaggageClaim size={30} />
            <p className="text-lg font-semibold">Orders</p>
          </div>
          <div className="flex items-center gap-4">
            <UserCog size={30} />
            <p className="text-lg font-semibold">Staffs</p>
          </div>
          {session && (
            <div className="flex items-center gap-4" onClick={handleSignOut}>
              <LogOut size={30} />
              <p className="text-lg font-semibold">Logout</p>
            </div>
          )}
        </div>
      </div>

      <div className="h-full w-full bg-gray-100">
        <div className="container">{children}</div>
      </div>
    </div>
  )
}
