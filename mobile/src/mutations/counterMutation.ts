/* eslint-disable */
import { gql } from 'apollo-boost';
import { GET_COUNTER } from '../queries/counterQueries';

export const UPDATE_COUNTER = gql`
  mutation updateCounter($offset: Number!) {
    updateCounter(offset: $offset) @client
  }
`;

export const CounterMutation = {
  // @ts-ignore
  updateCounter: (_, variables, { cache }) => {
    const data = cache.readQuery({ query: GET_COUNTER });
    cache.writeData({ data: { counter: data.counter + variables.offset } });
    return null;
  },
};
/* eslint-enable */
