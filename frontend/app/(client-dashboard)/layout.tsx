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
            {children}
          </div>
        </section>
      </div>
    </div>
  )
}
