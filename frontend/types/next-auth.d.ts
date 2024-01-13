import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: number
    email: string
    token: string
  }

  interface Session extends DefaultSession {
    user: User
    token: string
  }
}
