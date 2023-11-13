'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { menuOptions } from '@/constants/menu'
import { categories } from '@/constants/testData'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (navbarRef.current && pathname == '/') {
      navbarRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [pathname])

  return (
    <div className="flex items-center justify-between px-40 py-6">
      <Link href="/">
        <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
      </Link>

      <div className="flex gap-14 text-sm">
        {categories.map((category) => (
          <Link href="#" key={category} className="font-semibold uppercase">
            {category}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 font-semibold">
        <Link href="#">$0.00</Link>
        <div className="flex divide-x-2 divide-black">
          <Link href="#" className="pr-2">
            Sign In
          </Link>
          <Link href="#" className="pl-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
