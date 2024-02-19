import NextAuth, {
  AuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 10 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
        accountType: { label: 'Account Type', type: 'text' },
      },
      async authorize(credentials) {
        const API_URL =
          credentials?.accountType === 'customer'
            ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`
            : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/staff/login/`
        console.log('API URL', API_URL)
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()

        if (response.ok) {
          return {
            id: data.id,
            token: data.token,
            email: data.email,
            is_staff: data.is_staff,
          }
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      if (user) {
        token.id = user.id
        token.email = user.email
        token.token = user.token
        token.is_staff = user.is_staff
      }
      console.log('JWT', user, session)
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as number,
          email: token.email as string,
          token: token.token as string,
          is_staff: token.is_staff as boolean,
        }
      }
      return {
        ...session,
        ...token,
      }
    },
  },
}
