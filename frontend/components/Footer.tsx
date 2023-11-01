'use client'

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="h-full w-full bg-white ">
      <div className="grid grid-rows-1 items-center justify-center gap-14 px-24 py-10 lg:grid-cols-5 lg:gap-0 lg:py-8">
        <div className="flex flex-col items-center">
          <Image src="/black-logo.svg" width={200} height={150} alt="logo" />
          <div className="mt-5 flex gap-10 md:mt-10">
            <FontAwesomeIcon icon={faTwitter} className="h-7 w-7" />
            <FontAwesomeIcon icon={faFacebook} className="h-7 w-7" />
            <FontAwesomeIcon icon={faInstagram} className="h-7 w-7" />
          </div>
        </div>
        <div className="hidden flex-col items-center gap-2 text-lg lg:visible lg:flex lg:text-base">
          <p className="font-semibold">Home</p>
          <p className="font-semibold">Shop</p>
          <p className="font-semibold">About</p>
          <p className="font-semibold">Contact</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm">
          <p className="text-xl font-bold">Contact Us</p>
          <p>hello@gmail.com</p>
          <p>+639-999999999</p>
        </div>
        <div className="hidden flex-col gap-4 pl-20 lg:visible lg:col-span-2 lg:flex">
          <p className="font-serif text-xl md:text-2xl">
            Subscribe to our news letter
          </p>
          <div className="flex w-full flex-col justify-center gap-4 px-8 md:px-0">
            <input
              placeholder="Your Email address.."
              className="h-10 w-full border-2 border-black px-4 md:h-10 md:w-56 lg:w-72"
            />
            <Button className="w-28 bg-black text-white">Subscribe</Button>
            {/* <button className="w-28 bg-primary px-4 py-2 hover:bg-zinc-600">
              Subscribe
            </button> */}
          </div>
        </div>
      </div>
      <hr className="h-px w-full border-0 bg-stone-600 dark:bg-gray-700"></hr>
      <p className="px-10 py-5 text-center text-xs">© 2023 Simple E-commerce</p>
    </footer>
  )
}

export default Footer
