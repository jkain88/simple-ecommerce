import { withAuth } from 'next-auth/middleware'

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = [
  '/account/profile',
  '/account/addresses',
  '/cart',
  '/checkout',
  '/orders',
  '/dashboard',
]

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (token !== null) {
        if (
          req.nextUrl.pathname !== '/dashboard/login' &&
          req.nextUrl.pathname.includes('/dashboard') &&
          !token.is_staff
        ) {
          return false
        }
      }
      if (protectedRoutes.includes(req.nextUrl.pathname) && token === null) {
        return false
      }
      return true
    },
  },
})
