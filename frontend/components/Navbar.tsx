'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Badge, Input } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { Api, Brand, Category } from '@/lib/Api'
import { signOut, useSession } from 'next-auth/react'
import { useUserStore } from '@/store/user'
import { useCheckoutStore } from '@/store/checkout'
import { SearchIcon } from '@/icons/SearchIcon'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import NavbarHamburger from './NavbarHamburger'

const Navbar: React.FC = () => {
  const { data: session } = useSession()
  const user = useUserStore((state) => state.user)
  const checkout = useCheckoutStore((state) => state.checkout)
  const resetUser = useUserStore((state) => state.resetUser)
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout)
  const setCheckout = useCheckoutStore((state) => state.setCheckout)

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsCategoriesList()
    },
  })

  const { data: checkoutResponse, isLoading: isCheckoutLoading } = useQuery({
    queryKey: ['userCheckout'],
    queryFn: async () => {
      const api = new Api()
      return api.checkout.checkoutRead({
        headers: {
          Authorization: `Token ${session?.token}`,
        },
      })
    },
    enabled: session?.token !== undefined && checkout === null,
  })

  const { data: brands, isLoading: isBrandsLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsBrandsList({ page_size: 5 })
    },
  })

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: '/',
    })
    resetUser()
    resetCheckout()
  }

  useEffect(() => {
    if (checkoutResponse !== undefined) {
      setCheckout({
        ...checkoutResponse.data,
        lines: checkoutResponse.data.lines!.map((line) => ({
          ...line,
          isSelected: false,
        })),
      })
    }
  }, [checkoutResponse, setCheckout])

  return (
    <div className="sticky top-0 z-50 grid grid-cols-5  items-center bg-white py-6 pl-20 md:flex md:justify-around 2xl:px-40">
      <div className="col-span-4 mx-auto items-center gap-10 md:flex">
        <div className="justify-self-center">
          <a href="/" className="">
            <Image src="/black-logo.svg" alt="logo" width={120} height={100} />
          </a>
        </div>

        <div className="hidden md:block">
          <Input
            size="md"
            radius="sm"
            className="w-40 md:w-80"
            endContent={
              <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-black dark:text-white/90" />
            }
            placeholder="Type to search..."
          />
        </div>
        <div className="hidden gap-2 text-sm lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-semibold">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {!isCategoriesLoading &&
                    categories!.data.results.map((category: Category) => (
                      <ul key={category.id}>
                        <ListItem
                          className="z-50 px-8 hover:bg-slate-100"
                          href={`/categories/${category.slug}`}
                        >
                          <p className="font-semibold">{category.name}</p>
                        </ListItem>
                      </ul>
                    ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-semibold">
                  Brands
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {!isBrandsLoading &&
                    brands!.data.results.map((brand: Brand) => (
                      <ul key={brand.id}>
                        <ListItem
                          className="z-50 px-8 hover:bg-slate-100"
                          href={`/brands/${brand.name}`}
                        >
                          <p className="font-semibold">{brand.name}</p>
                        </ListItem>
                      </ul>
                    ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-14 pr-5 font-bold md:pr-16">
        <div className="flex items-center gap-10">
          <Badge content={checkout?.lines?.length}>
            <a href="/cart">
              <ShoppingCart
                size={30}
                className="cursor-pointer hover:text-gray-400"
              />
            </a>
          </Badge>

          {!session ? (
            <div className="hidden divide-x-1 divide-black lg:flex ">
              <a href="/signin" className="pr-2 hover:text-gray-400">
                Sign In
              </a>
              <a href="/signup" className="pl-2 hover:text-gray-400">
                Sign Up
              </a>
            </div>
          ) : (
            <div className="hidden divide-x-1 divide-black lg:flex">
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
          <NavbarHamburger
            session={session}
            categories={categories?.data.results}
            brands={brands?.data.results}
            isCategoriesLoading={isCategoriesLoading}
            isBrandsLoading={isBrandsLoading}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar
