'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge, Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Category } from '@/lib/Api'
import { signOut, useSession } from 'next-auth/react'
import { useUserStore } from '@/store/user'
import { useCheckoutStore } from '@/store/checkout'
import { SearchIcon } from '@/icons/SearchIcon'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

const Navbar: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = useUserStore((state) => state.user)
  const checkout = useCheckoutStore((state) => state.checkout)
  const resetUser = useUserStore((state) => state.resetUser)
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout)

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
    resetCheckout()
  }

  return (
    <div className="flex items-center justify-around px-20 py-6 2xl:px-40">
      <div className="flex items-center gap-10">
        <a href="/">
          <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
        </a>

        <div className="hidden lg:block">
          <Input
            size="md"
            radius="sm"
            className="w-40 lg:w-80"
            endContent={
              <SearchIcon className="pointer-events-none  mb-0.5 flex-shrink-0 text-black dark:text-white/90" />
            }
            placeholder="Type to search..."
          />
        </div>
        <div className="hidden gap-8 text-sm lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-semibold">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {!isLoading &&
                    categories!.data.results.map((category: Category) => (
                      <ul key={category.id}>
                        <ListItem
                          className="z-50 px-8 hover:bg-slate-100"
                          href={`/categories/${category.slug}`}
                        >
                          <p className="font-semibold">{category.name}</p>
                          {/* <a
                          href={`/categories/${category.slug}`}
                          className="font-semibold uppercase hover:text-gray-400"
                        >
                        </a> */}
                        </ListItem>
                      </ul>
                    ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-14 font-bold">
        {user && checkout && checkout.lines && checkout.lines.length > 0 ? (
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
