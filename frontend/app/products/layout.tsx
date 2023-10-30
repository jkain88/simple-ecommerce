import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export default async function ProductsLayout({ children }: LayoutProps) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
