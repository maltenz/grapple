import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient, { gql } from 'apollo-boost';
import { Provider, useDispatch } from 'react-redux';

import { ApolloProvider } from '@apollo/react-hooks';
import configureStore from './configureStore';
import { Window } from './types';
import { setTheme } from './store/layout';

declare let window: Window & typeof globalThis;

const store = configureStore(window.INITIAL_REDUX_STATE);

const client = new ApolloClient({
  uri: 'http://localhost:8080/',
});

client
  .query({
    query: gql`
      {
        users {
          name
          email
        }
      }
    `,
  })
  .then(() => null);

const Home: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTheme('dark'));
  }, []);

  return null;
};

const App: FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
    </Provider>
  </ApolloProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
