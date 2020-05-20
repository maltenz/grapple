/* eslint-disable global-require */
import React, { FC, useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ApolloClient, { InMemoryCache, Operation } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppRoot from './src/screens/AppRoot';
import { resolvers, typeDefs } from './src/resolvers';
import configureStore from './src/store/configureStore';
import { Window } from './types';

declare let window: Window & typeof globalThis;

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });
};

const cache = new InMemoryCache();

const uri = process.env.DEV_DEVICE_IP
  ? `${process.env.DEV_DEVICE_IP}:${process.env.GRAPHQL_PORT}`
  : `${process.env.GRAPHQL_URI}:${process.env.GRAPHQL_PORT}`;

const client = new ApolloClient({
  cache,
  uri,
  typeDefs,
  resolvers,
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

cache.writeData({
  data: {
    counter: 0,
    randomNumber: 0,
    todos: [],
    pullModalVisible: false,
  },
});

const { store, persistor } = configureStore(window.INITIAL_REDUX_STATE);

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
