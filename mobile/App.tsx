/* eslint-disable global-require */
import React, { FC, useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import ApolloClient, { Operation, InMemoryCache, gql } from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from '@apollo/react-hoc';
import AppRoot from './src/screens/AppRoot';
import { Window } from './src/types';
import configureStore from './src/store/configureStore';

declare let window: Window & typeof globalThis;

const { store, persistor } = configureStore(window.INITIAL_REDUX_STATE);

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://grapple-host.herokuapp.com/',
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
  typeDefs: gql`
    enum AwardsEnum {
      angel
      brave
      calming
      chatty
      funny
      helpful
      honest
      smart
      survivor
    }
  `,
});

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={(): void => setFontsLoaded(true)} />;
  }

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <AppRoot />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
