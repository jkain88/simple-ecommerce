import Navbar from '@/components/Navbar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="h-screen bg-neutral-100">
        <section className="container">
          <p>test</p>
          {children}
        </section>
      </div>
    </div>
  )
}
