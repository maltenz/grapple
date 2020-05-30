/* eslint-disable global-require */
import React, { FC, useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import Client from './src/client/Client';
import AppRoot from './src/screens/AppRoot';
import configureStore from './configureStore';
import { Window } from './src/types';

declare let window: Window & typeof globalThis;

const store = configureStore(window.INITIAL_REDUX_STATE);

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });
};

const App: FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={(): void => setFontsLoaded(true)} />;
  }

  return (
    <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
      <Client>
        <Provider store={store}>
          <NavigationContainer>
            <AppRoot />
          </NavigationContainer>
        </Provider>
      </Client>
    </SafeAreaProvider>
  );
};

export default App;
