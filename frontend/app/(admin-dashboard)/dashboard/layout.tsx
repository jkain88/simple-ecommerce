'use client'

import { BaggageClaim, Box, Home, UserCog, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const path = usePathname()
  console.log(path)
  if (path === '/dashboard/login') {
    return <div>{children}</div>
  }
  return (
    <div className="flex">
      <div className="mt-16 h-screen px-12">
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
        </div>
      </div>
      {children}
    </div>
  )
}
