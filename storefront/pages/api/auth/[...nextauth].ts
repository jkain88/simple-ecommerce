import jwt_decode from 'jwt-decode';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Api, CustomTokenObtainPair, User } from '../Api';

interface TokenResponse {
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    user: User;
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } =
                    credentials as CustomTokenObtainPair;
                const api = new Api();
                const response = await api.token.tokenCreate({
                    email,
                    password,
                });

                if (response.ok) {
                    const decoded = jwt_decode<TokenResponse>(
                        response.data.access!
                    );
                    return decoded.user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);
