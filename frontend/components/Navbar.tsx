'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar: React.FC = () => {
    const pathname = usePathname()

    console.log(pathname)

    return (
        <div className="flex min-h-screen w-full flex-col bg-[url('../public/hero.jpg')] bg-no-repeat bg-center bg-cover text-white">
            <nav className="flex w-full items-center justify-between bg-transparent py-8 px-10">
                <Image src="/logo.svg" width={200} height={150} alt="logo" />
                <div className="flex gap-14 text-lg">
                    <Link href="/" className="hidden lg:block">
                        Home
                    </Link>
                    <Link href="/products" className="hidden lg:block">
                        Products
                    </Link>
                    <Link href="#" className="hidden lg:block">
                        About
                    </Link>
                    <Link href="#" className="hidden lg:block">
                        Contact
                    </Link>
                    <Link href="#">$0.00</Link>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center flex-grow text-center p-10 md:p-2">
                <p className="font-serif text-md md:text-3xl tracking-wide">
                    WELCOME TO THE GREENSTORE
                </p>
                <h1 className="mt-5 md:mt-12 font-serif text-4xl md:text-6xl tracking-wider">
                    Let’s Bring the Spring to
                    <span className="block text-center">Your Home</span>
                </h1>

                <button className="p mt-12 border-solid bg-white px-8 md:px-14 py-3 md:py-5 text-md md:text-xl font-semibold text-black">
                    Shop Now
                </button>
            </div>
        </div>
    )
}

export default Navbar
