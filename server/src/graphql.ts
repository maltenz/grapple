import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { schema } from './schemas';
import { context } from './context';

/**
 * @description holds and creates apollo server
 */

const apolloServer = new ApolloServer({
  cors: true,
  typeDefs: schema,
  resolvers,
  context,
  engine: {
    apiKey: process.env.APOLLO_ENGINE,
  },
  playground: {
    endpoint: '/graphql',
  },
  introspection: true,
});

export default apolloServer;
