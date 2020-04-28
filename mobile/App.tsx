import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@apollo/react-hooks';
import configureStore from './configureStore';
import { Window } from './types';
import HomeScreen from './src/screens/Home';

declare let window: Window & typeof globalThis;

const store = configureStore(window.INITIAL_REDUX_STATE);

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI,
});

const App: FC = () => (
  <SafeAreaProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    </ApolloProvider>
  </SafeAreaProvider>
);

export default App;
