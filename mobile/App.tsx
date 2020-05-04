import React, { FC } from 'react';
import ApolloClient from 'apollo-boost';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import AppRoot from './src/screens/AppRoot';

declare let window: Window & typeof globalThis;

export const client = new ApolloClient({
  uri: process.env.GRAPHQL_URI,
});

const App: FC = () => (
  <SafeAreaProvider>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppRoot />
      </NavigationContainer>
    </ApolloProvider>
  </SafeAreaProvider>
);

export default App;
