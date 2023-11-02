import './globals.css'
import { Inter } from 'next/font/google'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faDollarSign,
  faPencil,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Navbar from '@/components/Navbar'
import { Providers } from './providers'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Simple E-commerce',
  description: 'Generated by create next app',
}

library.add(faUser, faDollarSign, faPencil)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white `}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
