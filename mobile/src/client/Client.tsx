import ApolloClient, { Operation, InMemoryCache } from 'apollo-boost';
import { AsyncStorage } from 'react-native';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'http://192.168.1.100:8080',
  cache,
  request: async (operation: Operation): Promise<void> => {
    const token = await AsyncStorage.getItem('token');

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'client-name': 'grapple',
        'client-version': '1.0.0',
      },
    });
  },
});

export default client;
