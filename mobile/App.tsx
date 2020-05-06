import React, { FC } from 'react';
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import AppRoot from './src/screens/AppRoot';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: `${process.env.GRAPHQL_URI}/:${process.env.GRAPHQL_PORT}`,
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

const App: FC = () => {
  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppRoot />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
