import React, { useRef } from 'react';
import type { NextPage } from 'next';
import { Api, CustomTokenObtainPair } from './api/Api';
import { useMutation } from 'react-query';
import { signIn, useSession } from 'next-auth/react';

const Login: NextPage = () => {
    const { session, isLoading: isLoginLoading } = useSession();
    const { data, isLoading, mutate } = useMutation(
        (tokenCreateInput: CustomTokenObtainPair) => {
            const api = new Api();
            return api.token.tokenCreate({ ...tokenCreateInput });
        }
    );
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        const response = await signIn('credentials', {
            email: email.current!.value,
            password: password.current!.value,
            redirect: false,
        });
        console.log('RESPONSE', response);
    };

    return (
        <div className="container mx-auto text-center">
            <div className="flex flex-col">
                <input
                    ref={email}
                    type="email"
                    className="border-gray-400 rounded-lg focus: outline-none focus:border-primary focus:ring-primary"
                    placeholder="Email"
                />
                <input
                    ref={password}
                    type="password"
                    className="border-gray-400 rounded-lg focus: outline-none focus:border-primary focus:ring-primary"
                    placeholder="Password"
                />
                <button
                    className="bg-primary text-white px-5 py-1 rounded-lg"
                    onClick={handleSubmit}
                >
                    Login
                </button>
                {!isLoading && JSON.stringify(data)}
            </div>
        </div>
    );
};

export default Login;
