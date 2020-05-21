/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { Context } from '@apollo/react-common';
import { PagerDataFragmentDoc, PagerDataFragment, Pager } from '../generated/graphql';

export default (
  root: any,
  variables: Pager,
  context: { cache: InMemoryCache; getCacheKey: any; client: ApolloClient<any> },
  info: any
): Context | null => {
  return context.cache.readFragment<PagerDataFragment>({
    fragment: PagerDataFragmentDoc,
    id: context.getCacheKey({ id: variables.id, __typename: 'Pager' }),
  });
};
