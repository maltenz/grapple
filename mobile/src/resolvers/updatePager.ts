/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  GetPagerQuery,
  GetPagerDocument,
  UpdatePagerMutationVariables,
} from '../generated/graphql';

export default function updatePager(
  root: {},
  variables: UpdatePagerMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
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
}

function getPager(cache: InMemoryCache): any {
  const query = cache.readQuery<GetPagerQuery>({
    query: GetPagerDocument,
  });

  return query?.pager;
}
