/* eslint-disable global-require */
import React, { FC, useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppRoot from './src/screens/AppRoot';
import configureStore from './src/store/configureStore';
import { Window } from './types';
import { apolloClient } from './src/config/apollo-client';

declare let window: Window & typeof globalThis;

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });
};

const { store, persistor } = configureStore(window.INITIAL_REDUX_STATE);

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={(): void => setFontsLoaded(true)} />;
  }

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <ApolloProvider client={apolloClient}>
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
