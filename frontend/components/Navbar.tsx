'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const Navbar: React.FC = () => {
    const pathname = usePathname()
    const navbarRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (navbarRef.current && pathname == '/') {
            navbarRef.current?.scrollIntoView({ behavior: 'auto' })
        }
    }, [pathname])

    const menuOptions = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: 'Products',
            link: '/products',
        },
        {
            label: 'About',
            link: '#',
        },
        {
            label: 'Contact',
            link: '#',
        },
    ]

    if (pathname === '/') {
        return (
            <div ref={navbarRef} className="flex min-h-screen w-full flex-col bg-[url('../public/hero.jpg')] bg-cover bg-center bg-no-repeat text-white">
                <nav className="flex w-full items-center justify-between bg-transparent px-10 py-8">
                    <Image
                        src="/logo.svg"
                        width={200}
                        height={150}
                        alt="logo"
                    />
                    <div className="flex gap-14 text-lg">
                        {menuOptions.map((option) => (
                            <Link
                                href={option.link}
                                className="hidden lg:block"
                            >
                                {option.label}
                            </Link>
                        ))}
                        <Link href="#">$0.00</Link>
                    </div>
                </nav>
                <div className="flex flex-grow flex-col items-center justify-center p-10 text-center md:p-2">
                    <p className="text-md font-serif tracking-wide md:text-3xl">
                        WELCOME TO THE GREENSTORE
                    </p>
                    <h1 className="mt-5 font-serif text-4xl tracking-wider md:mt-12 md:text-6xl">
                        Let’s Bring the Spring to
                        <span className="block text-center">Your Home</span>
                    </h1>

                    <button className="p text-md mt-12 border-solid bg-white px-8 py-3 font-semibold text-black md:px-14 md:py-5 md:text-xl">
                        Shop Now
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-between px-10 py-6">
            <Image src="/black-logo.svg" alt="logo" width={120} height={100} />

            <div className="flex gap-14 text-sm">
                {menuOptions.map((option) => (
                    <Link href={option.link} className="hidden lg:block">
                        {option.label}
                    </Link>
                ))}
                <Link href="#">$0.00</Link>
            </div>
        </div>
    )
}

export default Navbar
