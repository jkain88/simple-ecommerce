import SideNavBar from '@/components/account/SideNavBar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div className="h-max bg-neutral-100">
        <section className="container">
          <div className="flex py-14">
            <SideNavBar />
            <div className="col-span-3 grow rounded-lg bg-white px-14 py-10 shadow-xl">
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
