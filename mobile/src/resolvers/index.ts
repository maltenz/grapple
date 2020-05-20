import { gql } from 'apollo-boost';
import CounterMutation from '../mutations/counter';
import TodoMutations from '../mutations/todo';

export const typeDefs = gql`
  extend type Query {
    count: Number!
  }
`;

export const resolvers = {
  Mutation: {
    ...CounterMutation,
    ...TodoMutations,
  },
};
