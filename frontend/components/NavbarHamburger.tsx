'use client'

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { ChevronDown, ChevronUp, Menu } from 'lucide-react'
import { Session } from 'next-auth'
import { Brand, Category, User } from '@/lib/Api'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { useUserStore } from '@/store/user'

type Props = {
  session: Session | null
  categories: Category[] | undefined
  brands: Brand[] | undefined
  isCategoriesLoading: boolean
  isBrandsLoading: boolean
  handleSignOut: () => void
}

const NavbarHamburger: React.FC<Props> = ({
  session,
  brands,
  categories,
  isBrandsLoading,
  isCategoriesLoading,
  handleSignOut,
}) => {
  const user = useUserStore((state) => state.user)
  const [isCategoriesOpened, setIsCategoriesOpened] = useState(false)
  const [isBrandsOpened, setIsBrandsOpened] = useState(false)
  const [isAccountOpen, setisAccountOpen] = useState(false)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="block lg:hidden" />
      </SheetTrigger>
      <SheetContent className=" w-72 overflow-y-auto">
        <div className="flex flex-col gap-5 text-lg font-semibold">
          {session ? (
            <div className="flex flex-col gap-4">
              <div>
                <p className="mt-4 text-xl font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm ">{user.email}</p>
                <p className="text-sm ">{user.contact_number}</p>
              </div>
              <Collapsible>
                <CollapsibleTrigger
                  onClick={() => {
                    setisAccountOpen((prev) => !prev)
                  }}
                >
                  <div className="flex cursor-pointer items-center gap-4 rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200">
                    <p>Account</p>
                    {isAccountOpen ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200">
                    <a className="" href={`/account/profile`}>
                      <p className="mt-2 font-semibold">Profile</p>
                    </a>
                  </ul>
                  <ul className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200">
                    <a className="" href={`/account/addresses`}>
                      <p className="mt-2 font-semibold">Addresses</p>
                    </a>
                  </ul>
                  <ul className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200">
                    <a className="" href={`/account/change-password`}>
                      <p className="mt-2 font-semibold">Change Password</p>
                    </a>
                  </ul>
                  <ul className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200">
                    <a className="" href={'/orders'}>
                      <p className="mt-2 font-semibold">Orders</p>
                    </a>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ) : (
            <a
              href="/signin"
              className="cursor-pointer rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200"
            >
              Login
            </a>
          )}
          <Collapsible>
            <CollapsibleTrigger
              onClick={() => {
                setIsCategoriesOpened((prev) => !prev)
              }}
            >
              <div className="flex cursor-pointer items-center gap-4 rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200">
                <p>Categories</p>
                {isCategoriesOpened ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {!isCategoriesLoading &&
                isCategoriesOpened &&
                categories?.map((category: Category) => (
                  <ul
                    key={category.id}
                    className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200"
                  >
                    <a className="" href={`/categories/${category.slug}`}>
                      <p className="mt-2 font-semibold">{category.name}</p>
                    </a>
                  </ul>
                ))}
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger
              onClick={() => {
                setIsBrandsOpened((prev) => !prev)
              }}
            >
              <div className="flex cursor-pointer items-center gap-4 rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200">
                <p>Brands</p>
                {isBrandsOpened ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {!isBrandsLoading &&
                isBrandsOpened &&
                brands?.map((brand: Brand) => (
                  <ul
                    key={brand.id}
                    className="rounded-lg px-4 py-2 pl-10 text-base hover:bg-gray-200"
                  >
                    <a className="" href={`/categories/${brand.slug}`}>
                      <p className="mt-2 font-semibold">{brand.name}</p>
                    </a>
                  </ul>
                ))}
            </CollapsibleContent>
          </Collapsible>
          <p
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200"
          >
            Brands
          </p>
          <p
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200"
          >
            Best Sellers
          </p>
          <p
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200"
          >
            New Arrivals
          </p>
          {session && (
            <p
              onClick={handleSignOut}
              className="cursor-pointer rounded-lg bg-white px-4 py-2 pr-2 hover:bg-gray-200"
            >
              Logout
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarHamburger
