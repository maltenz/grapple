import React, { FC, useState, useEffect } from 'react';
import ApolloClient, { Operation, IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-boost';
import { AsyncStorage } from 'react-native';
import { persistCache } from 'apollo-cache-persist';
import { ApolloProvider } from '@apollo/react-hoc';
import { AppLoading } from 'expo';
import { localResolvers } from './apollo-resolvers';
import introspectionQueryResultData from '../generated/fragment-matcher.json';

const Client: FC = ({ children }) => {
  const [client, setClient] = useState<ApolloClient<unknown> | undefined>(undefined);

  useEffect(() => {
    const cache = new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
    });

    const initData = {
      signUser: {
        __typename: 'SignUser',
        id: 'staticsignuserid',
        userId: null,
        name: null,
        email: null,
      },
      pager: {
        __typename: 'Pager',
        id: 'staticpagerid',
        activeIndex: 0,
        count: 4,
        visible: false,
      },
      pullModal: {
        __typename: 'PullModal',
        id: 'staticpullmodalid',
        visible: true,
      },
    };

    cache.writeData({
      data: initData,
    });

    try {
      const myClient = new ApolloClient({
        uri: 'http://192.168.1.100:8080/',
        cache,
        resolvers: localResolvers,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        storage: AsyncStorage,
        serialize: true,
      }).then(() => {
        myClient.onResetStore(async () => cache.writeData({ data: initData }));
        setClient(myClient);
      });
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
