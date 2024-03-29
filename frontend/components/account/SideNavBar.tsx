'use client'

import Link from 'next/link'
import { sidebarOptions } from '@/constants/menu'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'
import { buttonVariants } from '../ui/button'

const SideNavBar: React.FC = () => {
  const path = usePathname()

  return (
    <div className="sticky top-0 hidden gap-4 lg:mr-5 lg:flex lg:flex-col xl:mr-10">
      <p className="text-lg font-semibold">User Name</p>
      <div className="flex gap-2">
        <Link href="/account/profile">
          <p className="text-sm text-gray-600">Edit Profile</p>
        </Link>
      </div>
      <Separator className="w-56 bg-neutral-300" />
      {sidebarOptions.map((option) => (
        <div key={option.label}>
          <div className="flex gap-2 text-lg font-bold">
            <Link href={option.link} className="hover:underline">
              {option.label}
            </Link>
          </div>
          <div className="flex flex-col text-sm text-gray-600">
            {option.subMenus &&
              option.subMenus.map((subMenu, index) => {
                return (
                  <Link
                    key={index}
                    href={subMenu.link}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'justify-start font-semibold',
                      path === subMenu.link
                        ? 'bg-neutral-300'
                        : 'hover:bg-transparent hover:underline'
                    )}
                  >
                    {subMenu.label}
                  </Link>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SideNavBar
