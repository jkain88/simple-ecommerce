import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
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
              {sidebarOptions.map((option) => (
                <div key={option.label}>
                  <div className="flex gap-2 font-semibold">
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
            {children}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
