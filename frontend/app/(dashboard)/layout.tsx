import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Separator } from '@/components/ui/separator'
import { sidebarOptions } from '@/constants/menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-neutral-100">
        <section className="container ">
          <div className="grid grid-cols-4 pt-10">
            <div className="flex flex-col gap-4 ">
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
                  <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600">
                    {option.subMenus &&
                      option.subMenus.map((subMenu) => (
                        <div key={subMenu.label} className="pl-10">
                          <Link href={subMenu.link}>{subMenu.label}</Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-3 rounded-lg bg-white px-14 py-10 shadow-xl">
              {children}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
