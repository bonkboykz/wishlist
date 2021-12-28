import { ApolloClient, InMemoryCache } from '@apollo/client';

import introspection from '@wishlist-graphql/possible-types';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
  }),
});

export default apolloClient;
