import { gql } from 'apollo-server';

/**
 * @description holds like schema
 */

export const LikeSchema = gql`
  type Like {
    id: ID!
    user: UserQuery!
  }

  input LikeInput {
    user: UserInput
  }

  extend type Query {
    like(id: String!): Like
  }

  extend type Mutation {
    createLike(input: LikeInput!): Like
  }
`;
