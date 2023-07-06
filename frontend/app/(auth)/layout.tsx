import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="h-screen">
            <div className="grid h-full grid-cols-2">
                <AspectRatio ratio={16 / 9}>
                    <Link href="/">
                        <Image
                            src="/black-logo.svg"
                            alt="logo"
                            width={200}
                            height={100}
                            className="absolute left-8 top-6 z-20"
                        />
                    </Link>
                    <Image
                        src="/auth-img.jpg"
                        alt="auth flower image"
                        className="absolute object-cover"
                        fill
                    />
                    <div className="absolute bottom-6 left-8 font-semibold text-lime-800 ">
                        Photo by{' '}
                        <a
                            className="underline decoration-2"
                            href="https://unsplash.com/@stephanieharvey?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                        >
                            Stephanie Harvey
                        </a>{' '}
                        on{' '}
                        <a href="https://unsplash.com/photos/vHkj3fX9wCk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                            Unsplash
                        </a>
                    </div>
                </AspectRatio>
                {children}
            </div>
        </div>
    )
}
