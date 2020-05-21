/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import {
  PagerDataFragment,
  GetPagerQuery,
  GetPagerDocument,
  UpdatePagerMutationVariables,
} from '../generated/graphql';

export default function updatePager(
  root: any,
  variables: UpdatePagerMutationVariables,
  context: { cache: InMemoryCache; getCacheKey: any; client: ApolloClient<any> },
  info: any
): any {
  const { cache } = context;

  const pager = getPager(cache);

  if (pager) {
    cache.writeQuery<GetPagerQuery>({
      query: GetPagerDocument,
      data: {
        pager: {
          ...pager,
          ...variables.input,
        },
      },
    });
  }
  return null;
}

function getPager(cache: InMemoryCache): any {
  const query = cache.readQuery<GetPagerQuery>({
    query: GetPagerDocument,
  });

  return query?.pager;
}
