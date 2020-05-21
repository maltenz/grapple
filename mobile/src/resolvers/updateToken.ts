/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  GetTokenQuery,
  GetTokenDocument,
  UpdateTokenMutationVariables,
} from '../generated/graphql';

export default function updateToken(
  root: {},
  variables: UpdateTokenMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
  const { cache } = context;

  const token = getToken(cache);

  if (token) {
    cache.writeQuery<GetTokenQuery>({
      query: GetTokenDocument,
      data: {
        token: {
          ...token,
          ...variables.input,
        },
      },
    });
  }
}

function getToken(cache: InMemoryCache): any {
  const query = cache.readQuery<GetTokenQuery>({
    query: GetTokenDocument,
  });

  return query?.token;
}
