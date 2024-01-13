import { withAuth } from 'next-auth/middleware'

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = ['/account/profile']

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (protectedRoutes.includes(req.nextUrl.pathname) && token === null) {
        return false
      }
      return true
    },
  },
})
