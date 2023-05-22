'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar: React.FC = () => {
    const pathname = usePathname()

    console.log(pathname)

    return (
        <nav className="sticky top-0 flex w-full items-center justify-between bg-transparent text-black">
            <Image src="/logo.svg" width={200} height={150} alt="logo" />
            <div className="flex gap-14 text-xl">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">$0.00</a>
            </div>
        </nav>
    )
}

export default Navbar
