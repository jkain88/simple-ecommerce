'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { sidebarOptions } from '@/constants/menu'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'
import { buttonVariants } from '../ui/button'

const SideNavBar: React.FC = () => {
  const path = usePathname()
  console.log('path', path)
  return (
    <div className="mr-10 flex flex-col gap-4">
      <p className="text-lg font-semibold">User Name</p>
      <div className="flex gap-2">
        <FontAwesomeIcon icon="pencil" className="w-4 text-gray-600" />
        <Link href="/account/profile">
          <p className="text-sm text-gray-600">Edit Profile</p>
        </Link>
      </div>
      <Separator className="w-56 bg-neutral-300" />
      {sidebarOptions.map((option) => (
        <div key={option.label}>
          <div className="flex gap-2 text-lg font-bold">
            <FontAwesomeIcon icon={option.icon} className="w-4" />
            <div>{option.label}</div>
          </div>
          <div className="flex flex-col text-sm text-gray-600">
            {option.subMenus &&
              option.subMenus.map((subMenu, index) => (
                <Link
                  key={index}
                  href={subMenu.link}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    path === subMenu.link && 'bg-red-500',
                    'justify-start font-semibold hover:bg-transparent hover:underline'
                  )}
                >
                  {subMenu.label}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SideNavBar
