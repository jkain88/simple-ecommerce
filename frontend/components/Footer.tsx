import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="mt-20 grid h-full w-full grid-rows-1 items-center justify-center gap-14 bg-lime-950 px-24 py-10 text-white md:grid-cols-5 md:gap-0 md:py-24">
            <div className="flex flex-col items-center">
                <Image src="/logo.svg" width={200} height={150} alt="logo" />
                <div className="mt-5 flex gap-10 md:mt-10">
                    <FontAwesomeIcon icon={faTwitter} className="h-7 w-7" />
                    <FontAwesomeIcon icon={faFacebook} className="h-7 w-7" />
                    <FontAwesomeIcon icon={faInstagram} className="h-7 w-7" />
                </div>
            </div>
            <div className="hidden flex-col items-center gap-2 text-lg md:visible md:flex">
                <p>Home</p>
                <p>Shop</p>
                <p>About</p>
                <p>Contact</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-lg">
                <p className="text-xl font-bold">Contact Us</p>
                <p>hello@gmail.com</p>
                <p>+639-999999999</p>
            </div>
            <div className="hidden flex-col gap-4 pl-20 md:visible md:col-span-2 md:flex">
                <p className="font-serif text-xl md:text-2xl">
                    Subscribe to our news letter
                </p>
                <div className="flex w-full flex-col justify-center gap-4 px-8 md:px-0">
                    <input
                        placeholder="Your Email address.."
                        className="h-10 w-full px-4 md:h-10 md:w-72"
                    />
                    <button className="w-28 bg-primary px-4 py-2 hover:bg-zinc-600">
                        Subscribe
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
