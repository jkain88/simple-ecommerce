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
    <div className="flex items-center justify-between px-20 py-6 2xl:px-40">
      <a href="/">
        <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
      </a>

      <div className="flex gap-8 text-sm">
        {categories.map((category) => (
          <a
            href={`/categories/${category.slug}`}
            key={category.id}
            className="font-semibold uppercase"
          >
            {category.name}
          </a>
        ))}
      </div>

      <div className="flex gap-14 font-bold">
        <Link href="#">$0.00</Link>
        <div className="flex divide-x-1 divide-black ">
          <a href="/signin" className="pr-2 hover:text-gray-400">
            Sign In
          </a>
          <a href="/signup" className="pl-2 hover:text-gray-400">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
