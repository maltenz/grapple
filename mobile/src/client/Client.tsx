/* eslint-disable @typescript-eslint/ban-ts-ignore, @typescript-eslint/no-empty-function */
import React, { FC, useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import ApolloClient, { Operation } from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hoc';
import { resolvers } from './resolvers';
import { cache, data } from './cache';

const Client: FC = ({ children }) => {
  const [client, setClient] = useState<ApolloClient<unknown> | undefined>(undefined);

  useEffect(() => {
    cache.writeData({ data });

    try {
      const myClient = new ApolloClient({
        uri: 'http://192.168.1.100:8080/',
        cache,
        resolvers,
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

      persistCache({
        cache,
        // @ts-ignore
        storage: AsyncStorage,
        serialize: true,
      }).then(() => {
        myClient.onResetStore(async () => cache.writeData({ data }));
        myClient.clearStore();
        myClient.resetStore();
        setClient(myClient);
      });
      return (): void => {};
    } catch (error) {
      throw Error(`Error restoring Apollo cache ${error}`);
    }
  }, []);

  if (client === undefined) {
    return <AppLoading />;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
