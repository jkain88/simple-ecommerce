import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Session } from 'next-auth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
