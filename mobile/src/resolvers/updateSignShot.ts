/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  UpdateSignShotMutationVariables,
  GetSignShotQuery,
  GetSignShotDocument,
} from '../generated/graphql';

export default function updateSignedUser(
  root: {},
  variables: UpdateSignShotMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
  const { cache } = context;

  const signShot = getShot(cache);

  if (signShot) {
    cache.writeQuery<GetSignShotQuery>({
      query: GetSignShotDocument,
      data: {
        signShot: {
          ...signShot,
          ...variables.input,
        },
      },
    });
  }
}

// eslint-disable-next-line consistent-return
const getShot = (cache: InMemoryCache): any => {
  const query = cache.readQuery<GetSignShotQuery>({
    query: GetSignShotDocument,
  });

  if (query?.signShot) {
    return query.signShot;
  }
};
