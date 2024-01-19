'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Category } from '@/lib/Api'
import { signOut, useSession } from 'next-auth/react'
import { useUserStore } from '@/store/user'
import { useCheckoutStore } from '@/store/checkout'

const Navbar: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = useUserStore((state) => state.user)
  const checkout = useCheckoutStore((state) => state.checkout)
  const resetUser = useUserStore((state) => state.resetUser)

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsCategoriesList()
    },
  })

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
    })
    resetUser()
  }

  console.log('CHECKOUT', checkout)

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
        {user && checkout && checkout.lines!.length > 0 ? (
          <Badge content={checkout!.lines!.length}>
            <a href="/cart">
              <ShoppingCart
                size={30}
                className="cursor-pointer hover:text-gray-400"
              />
            </a>
          </Badge>
        ) : (
          <a href="/cart">
            <ShoppingCart
              size={30}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => router.push('/cart')}
            />
          </a>
        )}

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
            <p
              onClick={handleSignOut}
              className="cursor-pointer pl-2 hover:text-gray-400"
            >
              Logout
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
