'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Category } from '@/lib/Api'
import { signOut, useSession } from 'next-auth/react'
import { useUserStore } from '@/store/user'

const Navbar: React.FC = () => {
  const pathname = usePathname()
  const navbarRef = useRef<HTMLDivElement | null>(null)
  const { data: session } = useSession()
  const user = useUserStore((state) => state.user)
  const resetUser = useUserStore((state) => state.resetUser)

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

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
    })
    resetUser()
  }

  console.log('USER STORE', user)
  return (
    <div className="flex items-center justify-around px-20 py-6 2xl:px-40">
      <a href="/">
        <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
      </a>

      <div className="flex gap-8 text-sm">
        {!isLoading &&
          categories!.data.results.map((category: Category) => (
            <a
              href={`/categories/${category.slug}`}
              key={category.id}
              className="font-semibold uppercase hover:text-gray-400"
            >
              {category.name}
            </a>
          ))}
      </div>

      <div className="flex items-center gap-14 font-bold">
        <Link href="/cart">
          {user && user.checkout && user.checkout.lines!.length > 0 ? (
            <Badge content={user?.checkout?.lines?.length}>
              <ShoppingCart size={30} className="hover:text-gray-400" />
            </Badge>
          ) : (
            <ShoppingCart size={30} className="hover:text-gray-400" />
          )}
        </Link>

        {!session ? (
          <div className="flex divide-x-1 divide-black ">
            <a href="/signin" className="pr-2 hover:text-gray-400">
              Sign In
            </a>
            <a href="/signup" className="pl-2 hover:text-gray-400">
              Sign Up
            </a>
          </div>
        ) : (
          <div className="flex divide-x-1 divide-black ">
            <a
              href="/account/profile"
              className="cursor-pointer pr-2 hover:text-gray-400"
            >
              Profile
            </a>
            <a
              onClick={handleSignOut}
              className="cursor-pointer pl-2 hover:text-gray-400"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
