import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = [
  '/account/profile',
  '/account/addresses',
  '/cart',
  '/checkout',
  '/orders',
]

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token?.is_staff)
    if (req.nextauth.token === null) {
      if (
        req.nextUrl.pathname.includes('/dashboard') &&
        req.nextUrl.pathname !== '/dashboard/signin'
      ) {
        console.log('TRUE HERE')
        return NextResponse.redirect(new URL('/dashboard/signin', req.url))
      } else if (
        protectedRoutes.includes(req.nextUrl.pathname) &&
        req.nextUrl.pathname !== '/signin'
      ) {
        return NextResponse.redirect(new URL('/signin', req.url))
      }
    } else {
      if (
        req.nextUrl.pathname.includes('/dashboard') &&
        !req.nextauth.token.is_staff === true &&
        req.nextUrl.pathname !== '/dashboard/signin'
      ) {
        return NextResponse.redirect(new URL('/dashboard/signin', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: () => {
        return true
      },
    },
  }
)
