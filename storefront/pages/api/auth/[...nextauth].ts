import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Api, CustomTokenObtainPair } from '../Api';

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
                console.log(response);
                return null;
                return { email: 'yes', password: 'yes' };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);
