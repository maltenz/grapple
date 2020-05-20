import { HttpLink } from 'apollo-boost';

export const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});
