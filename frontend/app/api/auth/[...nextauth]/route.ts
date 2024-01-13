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
        const data = (await response.json()) as User
        if (response.ok) {
          console.log('DATA', data)
          return { id: data.id, token: data.token, email: data.email }
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
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      }
    },
  },
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
