'use client'

import { BaggageClaim, Box, Home, LogOut, UserCog, Users } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
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

  const menuItems = [
    { name: 'Home', Icon: Home, path: '/dashboard' },
    { name: 'Customers', Icon: Users, path: '/dashboard/customers' },
    { name: 'Products', Icon: Box, path: '/dashboard/products' },
    { name: 'Brands', Icon: Box, path: '/dashboard/brands' },
    { name: 'Categories', Icon: Box, path: '/dashboard/categories' },
    { name: 'Orders', Icon: BaggageClaim, path: '/dashboard/orders' },
    { name: 'Staffs', Icon: UserCog, path: '/dashboard/staffs' },
  ]

  return (
    <div className="flex">
      <div className="mt-16 h-full px-16">
        <div className="flex flex-col gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 hover:bg-slate-100">
                <item.Icon size={30} />
                <p className=" text-lg font-semibold hover:underline">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
          {session && (
            <div
              className="flex items-center gap-4 rounded-lg px-4 py-2 hover:bg-slate-100 hover:underline"
              onClick={handleSignOut}
            >
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
