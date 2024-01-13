import NextAuth, {
  AuthOptions,
  Session,
  SessionStrategy,
  User,
} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authOptions } from './options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
