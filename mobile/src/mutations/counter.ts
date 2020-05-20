/* eslint-disable */
import { gql } from 'apollo-boost';
import { GET_COUNTER } from '../queries/counter';

export const UPDATE_COUNTER = gql`
  mutation updateCounter($offset: Number!) {
    updateCounter(offset: $offset) @client
  }
`;

 const CounterMutation = {
  // @ts-ignore
  updateCounter: (_, variables, { cache }) => {
    const data = cache.readQuery({ query: GET_COUNTER });
    cache.writeData({ data: { counter: data } });
    return null;
  },
};

export default CounterMutation
/* eslint-enable */
