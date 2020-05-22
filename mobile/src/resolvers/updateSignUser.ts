/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  GetSignUserQuery,
  GetSignUserDocument,
  UpdateSignUserMutationVariables,
} from '../generated/graphql';

export default function updateSignedUser(
  root: {},
  variables: UpdateSignUserMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
  const { cache } = context;

  const signUser = getSignUser(cache);

  if (signUser) {
    cache.writeQuery<GetSignUserQuery>({
      query: GetSignUserDocument,
      data: {
        signUser: {
          ...signUser,
          ...variables.input,
        },
      },
    });
  }
}

// eslint-disable-next-line consistent-return
const getSignUser = (cache: InMemoryCache): any => {
  const query = cache.readQuery<GetSignUserQuery>({
    query: GetSignUserDocument,
  });

  if (query?.signUser) {
    return query.signUser;
  }
};
