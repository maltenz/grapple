import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import {
  CharacterDataFragmentDoc,
  CharacterDataFragment,
  GetCharacterQueryVariables,
} from '../generated/graphql';

export default function getCharacter(
  root: any,
  variables: GetCharacterQueryVariables,
  context: { cache: InMemoryCache; getCacheKey: any; client: ApolloClient<any> },
  info: any
) {
  return context.cache.readFragment<CharacterDataFragment>({
    fragment: CharacterDataFragmentDoc,
    id: context.getCacheKey({ id: variables.id, __typename: 'Character' }),
  });
}
