/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UpdateShotMutationVariables, GetShotQuery, GetShotDocument } from '../generated/graphql';

export default function updateShot(
  root: {},
  variables: UpdateShotMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
  const { cache } = context;

  const shot = getShot(cache);

  if (shot) {
    cache.writeQuery<GetShotQuery>({
      query: GetShotDocument,
      data: {
        shot: {
          ...shot,
          ...variables.input,
        },
      },
    });
  }
}

// eslint-disable-next-line consistent-return
const getShot = (cache: InMemoryCache): any => {
  const query = cache.readQuery<GetShotQuery>({
    query: GetShotDocument,
  });

  if (query?.shot) {
    return query.shot;
  }
};
