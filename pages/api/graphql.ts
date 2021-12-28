import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';

import { createContext } from '@wishlist-graphql/context';
import { schema } from '@wishlist-graphql/schema';

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
  debug: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();

    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
