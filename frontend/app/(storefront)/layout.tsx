import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
