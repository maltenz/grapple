import ApolloClient, { Operation } from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { localCache, initLocalCache } from './apollo-local-cache';
import { localResolvers } from './apollo-resolvers';

export const apolloClient = new ApolloClient({
  uri: process.env.HOST,
  cache: localCache,
  resolvers: localResolvers,
  request: async (operation: Operation): Promise<void> => {
    const token = await AsyncStorage.getItem('token');
    // eslint-disable-next-line no-console
    console.log(`token ${token}`);

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'client-name': 'grapple',
        'client-version': '1.0.0',
      },
    });
  },
});

initLocalCache();
