import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="mt-20 flex h-96 w-full flex-col items-center justify-center gap-4 bg-lime-950 text-white">
            <p className="font-serif text-xl md:text-5xl">
                Subscribe to our newsletter
            </p>
            <div className="flex w-full flex-col justify-center gap-4 px-8 md:flex-row md:px-0">
                <input
                    placeholder="Your Email address.."
                    className="h-10 w-full px-4 md:h-16 md:w-1/3"
                />
                <button className="bg-primary px-4 py-2 hover:bg-zinc-600">
                    Subscribe
                </button>
            </div>
            <div className="mt-10 flex gap-10">
                <FontAwesomeIcon icon={faTwitter} className="h-7 w-7" />
                <FontAwesomeIcon icon={faFacebook} className="h-7 w-7" />
                <FontAwesomeIcon icon={faInstagram} className="h-7 w-7" />
            </div>
            <div className="divide-x-8 divide-black border-solid"> </div>
        </footer>
    )
}

export default Footer
