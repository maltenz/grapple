/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
  GetPullModalDocument,
  UpdatePullModalMutationVariables,
  GetPullModalQuery,
} from '../generated/graphql';

export default function updatePullModal(
  root: {},
  variables: UpdatePullModalMutationVariables,
  context: { cache: InMemoryCache },
  info: any
): void {
  const { cache } = context;

  const pullModal = getPullModal(cache);

  if (pullModal) {
    cache.writeQuery<GetPullModalQuery>({
      query: GetPullModalDocument,
      data: {
        pullModal: {
          ...pullModal,
          ...variables.input,
        },
      },
    });
  }
}

function getPullModal(cache: InMemoryCache): any {
  const query = cache.readQuery<GetPullModalQuery>({
    query: GetPullModalDocument,
  });

  return query?.pullModal;
}
