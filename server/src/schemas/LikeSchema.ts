import { gql } from 'apollo-server';

/**
 * @description holds like schema
 */

export const LikeSchema = gql`
  type Like {
    id: ID!
    metric: Metric!
  }

  input LikeInput {
    id: ID!
  }

  extend type Query {
    like(id: String!): Like
  }

  extend type Mutation {
    createLike(input: LikeInput): Like
  }
`;
