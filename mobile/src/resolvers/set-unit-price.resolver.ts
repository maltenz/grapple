import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { Character } from '../generated/graphql';

export default function setUnitPrice(
  root: Character,
  variables: any,
  context: { cache: InMemoryCache; getCacheKey: any; client: ApolloClient<any> },
  info: any
) {
  switch (root.name) {
    case 'Rick Sanchez':
      return 10;

    case 'Morty Smith':
      return 10;

    default:
      return 5;
  }
}
