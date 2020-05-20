import { gql } from 'apollo-boost';
import { CounterMutation } from '../mutations/counterMutation';
import TodoMutations from '../mutations/todosMutation';

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
