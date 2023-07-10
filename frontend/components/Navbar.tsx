'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { menuOptions } from '@/constants/menu'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (navbarRef.current && pathname == '/') {
      navbarRef.current?.scrollIntoView({ behavior: 'auto' })
    }
  }, [pathname])

  if (pathname === '/') {
  }
  return (
    <div className="flex items-center justify-between px-10 py-6">
      <Link href="/">
        <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
      </Link>

      <div className="flex gap-14 text-sm">
        {menuOptions.map((option) => (
          <Link
            href={option.link}
            key={option.label}
            className="hidden lg:block"
          >
            {option.label}
          </Link>
        ))}
        <Link href="#">$0.00</Link>
      </div>
    </div>
  )
}

export default Navbar
