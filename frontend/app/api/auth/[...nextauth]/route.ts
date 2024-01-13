import NextAuth, {
  AuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 60 * 10 * 30,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login/`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.username,
              password: credentials?.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        if (response.ok) {
          return data
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      return {
        ...session,
        ...user,
      }
    },
  },
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
