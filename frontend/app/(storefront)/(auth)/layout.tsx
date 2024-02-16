import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen">
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <AspectRatio ratio={16 / 9}>
          <Link href="/"></Link>
          <Image
            src="/auth-img.jpg"
            alt="auth flower image"
            className="absolute object-cover"
            fill
          />
          <div className="bottom-6 left-8 hidden font-semibold text-lime-800 md:absolute md:block ">
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
        <div className="absolute inset-0 col-span-1 flex w-full items-center justify-center px-10 md:static ">
          {children}
        </div>
      </div>
    </div>
  )
}
