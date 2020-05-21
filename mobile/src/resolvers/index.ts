import { gql } from 'apollo-boost';
import { PullModalMutation } from '../mutations/modal';
import { PagerMutations } from '../mutations/pager';

export const typeDefs = gql`
  input PagerInput {
    id: ID
    activeIndex: String!
    count: String!
    visible: String!
  }

  type Pager {
    activeIndex: Number!
    count: Number!
    visible: Boolean!
  }
  extend type Query {
    count: Number!
    pullModalVisible: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    ...PagerMutations,
    ...PullModalMutation,
  },
};
