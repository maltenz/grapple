import React, { FC } from 'react';
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import AppRoot from './src/screens/AppRoot';
import configureStore from './src/store/configureStore';
import { Window } from './types';

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

declare let window: Window & typeof globalThis;
const store = configureStore(window.INITIAL_REDUX_STATE);

const App: FC = () => {
  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <NavigationContainer>
            <AppRoot />
          </NavigationContainer>
        </Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
