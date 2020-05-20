import { gql } from 'apollo-boost';
import CounterMutation from '../mutations/counter';
import TodoMutations from '../mutations/todo';
import { PullModalMutation } from '../mutations/modal';

export const typeDefs = gql`
  extend type Query {
    count: Number!
    pullModalVisible: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    ...CounterMutation,
    ...TodoMutations,
    ...PullModalMutation,
  },
};
