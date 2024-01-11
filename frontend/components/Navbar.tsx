'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Category } from '@/lib/Api'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement | null>(null)

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsCategoriesList()
    },
  })

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
        {!isLoading &&
          categories!.data.results.map((category: Category) => (
            <a
              href={`/categories/${category.slug}`}
              key={category.id}
              className="font-semibold uppercase"
            >
              {category.name}
            </a>
          ))}
      </div>

      <div className="flex items-center gap-14 font-bold">
        <Link href="/cart">
          <Badge content="2">
            <ShoppingCart size={30} />
          </Badge>
        </Link>

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
