'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Menu, ShoppingCart } from 'lucide-react'
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
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Accordion, AccordionItem, AccordionTrigger } from './ui/accordion'
import { AccordionContent } from '@radix-ui/react-accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { Button } from './ui/button'

const Navbar: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [isCategoriesOpened, setIsCategoriesOpened] = useState(false)
  const user = useUserStore((state) => state.user)
  const checkout = useCheckoutStore((state) => state.checkout)
  const resetUser = useUserStore((state) => state.resetUser)
  const resetCheckout = useCheckoutStore((state) => state.resetCheckout)

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const api = new Api()
      return api.products.productsCategoriesList()
    },
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

  console.log('BRANDS', brands)

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
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent className="w-72 px-4">
          {/* <div> */}
          <div className="flex flex-col gap-5 divide-y-1 divide-slate-300 text-lg font-semibold">
            <a
              href="/account/profile"
              className="cursor-pointer pr-2 hover:text-gray-400"
            >
              Profile
            </a>
            <Collapsible className="pt-2">
              <CollapsibleTrigger
                onClick={() => setIsCategoriesOpened((prev) => !prev)}
              >
                {/* <CaretSortIcon className="h-4 w-4" /> */}
                <div className="flex items-center gap-4">
                  <p>Categories</p>
                  {isCategoriesOpened ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {!isBrandsLoading &&
                  brands!.data.results.map((brand: Brand) => (
                    <ul key={brand.id}>
                      <a
                        className="hover:text-slate-100"
                        href={`/brands/${brand.name}`}
                      >
                        <p className="font-semibold">{brand.name}</p>
                      </a>
                    </ul>
                  ))}
              </CollapsibleContent>
              {/* <CollapsibleContent>Category1</CollapsibleContent> */}
            </Collapsible>
            {/* <Accordion type="multiple">
              <AccordionItem value="cat1">
                <AccordionTrigger className="border-b-0">
                  Categories
                </AccordionTrigger>
                <AccordionContent>Cat1</AccordionContent>
              </AccordionItem>
            </Accordion> */}
            {/* <Accordion className="w-full cursor-pointer pt-2 hover:text-gray-400">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Categories"
              >
                Categories
              </AccordionItem>
            </Accordion> */}
            <p
              onClick={handleSignOut}
              className="w-full cursor-pointer pt-2 hover:text-gray-400"
            >
              Categories
            </p>
            <p
              onClick={handleSignOut}
              className="w-full cursor-pointer pt-2 hover:text-gray-400"
            >
              Brands
            </p>
            <p
              onClick={handleSignOut}
              className="w-full cursor-pointer pt-2 hover:text-gray-400"
            >
              Best Sellers
            </p>
            <p
              onClick={handleSignOut}
              className="w-full cursor-pointer pt-2 hover:text-gray-400"
            >
              New Arrivals
            </p>
            <p
              onClick={handleSignOut}
              className="w-full cursor-pointer pt-2 hover:text-gray-400"
            >
              Logout
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Navbar
