import React, { FC, useState, useEffect } from 'react';
import ApolloClient, { NormalizedCacheObject, InMemoryCache } from 'apollo-boost';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import AppRoot from './src/screens/AppRoot';
import { Panel } from './src/components';

const cache = new InMemoryCache();
const clientConfig = {
  cache,
  uri: `${process.env.GRAPHQL_URI}/:${process.env.GRAPHQL_PORT}`,
  headers: {
    'client-name': 'grapple',
    'client-version': '1.0.0',
  },
};

const Client: FC = ({ children }) => {
  const [token, setToken] = useState<boolean | string | null>(false);

  useEffect(() => {
    const getToken = async (): Promise<void> => {
      const myToken = await AsyncStorage.getItem('token');

      setToken(myToken === null || myToken);
    };
    getToken();
  }, [setToken]);

  if (token !== false && token !== null) {
    Object.assign(clientConfig.headers, { authorization: token });
    const client = new ApolloClient<NormalizedCacheObject>(clientConfig);
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
  return <Panel flex={1} />;
};

const App: FC = () => {
  return (
    <SafeAreaProvider>
      <Client>
        <NavigationContainer>
          <AppRoot />
        </NavigationContainer>
      </Client>
    </SafeAreaProvider>
  );
};

export default App;
