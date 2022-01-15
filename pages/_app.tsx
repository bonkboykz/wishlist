import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '@wishlist-components/Layout';
import apolloClient from '@wishlist-lib/apollo';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
