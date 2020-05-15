import { gql } from 'apollo-server';

/**
 * @description holds share schema
 */

export const ShareSchema = gql`
  type Share {
    id: ID!
    metric: Metric!
  }

  input ShareInput {
    id: ID!
  }

  extend type Query {
    share(id: String!): Share
  }

  extend type Mutation {
    createShare(input: ShareInput): Share
    deleteShare(id: String!): Share
  }
`;
